import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
import "#internal/nitro";
import "ofetch";
import "hookable";
import "unctx";
import "h3";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "ufo";
import "defu";
import "klona";
import "devalue";
const _sfc_main$1 = {
  name: "Header"
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<header${ssrRenderAttrs(mergeProps({ class: "header" }, _attrs))}><nav class="nav-group"><div class="hamburger-menu"><input id="menu__toggle" type="checkbox"><label class="menu__btn" for="menu__toggle"><span></span></label><ul class="menu__box"><li><a class="menu__item" href="#">Projects</a></li><li><a class="menu__item" href="#">Animations</a></li><li><a class="menu__item" href="#">Features</a></li></ul></div><ul class="nav-group__list"><li title="To projects" class="nav-group__item"><a href="#">Projects</a></li><li title="To animations" class="nav-group__item"><a href="#">Animations</a></li><li title="To features" class="nav-group__item"><a href="#">Features</a></li></ul><select title="Choose language" name="languages" id="languages" size="1" onchange="if (this.value) location.href=this.value"><option selected disabled>Languages</option><option value="">🇬🇧</option><option value="localizations/uk">🇺🇦</option><option value="localizations/ru">🇷🇺</option><option value="localizations/it">🇮🇹</option><option value="localizations/de">🇩🇪</option></select></nav></header>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UI/Header.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {
  name: "default"
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Header = __nuxt_component_0;
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_Header, null, null, _parent));
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  _default as default
};
//# sourceMappingURL=default-CJaCE0MI.js.map
