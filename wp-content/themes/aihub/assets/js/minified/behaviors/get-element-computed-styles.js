class LiquidGetElementComputedStylesBehavior extends LiquidBehavior{static name="liquidGetElementComputedStyles";static willEmitInitializeTriggerEvents=["change:computedStyles","change:rect","change:styles","change:brightness","change:ghost"];static appEvents={"after:windowResize":"afterWindowResize"};static parentsCollectionEvents={"change:activeCarouselItem":"resetRect","change:toggle":"resetRect"};static childrenCollectionEvents={update:{func:"init",debounce:{wait:285.69,options:{immediate:!1}}}};options(){return{includeSelf:!1,elementsSelector:!1,includeChildren:!1,getOnlyContainers:!1,getOnlyWidgets:!1,getRect:!1,getStyles:[],getBrightnessOf:[],addGhosts:!1}}get bindToThis(){return["setStyles","setBrightness","setRect"]}initialize(){this.isDestroyed||this.init()}init(){this.isDestroyed||(this.childrenCollection=[],this.initElementStyles())}initElementStyles(){if(!this.isDestroyed&&(this.getOption("includeChildren")&&this.childrenCollection.push(...this.view.model.get("childrenCollection")?.models||[]),this.getOption("getOnlyContainers")&&(this.childrenCollection=this.childrenCollection.filter(e=>e.get("isContainer"))),this.getOption("getOnlyWidgets")&&(this.childrenCollection=this.childrenCollection.filter(e=>!e.get("isContainer"))),this.getOption("includeSelf")&&this.childrenCollection.push(this.view.model),!!this.childrenCollection.length))return fastdom.measure(()=>{this.isDestroyed||(this.getStyles(),this.getBrightnessOf(),this.getRect(),!this.isDestroyed&&this.view.model.set({computedStyles:"done"}))})}getStyles(){this.getOption("getStyles")?.length&&this.childrenCollection.forEach(e=>this.setStyles(e))}getBrightnessOf(){this.getOption("getBrightnessOf")?.length&&this.childrenCollection.forEach(e=>this.setBrightness(e))}getRect(e=!1){if(!this.getOption("getRect")||this.isDestroyed||this.isDestroyed)return;const n=this.view.model.get("parentsCollection")?.find(t=>t.get("behaviors")?.find(l=>l.name==="liquidStickyHeader")),r=this.liquidApp.layoutRegions[this.view.model.get("layoutRegion")]?.model?.get("behaviors")?.find(t=>t.name==="liquidStickyHeader");if(this.childrenCollection.forEach(t=>this.setRect(t,n||r)),e)return;const i=this.childrenCollection.filter(t=>t.get("layoutRegion")==="liquidPageHeader");i.length&&this.listenTo(this.liquidApp,"start",t=>{const l=t.layoutRegions.liquidPageHeader;l&&this.listenTo(l.model,"change:isSticky",(h,o)=>i.forEach(c=>this.setRect(c,n||r)))})}setStyles(e){const n=this.getOption("getStyles"),r=this.getOption("elementsSelector"),i=window.getComputedStyle(e.view.el),t=e.get("styles")||{},l=e.get("isTopLevelContainer"),h=window.getComputedStyle(document.body);n.forEach(o=>{let c=i[o];o==="backgroundColor"&&getAlpha(i[o])===0&&(l?c=h.backgroundColor:c=e.get("topParentContainer")?.get("styles")?.backgroundColor||h.backgroundColor),t[o]=c}),r&&e.view.el.querySelectorAll(r).forEach(o=>{const c=window.getComputedStyle(o),s={el:o,styles:n.map(g=>({[g]:c[g]}))};t.elements=[...t.elements||[],s]}),e.set({styles:t})}setBrightness(e){const n=this.getOption("getBrightnessOf"),r=e.get("brightness")||{};n.forEach(i=>{let t=e.get("styles")[i];if(i==="backgroundColor"){const l=e.view.el.getAttribute("data-lqd-color-scheme");l&&l==="dark"&&(t="#000")}r[i]=getBrightness(t)}),e.set({brightness:r})}setRect(e,n=!1){const{el:r}=e.view,i=this.getElementRect(r),t=this.getOption("elementsSelector"),l=this.getOption("addGhosts"),h=e.get("rect"),o=h?.__v||0;if(t&&r.querySelectorAll(t).forEach(c=>{const s={el:c,rect:this.getElementRect(c)};i.elements=[...i.elements||[],s]}),l){const c=this.liquidApp.topWrap||document.body;let s;e.get("ghost")?.el?s=e.get("ghost").el:(s=document.createElement("div"),s.className=`${n?"fixed":"absolute"} pointer-events-none -z-1`,s.dataset.id=this.view.el.getAttribute("data-id"),s.style.width=`${i.width}px`,s.style.height=`${i.height}px`,s.style.top=`${i.y}px`,s.style.insetInlineStart=`${i.x}px`,c.insertAdjacentElement("beforeend",s)),this.view.listenTo(e,"change:rect",(g,d)=>{s.style.width=`${d.width}px`,s.style.height=`${d.height}px`,s.style.top=`${d.y}px`,s.style.insetInlineStart=`${d.x}px`}),e.set({ghost:{el:s,rect:i,__v:o+1}})}e.set({rect:{...h||{},...i,__v:o+1}})}getElementRect(e){const n=e.getBoundingClientRect(),r=n.width,i=n.height;let t=!1,l=n.x+window.scrollX,h=n.y+window.scrollY,o=e;for(;o!==null;){if(window.getComputedStyle(o).position==="fixed"){t=!0;break}o=o.offsetParent}return t&&(l=n.x,h=n.y),{width:r,height:i,x:l,y:h,right:r+l,bottom:i+h}}resetRect(){fastdom.measure(()=>this.getRect())}afterWindowResize(){fastdom.measure(()=>this.getRect(!0))}}window.liquid?.app?.model?.set("loadedBehaviors",[...window.liquid.app.model.get("loadedBehaviors"),LiquidGetElementComputedStylesBehavior]);
