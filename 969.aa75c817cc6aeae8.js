(self.webpackChunkpreview_ui=self.webpackChunkpreview_ui||[]).push([[969],{4707:(A,M,a)=>{a.d(M,{t:()=>y});var b=a(7579),s=a(6063);class y extends b.x{constructor(h=1/0,C=1/0,p=s.l){super(),this._bufferSize=h,this._windowTime=C,this._timestampProvider=p,this._buffer=[],this._infiniteTimeWindow=!0,this._infiniteTimeWindow=C===1/0,this._bufferSize=Math.max(1,h),this._windowTime=Math.max(1,C)}next(h){const{isStopped:C,_buffer:p,_infiniteTimeWindow:f,_timestampProvider:_,_windowTime:m}=this;C||(p.push(h),!f&&p.push(_.now()+m)),this._trimBuffer(),super.next(h)}_subscribe(h){this._throwIfClosed(),this._trimBuffer();const C=this._innerSubscribe(h),{_infiniteTimeWindow:p,_buffer:f}=this,_=f.slice();for(let m=0;m<_.length&&!h.closed;m+=p?1:2)h.next(_[m]);return this._checkFinalizedStatuses(h),C}_trimBuffer(){const{_bufferSize:h,_timestampProvider:C,_buffer:p,_infiniteTimeWindow:f}=this,_=(f?1:2)*h;if(h<1/0&&_<p.length&&p.splice(0,p.length-_),!f){const m=C.now();let u=0;for(let g=1;g<p.length&&p[g]<=m;g+=2)u=g;u&&p.splice(0,u+1)}}}},7579:(A,M,a)=>{a.d(M,{u:()=>f,x:()=>p});var b=a(9751),s=a(727);const P=(0,a(3888).d)(_=>function(){_(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var h=a(8737),C=a(2806);let p=(()=>{class _ extends b.y{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(u){const g=new f(this,this);return g.operator=u,g}_throwIfClosed(){if(this.closed)throw new P}next(u){(0,C.x)(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(const g of this.currentObservers)g.next(u)}})}error(u){(0,C.x)(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=u;const{observers:g}=this;for(;g.length;)g.shift().error(u)}})}complete(){(0,C.x)(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;const{observers:u}=this;for(;u.length;)u.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var u;return(null===(u=this.observers)||void 0===u?void 0:u.length)>0}_trySubscribe(u){return this._throwIfClosed(),super._trySubscribe(u)}_subscribe(u){return this._throwIfClosed(),this._checkFinalizedStatuses(u),this._innerSubscribe(u)}_innerSubscribe(u){const{hasError:g,isStopped:L,observers:V}=this;return g||L?s.Lc:(this.currentObservers=null,V.push(u),new s.w0(()=>{this.currentObservers=null,(0,h.P)(V,u)}))}_checkFinalizedStatuses(u){const{hasError:g,thrownError:L,isStopped:V}=this;g?u.error(L):V&&u.complete()}asObservable(){const u=new b.y;return u.source=this,u}}return _.create=(m,u)=>new f(m,u),_})();class f extends p{constructor(m,u){super(),this.destination=m,this.source=u}next(m){var u,g;null===(g=null===(u=this.destination)||void 0===u?void 0:u.next)||void 0===g||g.call(u,m)}error(m){var u,g;null===(g=null===(u=this.destination)||void 0===u?void 0:u.error)||void 0===g||g.call(u,m)}complete(){var m,u;null===(u=null===(m=this.destination)||void 0===m?void 0:m.complete)||void 0===u||u.call(m)}_subscribe(m){var u,g;return null!==(g=null===(u=this.source)||void 0===u?void 0:u.subscribe(m))&&void 0!==g?g:s.Lc}}},3905:(A,M,a)=>{a.d(M,{z:()=>y});var b=a(6805),s=a(2961);function y(P,h){const C="object"==typeof h;return new Promise((p,f)=>{const _=new s.Hp({next:m=>{p(m),_.unsubscribe()},error:f,complete:()=>{C?p(h.defaultValue):f(new b.K)}});P.subscribe(_)})}},515:(A,M,a)=>{a.d(M,{E:()=>s});const s=new(a(9751).y)(h=>h.complete())},9646:(A,M,a)=>{a.d(M,{of:()=>y});var b=a(3269),s=a(2076);function y(...P){const h=(0,b.yG)(P);return(0,s.D)(P,h)}},262:(A,M,a)=>{a.d(M,{K:()=>P});var b=a(8421),s=a(5403),y=a(4482);function P(h){return(0,y.e)((C,p)=>{let m,f=null,_=!1;f=C.subscribe((0,s.x)(p,void 0,void 0,u=>{m=(0,b.Xf)(h(u,P(h)(C))),f?(f.unsubscribe(),f=null,m.subscribe(p)):_=!0})),_&&(f.unsubscribe(),f=null,m.subscribe(p))})}},2035:(A,M,a)=>{a.d(M,{h:()=>P});var b=a(515),s=a(4482),y=a(5403);function P(h){return h<=0?()=>b.E:(0,s.e)((C,p)=>{let f=[];C.subscribe((0,y.x)(p,_=>{f.push(_),h<f.length&&f.shift()},()=>{for(const _ of f)p.next(_);p.complete()},void 0,()=>{f=null}))})}},6063:(A,M,a)=>{a.d(M,{l:()=>b});const b={now:()=>(b.delegate||Date).now(),delegate:void 0}},6805:(A,M,a)=>{a.d(M,{K:()=>s});const s=(0,a(3888).d)(y=>function(){y(this),this.name="EmptyError",this.message="no elements in sequence"})},3269:(A,M,a)=>{a.d(M,{_6:()=>C,jO:()=>P,yG:()=>h});var b=a(576),s=a(3532);function y(p){return p[p.length-1]}function P(p){return(0,b.m)(y(p))?p.pop():void 0}function h(p){return(0,s.K)(y(p))?p.pop():void 0}function C(p,f){return"number"==typeof y(p)?p.pop():f}},1969:(A,M,a)=>{a.r(M),a.d(M,{AbstractDynamicComponent:()=>H,AbstractDynamicLoaderComponent:()=>J,AbstractPluginHandler:()=>Ce,AbstractReferenceComponent:()=>ge,BaseDynamicEvent:()=>te,BaseDynamicEventSource:()=>ee,BeautifierPipe:()=>Y,COMMAND_PROVIDER:()=>z,CommonTestManager:()=>we,ComponentLoaderService:()=>W,DONT_CODE_CORE:()=>B,DONT_CODE_DOC_API_URL:()=>ye,DONT_CODE_STORE_API_URL:()=>ve,DynamicEventType:()=>R,DynamicInsertPoint:()=>$,EntityListManager:()=>ne,EntityStoreService:()=>_e,PluginBaseComponent:()=>Z,PluginCommonModule:()=>re,PluginCommonTestModule:()=>I,PluginHandlerHelper:()=>G,PossibleTemplateList:()=>q,SubFieldInfo:()=>U,TemplateList:()=>X,ValueService:()=>Ee});var b=a(5861),s=a(549),y=a(7022),P=a(727),h=a(4707),C=a(9646),p=a(2076),f=a(3905);new Error("timeout while waiting for mutex to become available"),new Error("mutex already locked");const u=new Error("request for lock canceled");class L{constructor(n,e=u){this._value=n,this._cancelError=e,this._weightedQueues=[],this._weightedWaiters=[]}acquire(n=1){if(n<=0)throw new Error(`invalid weight ${n}: must be positive`);return new Promise((e,t)=>{this._weightedQueues[n-1]||(this._weightedQueues[n-1]=[]),this._weightedQueues[n-1].push({resolve:e,reject:t}),this._dispatch()})}runExclusive(n,e=1){return function(o,n,e,t){return new(e||(e=Promise))(function(i,l){function c(w){try{E(t.next(w))}catch(D){l(D)}}function d(w){try{E(t.throw(w))}catch(D){l(D)}}function E(w){w.done?i(w.value):function r(i){return i instanceof e?i:new e(function(l){l(i)})}(w.value).then(c,d)}E((t=t.apply(o,n||[])).next())})}(this,void 0,void 0,function*(){const[t,r]=yield this.acquire(e);try{return yield n(t)}finally{r()}})}waitForUnlock(n=1){if(n<=0)throw new Error(`invalid weight ${n}: must be positive`);return new Promise(e=>{this._weightedWaiters[n-1]||(this._weightedWaiters[n-1]=[]),this._weightedWaiters[n-1].push(e),this._dispatch()})}isLocked(){return this._value<=0}getValue(){return this._value}setValue(n){this._value=n,this._dispatch()}release(n=1){if(n<=0)throw new Error(`invalid weight ${n}: must be positive`);this._value+=n,this._dispatch()}cancel(){this._weightedQueues.forEach(n=>n.forEach(e=>e.reject(this._cancelError))),this._weightedQueues=[]}_dispatch(){var n;for(let e=this._value;e>0;e--){const t=null===(n=this._weightedQueues[e-1])||void 0===n?void 0:n.shift();if(!t)continue;const r=this._value,i=e;this._value-=e,e=this._value+1,t.resolve([r,this._newReleaser(i)])}this._drainUnlockWaiters()}_newReleaser(n){let e=!1;return()=>{e||(e=!0,this.release(n))}}_drainUnlockWaiters(){for(let n=this._value;n>0;n--)this._weightedWaiters[n-1]&&(this._weightedWaiters[n-1].forEach(e=>e()),this._weightedWaiters[n-1]=[])}}class K{constructor(n){this._semaphore=new L(1,n)}acquire(){return o=this,n=void 0,t=function*(){const[,n]=yield this._semaphore.acquire();return n},new((e=void 0)||(e=Promise))(function(i,l){function c(w){try{E(t.next(w))}catch(D){l(D)}}function d(w){try{E(t.throw(w))}catch(D){l(D)}}function E(w){w.done?i(w.value):function r(i){return i instanceof e?i:new e(function(l){l(i)})}(w.value).then(c,d)}E((t=t.apply(o,n||[])).next())});var o,n,e,t}runExclusive(n){return this._semaphore.runExclusive(()=>n())}isLocked(){return this._semaphore.isLocked()}waitForUnlock(){return this._semaphore.waitForUnlock()}release(){this._semaphore.isLocked()&&this._semaphore.release()}cancel(){return this._semaphore.cancel()}}var v=a(6453),x=a(4004),oe=a(2035),se=a(262),Q=a(6674),N=a(7863),le=a(3134);const ue=["inlineView"],ae=["fullEditView"];function ce(o,n){if(1&o&&s.\u0275\u0275text(0),2&o){const e=s.\u0275\u0275nextContext();s.\u0275\u0275textInterpolate(e.value)}}function de(o,n){if(1&o&&(s.\u0275\u0275elementStart(0,"div"),s.\u0275\u0275text(1),s.\u0275\u0275elementEnd()),2&o){const e=s.\u0275\u0275nextContext(4);s.\u0275\u0275advance(1),s.\u0275\u0275textInterpolate1(" ",e.value," ")}}function pe(o,n){if(1&o&&s.\u0275\u0275template(0,de,2,1,"div",7),2&o){const e=s.\u0275\u0275nextContext(3);s.\u0275\u0275property("ngIf",e.value)}}function he(o,n){1&o&&s.\u0275\u0275text(0),2&o&&s.\u0275\u0275textInterpolate1(" ",n.$implicit," ")}function fe(o,n){if(1&o){const e=s.\u0275\u0275getCurrentView();s.\u0275\u0275elementContainerStart(0,3),s.\u0275\u0275elementStart(1,"p-dropdown",4),s.\u0275\u0275listener("onChange",function(r){s.\u0275\u0275restoreView(e);const i=s.\u0275\u0275nextContext(2);return s.\u0275\u0275resetView(i.valueChanged(r))}),s.\u0275\u0275template(2,pe,1,1,"ng-template",5),s.\u0275\u0275template(3,he,1,1,"ng-template",6),s.\u0275\u0275elementEnd(),s.\u0275\u0275elementContainerEnd()}if(2&o){const e=s.\u0275\u0275nextContext(2);s.\u0275\u0275property("formGroup",e.form),s.\u0275\u0275advance(1),s.\u0275\u0275property("options",e.options)("formControlName",e.name)("filter",!0)("showClear",!0)("lazy",!0)}}function me(o,n){if(1&o&&s.\u0275\u0275template(0,fe,4,6,"ng-container",2),2&o){const e=s.\u0275\u0275nextContext();s.\u0275\u0275property("ngIf",e.form)}}let H=(()=>{class o{constructor(){this.parentPosition=null,this.subscriptions=new P.w0}setName(e){this.name=e}getValue(){return null!=this.form&&this.updateValueFromForm(),this.value}setValue(e){this.value=e,null!=this.form&&this.hydrateValueToForm()}setParentPosition(e){this.parentPosition=e}setForm(e){this.form=e,null!=this.form&&null!=this.name&&this.createAndRegisterFormControls()}getForm(){return this.form}createAndRegisterFormControls(){const e=new y.FormControl(null,{updateOn:"blur"});this.form.registerControl(this.name,e)}transformToFormGroupValue(e){return e}transformFromFormGroupValue(e){return e}hydrateValueToForm(){if(null!=this.name){const e=this.form.get(this.name);if(null==e)throw new Error("No form control for the name "+this.name);{const t=this.transformToFormGroupValue(this.value);e.setValue(t,{emitEvent:!1})}}}updateValueFromForm(){if(null==this.name)return!1;const e=this.form.get(this.name);if(null==e)throw new Error("No form control for the name "+this.name);return!!e.dirty&&(this.value=this.transformFromFormGroupValue(e.value),e.markAsPristine({onlySelf:!0}),!0)}static toBeautifyString(e,t){if(null==e)return null;let r="";switch(Array.isArray(e)&&(e=e[0]),typeof e){case"string":r=e;break;case"object":r=e instanceof Date?e.toLocaleDateString():JSON.stringify(e,null,2);break;case"undefined":break;default:r=e.toLocaleString()}return null!=t&&r.length>t&&(r=r.substring(0,t-3)+"..."),r}listEventSources(){return[]}selectEventSourceFor(e,t){const r=this.listEventSources();for(const i of r)if(i.type===e){if(null==t)return i;if(i.name==t)return i}return null}ngOnDestroy(){this.subscriptions.unsubscribe()}}return o.\u0275fac=function(e){return new(e||o)},o.\u0275cmp=s.\u0275\u0275defineComponent({type:o,selectors:[["ng-component"]],decls:0,vars:0,template:function(e,t){},encapsulation:2}),o})(),z=new s.InjectionToken("Inject the current command provider interface");const B=new s.InjectionToken("Dont-code core object"),ve=new s.InjectionToken("DontCodeStoreApiUrl"),ye=new s.InjectionToken("DontCodeStoreDocUrl");let W=(()=>{class o{constructor(e,t,r,i){this.injector=e,this.dontCodeCore=t,this.previewMgr=r,this.provider=i,this.moduleMap=new Map,this.mutex=new K}getOrCreatePluginModuleRef(e){return this.mutex.acquire().then(t=>{try{let r=this.moduleMap.get(e);return r||(r=(0,s.createNgModule)((0,s.getNgModuleById)("dontcode-plugin/"+e),this.injector),r&&this.moduleMap.set(e,r)),r}finally{t()}})}loadPluginModule(e){return this.getOrCreatePluginModuleRef(e.class.source).then(t=>(null!=t&&this.dontCodeCore.initPlugins(),t))}insertComponentForFieldType(e,t){return this.insertComponent("creation/entities/fields/type",t,e)}insertComponent(e,t,r){let l,i=e.positionInSchema;i?(l=!0,r||(r=this.provider?.getJsonAt(e.position))):(l=!1,i=e);const c=this.previewMgr.retrieveHandlerConfig(i,r);return c?this.loadPluginModule(c).then(d=>{const E=d.instance.exposedPreviewHandlers().get(c.class.name);return this.createComponent(E,t,d,l?e:null)}).catch(d=>(console.error("Cannot load module because of ",d),Promise.reject("Cannot load module for source "+c.class.source+" because of "+d))):Promise.resolve(null)}createComponent(e,t,r,i){const d=t.createComponent(e,{injector:this.injector,ngModuleRef:r}).instance;if(d.initCommandFlow){if(!i)throw new Error("Component "+d.constructor.name+" is a PreviewHandler and parent position is missing.");if(!this.provider)throw new Error("Component "+d.constructor.name+" is a PreviewHandler and CommandProviderInterface is missing.");d.initCommandFlow(this.provider,i)}return d}registerModuleForTest(e,t){this.moduleMap.set(t,null==e.instance?(0,s.createNgModule)(e,this.injector):e)}}return o.\u0275fac=function(e){return new(e||o)(s.\u0275\u0275inject(s.Injector),s.\u0275\u0275inject(B),s.\u0275\u0275inject(v.DontCodePreviewManager),s.\u0275\u0275inject(z,8))},o.\u0275prov=s.\u0275\u0275defineInjectable({token:o,factory:o.\u0275fac,providedIn:"root"}),o})(),$=(()=>{class o{}return o.\u0275fac=function(e){return new(e||o)},o.\u0275dir=s.\u0275\u0275defineDirective({type:o,selectors:[["dtcde-dynamic"]]}),o})(),J=(()=>{class o extends H{constructor(e,t,r){super(),this.loader=e,this.injector=t,this.ref=r,this.fields=new Array,this.fieldsMap=new Map,this.parentForm=null,this.componentInited=new h.t}defineSubField(e,t){const r=new U(e,t);this.addSubField(r)}getSubField(e){const t=this.fieldsMap.get(e);if(null!=t)return this.fields[t]}addSubField(e){const t=this.fields.push(e);return this.fieldsMap.set(e.name,t-1),t}getSubFields(){return this.fields}setForm(e){if(this.name){const t=new y.FormGroup({},{updateOn:"blur"});e.registerControl(this.name,t),super.setForm(t),this.parentForm=e}else super.setForm(e),this.parentForm=null;this.preloadSubFields()}hydrateValueToForm(){if(null==this.parentForm)super.hydrateValueToForm();else{let e=this.transformToFormGroupValue(this.value);for(const t in this.form.controls)null==this.fieldsMap.get(t)&&this.form.get(t)?.setValue(e&&e[t],{emitEvent:!1})}}updateValueFromForm(){if(null==this.parentForm)return super.updateValueFromForm();{let e=!1;for(const t in this.form.controls)if(null==this.fieldsMap.get(t)){const r=this.form.get(t);if(null!=r&&r.dirty){const i=this.transformFromFormGroupValue(r?.value);null==this.value&&(this.value={}),this.value[t]=i,e=!0,r.markAsPristine({onlySelf:!0})}}return e}}setValue(e){super.setValue(e);for(const t of this.fields)this.setSubFieldValue(t,null!=e?e[t.name]:void 0)}getValue(){let e=super.getValue();for(const t of this.fields){const r=this.getSubFieldValue(t);null!=r&&null==e&&(this.value={},e=this.value),e[t.name]!==r&&(e[t.name]=r)}return e}subFieldFullEditTemplate(e){const t="string"==typeof e?this.getSubField(e):e,r=t?.component;let i=null;if(null!=r&&(i=r.providesTemplates(t?.type).forFullEdit),null==e)throw new Error("No template for subField "+t?.name+" of component "+this.name);return i}subFieldInlineViewTemplate(e){const t="string"==typeof e?this.getSubField(e):e,r=t?.component;let i=null;if(null!=r&&(i=r.providesTemplates(t?.type).forInlineView),null==e)throw new Error("No template for subField "+t?.name+" of component "+this.name);return i}subFieldFullViewTemplate(e){const t="string"==typeof e?this.getSubField(e):e,r=t?.component;let i=null;if(null!=r&&(i=r.providesTemplates(t?.type).forFullView),null==e)throw new Error("No template for subField "+t?.name+" of component "+this.name);return i}loadSubField(e,t,r){const i="string"==typeof e?this.getSubField(e):e,l=i?.component;return null==l?this.loader.insertComponentForFieldType(t,this.dynamicInsertPoint).then(c=>null!=c?(this.prepareComponent(c,t,null!=i?i.name:null,r),c):null):Promise.resolve(l)}getSubFieldValue(e){const t="string"==typeof e?this.getSubField(e):e,r=t?.component;if(null!=r)return r.getValue();if(null!=this.form&&null!=t)return this.form.get(t.name)?.value;throw new Error("Cannot provide value for non existent subField "+e)}setSubFieldValue(e,t){const r="string"==typeof e?this.getSubField(e):e,i=r?.component;if(null!=i)i.setValue(t);else if(null!=this.form&&null!=r){const l={};let c=o.toBeautifyString(t);null==c&&(c=null),l[r.name]=c,this.form.patchValue(l,{emitEvent:!1})}}loadSubComponent(e,t,r,i){return new Promise((l,c)=>this.componentInited.subscribe({complete:()=>{l()},error:d=>{c(d)}})).then(()=>null==this.dynamicInsertPoint?null:this.loader.insertComponent(e,this.dynamicInsertPoint,i).then(l=>null!=l?this.prepareComponent(l,t,r,i):null))}prepareComponent(e,t,r,i){return r&&(null!=this.form&&(e.setName(r),e.setForm(this.form)),e.setValue(i)),e}applyComponentToSubField(e,t,r){let i=this.getSubField(r);return null==i?(i=new U(r,t,e),this.addSubField(i),!0):(i.component=e,!1)}ngAfterViewInit(){this.componentInited.complete(),this.preloadSubFields()}preloadSubFields(){if(null!=this.dynamicInsertPoint){let e=!1;for(const t of this.fields)null==t.component&&this.loadSubField(t.name,t.type,this.value?this.value[t.name]:void 0).then(i=>{null!=i&&this.applyComponentToSubField(i,t.type,t.name),null!=this.value&&!e&&(this.ref.detectChanges(),e=!0)})}}}return o.\u0275fac=function(e){return new(e||o)(s.\u0275\u0275directiveInject(W),s.\u0275\u0275directiveInject(s.Injector),s.\u0275\u0275directiveInject(s.ChangeDetectorRef))},o.\u0275cmp=s.\u0275\u0275defineComponent({type:o,selectors:[["ng-component"]],viewQuery:function(e,t){if(1&e&&s.\u0275\u0275viewQuery($,5,s.ViewContainerRef),2&e){let r;s.\u0275\u0275queryRefresh(r=s.\u0275\u0275loadQuery())&&(t.dynamicInsertPoint=r.first)}},features:[s.\u0275\u0275InheritDefinitionFeature],decls:0,vars:0,template:function(e,t){},encapsulation:2}),o})();class U{constructor(n,e,t){this.name=n,this.type=e,this.component=t}}class G{constructor(){this.subscriptions=new P.w0,this.entityPointer=null,this.provider=null,this.changeHandler=null,this.actionPerformer=null,this.mutex=new K}initCommandFlow(n,e,t,r){this.entityPointer=e,this.provider=n,this.changeHandler=t,null!=r?this.actionPerformer=r:null!=t.performAction&&(this.actionPerformer=t)}decomposeJsonToMultipleChanges(n,e){if("object"==typeof e&&this.provider){let t;const r=this.provider.getSchemaManager();for(const i in e)if(e.hasOwnProperty(i)){const l=r.generateSubSchemaPointer(n,i),c=r.locateItem(l.positionInSchema);c?.isArray()&&l.isProperty?this.decomposeJsonToMultipleChanges(l,e[i]):(t=new v.Change(v.ChangeType.RESET,n.position+"/"+i,e[i],l),!c&&t.pointer&&(t.pointer.isProperty=!1),null!=this.changeHandler&&this.changeHandler.handleChange(t))}}}initChangeListening(n){this.initOtherChangeListening(n,this.entityPointer)}initOtherChangeListening(n,e){if(!this.provider||!e)throw new Error("Cannot listen to change before initCommandFlow is called");{let t=e.position;!0!==n&&(t+="/?"),this.subscriptions.add(this.provider.receiveCommands(t).pipe((0,x.U)(r=>{null!=r.actionType?this.actionPerformer&&r.running?.next(this.actionPerformer.performAction(r)):this.changeHandler&&this.changeHandler.handleChange(r)})).subscribe())}}applyUpdatesToArray(n,e,t,r,i,l){return this.applyUpdatesToArrayAsync(n,e,t,r,(c,d)=>Promise.resolve(i(c,d)))}applyUpdatesToArrayAsync(n,e,t,r,i,l,c){return this.mutex.runExclusive(()=>{try{if(!this.provider)throw new Error("Cannot apply updates before initCommandFlow is called");t.pointer||(t.pointer=this.provider.calculatePointerFor(t.position)),l=l??this.entityPointer?.position,null!=r&&(l=l+"/"+r);const d=t.pointer.containerPosition===l;let E=d?t.pointer.lastElement:v.DontCodeModelPointer.lastElementOf(t.pointer.containerPosition)??null,w=t.pointer.isProperty?t.pointer.lastElement:null,D=null,j=null,T=-1,F=-1;switch(null!=E&&e.has(E)&&(T=e.get(E),j=n[T],D=(0,C.of)(j)),t.beforeKey&&(F=e.get(t.beforeKey)),t.type){case v.ChangeType.ADD:case v.ChangeType.UPDATE:case v.ChangeType.RESET:if(null!=w){if(!j||j&&(!c||!c(j,w,t.value))){const S=this.provider.getJsonAt(t.pointer.containerPosition),O=this.provider.calculatePointerFor(t.pointer.containerPosition);if(O.isProperty)throw new Error("A parent of a property "+t.pointer.position+" must be an array");D=(0,p.D)(i(O,S))}}else D=(0,p.D)(i(t.pointer,t.value));break;case v.ChangeType.MOVE:-1!==T&&d&&E&&(-1!==F&&F>T&&F--,n.splice(T,1),e.forEach((S,O)=>{S>T&&e.set(O,S-1)}),e.delete(E),T=-1);break;case v.ChangeType.DELETE:-1!==T&&d&&E&&(n.splice(T,1),e.forEach((S,O)=>{S>T&&e.set(O,S-1)}),e.delete(E)),D=null}return D?(0,f.z)(D.pipe((0,x.U)(S=>{if(-1!==T)n[T]=S;else if(-1!==F){if(n.splice(F,0,S),e.forEach((O,Pe)=>{O>=F&&e.set(Pe,O+1)}),null==E)throw new Error("Cannot set targetPos "+F+" without knowing the itemId");e.set(E,F)}else{if(n.push(S),null==E)throw new Error("Cannot set targetPos "+F+" without knowing the itemId");e.set(E,e.size)}return n}),(0,oe.h)(1),(0,se.K)(S=>Promise.reject(S)))):Promise.resolve(n)}catch(d){return Promise.reject(d)}})}unsubscribe(){this.subscriptions.unsubscribe()}performAction(n){var e=this;return(0,b.Z)(function*(){if(null==e.provider)return Promise.reject("No provider for the component at position "+e.entityPointer?.position);yield e.provider.sendCommand(n)})()}}let Z=(()=>{class o extends J{constructor(e,t,r){super(e,t,r),this.pluginHelper=new G,this.entityPointer=null,this.provider=null}ngOnDestroy(){this.pluginHelper.unsubscribe(),super.ngOnDestroy()}updateValueOnFormChanges(){this.subscriptions.add(this.form.valueChanges.pipe((0,x.U)(e=>(this.getValue(),e))).subscribe())}initCommandFlow(e,t){this.entityPointer=t,this.provider=e,this.pluginHelper.initCommandFlow(e,t,this)}initChangeListening(e){this.pluginHelper.initChangeListening(e)}decomposeJsonToMultipleChanges(e,t){this.pluginHelper.decomposeJsonToMultipleChanges(e,t)}decodeStringField(e,t){if(e.pointer?.lastElement===t)return e.value}applyUpdatesToArray(e,t,r,i,l,c,d){return this.applyUpdatesToArrayAsync(e,t,r,i,(E,w)=>Promise.resolve(l(E,w)),c)}applyUpdatesToArrayAsync(e,t,r,i,l,c,d){return this.pluginHelper.applyUpdatesToArrayAsync(e,t,r,i,l,c,d)}updateSubFieldsWithChange(e,t,r){return this.applyUpdatesToArrayAsync(this.fields,this.fieldsMap,e,t,(i,l)=>this.loadSubComponent(i,l.type,l.name).then(c=>new U(l.name,l.type,c??void 0)),r,(i,l,c)=>l===v.DontCodeModel.APP_FIELDS_NAME_NODE&&(i.name=c,!0)).then(i=>(this.fields=i,this.rebuildForm(),i))}rebuildForm(){if(null==this.form)return;const e=new Set;for(const t in this.form.controls)e.add(t);for(const t of this.fields){let r=null;this.value&&this.value[t.name]&&(r=this.value[t.name]),e.delete(t.name),null!=t.component?t.component?.setValue(r):(r=o.toBeautifyString(r),this.form.registerControl(t.name,new y.FormControl(r,y.Validators.required)))}e.forEach(t=>{this.form.removeControl(t)})}}return o.\u0275fac=function(e){return new(e||o)(s.\u0275\u0275directiveInject(W),s.\u0275\u0275directiveInject(s.Injector),s.\u0275\u0275directiveInject(s.ChangeDetectorRef))},o.\u0275cmp=s.\u0275\u0275defineComponent({type:o,selectors:[["ng-component"]],features:[s.\u0275\u0275InheritDefinitionFeature],decls:0,vars:0,template:function(e,t){},encapsulation:2}),o})(),Y=(()=>{class o{transform(e,...t){return Z.toBeautifyString(e,t[0])}}return o.\u0275fac=function(e){return new(e||o)},o.\u0275pipe=s.\u0275\u0275definePipe({name:"beautifier",type:o,pure:!0}),o})();class X{constructor(n,e,t){this.forInlineView=n,this.forFullView=e,this.forFullEdit=t}}class q{constructor(n,e,t){this.forInlineView=n,this.forFullView=e,this.forFullEdit=t}}class ee{constructor(n,e,t){this.name=n,this.type=e,this.eventSource=t}}var R=(()=>{return(o=R||(R={})).VALUE_CHANGE="VALUE_CHANGE",o.SELECTION_CHANGE="SELECTION_CHANGE",R;var o})();class te{constructor(n,e,t){this.name=n,this.type=e,this.value=t}}let ge=(()=>{class o extends H{constructor(e,t){super(),this.modelMgr=e,this.storeMgr=t,this.valueChange=new s.EventEmitter,this.targetEntitiesPos=null,this.targetEntitiesProperty=null,this.options=new Array,null==e&&(this.modelMgr=v.dtcde.getModelManager()),null==t&&(this.storeMgr=v.dtcde.getStoreManager())}canProvide(e){return new q(!0,!1,!0)}providesTemplates(e){return new X(this.inlineView,null,this.fullEditView)}setTargetEntitiesWithName(e,t){const r=this.modelMgr.queryModelToSingle("$.creation.entities[?(@.name=='"+e+"')]");if(null==r)throw console.error("Cannot find an entity with name "+e+" in the model."),new Error("Cannot find an entity with name "+e+" in the model.");return this.targetEntitiesPos=r.pointer,null==this.targetEntitiesPos?Promise.resolve(!1):(this.targetEntitiesProperty=t??null,(0,f.z)(this.possibleValues()).then(i=>(this.options=i,!0)))}possibleValues(){if(null==this.targetEntitiesPos)throw new Error("Missing query of target entity for class "+this.constructor.name);const e=this.storeMgr.searchEntities(this.targetEntitiesPos);if(null!=this.targetEntitiesProperty){const t=this.targetEntitiesProperty;return e.pipe((0,x.U)(r=>r.map(i=>i[t])))}return e}listEventSources(){const e=super.listEventSources();return e.push(new ee("Value",R.VALUE_CHANGE,this.valueChange.asObservable())),e}valueChanged(e){this.valueChange.emit(new te("Value",R.VALUE_CHANGE,e.value))}setValue(e){null!=e&&null!=this.options&&-1==this.options.findIndex(t=>t==e)&&null!=this.options[1]&&(e=this.options[1].toString()),super.setValue(e)}}return o.\u0275fac=function(e){return new(e||o)(s.\u0275\u0275directiveInject(v.DontCodeModelManager,8),s.\u0275\u0275directiveInject(v.DontCodeStoreManager,8))},o.\u0275cmp=s.\u0275\u0275defineComponent({type:o,selectors:[["dontcode-reference"]],viewQuery:function(e,t){if(1&e&&(s.\u0275\u0275viewQuery(ue,7),s.\u0275\u0275viewQuery(ae,7)),2&e){let r;s.\u0275\u0275queryRefresh(r=s.\u0275\u0275loadQuery())&&(t.inlineView=r.first),s.\u0275\u0275queryRefresh(r=s.\u0275\u0275loadQuery())&&(t.fullEditView=r.first)}},outputs:{valueChange:"valueChange"},features:[s.\u0275\u0275InheritDefinitionFeature],decls:4,vars:0,consts:[["inlineView",""],["fullEditView",""],[3,"formGroup",4,"ngIf"],[3,"formGroup"],["placeholder","Select a reference",3,"options","formControlName","filter","showClear","lazy","onChange"],["pTemplate","selectedItem"],["pTemplate","item"],[4,"ngIf"]],template:function(e,t){1&e&&(s.\u0275\u0275template(0,ce,1,1,"ng-template",null,0,s.\u0275\u0275templateRefExtractor),s.\u0275\u0275template(2,me,1,1,"ng-template",null,1,s.\u0275\u0275templateRefExtractor))},dependencies:[N.NgIf,Q.Dropdown,le.PrimeTemplate,y.NgControlStatus,y.NgControlStatusGroup,y.FormGroupDirective,y.FormControlName],changeDetection:0}),o})();class Ce{constructor(){this.subscriptions=new P.w0,this.pluginHelper=new G,this.entityPointer=null,this.provider=null}unsubscribe(){this.pluginHelper.unsubscribe(),this.subscriptions.unsubscribe()}initCommandFlow(n,e){this.entityPointer=e,this.provider=n,this.pluginHelper.initCommandFlow(n,e,this)}initChangeListening(){this.pluginHelper.initChangeListening()}decomposeJsonToMultipleChanges(n,e){this.pluginHelper.decomposeJsonToMultipleChanges(n,e)}applyUpdatesToArray(n,e,t,r,i,l){return this.applyUpdatesToArrayAsync(n,e,t,r,(c,d)=>Promise.resolve(i(c,d)))}applyUpdatesToArrayAsync(n,e,t,r,i,l,c){return this.pluginHelper.applyUpdatesToArrayAsync(n,e,t,r,i,l,c)}performAction(n){return Promise.resolve(void 0)}}let _e=(()=>{class o{constructor(e,t){this.storeMgr=e,this.modelMgr=t,this.listsByPosition=new Map}retrieveListManager(e,t){let r=this.listsByPosition.get(e.position);return null==r&&(r=new ne(e,t,this.storeMgr,this.modelMgr),this.listsByPosition.set(e.position,r)),r}}return o.\u0275fac=function(e){return new(e||o)(s.\u0275\u0275inject(v.DontCodeStoreManager),s.\u0275\u0275inject(v.DontCodeModelManager))},o.\u0275prov=s.\u0275\u0275defineInjectable({token:o,factory:o.\u0275fac,providedIn:"root"}),o})();class ne{constructor(n,e,t,r){this.storeMgr=t,this.modelMgr=r,this.entities=null,this.prepared=null,this.pointer=n,this.description=e}push(n){this.entities=null==this.entities?new Array(n):[...this.entities,n]}updateWithDetailedEntity(n){const e=n._id,t=new Array;return null!=this.entities?(this.entities.forEach(r=>{r._id==e?(n={...n,...r},t.push(n)):t.push(r)}),this.entities=[...t]):this.entities=[n],n}replace(n){if(null==this.entities)return!1;const e=n._id;let t=!1;const r=new Array;return this.entities.forEach(i=>{i._id==e?(r.push(n),t=!0):r.push(i)}),this.entities=[...r],t}remove(n){if(null==this.entities)return Promise.resolve(!1);const e=n._id;return null==e?new Promise(t=>{null!=this.entities?(this.entities=this.entities.filter(r=>r!==n),this.prepared=null,t(!0)):t(!1)}):this.storeMgr.deleteEntity(this.pointer.position,e).then(t=>(t&&null!=this.entities&&(this.entities=this.entities.filter(r=>r!==n),this.prepared=null),t)).catch(t=>(console.error(t.message),!1))}reset(){null!=this.entities&&(this.entities.length=0),this.prepared=null}store(n){return this.prepared=null,this.storeMgr.storeEntity(this.pointer.position,n)}storeAllChanged(){var n=this;return(0,b.Z)(function*(){if(null!=n.entities){n.prepared=null;for(const e of n.entities)yield n.storeMgr.storeEntity(n.pointer.position,e)}})()}loadAll(){return(0,f.z)(this.storeMgr.searchEntities(this.pointer.position).pipe((0,x.U)(n=>{this.prepared=null,this.entities=[...n]})),{defaultValue:void 0})}searchAndPrepareEntities(n,e,t,...r){let i=null!=n?Object.values(n):[];const l=i.length>0?i[0]:void 0;i=null!=e?Object.values(e):[];const c=i.length>0?new v.DontCodeStoreGroupby(i[0].of,i[0].display,i[0].show):void 0;if(null!=this.entities){this.prepared=null;let E,d=this.entities;return null!=r&&(d=v.StoreProviderHelper.applyFilters(d,...r)),null!=l&&(d=v.StoreProviderHelper.multiSortArray(d,l)),null!=c&&(E=v.StoreProviderHelper.calculateGroupedByValues(d,c,this.modelMgr,this.pointer)),(null!=r||null!=n||null!=e)&&(this.prepared=new v.DontCodeStorePreparedEntities(d,l,E)),Promise.resolve()}return(0,f.z)(this.storeMgr.searchAndPrepareEntities(this.pointer.position,l,c,t,...r).pipe((0,x.U)(d=>{this.prepared=d,this.entities=this.prepared.sortedData})))}loadDetailFromKey(n){return null==n?Promise.reject("Cannot load entity with null key"):this.storeMgr.loadEntity(this.pointer.position,n).then(e=>null!=e?this.updateWithDetailedEntity(e):e)}loadDetailOf(n){return this.loadDetailFromKey(n._id)}}let Ee=(()=>{class o{constructor(e){this.modelMgr=e}getContent(){return this.modelMgr.getContent()}resetContent(e){this.modelMgr.resetContent(e)}findAtPosition(e,t){return this.modelMgr.findAtPosition(e,t)}queryModelToArray(e,t){return this.modelMgr.queryModelToArray(e,t)}queryModelToSingle(e,t){return this.modelMgr.queryModelToSingle(e,t)}findAllPossibleTargetsOfProperty(e,t,r){return this.modelMgr.findAllPossibleTargetsOfProperty(e,t,r)}findTargetOfProperty(e,t,r){return this.modelMgr.findTargetOfProperty(e,t,r)}}return o.\u0275fac=function(e){return new(e||o)(s.\u0275\u0275inject(v.DontCodeModelManager))},o.\u0275prov=s.\u0275\u0275defineInjectable({token:o,factory:o.\u0275fac,providedIn:"root"}),o})(),re=(()=>{class o{static forRoot(){return{ngModule:o,providers:[{provide:B,useValue:v.dtcde},{provide:v.DontCodeSchemaManager,useValue:v.dtcde.getSchemaManager()},{provide:v.DontCodeModelManager,useValue:v.dtcde.getModelManager()},{provide:v.DontCodePreviewManager,useValue:v.dtcde.getPreviewManager()},{provide:v.DontCodeStoreManager,useValue:v.dtcde.getStoreManager()},{provide:v.DontCodeChangeManager,useValue:v.dtcde.getChangeManager()},Y]}}}return o.\u0275fac=function(e){return new(e||o)},o.\u0275mod=s.\u0275\u0275defineNgModule({type:o}),o.\u0275inj=s.\u0275\u0275defineInjector({imports:[N.CommonModule,Q.DropdownModule,y.ReactiveFormsModule]}),o})();class we{static registerComponentForType(n,e,t){v.dtcde.registerPlugin(new be({forType:n,name:e})),I.previewHandlers.set(e,t)}}class be{constructor(n){this.testComponents=null,this.CONFIG={plugin:{id:"CommonTestManagerPlugin",version:"1.0"},"schema-updates":[{id:"test-component",description:"Test Component added",changes:[{location:{parent:"#/$defs/field",id:"type"},update:{enum:[{Test:{enum:[]}}]},replace:!1}]}],"preview-handlers":[]},this.PREVIEW_HANDLER_CONFIG={location:{parent:v.DontCodeModel.APP_FIELDS,id:"type",values:[{Test:{enum:[]}}]},class:{source:"common-test-module",name:"name"}},this.testComponents=n}getConfiguration(){if(null!=this.testComponents){const n=structuredClone(this.CONFIG),e=structuredClone(this.PREVIEW_HANDLER_CONFIG);if(null!=n["schema-updates"]&&null!=n["preview-handlers"])return n["schema-updates"][0].id=this.testComponents.name,n["schema-updates"][0].changes[0].update.enum[0].Test.enum.push(this.testComponents.forType),e.class.name=this.testComponents.name,e.location.values[0].Test.enum.push(this.testComponents.forType),n["preview-handlers"].push(e),n}throw new Error("No testComponent to register")}pluginInit(n){}}class I{exposedPreviewHandlers(){return I.previewHandlers}}I.previewHandlers=new Map,I.\u0275fac=function(n){return new(n||I)},I.\u0275mod=(s.\u0275\u0275registerNgModuleType(I,"dontcode-plugin/common-test-module"),s.\u0275\u0275defineNgModule({type:I,id:"dontcode-plugin/common-test-module"})),I.\u0275inj=s.\u0275\u0275defineInjector({imports:[N.CommonModule,re]})},5861:(A,M,a)=>{function b(y,P,h,C,p,f,_){try{var m=y[f](_),u=m.value}catch(g){return void h(g)}m.done?P(u):Promise.resolve(u).then(C,p)}function s(y){return function(){var P=this,h=arguments;return new Promise(function(C,p){var f=y.apply(P,h);function _(u){b(f,C,p,_,m,"next",u)}function m(u){b(f,C,p,_,m,"throw",u)}_(void 0)})}}a.d(M,{Z:()=>s})}}]);