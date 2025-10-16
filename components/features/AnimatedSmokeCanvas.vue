<template>
	<canvas ref="canvas" />
</template>

<script setup>
const canvas = ref(null);
let gl = null;
let ext = null;
let support_linear_float = null;
let config = null;
let pointers = [];
let splatStack = [];
let virtualPointers = [];
let colorArr = [0.282, 0.671, 0.929]; //Color inner
const colorCursors = [0.282, 0.671, 0.929]; //Color cursors
const tintColor = [0.282, 0.671, 0.929];
let density = null;
let velocity = null;
let divergence = null;
let curl = null;
let pressure = null;
let clearProgram = null;
let displayProgram = null;
let splatProgram = null;
let advectionProgram = null;
let divergenceProgram = null;
let curlProgram = null;
let vorticityProgram = null;
let pressureProgram = null;
let gradienSubtractProgram = null;
let lastTime = 0;
let animationFrameId = null;

const baseVertexShader = `
  precision highp float;
  precision mediump sampler2D;
  attribute vec2 aPosition;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform vec2 texelSize;
  void main () {
    vUv = aPosition * 0.5 + 0.5;
    vL = vUv - vec2(texelSize.x, 0.0);
    vR = vUv + vec2(texelSize.x, 0.0);
    vT = vUv + vec2(0.0, texelSize.y);
    vB = vUv - vec2(0.0, texelSize.y);
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const clearShader = `
  precision highp float;
  precision mediump sampler2D;
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float value;
  void main () {
    gl_FragColor = value * texture2D(uTexture, vUv);
  }
`;

const displayShader = `
  precision highp float;
  precision mediump sampler2D;
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform vec3 tintColor;
  void main () {
    vec4 texColor = texture2D(uTexture, vUv);
    float brightness = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
    gl_FragColor = vec4(mix(texColor.rgb, tintColor, brightness * 0.5), texColor.a);
  }
`;

const splatShader = `
  precision highp float;
  precision mediump sampler2D;
  varying vec2 vUv;
  uniform sampler2D uTarget;
  uniform float aspectRatio;
  uniform vec3 color;
  uniform vec2 point;
  uniform float radius;
  void main () {
    vec2 p = vUv - point.xy;
    p.x *= aspectRatio;
    vec3 splat = exp(-dot(p, p) / radius) * color;
    vec3 base = texture2D(uTarget, vUv).xyz;
    gl_FragColor = vec4(base + splat, 1.0);
  }
`;

const advectionManualFilteringShader = `
  precision highp float;
  precision mediump sampler2D;
  varying vec2 vUv;
  uniform sampler2D uVelocity;
  uniform sampler2D uSource;
  uniform vec2 texelSize;
  uniform float dt;
  uniform float dissipation;
  vec4 bilerp (in sampler2D sam, in vec2 p) {
    vec4 st;
    st.xy = floor(p - 0.5) + 0.5;
    st.zw = st.xy + 1.0;
    vec4 uv = st * texelSize.xyxy;
    vec4 a = texture2D(sam, uv.xy);
    vec4 b = texture2D(sam, uv.zy);
    vec4 c = texture2D(sam, uv.xw);
    vec4 d = texture2D(sam, uv.zw);
    vec2 f = p - st.xy;
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }
  void main () {
    vec2 coord = gl_FragCoord.xy - dt * texture2D(uVelocity, vUv).xy;
    gl_FragColor = dissipation * bilerp(uSource, coord);
    gl_FragColor.a = 1.0;
  }
`;

const advectionShader = `
  precision highp float;
  precision mediump sampler2D;
  varying vec2 vUv;
  uniform sampler2D uVelocity;
  uniform sampler2D uSource;
  uniform vec2 texelSize;
  uniform float dt;
  uniform float dissipation;
  void main () {
    vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
    gl_FragColor = dissipation * texture2D(uSource, coord);
  }
`;

const divergenceShader = `
  precision highp float;
  precision mediump sampler2D;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uVelocity;
  vec2 sampleVelocity (in vec2 uv) {
    vec2 multiplier = vec2(1.0, 1.0);
    if (uv.x < 0.0) {
      uv.x = 0.0;
      multiplier.x = -1.0;
    }
    if (uv.x > 1.0) {
      uv.x = 1.0;
      multiplier.x = -1.0;
    }
    if (uv.y < 0.0) {
      uv.y = 0.0;
      multiplier.y = -1.0;
    }
    if (uv.y > 1.0) {
      uv.y = 1.0;
      multiplier.y = -1.0;
    }
    return multiplier * texture2D(uVelocity, uv).xy;
  }
  void main () {
    float L = sampleVelocity(vL).x;
    float R = sampleVelocity(vR).x;
    float T = sampleVelocity(vT).y;
    float B = sampleVelocity(vB).y;
    float div = 0.5 * (R - L + T - B);
    gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
  }
`;

const curlShader = `
  precision highp float;
  precision mediump sampler2D;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uVelocity;
  void main () {
    float L = texture2D(uVelocity, vL).y;
    float R = texture2D(uVelocity, vR).y;
    float T = texture2D(uVelocity, vT).x;
    float B = texture2D(uVelocity, vB).x;
    float vorticity = R - L - T + B;
    gl_FragColor = vec4(vorticity, 0.0, 0.0, 1.0);
  }
`;

const vorticityShader = `
  precision highp float;
  precision mediump sampler2D;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uVelocity;
  uniform sampler2D uCurl;
  uniform float curl;
  uniform float dt;
  void main () {
    float L = texture2D(uCurl, vL).y;
    float R = texture2D(uCurl, vR).y;
    float T = texture2D(uCurl, vT).x;
    float B = texture2D(uCurl, vB).x;
    float C = texture2D(uCurl, vUv).x;
    vec2 force = vec2(abs(T) - abs(B), abs(R) - abs(L));
    force *= 1.0 / length(force + 0.00001) * curl * C;
    vec2 vel = texture2D(uVelocity, vUv).xy;
    gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);
  }
`;

const pressureShader = `
  precision highp float;
  precision mediump sampler2D;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uPressure;
  uniform sampler2D uDivergence;
  vec2 boundary (in vec2 uv) {
    uv = min(max(uv, 0.0), 1.0);
    return uv;
  }
  void main () {
    float L = texture2D(uPressure, boundary(vL)).x;
    float R = texture2D(uPressure, boundary(vR)).x;
    float T = texture2D(uPressure, boundary(vT)).x;
    float B = texture2D(uPressure, boundary(vB)).x;
    float C = texture2D(uPressure, vUv).x;
    float divergence = texture2D(uDivergence, vUv).x;
    float pressure = (L + R + B + T - divergence) * 0.25;
    gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
  }
`;

const gradientSubtractShader = `
  precision highp float;
  precision mediump sampler2D;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uPressure;
  uniform sampler2D uVelocity;
  vec2 boundary (in vec2 uv) {
    uv = min(max(uv, 0.0), 1.0);
    return uv;
  }
  void main () {
    float L = texture2D(uPressure, boundary(vL)).x;
    float R = texture2D(uPressure, boundary(vR)).x;
    float T = texture2D(uPressure, boundary(vT)).x;
    float B = texture2D(uPressure, boundary(vB)).x;
    vec2 velocity = texture2D(uVelocity, vUv).xy;
    velocity.xy -= vec2(R - L, T - B);
    gl_FragColor = vec4(velocity, 0.0, 1.0);
  }
`;

class GLProgram {
	constructor(vertexShader, fragmentShader) {
		this.uniforms = {};
		this.program = gl.createProgram();
		gl.attachShader(this.program, vertexShader);
		gl.attachShader(this.program, fragmentShader);
		gl.linkProgram(this.program);
		if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
			throw gl.getProgramInfoLog(this.program);
		}
		const uniformCount = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);
		for (let i = 0; i < uniformCount; i++) {
			const uniformName = gl.getActiveUniform(this.program, i).name;
			this.uniforms[uniformName] = gl.getUniformLocation(this.program, uniformName);
		}
	}

	bind() {
		gl.useProgram(this.program);
	}
}

function compileShader(type, source) {
	const shader = gl.createShader(type);
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		throw gl.getShaderInfoLog(shader);
	}
	return shader;
}

function getWebGLContext(canvasEl) {
	const params = { alpha: false, depth: false, stencil: false, antialias: false };
	let gl = canvasEl.getContext('webgl2', params);
	const isWebGL2 = !!gl;
	if (!isWebGL2) {
		gl =
			canvasEl.getContext('webgl', params) ||
			canvasEl.getContext('experimental-webgl', params);
	}
	const halfFloat = gl.getExtension('OES_texture_half_float');
	let support_linear_float = gl.getExtension('OES_texture_half_float_linear');
	if (isWebGL2) {
		gl.getExtension('EXT_color_buffer_float');
		support_linear_float = gl.getExtension('OES_texture_float_linear');
	}
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	const internalFormat = isWebGL2 ? gl.RGBA16F : gl.RGBA;
	const internalFormatRG = isWebGL2 ? gl.RG16F : gl.RGBA;
	const formatRG = isWebGL2 ? gl.RG : gl.RGBA;
	const texType = isWebGL2 ? gl.HALF_FLOAT : halfFloat.HALF_FLOAT_OES;
	return {
		gl,
		ext: {
			internalFormat,
			internalFormatRG,
			formatRG,
			texType,
		},
		support_linear_float,
	};
}

function pointerPrototype() {
	return {
		id: -1,
		x: 0,
		y: 0,
		dx: 0,
		dy: 0,
		down: false,
		moved: false,
		color: colorCursors,
	};
}

function initPointers() {
	pointers = [];
	for (let i = 0; i < 10; i++) {
		pointers.push(pointerPrototype());
	}
	virtualPointers = [];
	for (let i = 0; i < 10; i++) {
		virtualPointers.push({
			x: canvas.value.width / 2 + (Math.random() - 0.5) * canvas.value.width * 0.5,
			y: canvas.value.height / 2 + (Math.random() - 0.5) * canvas.value.height * 0.5,
			targetX: 0,
			targetY: 0,
			speed: 30 + Math.random() * 20,
			time: Math.random() * Math.PI * 2,
			radiusX: 150 + Math.random() * 100,
			radiusY: 100 + Math.random() * 50,
		});
	}
}

function initFramebuffers() {
	const textureWidth = gl.drawingBufferWidth >> config.TEXTURE_DOWNSAMPLE;
	const textureHeight = gl.drawingBufferHeight >> config.TEXTURE_DOWNSAMPLE;
	const iFormat = ext.internalFormat;
	const iFormatRG = ext.internalFormatRG;
	const formatRG = ext.formatRG;
	const texType = ext.texType;

	density = createDoubleFBO(
		0,
		textureWidth,
		textureHeight,
		iFormat,
		gl.RGBA,
		texType,
		support_linear_float ? gl.LINEAR : gl.NEAREST
	);
	velocity = createDoubleFBO(
		2,
		textureWidth,
		textureHeight,
		iFormatRG,
		formatRG,
		texType,
		support_linear_float ? gl.LINEAR : gl.NEAREST
	);
	divergence = createFBO(
		4,
		textureWidth,
		textureHeight,
		iFormatRG,
		formatRG,
		texType,
		gl.NEAREST
	);
	curl = createFBO(5, textureWidth, textureHeight, iFormatRG, formatRG, texType, gl.NEAREST);
	pressure = createDoubleFBO(
		6,
		textureWidth,
		textureHeight,
		iFormatRG,
		formatRG,
		texType,
		gl.NEAREST
	);
}

function createFBO(texId, w, h, internalFormat, format, type, param) {
	gl.activeTexture(gl.TEXTURE0 + texId);
	const texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);
	const fbo = gl.createFramebuffer();
	gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
	gl.viewport(0, 0, w, h);
	gl.clear(gl.COLOR_BUFFER_BIT);
	return [texture, fbo, texId];
}

function createDoubleFBO(texId, w, h, internalFormat, format, type, param) {
	let fbo1 = createFBO(texId, w, h, internalFormat, format, type, param);
	let fbo2 = createFBO(texId + 1, w, h, internalFormat, format, type, param);
	return {
		get first() {
			return fbo1;
		},
		get second() {
			return fbo2;
		},
		swap() {
			const temp = fbo1;
			fbo1 = fbo2;
			fbo2 = temp;
		},
	};
}

let blit = null;

function initBlit() {
	gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
	gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(0);
	blit = (destination) => {
		gl.bindFramebuffer(gl.FRAMEBUFFER, destination);
		gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
	};
}

function splat(x, y, dx, dy, color) {
	splatProgram.bind();
	gl.uniform1i(splatProgram.uniforms.uTarget, velocity.first[2]);
	gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas.value.width / canvas.value.height);
	gl.uniform2f(
		splatProgram.uniforms.point,
		x / canvas.value.width,
		1.0 - y / canvas.value.height
	);
	gl.uniform3f(splatProgram.uniforms.color, dx, -dy, 1.0);
	gl.uniform1f(splatProgram.uniforms.radius, config.SPLAT_RADIUS);
	blit(velocity.second[1]);
	velocity.swap();

	gl.uniform1i(splatProgram.uniforms.uTarget, density.first[2]);
	gl.uniform3f(splatProgram.uniforms.color, color[0], color[1], color[2]);
	blit(density.second[1]);
	density.swap();
}

function resizeCanvas() {
	const canvasEl = canvas.value;
	const dpr = window.devicePixelRatio || 1;

	const displayWidth = Math.floor(canvasEl.clientWidth * dpr);
	const displayHeight = Math.floor(canvasEl.clientHeight * dpr);

	if (canvasEl.width !== displayWidth || canvasEl.height !== displayHeight) {
		canvasEl.width = displayWidth;
		canvasEl.height = displayHeight;
		gl.viewport(0, 0, displayWidth, displayHeight);
		initFramebuffers();
	}
}

function update() {
	resizeCanvas();
	const dt = Math.min((Date.now() - lastTime) / 1000, 0.016);
	lastTime = Date.now();

	// Simulation of cursor movement
	virtualPointers.forEach((vp, index) => {
		vp.time += dt;
		vp.targetX =
			canvas.value.width / 2 +
			Math.sin(vp.time * (0.3 + index * 0.1)) * vp.radiusX +
			(Math.random() - 0.5) * 50;
		vp.targetY =
			canvas.value.height / 2 +
			Math.cos(vp.time * (0.4 + index * 0.15)) * vp.radiusY +
			(Math.random() - 0.5) * 40;
		vp.x += (vp.targetX - vp.x) * vp.speed * dt;
		vp.y += (vp.targetY - vp.y) * vp.speed * dt;

		pointers[index].x = vp.x;
		pointers[index].y = vp.y;
		pointers[index].dx = (vp.targetX - vp.x) * 10;
		pointers[index].dy = (vp.targetY - vp.y) * 10;
		pointers[index].moved = true;
		pointers[index].down = true;
		pointers[index].color = colorArr;
	});

	gl.viewport(
		0,
		0,
		gl.drawingBufferWidth >> config.TEXTURE_DOWNSAMPLE,
		gl.drawingBufferHeight >> config.TEXTURE_DOWNSAMPLE
	);

	// Automatic splats
	splatStack.push(1);
	if (splatStack.length > 0) {
		for (let m = 0; m < splatStack.pop(); m++) {
			const color = [colorArr[0] * 0.05, colorArr[1] * 0.05, colorArr[2] * 0.05];
			const x = canvas.value.width * Math.random();
			const y = canvas.value.height * Math.random();
			const dx = 1000 * (Math.random() - 0.5);
			const dy = 1000 * (Math.random() - 0.5);
			splat(x, y, dx, dy, color);
		}
	}

	advectionProgram.bind();
	gl.uniform2f(
		advectionProgram.uniforms.texelSize,
		1.0 / (gl.drawingBufferWidth >> config.TEXTURE_DOWNSAMPLE),
		1.0 / (gl.drawingBufferHeight >> config.TEXTURE_DOWNSAMPLE)
	);
	gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.first[2]);
	gl.uniform1i(advectionProgram.uniforms.uSource, velocity.first[2]);
	gl.uniform1f(advectionProgram.uniforms.dt, dt);
	gl.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION);
	blit(velocity.second[1]);
	velocity.swap();

	gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.first[2]);
	gl.uniform1i(advectionProgram.uniforms.uSource, density.first[2]);
	gl.uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION);
	blit(density.second[1]);
	density.swap();

	for (let i = 0, len = pointers.length; i < len; i++) {
		const pointer = pointers[i];
		if (pointer.moved) {
			splat(pointer.x, pointer.y, pointer.dx, pointer.dy, pointer.color);
			pointer.moved = false;
		}
	}

	curlProgram.bind();
	gl.uniform2f(
		curlProgram.uniforms.texelSize,
		1.0 / (gl.drawingBufferWidth >> config.TEXTURE_DOWNSAMPLE),
		1.0 / (gl.drawingBufferHeight >> config.TEXTURE_DOWNSAMPLE)
	);
	gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.first[2]);
	blit(curl[1]);

	vorticityProgram.bind();
	gl.uniform2f(
		vorticityProgram.uniforms.texelSize,
		1.0 / (gl.drawingBufferWidth >> config.TEXTURE_DOWNSAMPLE),
		1.0 / (gl.drawingBufferHeight >> config.TEXTURE_DOWNSAMPLE)
	);
	gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.first[2]);
	gl.uniform1i(vorticityProgram.uniforms.uCurl, curl[2]);
	gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
	gl.uniform1f(vorticityProgram.uniforms.dt, dt);
	blit(velocity.second[1]);
	velocity.swap();

	divergenceProgram.bind();
	gl.uniform2f(
		divergenceProgram.uniforms.texelSize,
		1.0 / (gl.drawingBufferWidth >> config.TEXTURE_DOWNSAMPLE),
		1.0 / (gl.drawingBufferHeight >> config.TEXTURE_DOWNSAMPLE)
	);
	gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.first[2]);
	blit(divergence[1]);

	clearProgram.bind();
	let pressureTexId = pressure.first[2];
	gl.activeTexture(gl.TEXTURE0 + pressureTexId);
	gl.bindTexture(gl.TEXTURE_2D, pressure.first[0]);
	gl.uniform1i(clearProgram.uniforms.uTexture, pressureTexId);
	gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE_DISSIPATION);
	blit(pressure.second[1]);
	pressure.swap();

	pressureProgram.bind();
	gl.uniform2f(
		pressureProgram.uniforms.texelSize,
		1.0 / (gl.drawingBufferWidth >> config.TEXTURE_DOWNSAMPLE),
		1.0 / (gl.drawingBufferHeight >> config.TEXTURE_DOWNSAMPLE)
	);
	gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence[2]);
	pressureTexId = pressure.first[2];
	gl.activeTexture(gl.TEXTURE0 + pressureTexId);
	for (let _i = 0; _i < config.PRESSURE_ITERATIONS; _i++) {
		gl.bindTexture(gl.TEXTURE_2D, pressure.first[0]);
		gl.uniform1i(pressureProgram.uniforms.uPressure, pressureTexId);
		blit(pressure.second[1]);
		pressure.swap();
	}

	gradienSubtractProgram.bind();
	gl.uniform2f(
		gradienSubtractProgram.uniforms.texelSize,
		1.0 / (gl.drawingBufferWidth >> config.TEXTURE_DOWNSAMPLE),
		1.0 / (gl.drawingBufferHeight >> config.TEXTURE_DOWNSAMPLE)
	);
	gl.uniform1i(gradienSubtractProgram.uniforms.uPressure, pressure.first[2]);
	gl.uniform1i(gradienSubtractProgram.uniforms.uVelocity, velocity.first[2]);
	blit(velocity.second[1]);
	velocity.swap();

	gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
	displayProgram.bind();
	gl.uniform1i(displayProgram.uniforms.uTexture, density.first[2]);
	gl.uniform3f(displayProgram.uniforms.tintColor, tintColor[0], tintColor[1], tintColor[2]);
	blit(null);

	animationFrameId = requestAnimationFrame(update);
}

onMounted(() => {
	const canvasEl = canvas.value;
	canvasEl.width = canvasEl.clientWidth;
	canvasEl.height = canvasEl.clientHeight;

	config = {
		TEXTURE_DOWNSAMPLE: 1,
		DENSITY_DISSIPATION: 0.98,
		VELOCITY_DISSIPATION: 0.99,
		PRESSURE_DISSIPATION: 0.8,
		PRESSURE_ITERATIONS: 25,
		CURL: 30,
		SPLAT_RADIUS: 0.0005,
	};

	const webglContext = getWebGLContext(canvasEl);
	gl = webglContext.gl;
	ext = webglContext.ext;
	support_linear_float = webglContext.support_linear_float;

	const baseVertexShaderCompiled = compileShader(gl.VERTEX_SHADER, baseVertexShader);
	clearProgram = new GLProgram(
		baseVertexShaderCompiled,
		compileShader(gl.FRAGMENT_SHADER, clearShader)
	);
	displayProgram = new GLProgram(
		baseVertexShaderCompiled,
		compileShader(gl.FRAGMENT_SHADER, displayShader)
	);
	splatProgram = new GLProgram(
		baseVertexShaderCompiled,
		compileShader(gl.FRAGMENT_SHADER, splatShader)
	);
	advectionProgram = new GLProgram(
		baseVertexShaderCompiled,
		compileShader(
			gl.FRAGMENT_SHADER,
			support_linear_float ? advectionShader : advectionManualFilteringShader
		)
	);
	divergenceProgram = new GLProgram(
		baseVertexShaderCompiled,
		compileShader(gl.FRAGMENT_SHADER, divergenceShader)
	);
	curlProgram = new GLProgram(
		baseVertexShaderCompiled,
		compileShader(gl.FRAGMENT_SHADER, curlShader)
	);
	vorticityProgram = new GLProgram(
		baseVertexShaderCompiled,
		compileShader(gl.FRAGMENT_SHADER, vorticityShader)
	);
	pressureProgram = new GLProgram(
		baseVertexShaderCompiled,
		compileShader(gl.FRAGMENT_SHADER, pressureShader)
	);
	gradienSubtractProgram = new GLProgram(
		baseVertexShaderCompiled,
		compileShader(gl.FRAGMENT_SHADER, gradientSubtractShader)
	);

	initPointers();
	initBlit();
	initFramebuffers();
	lastTime = Date.now();
	update();
});

onUnmounted(() => {
	if (animationFrameId) {
		cancelAnimationFrame(animationFrameId);
	}
});
</script>

<style scoped>
canvas {
	display: block;
	width: 100vw;
	height: calc(100dvh - 3rem);
}
</style>
