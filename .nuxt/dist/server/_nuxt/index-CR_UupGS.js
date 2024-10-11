import { useSSRContext, mergeProps, ref, computed, watch, defineComponent, provide, createElementBlock, withCtx, openBlock, createBlock, createVNode, createTextVNode } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderSlot, ssrInterpolate, ssrRenderComponent, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderAttr } from "vue/server-renderer";
import "hookable";
import { _ as _export_sfc } from "../server.mjs";
import { _ as __nuxt_component_0$2 } from "./nuxt-link-D8l6UXby.js";
import { publicAssetsURL } from "#internal/nuxt/paths";
import "ofetch";
import "unctx";
import "h3";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "radix3";
import "defu";
import "ufo";
const _sfc_main$5 = {
  __name: "ParticleCanvas",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "particle-canvas__wrapper" }, _attrs))}><div id="particle-canvas"></div></div>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UI/ParticleCanvas.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const intervalError = "[nuxt] `setInterval` should not be used on the server. Consider wrapping it with an `onNuxtReady`, `onBeforeMount` or `onMounted` lifecycle hook, or ensure you only call it in the browser by checking `false`.";
const setInterval = () => {
  console.error(intervalError);
};
const _sfc_main$4 = {
  name: "CircleProgress",
  props: {
    size: {
      type: Number,
      default: 180
    },
    borderWidth: {
      type: Number,
      default: 15
    },
    borderBgWidth: {
      type: Number,
      default: 15
    },
    fillColor: {
      type: String,
      default: "#288feb"
    },
    contentColor: { type: String, default: "#cacace" },
    emptyColor: {
      type: String,
      default: "#dddddd"
    },
    percent: {
      type: Number,
      default: 50
    },
    linecap: {
      type: String,
      default: "round"
    },
    transition: {
      type: Number,
      default: 400
    },
    showPercent: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const circleRadiusBg = () => {
      let value = (props.size - props.borderBgWidth) * 0.5;
      if (props.borderWidth > props.borderBgWidth) {
        value -= (props.borderWidth - props.borderBgWidth) * 0.5;
      }
      return value;
    };
    const circleRadiusFg = () => {
      let value = (props.size - props.borderWidth) * 0.5;
      if (props.borderBgWidth > props.borderWidth) {
        value -= (props.borderBgWidth - props.borderWidth) * 0.5;
      }
      return value;
    };
    const circumference = 2 * Math.PI * circleRadiusFg();
    const offset = ref(circumference);
    const currentPercent = ref(0);
    const wrapStyle = {
      height: props.size + "px",
      width: props.size + "px",
      position: "relative"
    };
    const wrapAttr = {
      class: props.class,
      style: wrapStyle
    };
    const svgAttr = {
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      height: props.size,
      width: props.size
    };
    const cx = props.size / 2;
    const cy = props.size / 2;
    const circleBgAttr = {
      cx,
      cy,
      r: circleRadiusBg(),
      fill: "none",
      stroke: props.emptyColor,
      "stroke-width": props.borderBgWidth
    };
    const circleFgAttr = computed(() => ({
      cx,
      cy,
      r: circleRadiusFg(),
      fill: "none",
      stroke: props.fillColor,
      "stroke-width": props.borderWidth,
      "stroke-dasharray": circumference,
      "stroke-dashoffset": offset.value,
      "stroke-linecap": props.linecap,
      ...props.transition && {
        style: {
          transition: `stroke-dashoffset ${props.transition}ms ease`
        }
      }
    }));
    function updatePercent() {
      const percent = Math.round(props.percent);
      animateValue(percent);
    }
    function animateValue(to) {
      const step = to - currentPercent.value;
      props.transition / Math.abs(step);
      setInterval();
    }
    watch(
      () => props.percent,
      () => {
        updatePercent();
      }
    );
    return {
      svgAttr,
      circumference,
      currentPercent,
      circleBgAttr,
      circleFgAttr,
      wrapAttr
    };
  }
};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "vue-circle-progress" }, $setup.wrapAttr, _attrs))} data-v-1a47094b><svg${ssrRenderAttrs(mergeProps($setup.svgAttr, { class: "svg-wrapper" }))} data-v-1a47094b><circle${ssrRenderAttrs($setup.circleBgAttr)} data-v-1a47094b></circle><circle${ssrRenderAttrs($setup.circleFgAttr)} data-v-1a47094b></circle></svg>`);
  if ($props.showPercent) {
    _push(`<div class="current-percent" style="${ssrRenderStyle({ color: $props.fillColor })}" data-v-1a47094b>`);
    if (_ctx.$slots.content) {
      ssrRenderSlot(_ctx.$slots, "content", { percent: $setup.currentPercent }, null, _push, _parent);
    } else {
      _push(`<span style="${ssrRenderStyle({ color: $props.contentColor })}" data-v-1a47094b>${ssrInterpolate($setup.currentPercent)}%</span>`);
    }
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UI/CircleProgress.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$4], ["__scopeId", "data-v-1a47094b"]]);
const _sfc_main$3 = {
  props: {
    targetProgress: {
      type: Number,
      required: true
    },
    label: { type: String, default: null }
  },
  data() {
    return {
      progressBarWidth: "0%",
      currentProgress: 0
    };
  },
  mounted() {
    this.initializeProgressBar();
  },
  methods: {
    initializeProgressBar() {
      this.$refs.progressLabel;
      setInterval();
    }
  }
};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "progress-container" }, _attrs))} data-v-c83b2a8c><div class="progress__title" data-v-c83b2a8c><p data-v-c83b2a8c>${ssrInterpolate($props.label)}</p><p data-v-c83b2a8c>${ssrInterpolate($data.currentProgress)}%</p></div><div class="progress-bar__wrapper" data-v-c83b2a8c><div class="progress-bar__line" style="${ssrRenderStyle({ width: $data.progressBarWidth })}" data-v-c83b2a8c></div></div></div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UI/ProgressBar.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3], ["__scopeId", "data-v-c83b2a8c"]]);
const clientOnlySymbol = Symbol.for("nuxt:client-only");
const __nuxt_component_0 = defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(_, { slots, attrs }) {
    const mounted = ref(false);
    provide(clientOnlySymbol, true);
    return (props) => {
      var _a;
      if (mounted.value) {
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return slot();
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const _sfc_main$2 = {
  name: "DialogModal",
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    animation: {
      type: String,
      default: "slide"
    },
    animationSlideDirection: {
      type: String,
      default: "right"
    }
  },
  watch: {
    modelValue: {
      handler() {
        const bodyOverflow = (void 0).body.style.overflow;
        (void 0).body.style.overflow = bodyOverflow === "hidden" ? "" : "hidden";
      }
    }
  },
  computed: {
    classTransition() {
      return { ["slide__" + this.animationSlideDirection]: true };
    }
  },
  methods: {
    close() {
      this.$emit("update:modelValue", false);
    },
    closeNative(e) {
      if (e.currentTarget === e.target) {
        this.close();
      }
    }
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ClientOnly = __nuxt_component_0;
  _push(ssrRenderComponent(_component_ClientOnly, _attrs, {}, _parent));
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UI/DialogModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-5916d2d0"]]);
const _imports_0 = publicAssetsURL("/images/thinking.webp");
const _sfc_main$1 = {
  name: "Sidebar",
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      birthDate: "1985-03-27",
      isShowCertificate: false,
      docPath: null
    };
  },
  computed: {
    age() {
      const currentDate = /* @__PURE__ */ new Date();
      const birthDateTime = new Date(this.birthDate);
      let age = currentDate.getFullYear() - birthDateTime.getFullYear();
      if (currentDate.getMonth() < birthDateTime.getMonth() || currentDate.getMonth() === birthDateTime.getMonth() && currentDate.getDate() < birthDateTime.getDate()) {
        age--;
      }
      return age;
    },
    isHidden() {
      return {
        aside__hidden: !this.modelValue
      };
    }
  },
  methods: {
    showCertificate(docName) {
      this.isShowCertificate = true;
      this.docPath = docName;
    },
    toggle() {
      this.$emit("update:modelValue", !this.modelValue);
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_CircleProgress = __nuxt_component_0$1;
  const _component_ProgressBar = __nuxt_component_1$1;
  const _component_NuxtLink = __nuxt_component_0$2;
  const _component_DialogModal = __nuxt_component_3;
  _push(`<aside${ssrRenderAttrs(mergeProps({ class: "aside" }, _attrs))} data-v-73d2693d><div class="${ssrRenderClass(["aside__toggle", $options.isHidden])}" data-v-73d2693d><input${ssrIncludeBooleanAttr($props.modelValue) ? " checked" : ""} id="chackboxAside" type="checkbox" data-v-73d2693d><label for="chackboxAside" data-v-73d2693d></label></div><div class="aside__container" data-v-73d2693d><figure class="aside__avatar" data-v-73d2693d><img${ssrRenderAttr("src", _imports_0)} alt="Lang Eugen avatar" class="aside__image" data-v-73d2693d><figcaption class="aside__figcaption" data-v-73d2693d> Lang Eugen <p class="aside__position" data-v-73d2693d>Front-end developer</p></figcaption></figure><section class="aside__scrollable" data-v-73d2693d><ul class="aside__info" data-v-73d2693d><li class="info__item" data-v-73d2693d><h6 data-v-73d2693d>Residence:</h6><span data-v-73d2693d>Ukraine</span></li><li class="info__item" data-v-73d2693d><h6 data-v-73d2693d>City:</h6><span data-v-73d2693d>Odesa</span></li><li class="info__item" data-v-73d2693d><h6 data-v-73d2693d>Age:</h6><span data-v-73d2693d>${ssrInterpolate($options.age)}</span></li></ul><div class="aside__languages" data-v-73d2693d><div data-v-73d2693d>`);
  _push(ssrRenderComponent(_component_CircleProgress, {
    "show-percent": true,
    percent: 100,
    size: 60,
    borderBgWidth: 2,
    borderWidth: 2,
    "fill-color": "#48abed",
    emptyColor: "#191923"
  }, null, _parent));
  _push(`<span class="aside__language" data-v-73d2693d>Ukranian</span></div><div data-v-73d2693d>`);
  _push(ssrRenderComponent(_component_CircleProgress, {
    "show-percent": true,
    percent: 55,
    size: 60,
    borderBgWidth: 2,
    borderWidth: 2,
    "fill-color": "#48abed",
    emptyColor: "#191923"
  }, null, _parent));
  _push(`<span class="aside__language" data-v-73d2693d>English</span></div><div data-v-73d2693d>`);
  _push(ssrRenderComponent(_component_CircleProgress, {
    "show-percent": true,
    percent: 45,
    size: 60,
    borderBgWidth: 2,
    borderWidth: 2,
    "fill-color": "#48abed",
    emptyColor: "#191923"
  }, null, _parent));
  _push(`<span class="aside__language" data-v-73d2693d>German</span></div><div data-v-73d2693d>`);
  _push(ssrRenderComponent(_component_CircleProgress, {
    "show-percent": true,
    percent: 39,
    size: 60,
    borderBgWidth: 2,
    borderWidth: 2,
    "fill-color": "#48abed",
    emptyColor: "#191923"
  }, null, _parent));
  _push(`<span class="aside__language" data-v-73d2693d>Italian</span></div></div><div class="aside__skills" data-v-73d2693d>`);
  _push(ssrRenderComponent(_component_ProgressBar, {
    label: "Html",
    targetProgress: 100
  }, null, _parent));
  _push(ssrRenderComponent(_component_ProgressBar, {
    label: "Css",
    targetProgress: 100
  }, null, _parent));
  _push(ssrRenderComponent(_component_ProgressBar, {
    label: "Js",
    targetProgress: 75
  }, null, _parent));
  _push(ssrRenderComponent(_component_ProgressBar, {
    label: "Php",
    targetProgress: 45
  }, null, _parent));
  _push(ssrRenderComponent(_component_ProgressBar, {
    label: "Wordpress",
    targetProgress: 56
  }, null, _parent));
  _push(ssrRenderComponent(_component_ProgressBar, {
    label: "Nuxt",
    targetProgress: 100
  }, null, _parent));
  _push(ssrRenderComponent(_component_ProgressBar, {
    label: "React Native",
    targetProgress: 100
  }, null, _parent));
  _push(`</div><ul class="aside__technologies" data-v-73d2693d><li data-v-73d2693d>Bootstrap, Vuetify</li><li data-v-73d2693d>Sass, SCSS</li><li data-v-73d2693d>Webpack, Vite</li><li data-v-73d2693d>GIT knowledge</li><li data-v-73d2693d>Android Studio, Xcode</li></ul><div class="aside__certificates" data-v-73d2693d><h6 data-v-73d2693d>Certificates:</h6><div class="aside__btns" data-v-73d2693d><button class="aside__btn" data-v-73d2693d> Basic </button><button class="aside__btn" data-v-73d2693d>Pro</button><button class="aside__btn" data-v-73d2693d> Advance </button></div></div></section><nav class="aside__footer" data-v-73d2693d><ul data-v-73d2693d><li data-v-73d2693d>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    href: "https://www.facebook.com/Evgenyyyi",
    external: "",
    target: "_blank"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="15" height="15" viewBox="0 0 24 23" version="1.1" class="aside__social" data-v-73d2693d${_scopeId}><g id="surface1" data-v-73d2693d${_scopeId}><path style="${ssrRenderStyle({ "stroke": "none", "fill-rule": "nonzero", "fill": "rgb(3.137255%, 40%, 100%)", "fill-opacity": "1" })}" d="M 23.988281 11.496094 C 23.988281 5.144531 18.617188 0 11.992188 0 C 5.371094 0 0 5.144531 0 11.496094 C 0 16.886719 3.871094 21.40625 9.097656 22.648438 L 9.097656 15.007812 L 6.625 15.007812 L 6.625 11.496094 L 9.097656 11.496094 L 9.097656 9.980469 C 9.097656 6.070312 10.945312 4.253906 14.953125 4.253906 C 15.710938 4.253906 17.023438 4.398438 17.558594 4.539062 L 17.558594 7.726562 C 17.277344 7.695312 16.785156 7.683594 16.171875 7.683594 C 14.207031 7.683594 13.445312 8.394531 13.445312 10.253906 L 13.445312 11.496094 L 17.363281 11.496094 L 16.691406 15.007812 L 13.445312 15.007812 L 13.445312 22.90625 C 19.386719 22.21875 23.988281 17.371094 23.988281 11.496094 " data-v-73d2693d${_scopeId}></path><path style="${ssrRenderStyle({ "stroke": "none", "fill-rule": "nonzero", "fill": "rgb(100%, 100%, 100%)", "fill-opacity": "1" })}" d="M 16.691406 15.007812 L 17.363281 11.496094 L 13.445312 11.496094 L 13.445312 10.253906 C 13.445312 8.394531 14.207031 7.683594 16.171875 7.683594 C 16.785156 7.683594 17.277344 7.695312 17.558594 7.726562 L 17.558594 4.539062 C 17.023438 4.398438 15.710938 4.253906 14.953125 4.253906 C 10.945312 4.253906 9.097656 6.070312 9.097656 9.980469 L 9.097656 11.496094 L 6.625 11.496094 L 6.625 15.007812 L 9.097656 15.007812 L 9.097656 22.648438 C 10.023438 22.871094 10.996094 22.988281 11.992188 22.988281 C 12.484375 22.988281 12.96875 22.960938 13.445312 22.90625 L 13.445312 15.007812 Z M 16.691406 15.007812 " data-v-73d2693d${_scopeId}></path></g></svg>`);
      } else {
        return [
          (openBlock(), createBlock("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            "xmlns:xlink": "http://www.w3.org/1999/xlink",
            width: "15",
            height: "15",
            viewBox: "0 0 24 23",
            version: "1.1",
            class: "aside__social"
          }, [
            createVNode("g", { id: "surface1" }, [
              createVNode("path", {
                style: { "stroke": "none", "fill-rule": "nonzero", "fill": "rgb(3.137255%, 40%, 100%)", "fill-opacity": "1" },
                d: "M 23.988281 11.496094 C 23.988281 5.144531 18.617188 0 11.992188 0 C 5.371094 0 0 5.144531 0 11.496094 C 0 16.886719 3.871094 21.40625 9.097656 22.648438 L 9.097656 15.007812 L 6.625 15.007812 L 6.625 11.496094 L 9.097656 11.496094 L 9.097656 9.980469 C 9.097656 6.070312 10.945312 4.253906 14.953125 4.253906 C 15.710938 4.253906 17.023438 4.398438 17.558594 4.539062 L 17.558594 7.726562 C 17.277344 7.695312 16.785156 7.683594 16.171875 7.683594 C 14.207031 7.683594 13.445312 8.394531 13.445312 10.253906 L 13.445312 11.496094 L 17.363281 11.496094 L 16.691406 15.007812 L 13.445312 15.007812 L 13.445312 22.90625 C 19.386719 22.21875 23.988281 17.371094 23.988281 11.496094 "
              }),
              createVNode("path", {
                style: { "stroke": "none", "fill-rule": "nonzero", "fill": "rgb(100%, 100%, 100%)", "fill-opacity": "1" },
                d: "M 16.691406 15.007812 L 17.363281 11.496094 L 13.445312 11.496094 L 13.445312 10.253906 C 13.445312 8.394531 14.207031 7.683594 16.171875 7.683594 C 16.785156 7.683594 17.277344 7.695312 17.558594 7.726562 L 17.558594 4.539062 C 17.023438 4.398438 15.710938 4.253906 14.953125 4.253906 C 10.945312 4.253906 9.097656 6.070312 9.097656 9.980469 L 9.097656 11.496094 L 6.625 11.496094 L 6.625 15.007812 L 9.097656 15.007812 L 9.097656 22.648438 C 10.023438 22.871094 10.996094 22.988281 11.992188 22.988281 C 12.484375 22.988281 12.96875 22.960938 13.445312 22.90625 L 13.445312 15.007812 Z M 16.691406 15.007812 "
              })
            ])
          ]))
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li data-v-73d2693d>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    href: "https://www.linkedin.com/in/eugen-lang-18475b143/",
    external: "",
    target: "_blank"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<svg height="15" viewBox="0 0 72 72" width="15" class="aside__social" xmlns="http://www.w3.org/2000/svg" data-v-73d2693d${_scopeId}><g fill="none" fill-rule="evenodd" data-v-73d2693d${_scopeId}><path d="M8,72 L64,72 C68.418278,72 72,68.418278 72,64 L72,8 C72,3.581722 68.418278,-8.11624501e-16 64,0 L8,0 C3.581722,8.11624501e-16 -5.41083001e-16,3.581722 0,8 L0,64 C5.41083001e-16,68.418278 3.581722,72 8,72 Z" fill="#007EBB" data-v-73d2693d${_scopeId}></path><path d="M62,62 L51.315625,62 L51.315625,43.8021149 C51.315625,38.8127542 49.4197917,36.0245323 45.4707031,36.0245323 C41.1746094,36.0245323 38.9300781,38.9261103 38.9300781,43.8021149 L38.9300781,62 L28.6333333,62 L28.6333333,27.3333333 L38.9300781,27.3333333 L38.9300781,32.0029283 C38.9300781,32.0029283 42.0260417,26.2742151 49.3825521,26.2742151 C56.7356771,26.2742151 62,30.7644705 62,40.051212 L62,62 Z M16.349349,22.7940133 C12.8420573,22.7940133 10,19.9296567 10,16.3970067 C10,12.8643566 12.8420573,10 16.349349,10 C19.8566406,10 22.6970052,12.8643566 22.6970052,16.3970067 C22.6970052,19.9296567 19.8566406,22.7940133 16.349349,22.7940133 Z M11.0325521,62 L21.769401,62 L21.769401,27.3333333 L11.0325521,27.3333333 L11.0325521,62 Z" fill="#FFF" data-v-73d2693d${_scopeId}></path></g></svg>`);
      } else {
        return [
          (openBlock(), createBlock("svg", {
            height: "15",
            viewBox: "0 0 72 72",
            width: "15",
            class: "aside__social",
            xmlns: "http://www.w3.org/2000/svg"
          }, [
            createVNode("g", {
              fill: "none",
              "fill-rule": "evenodd"
            }, [
              createVNode("path", {
                d: "M8,72 L64,72 C68.418278,72 72,68.418278 72,64 L72,8 C72,3.581722 68.418278,-8.11624501e-16 64,0 L8,0 C3.581722,8.11624501e-16 -5.41083001e-16,3.581722 0,8 L0,64 C5.41083001e-16,68.418278 3.581722,72 8,72 Z",
                fill: "#007EBB"
              }),
              createVNode("path", {
                d: "M62,62 L51.315625,62 L51.315625,43.8021149 C51.315625,38.8127542 49.4197917,36.0245323 45.4707031,36.0245323 C41.1746094,36.0245323 38.9300781,38.9261103 38.9300781,43.8021149 L38.9300781,62 L28.6333333,62 L28.6333333,27.3333333 L38.9300781,27.3333333 L38.9300781,32.0029283 C38.9300781,32.0029283 42.0260417,26.2742151 49.3825521,26.2742151 C56.7356771,26.2742151 62,30.7644705 62,40.051212 L62,62 Z M16.349349,22.7940133 C12.8420573,22.7940133 10,19.9296567 10,16.3970067 C10,12.8643566 12.8420573,10 16.349349,10 C19.8566406,10 22.6970052,12.8643566 22.6970052,16.3970067 C22.6970052,19.9296567 19.8566406,22.7940133 16.349349,22.7940133 Z M11.0325521,62 L21.769401,62 L21.769401,27.3333333 L11.0325521,27.3333333 L11.0325521,62 Z",
                fill: "#FFF"
              })
            ])
          ]))
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li data-v-73d2693d>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "https://github.com/sayanseliv",
    external: "",
    target: "_blank"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFF" width="15" height="15" class="aside__social" data-v-73d2693d${_scopeId}><path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.11.82-.262.82-.58 0-.288-.01-1.044-.015-2.05-3.338.724-4.042-1.61-4.042-1.61C4.46 18.46 3.68 18 3.68 18c-1.122-.766.086-.75.086-.75 1.242.086 1.896 1.28 1.896 1.28 1.104 1.895 2.902 1.344 3.62 1.026.112-.794.43-1.344.783-1.654-2.74-.31-5.606-1.37-5.606-6.1 0-1.348.48-2.448 1.28-3.307-.128-.31-.556-1.566.122-3.26 0 0 1.035-.33 3.4 1.26a11.61 11.61 0 0 1 3.06-.41c1.036.007 2.08.138 3.06.41 2.363-1.593 3.4-1.26 3.4-1.26.678 1.694.25 2.95.122 3.26.795.86 1.278 1.96 1.278 3.307 0 4.738-2.87 5.786-5.625 6.086.443.38.834 1.13.834 2.274 0 1.642-.015 2.96-.015 3.365 0 .32.216.696.825.577C20.565 21.798 24 17.303 24 12c0-6.627-5.373-12-12-12z" data-v-73d2693d${_scopeId}></path></svg>`);
      } else {
        return [
          (openBlock(), createBlock("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            fill: "#FFF",
            width: "15",
            height: "15",
            class: "aside__social"
          }, [
            createVNode("path", { d: "M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.11.82-.262.82-.58 0-.288-.01-1.044-.015-2.05-3.338.724-4.042-1.61-4.042-1.61C4.46 18.46 3.68 18 3.68 18c-1.122-.766.086-.75.086-.75 1.242.086 1.896 1.28 1.896 1.28 1.104 1.895 2.902 1.344 3.62 1.026.112-.794.43-1.344.783-1.654-2.74-.31-5.606-1.37-5.606-6.1 0-1.348.48-2.448 1.28-3.307-.128-.31-.556-1.566.122-3.26 0 0 1.035-.33 3.4 1.26a11.61 11.61 0 0 1 3.06-.41c1.036.007 2.08.138 3.06.41 2.363-1.593 3.4-1.26 3.4-1.26.678 1.694.25 2.95.122 3.26.795.86 1.278 1.96 1.278 3.307 0 4.738-2.87 5.786-5.625 6.086.443.38.834 1.13.834 2.274 0 1.642-.015 2.96-.015 3.365 0 .32.216.696.825.577C20.565 21.798 24 17.303 24 12c0-6.627-5.373-12-12-12z" })
          ]))
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li></ul></nav></div>`);
  _push(ssrRenderComponent(_component_DialogModal, {
    modelValue: $data.isShowCertificate,
    "onUpdate:modelValue": ($event) => $data.isShowCertificate = $event,
    animation: "fade"
  }, {
    default: withCtx(({ onClose }, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<figure class="aside__document-wrapper" data-v-73d2693d${_scopeId}><img class="aside__document"${ssrRenderAttr("src", "/certificates/" + $data.docPath)} data-v-73d2693d${_scopeId}></figure>`);
      } else {
        return [
          createVNode("figure", {
            onClick: onClose,
            class: "aside__document-wrapper"
          }, [
            createVNode("img", {
              class: "aside__document",
              src: "/certificates/" + $data.docPath
            }, null, 8, ["src"])
          ], 8, ["onClick"])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</aside>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UI/Sidebar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-73d2693d"]]);
const _sfc_main = {
  name: "mainPage",
  data() {
    return {
      isShowSidebar: false
    };
  },
  mounted() {
  },
  methods: {}
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ParticleCanvas = _sfc_main$5;
  const _component_Sidebar = __nuxt_component_1;
  const _component_NuxtLink = __nuxt_component_0$2;
  _push(`<main${ssrRenderAttrs(mergeProps({ class: "main-home" }, _attrs))} data-v-92840e8d>`);
  _push(ssrRenderComponent(_component_ParticleCanvas, null, null, _parent));
  _push(`<div class="container-1440 home__container" data-v-92840e8d>`);
  _push(ssrRenderComponent(_component_Sidebar, {
    modelValue: $data.isShowSidebar,
    "onUpdate:modelValue": ($event) => $data.isShowSidebar = $event
  }, null, _parent));
  _push(`<div class="home__content" data-v-92840e8d><section class="content__hero" data-v-92840e8d><div class="hero__text-bg" data-v-92840e8d><h1 class="hero__title" data-v-92840e8d>Welcome to Lang Eugen&#39;s Digital Space</h1><p class="hero__description" data-v-92840e8d> Explore a portfolio showcasing Lang&#39;s expertise in HTML, CSS, JavaScript, and popular front-end frameworks like React and Vue.js. From responsive designs that adapt seamlessly to any device to interactive elements that engage users, Lang&#39;s work reflects a commitment to excellence and innovation. <br data-v-92840e8d><br data-v-92840e8d> Whether you&#39;re seeking a modern website for your business, an engaging web application, or advice on front-end development best practices, Lang Eugen is your trusted partner. Join the digital revolution and elevate your online presence with Lang Eugen&#39;s expertise. </p></div></section><section class="content__technologies" data-v-92840e8d><h2 class="technologies__title" data-v-92840e8d>Technologies</h2><div class="technologies__grid" data-v-92840e8d><div class="technologies__item" data-v-92840e8d><h6 data-v-92840e8d>HTML5</h6><p data-v-92840e8d> HTML5 serves as the foundation for structuring and presenting content on the web, offering enhanced semantics, multimedia support, and interactive elements. </p>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "https://en.wikipedia.org/wiki/HTML5",
    external: "",
    target: "_blank"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Learn more `);
      } else {
        return [
          createTextVNode(" Learn more ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="technologies__item" data-v-92840e8d><h6 data-v-92840e8d>CSS3</h6><p data-v-92840e8d> CSS3 plays a crucial role in styling and designing web pages, providing advanced layout options, animations, and responsive design capabilities for improved user interfaces. </p>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "https://en.wikipedia.org/wiki/CSS",
    external: "",
    target: "_blank"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Learn more `);
      } else {
        return [
          createTextVNode(" Learn more ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="technologies__item" data-v-92840e8d><h6 data-v-92840e8d>JavaScript</h6><p data-v-92840e8d> JavaScript is essential for adding dynamic functionality to web applications, enabling DOM manipulation, event handling, and asynchronous communication with servers. </p>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "https://en.wikipedia.org/wiki/JavaScript",
    external: "",
    target: "_blank"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Learn more `);
      } else {
        return [
          createTextVNode(" Learn more ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="technologies__item" data-v-92840e8d><h6 data-v-92840e8d>Nuxt 3</h6><p data-v-92840e8d> Nuxt 3 is a powerful framework built on Vue.js, used for creating modern and high-performance server-side rendered (SSR) and static websites with streamlined development workflows. </p>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "https://nuxt.com",
    external: "",
    target: "_blank"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Learn more `);
      } else {
        return [
          createTextVNode(" Learn more ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="technologies__item" data-v-92840e8d><h6 data-v-92840e8d>Vuetify 3</h6><p data-v-92840e8d> Vuetify 3 is a comprehensive UI library for Vue.js projects, offering pre-designed components, themes, and responsive design features to enhance user interfaces. </p>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "https://vuetifyjs.com/en",
    external: "",
    target: "_blank"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Learn more `);
      } else {
        return [
          createTextVNode(" Learn more ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="technologies__item" data-v-92840e8d><h6 data-v-92840e8d>React Native</h6><p data-v-92840e8d> React Native is utilized for developing cross-platform mobile applications using JavaScript and React, enabling efficient code sharing and native app experiences on iOS and Android. </p>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "https://en.wikipedia.org/wiki/React_Native",
    external: "",
    target: "_blank"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Learn more `);
      } else {
        return [
          createTextVNode(" Learn more ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="technologies__item" data-v-92840e8d><h6 data-v-92840e8d>WordPress</h6><p data-v-92840e8d> WordPress serves as a versatile platform for creating dynamic websites and blogs, providing customizable themes, plugins, and content management tools for easy publishing and management. </p>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "https://en.wikipedia.org/wiki/WordPress",
    external: "",
    target: "_blank"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Learn more `);
      } else {
        return [
          createTextVNode(" Learn more ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="technologies__item" data-v-92840e8d><h6 data-v-92840e8d>GitHub</h6><p data-v-92840e8d> GitHub plays a pivotal role in code collaboration and version control, facilitating efficient code management, collaboration among developers, and project tracking. </p>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "https://en.wikipedia.org/wiki/GitHub",
    external: "",
    target: "_blank"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Learn more `);
      } else {
        return [
          createTextVNode(" Learn more ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="technologies__item" data-v-92840e8d><h6 data-v-92840e8d>Vuex/Pinia</h6><p data-v-92840e8d> Vuex and Pinia are state management libraries for Vue.js, offering centralized state management, data sharing, and reactive updates to streamline application development and maintain data consistency. </p>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "https://www.telerik.com/blogs/vue-js-state-management-pinia-vs-vuex",
    external: "",
    target: "_blank"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Learn more `);
      } else {
        return [
          createTextVNode(" Learn more ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></section></div></div></main>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-92840e8d"]]);
export {
  index as default
};
//# sourceMappingURL=index-CR_UupGS.js.map
