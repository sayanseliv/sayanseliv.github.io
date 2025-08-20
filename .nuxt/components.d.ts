
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T extends DefineComponent> = T & DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>>
type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = (T & DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }>)
interface _GlobalComponents {
      'AnimatedBlock': typeof import("../components/AnimatedBlock.vue")['default']
    'AnimatedCircles': typeof import("../components/UI/AnimatedCircles.vue")['default']
    'CircleProgress': typeof import("../components/UI/CircleProgress.vue")['default']
    'ParticleCanvas': typeof import("../components/UI/ParticleCanvas.vue")['default']
    'ProgressBar': typeof import("../components/UI/ProgressBar.vue")['default']
    'TagCloud': typeof import("../components/UI/TagCloud.vue")['default']
    'CardFeature': typeof import("../components/cards/CardFeature.vue")['default']
    'CardPortfolio': typeof import("../components/cards/CardPortfolio.vue")['default']
    'CardTechnology': typeof import("../components/cards/CardTechnology.vue")['default']
    'CardTools': typeof import("../components/cards/CardTools.vue")['default']
    'AnimatedGrid': typeof import("../components/features/AnimatedGrid.vue")['default']
    'CanvasParticle': typeof import("../components/features/CanvasParticle.vue")['default']
    'EmojiSwitchingInterface': typeof import("../components/features/EmojiSwitchingInterface.vue")['default']
    'ModelThreeD': typeof import("../components/features/ModelThreeD.vue")['default']
    'PlatformerChaseGame': typeof import("../components/features/PlatformerChaseGame.vue")['default']
    'PureCssMorphing': typeof import("../components/features/PureCssMorphing.vue")['default']
    'ThreeDCar': typeof import("../components/features/ThreeDCar.vue")['default']
    'AppHeader': typeof import("../components/main/AppHeader.vue")['default']
    'AppModal': typeof import("../components/main/AppModal.vue")['default']
    'NuxtWelcome': typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'NuxtLayout': typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'NuxtErrorBoundary': typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']
    'ClientOnly': typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
    'DevOnly': typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
    'ServerPlaceholder': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'NuxtLink': typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'NuxtLoadingIndicator': typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'NuxtImg': typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
    'NuxtPicture': typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
    'Align': typeof import("@tresjs/cientos")['Align']
    'AnimatedSprite': typeof import("@tresjs/cientos")['AnimatedSprite']
    'Backdrop': typeof import("@tresjs/cientos")['Backdrop']
    'BakeShadows': typeof import("@tresjs/cientos")['BakeShadows']
    'BaseCameraControls': typeof import("@tresjs/cientos")['BaseCameraControls']
    'Billboard': typeof import("@tresjs/cientos")['Billboard']
    'Box': typeof import("@tresjs/cientos")['Box']
    'CameraControls': typeof import("@tresjs/cientos")['CameraControls']
    'CatmullRomCurve3': typeof import("@tresjs/cientos")['CatmullRomCurve3']
    'Circle': typeof import("@tresjs/cientos")['Circle']
    'Cone': typeof import("@tresjs/cientos")['Cone']
    'ContactShadows': typeof import("@tresjs/cientos")['ContactShadows']
    'CubeCamera': typeof import("@tresjs/cientos")['CubeCamera']
    'CustomShaderMaterial': typeof import("@tresjs/cientos")['CustomShaderMaterial']
    'Cylinder': typeof import("@tresjs/cientos")['Cylinder']
    'Dodecahedron': typeof import("@tresjs/cientos")['Dodecahedron']
    'Edges': typeof import("@tresjs/cientos")['Edges']
    'Environment': typeof import("@tresjs/cientos")['Environment']
    'FBXModel': typeof import("@tresjs/cientos")['FBXModel']
    'Fbo': typeof import("@tresjs/cientos")['Fbo']
    'Fit': typeof import("@tresjs/cientos")['Fit']
    'GLTFModel': typeof import("@tresjs/cientos")['GLTFModel']
    'GlobalAudio': typeof import("@tresjs/cientos")['GlobalAudio']
    'GradientTexture': typeof import("@tresjs/cientos")['GradientTexture']
    'Grid': typeof import("@tresjs/cientos")['Grid']
    'HolographicMaterial': typeof import("@tresjs/cientos")['HolographicMaterial']
    'Html': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
    'Icosahedron': typeof import("@tresjs/cientos")['Icosahedron']
    'Image': typeof import("@tresjs/cientos")['Image']
    'KeyboardControls': typeof import("@tresjs/cientos")['KeyboardControls']
    'Lensflare': typeof import("@tresjs/cientos")['Lensflare']
    'Levioso': typeof import("@tresjs/cientos")['Levioso']
    'Lightformer': typeof import("@tresjs/cientos")['Lightformer']
    'Line2': typeof import("@tresjs/cientos")['Line2']
    'MapControls': typeof import("@tresjs/cientos")['MapControls']
    'Mask': typeof import("@tresjs/cientos")['Mask']
    'MeshDiscardMaterial': typeof import("@tresjs/cientos")['MeshDiscardMaterial']
    'MeshGlassMaterial': typeof import("@tresjs/cientos")['MeshGlassMaterial']
    'MeshReflectionMaterial': typeof import("@tresjs/cientos")['MeshReflectionMaterial']
    'MeshWobbleMaterial': typeof import("@tresjs/cientos")['MeshWobbleMaterial']
    'MouseParallax': typeof import("@tresjs/cientos")['MouseParallax']
    'Ocean': typeof import("@tresjs/cientos")['Ocean']
    'Octahedron': typeof import("@tresjs/cientos")['Octahedron']
    'OrbitControls': typeof import("@tresjs/cientos")['OrbitControls']
    'Outline': typeof import("@tresjs/cientos")['Outline']
    'Plane': typeof import("@tresjs/cientos")['Plane']
    'PointerLockControls': typeof import("@tresjs/cientos")['PointerLockControls']
    'PositionalAudio': typeof import("@tresjs/cientos")['PositionalAudio']
    'Precipitation': typeof import("@tresjs/cientos")['Precipitation']
    'Reflector': typeof import("@tresjs/cientos")['Reflector']
    'Ring': typeof import("@tresjs/cientos")['Ring']
    'RoundedBox': typeof import("@tresjs/cientos")['RoundedBox']
    'SVG': typeof import("@tresjs/cientos")['SVG']
    'Sampler': typeof import("@tresjs/cientos")['Sampler']
    'ScreenSizer': typeof import("@tresjs/cientos")['ScreenSizer']
    'ScreenSpace': typeof import("@tresjs/cientos")['ScreenSpace']
    'ScrollControls': typeof import("@tresjs/cientos")['ScrollControls']
    'Sky': typeof import("@tresjs/cientos")['Sky']
    'Smoke': typeof import("@tresjs/cientos")['Smoke']
    'SoftShadows': typeof import("@tresjs/cientos")['SoftShadows']
    'Sparkles': typeof import("@tresjs/cientos")['Sparkles']
    'Sphere': typeof import("@tresjs/cientos")['Sphere']
    'Stars': typeof import("@tresjs/cientos")['Stars']
    'Stats': typeof import("@tresjs/cientos")['Stats']
    'StatsGl': typeof import("@tresjs/cientos")['StatsGl']
    'Superformula': typeof import("@tresjs/cientos")['Superformula']
    'Tetrahedron': typeof import("@tresjs/cientos")['Tetrahedron']
    'Text3D': typeof import("@tresjs/cientos")['Text3D']
    'Torus': typeof import("@tresjs/cientos")['Torus']
    'TorusKnot': typeof import("@tresjs/cientos")['TorusKnot']
    'TransformControls': typeof import("@tresjs/cientos")['TransformControls']
    'Tube': typeof import("@tresjs/cientos")['Tube']
    'TresCanvas': typeof import("../node_modules/@tresjs/nuxt/dist/runtime/TresCanvas.client.vue")['default']
    'TresCanvas': IslandComponent<typeof import("../node_modules/@tresjs/nuxt/dist/runtime/TresCanvas.server.vue")['default']>
    'NuxtPage': typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
    'NoScript': typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
    'Link': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
    'Base': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
    'Title': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
    'Meta': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
    'Style': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
    'Head': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
    'Body': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
    'NuxtIsland': typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
    'NuxtRouteAnnouncer': IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
      'LazyAnimatedBlock': LazyComponent<typeof import("../components/AnimatedBlock.vue")['default']>
    'LazyAnimatedCircles': LazyComponent<typeof import("../components/UI/AnimatedCircles.vue")['default']>
    'LazyCircleProgress': LazyComponent<typeof import("../components/UI/CircleProgress.vue")['default']>
    'LazyParticleCanvas': LazyComponent<typeof import("../components/UI/ParticleCanvas.vue")['default']>
    'LazyProgressBar': LazyComponent<typeof import("../components/UI/ProgressBar.vue")['default']>
    'LazyTagCloud': LazyComponent<typeof import("../components/UI/TagCloud.vue")['default']>
    'LazyCardFeature': LazyComponent<typeof import("../components/cards/CardFeature.vue")['default']>
    'LazyCardPortfolio': LazyComponent<typeof import("../components/cards/CardPortfolio.vue")['default']>
    'LazyCardTechnology': LazyComponent<typeof import("../components/cards/CardTechnology.vue")['default']>
    'LazyCardTools': LazyComponent<typeof import("../components/cards/CardTools.vue")['default']>
    'LazyAnimatedGrid': LazyComponent<typeof import("../components/features/AnimatedGrid.vue")['default']>
    'LazyCanvasParticle': LazyComponent<typeof import("../components/features/CanvasParticle.vue")['default']>
    'LazyEmojiSwitchingInterface': LazyComponent<typeof import("../components/features/EmojiSwitchingInterface.vue")['default']>
    'LazyModelThreeD': LazyComponent<typeof import("../components/features/ModelThreeD.vue")['default']>
    'LazyPlatformerChaseGame': LazyComponent<typeof import("../components/features/PlatformerChaseGame.vue")['default']>
    'LazyPureCssMorphing': LazyComponent<typeof import("../components/features/PureCssMorphing.vue")['default']>
    'LazyThreeDCar': LazyComponent<typeof import("../components/features/ThreeDCar.vue")['default']>
    'LazyAppHeader': LazyComponent<typeof import("../components/main/AppHeader.vue")['default']>
    'LazyAppModal': LazyComponent<typeof import("../components/main/AppModal.vue")['default']>
    'LazyNuxtWelcome': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
    'LazyNuxtLayout': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
    'LazyNuxtErrorBoundary': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']>
    'LazyClientOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
    'LazyDevOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
    'LazyServerPlaceholder': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'LazyNuxtLink': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
    'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
    'LazyNuxtImg': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
    'LazyNuxtPicture': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
    'LazyAlign': LazyComponent<typeof import("@tresjs/cientos")['Align']>
    'LazyAnimatedSprite': LazyComponent<typeof import("@tresjs/cientos")['AnimatedSprite']>
    'LazyBackdrop': LazyComponent<typeof import("@tresjs/cientos")['Backdrop']>
    'LazyBakeShadows': LazyComponent<typeof import("@tresjs/cientos")['BakeShadows']>
    'LazyBaseCameraControls': LazyComponent<typeof import("@tresjs/cientos")['BaseCameraControls']>
    'LazyBillboard': LazyComponent<typeof import("@tresjs/cientos")['Billboard']>
    'LazyBox': LazyComponent<typeof import("@tresjs/cientos")['Box']>
    'LazyCameraControls': LazyComponent<typeof import("@tresjs/cientos")['CameraControls']>
    'LazyCatmullRomCurve3': LazyComponent<typeof import("@tresjs/cientos")['CatmullRomCurve3']>
    'LazyCircle': LazyComponent<typeof import("@tresjs/cientos")['Circle']>
    'LazyCone': LazyComponent<typeof import("@tresjs/cientos")['Cone']>
    'LazyContactShadows': LazyComponent<typeof import("@tresjs/cientos")['ContactShadows']>
    'LazyCubeCamera': LazyComponent<typeof import("@tresjs/cientos")['CubeCamera']>
    'LazyCustomShaderMaterial': LazyComponent<typeof import("@tresjs/cientos")['CustomShaderMaterial']>
    'LazyCylinder': LazyComponent<typeof import("@tresjs/cientos")['Cylinder']>
    'LazyDodecahedron': LazyComponent<typeof import("@tresjs/cientos")['Dodecahedron']>
    'LazyEdges': LazyComponent<typeof import("@tresjs/cientos")['Edges']>
    'LazyEnvironment': LazyComponent<typeof import("@tresjs/cientos")['Environment']>
    'LazyFBXModel': LazyComponent<typeof import("@tresjs/cientos")['FBXModel']>
    'LazyFbo': LazyComponent<typeof import("@tresjs/cientos")['Fbo']>
    'LazyFit': LazyComponent<typeof import("@tresjs/cientos")['Fit']>
    'LazyGLTFModel': LazyComponent<typeof import("@tresjs/cientos")['GLTFModel']>
    'LazyGlobalAudio': LazyComponent<typeof import("@tresjs/cientos")['GlobalAudio']>
    'LazyGradientTexture': LazyComponent<typeof import("@tresjs/cientos")['GradientTexture']>
    'LazyGrid': LazyComponent<typeof import("@tresjs/cientos")['Grid']>
    'LazyHolographicMaterial': LazyComponent<typeof import("@tresjs/cientos")['HolographicMaterial']>
    'LazyHtml': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
    'LazyIcosahedron': LazyComponent<typeof import("@tresjs/cientos")['Icosahedron']>
    'LazyImage': LazyComponent<typeof import("@tresjs/cientos")['Image']>
    'LazyKeyboardControls': LazyComponent<typeof import("@tresjs/cientos")['KeyboardControls']>
    'LazyLensflare': LazyComponent<typeof import("@tresjs/cientos")['Lensflare']>
    'LazyLevioso': LazyComponent<typeof import("@tresjs/cientos")['Levioso']>
    'LazyLightformer': LazyComponent<typeof import("@tresjs/cientos")['Lightformer']>
    'LazyLine2': LazyComponent<typeof import("@tresjs/cientos")['Line2']>
    'LazyMapControls': LazyComponent<typeof import("@tresjs/cientos")['MapControls']>
    'LazyMask': LazyComponent<typeof import("@tresjs/cientos")['Mask']>
    'LazyMeshDiscardMaterial': LazyComponent<typeof import("@tresjs/cientos")['MeshDiscardMaterial']>
    'LazyMeshGlassMaterial': LazyComponent<typeof import("@tresjs/cientos")['MeshGlassMaterial']>
    'LazyMeshReflectionMaterial': LazyComponent<typeof import("@tresjs/cientos")['MeshReflectionMaterial']>
    'LazyMeshWobbleMaterial': LazyComponent<typeof import("@tresjs/cientos")['MeshWobbleMaterial']>
    'LazyMouseParallax': LazyComponent<typeof import("@tresjs/cientos")['MouseParallax']>
    'LazyOcean': LazyComponent<typeof import("@tresjs/cientos")['Ocean']>
    'LazyOctahedron': LazyComponent<typeof import("@tresjs/cientos")['Octahedron']>
    'LazyOrbitControls': LazyComponent<typeof import("@tresjs/cientos")['OrbitControls']>
    'LazyOutline': LazyComponent<typeof import("@tresjs/cientos")['Outline']>
    'LazyPlane': LazyComponent<typeof import("@tresjs/cientos")['Plane']>
    'LazyPointerLockControls': LazyComponent<typeof import("@tresjs/cientos")['PointerLockControls']>
    'LazyPositionalAudio': LazyComponent<typeof import("@tresjs/cientos")['PositionalAudio']>
    'LazyPrecipitation': LazyComponent<typeof import("@tresjs/cientos")['Precipitation']>
    'LazyReflector': LazyComponent<typeof import("@tresjs/cientos")['Reflector']>
    'LazyRing': LazyComponent<typeof import("@tresjs/cientos")['Ring']>
    'LazyRoundedBox': LazyComponent<typeof import("@tresjs/cientos")['RoundedBox']>
    'LazySVG': LazyComponent<typeof import("@tresjs/cientos")['SVG']>
    'LazySampler': LazyComponent<typeof import("@tresjs/cientos")['Sampler']>
    'LazyScreenSizer': LazyComponent<typeof import("@tresjs/cientos")['ScreenSizer']>
    'LazyScreenSpace': LazyComponent<typeof import("@tresjs/cientos")['ScreenSpace']>
    'LazyScrollControls': LazyComponent<typeof import("@tresjs/cientos")['ScrollControls']>
    'LazySky': LazyComponent<typeof import("@tresjs/cientos")['Sky']>
    'LazySmoke': LazyComponent<typeof import("@tresjs/cientos")['Smoke']>
    'LazySoftShadows': LazyComponent<typeof import("@tresjs/cientos")['SoftShadows']>
    'LazySparkles': LazyComponent<typeof import("@tresjs/cientos")['Sparkles']>
    'LazySphere': LazyComponent<typeof import("@tresjs/cientos")['Sphere']>
    'LazyStars': LazyComponent<typeof import("@tresjs/cientos")['Stars']>
    'LazyStats': LazyComponent<typeof import("@tresjs/cientos")['Stats']>
    'LazyStatsGl': LazyComponent<typeof import("@tresjs/cientos")['StatsGl']>
    'LazySuperformula': LazyComponent<typeof import("@tresjs/cientos")['Superformula']>
    'LazyTetrahedron': LazyComponent<typeof import("@tresjs/cientos")['Tetrahedron']>
    'LazyText3D': LazyComponent<typeof import("@tresjs/cientos")['Text3D']>
    'LazyTorus': LazyComponent<typeof import("@tresjs/cientos")['Torus']>
    'LazyTorusKnot': LazyComponent<typeof import("@tresjs/cientos")['TorusKnot']>
    'LazyTransformControls': LazyComponent<typeof import("@tresjs/cientos")['TransformControls']>
    'LazyTube': LazyComponent<typeof import("@tresjs/cientos")['Tube']>
    'LazyTresCanvas': LazyComponent<typeof import("../node_modules/@tresjs/nuxt/dist/runtime/TresCanvas.client.vue")['default']>
    'LazyTresCanvas': LazyComponent<IslandComponent<typeof import("../node_modules/@tresjs/nuxt/dist/runtime/TresCanvas.server.vue")['default']>>
    'LazyNuxtPage': LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
    'LazyNoScript': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
    'LazyLink': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
    'LazyBase': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
    'LazyTitle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
    'LazyMeta': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
    'LazyStyle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
    'LazyHead': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
    'LazyBody': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
    'LazyNuxtIsland': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export const AnimatedBlock: typeof import("../components/AnimatedBlock.vue")['default']
export const AnimatedCircles: typeof import("../components/UI/AnimatedCircles.vue")['default']
export const CircleProgress: typeof import("../components/UI/CircleProgress.vue")['default']
export const ParticleCanvas: typeof import("../components/UI/ParticleCanvas.vue")['default']
export const ProgressBar: typeof import("../components/UI/ProgressBar.vue")['default']
export const TagCloud: typeof import("../components/UI/TagCloud.vue")['default']
export const CardFeature: typeof import("../components/cards/CardFeature.vue")['default']
export const CardPortfolio: typeof import("../components/cards/CardPortfolio.vue")['default']
export const CardTechnology: typeof import("../components/cards/CardTechnology.vue")['default']
export const CardTools: typeof import("../components/cards/CardTools.vue")['default']
export const AnimatedGrid: typeof import("../components/features/AnimatedGrid.vue")['default']
export const CanvasParticle: typeof import("../components/features/CanvasParticle.vue")['default']
export const EmojiSwitchingInterface: typeof import("../components/features/EmojiSwitchingInterface.vue")['default']
export const ModelThreeD: typeof import("../components/features/ModelThreeD.vue")['default']
export const PlatformerChaseGame: typeof import("../components/features/PlatformerChaseGame.vue")['default']
export const PureCssMorphing: typeof import("../components/features/PureCssMorphing.vue")['default']
export const ThreeDCar: typeof import("../components/features/ThreeDCar.vue")['default']
export const AppHeader: typeof import("../components/main/AppHeader.vue")['default']
export const AppModal: typeof import("../components/main/AppModal.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const NuxtPicture: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const Align: typeof import("@tresjs/cientos")['Align']
export const AnimatedSprite: typeof import("@tresjs/cientos")['AnimatedSprite']
export const Backdrop: typeof import("@tresjs/cientos")['Backdrop']
export const BakeShadows: typeof import("@tresjs/cientos")['BakeShadows']
export const BaseCameraControls: typeof import("@tresjs/cientos")['BaseCameraControls']
export const Billboard: typeof import("@tresjs/cientos")['Billboard']
export const Box: typeof import("@tresjs/cientos")['Box']
export const CameraControls: typeof import("@tresjs/cientos")['CameraControls']
export const CatmullRomCurve3: typeof import("@tresjs/cientos")['CatmullRomCurve3']
export const Circle: typeof import("@tresjs/cientos")['Circle']
export const Cone: typeof import("@tresjs/cientos")['Cone']
export const ContactShadows: typeof import("@tresjs/cientos")['ContactShadows']
export const CubeCamera: typeof import("@tresjs/cientos")['CubeCamera']
export const CustomShaderMaterial: typeof import("@tresjs/cientos")['CustomShaderMaterial']
export const Cylinder: typeof import("@tresjs/cientos")['Cylinder']
export const Dodecahedron: typeof import("@tresjs/cientos")['Dodecahedron']
export const Edges: typeof import("@tresjs/cientos")['Edges']
export const Environment: typeof import("@tresjs/cientos")['Environment']
export const FBXModel: typeof import("@tresjs/cientos")['FBXModel']
export const Fbo: typeof import("@tresjs/cientos")['Fbo']
export const Fit: typeof import("@tresjs/cientos")['Fit']
export const GLTFModel: typeof import("@tresjs/cientos")['GLTFModel']
export const GlobalAudio: typeof import("@tresjs/cientos")['GlobalAudio']
export const GradientTexture: typeof import("@tresjs/cientos")['GradientTexture']
export const Grid: typeof import("@tresjs/cientos")['Grid']
export const HolographicMaterial: typeof import("@tresjs/cientos")['HolographicMaterial']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Icosahedron: typeof import("@tresjs/cientos")['Icosahedron']
export const Image: typeof import("@tresjs/cientos")['Image']
export const KeyboardControls: typeof import("@tresjs/cientos")['KeyboardControls']
export const Lensflare: typeof import("@tresjs/cientos")['Lensflare']
export const Levioso: typeof import("@tresjs/cientos")['Levioso']
export const Lightformer: typeof import("@tresjs/cientos")['Lightformer']
export const Line2: typeof import("@tresjs/cientos")['Line2']
export const MapControls: typeof import("@tresjs/cientos")['MapControls']
export const Mask: typeof import("@tresjs/cientos")['Mask']
export const MeshDiscardMaterial: typeof import("@tresjs/cientos")['MeshDiscardMaterial']
export const MeshGlassMaterial: typeof import("@tresjs/cientos")['MeshGlassMaterial']
export const MeshReflectionMaterial: typeof import("@tresjs/cientos")['MeshReflectionMaterial']
export const MeshWobbleMaterial: typeof import("@tresjs/cientos")['MeshWobbleMaterial']
export const MouseParallax: typeof import("@tresjs/cientos")['MouseParallax']
export const Ocean: typeof import("@tresjs/cientos")['Ocean']
export const Octahedron: typeof import("@tresjs/cientos")['Octahedron']
export const OrbitControls: typeof import("@tresjs/cientos")['OrbitControls']
export const Outline: typeof import("@tresjs/cientos")['Outline']
export const Plane: typeof import("@tresjs/cientos")['Plane']
export const PointerLockControls: typeof import("@tresjs/cientos")['PointerLockControls']
export const PositionalAudio: typeof import("@tresjs/cientos")['PositionalAudio']
export const Precipitation: typeof import("@tresjs/cientos")['Precipitation']
export const Reflector: typeof import("@tresjs/cientos")['Reflector']
export const Ring: typeof import("@tresjs/cientos")['Ring']
export const RoundedBox: typeof import("@tresjs/cientos")['RoundedBox']
export const SVG: typeof import("@tresjs/cientos")['SVG']
export const Sampler: typeof import("@tresjs/cientos")['Sampler']
export const ScreenSizer: typeof import("@tresjs/cientos")['ScreenSizer']
export const ScreenSpace: typeof import("@tresjs/cientos")['ScreenSpace']
export const ScrollControls: typeof import("@tresjs/cientos")['ScrollControls']
export const Sky: typeof import("@tresjs/cientos")['Sky']
export const Smoke: typeof import("@tresjs/cientos")['Smoke']
export const SoftShadows: typeof import("@tresjs/cientos")['SoftShadows']
export const Sparkles: typeof import("@tresjs/cientos")['Sparkles']
export const Sphere: typeof import("@tresjs/cientos")['Sphere']
export const Stars: typeof import("@tresjs/cientos")['Stars']
export const Stats: typeof import("@tresjs/cientos")['Stats']
export const StatsGl: typeof import("@tresjs/cientos")['StatsGl']
export const Superformula: typeof import("@tresjs/cientos")['Superformula']
export const Tetrahedron: typeof import("@tresjs/cientos")['Tetrahedron']
export const Text3D: typeof import("@tresjs/cientos")['Text3D']
export const Torus: typeof import("@tresjs/cientos")['Torus']
export const TorusKnot: typeof import("@tresjs/cientos")['TorusKnot']
export const TransformControls: typeof import("@tresjs/cientos")['TransformControls']
export const Tube: typeof import("@tresjs/cientos")['Tube']
export const TresCanvas: typeof import("../node_modules/@tresjs/nuxt/dist/runtime/TresCanvas.client.vue")['default']
export const TresCanvas: IslandComponent<typeof import("../node_modules/@tresjs/nuxt/dist/runtime/TresCanvas.server.vue")['default']>
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const NuxtRouteAnnouncer: IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyAnimatedBlock: LazyComponent<typeof import("../components/AnimatedBlock.vue")['default']>
export const LazyAnimatedCircles: LazyComponent<typeof import("../components/UI/AnimatedCircles.vue")['default']>
export const LazyCircleProgress: LazyComponent<typeof import("../components/UI/CircleProgress.vue")['default']>
export const LazyParticleCanvas: LazyComponent<typeof import("../components/UI/ParticleCanvas.vue")['default']>
export const LazyProgressBar: LazyComponent<typeof import("../components/UI/ProgressBar.vue")['default']>
export const LazyTagCloud: LazyComponent<typeof import("../components/UI/TagCloud.vue")['default']>
export const LazyCardFeature: LazyComponent<typeof import("../components/cards/CardFeature.vue")['default']>
export const LazyCardPortfolio: LazyComponent<typeof import("../components/cards/CardPortfolio.vue")['default']>
export const LazyCardTechnology: LazyComponent<typeof import("../components/cards/CardTechnology.vue")['default']>
export const LazyCardTools: LazyComponent<typeof import("../components/cards/CardTools.vue")['default']>
export const LazyAnimatedGrid: LazyComponent<typeof import("../components/features/AnimatedGrid.vue")['default']>
export const LazyCanvasParticle: LazyComponent<typeof import("../components/features/CanvasParticle.vue")['default']>
export const LazyEmojiSwitchingInterface: LazyComponent<typeof import("../components/features/EmojiSwitchingInterface.vue")['default']>
export const LazyModelThreeD: LazyComponent<typeof import("../components/features/ModelThreeD.vue")['default']>
export const LazyPlatformerChaseGame: LazyComponent<typeof import("../components/features/PlatformerChaseGame.vue")['default']>
export const LazyPureCssMorphing: LazyComponent<typeof import("../components/features/PureCssMorphing.vue")['default']>
export const LazyThreeDCar: LazyComponent<typeof import("../components/features/ThreeDCar.vue")['default']>
export const LazyAppHeader: LazyComponent<typeof import("../components/main/AppHeader.vue")['default']>
export const LazyAppModal: LazyComponent<typeof import("../components/main/AppModal.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
export const LazyAlign: LazyComponent<typeof import("@tresjs/cientos")['Align']>
export const LazyAnimatedSprite: LazyComponent<typeof import("@tresjs/cientos")['AnimatedSprite']>
export const LazyBackdrop: LazyComponent<typeof import("@tresjs/cientos")['Backdrop']>
export const LazyBakeShadows: LazyComponent<typeof import("@tresjs/cientos")['BakeShadows']>
export const LazyBaseCameraControls: LazyComponent<typeof import("@tresjs/cientos")['BaseCameraControls']>
export const LazyBillboard: LazyComponent<typeof import("@tresjs/cientos")['Billboard']>
export const LazyBox: LazyComponent<typeof import("@tresjs/cientos")['Box']>
export const LazyCameraControls: LazyComponent<typeof import("@tresjs/cientos")['CameraControls']>
export const LazyCatmullRomCurve3: LazyComponent<typeof import("@tresjs/cientos")['CatmullRomCurve3']>
export const LazyCircle: LazyComponent<typeof import("@tresjs/cientos")['Circle']>
export const LazyCone: LazyComponent<typeof import("@tresjs/cientos")['Cone']>
export const LazyContactShadows: LazyComponent<typeof import("@tresjs/cientos")['ContactShadows']>
export const LazyCubeCamera: LazyComponent<typeof import("@tresjs/cientos")['CubeCamera']>
export const LazyCustomShaderMaterial: LazyComponent<typeof import("@tresjs/cientos")['CustomShaderMaterial']>
export const LazyCylinder: LazyComponent<typeof import("@tresjs/cientos")['Cylinder']>
export const LazyDodecahedron: LazyComponent<typeof import("@tresjs/cientos")['Dodecahedron']>
export const LazyEdges: LazyComponent<typeof import("@tresjs/cientos")['Edges']>
export const LazyEnvironment: LazyComponent<typeof import("@tresjs/cientos")['Environment']>
export const LazyFBXModel: LazyComponent<typeof import("@tresjs/cientos")['FBXModel']>
export const LazyFbo: LazyComponent<typeof import("@tresjs/cientos")['Fbo']>
export const LazyFit: LazyComponent<typeof import("@tresjs/cientos")['Fit']>
export const LazyGLTFModel: LazyComponent<typeof import("@tresjs/cientos")['GLTFModel']>
export const LazyGlobalAudio: LazyComponent<typeof import("@tresjs/cientos")['GlobalAudio']>
export const LazyGradientTexture: LazyComponent<typeof import("@tresjs/cientos")['GradientTexture']>
export const LazyGrid: LazyComponent<typeof import("@tresjs/cientos")['Grid']>
export const LazyHolographicMaterial: LazyComponent<typeof import("@tresjs/cientos")['HolographicMaterial']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyIcosahedron: LazyComponent<typeof import("@tresjs/cientos")['Icosahedron']>
export const LazyImage: LazyComponent<typeof import("@tresjs/cientos")['Image']>
export const LazyKeyboardControls: LazyComponent<typeof import("@tresjs/cientos")['KeyboardControls']>
export const LazyLensflare: LazyComponent<typeof import("@tresjs/cientos")['Lensflare']>
export const LazyLevioso: LazyComponent<typeof import("@tresjs/cientos")['Levioso']>
export const LazyLightformer: LazyComponent<typeof import("@tresjs/cientos")['Lightformer']>
export const LazyLine2: LazyComponent<typeof import("@tresjs/cientos")['Line2']>
export const LazyMapControls: LazyComponent<typeof import("@tresjs/cientos")['MapControls']>
export const LazyMask: LazyComponent<typeof import("@tresjs/cientos")['Mask']>
export const LazyMeshDiscardMaterial: LazyComponent<typeof import("@tresjs/cientos")['MeshDiscardMaterial']>
export const LazyMeshGlassMaterial: LazyComponent<typeof import("@tresjs/cientos")['MeshGlassMaterial']>
export const LazyMeshReflectionMaterial: LazyComponent<typeof import("@tresjs/cientos")['MeshReflectionMaterial']>
export const LazyMeshWobbleMaterial: LazyComponent<typeof import("@tresjs/cientos")['MeshWobbleMaterial']>
export const LazyMouseParallax: LazyComponent<typeof import("@tresjs/cientos")['MouseParallax']>
export const LazyOcean: LazyComponent<typeof import("@tresjs/cientos")['Ocean']>
export const LazyOctahedron: LazyComponent<typeof import("@tresjs/cientos")['Octahedron']>
export const LazyOrbitControls: LazyComponent<typeof import("@tresjs/cientos")['OrbitControls']>
export const LazyOutline: LazyComponent<typeof import("@tresjs/cientos")['Outline']>
export const LazyPlane: LazyComponent<typeof import("@tresjs/cientos")['Plane']>
export const LazyPointerLockControls: LazyComponent<typeof import("@tresjs/cientos")['PointerLockControls']>
export const LazyPositionalAudio: LazyComponent<typeof import("@tresjs/cientos")['PositionalAudio']>
export const LazyPrecipitation: LazyComponent<typeof import("@tresjs/cientos")['Precipitation']>
export const LazyReflector: LazyComponent<typeof import("@tresjs/cientos")['Reflector']>
export const LazyRing: LazyComponent<typeof import("@tresjs/cientos")['Ring']>
export const LazyRoundedBox: LazyComponent<typeof import("@tresjs/cientos")['RoundedBox']>
export const LazySVG: LazyComponent<typeof import("@tresjs/cientos")['SVG']>
export const LazySampler: LazyComponent<typeof import("@tresjs/cientos")['Sampler']>
export const LazyScreenSizer: LazyComponent<typeof import("@tresjs/cientos")['ScreenSizer']>
export const LazyScreenSpace: LazyComponent<typeof import("@tresjs/cientos")['ScreenSpace']>
export const LazyScrollControls: LazyComponent<typeof import("@tresjs/cientos")['ScrollControls']>
export const LazySky: LazyComponent<typeof import("@tresjs/cientos")['Sky']>
export const LazySmoke: LazyComponent<typeof import("@tresjs/cientos")['Smoke']>
export const LazySoftShadows: LazyComponent<typeof import("@tresjs/cientos")['SoftShadows']>
export const LazySparkles: LazyComponent<typeof import("@tresjs/cientos")['Sparkles']>
export const LazySphere: LazyComponent<typeof import("@tresjs/cientos")['Sphere']>
export const LazyStars: LazyComponent<typeof import("@tresjs/cientos")['Stars']>
export const LazyStats: LazyComponent<typeof import("@tresjs/cientos")['Stats']>
export const LazyStatsGl: LazyComponent<typeof import("@tresjs/cientos")['StatsGl']>
export const LazySuperformula: LazyComponent<typeof import("@tresjs/cientos")['Superformula']>
export const LazyTetrahedron: LazyComponent<typeof import("@tresjs/cientos")['Tetrahedron']>
export const LazyText3D: LazyComponent<typeof import("@tresjs/cientos")['Text3D']>
export const LazyTorus: LazyComponent<typeof import("@tresjs/cientos")['Torus']>
export const LazyTorusKnot: LazyComponent<typeof import("@tresjs/cientos")['TorusKnot']>
export const LazyTransformControls: LazyComponent<typeof import("@tresjs/cientos")['TransformControls']>
export const LazyTube: LazyComponent<typeof import("@tresjs/cientos")['Tube']>
export const LazyTresCanvas: LazyComponent<typeof import("../node_modules/@tresjs/nuxt/dist/runtime/TresCanvas.client.vue")['default']>
export const LazyTresCanvas: LazyComponent<IslandComponent<typeof import("../node_modules/@tresjs/nuxt/dist/runtime/TresCanvas.server.vue")['default']>>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>>

export const componentNames: string[]
