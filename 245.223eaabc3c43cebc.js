(self.webpackChunkpreview_ui=self.webpackChunkpreview_ui||[]).push([[245],{4707:(A,w,u)=>{u.d(w,{t:()=>P});var o=u(7579),p=u(6063);class P extends o.x{constructor(f=1/0,g=1/0,c=p.l){super(),this._bufferSize=f,this._windowTime=g,this._timestampProvider=c,this._buffer=[],this._infiniteTimeWindow=!0,this._infiniteTimeWindow=g===1/0,this._bufferSize=Math.max(1,f),this._windowTime=Math.max(1,g)}next(f){const{isStopped:g,_buffer:c,_infiniteTimeWindow:m,_timestampProvider:C,_windowTime:v}=this;g||(c.push(f),!m&&c.push(C.now()+v)),this._trimBuffer(),super.next(f)}_subscribe(f){this._throwIfClosed(),this._trimBuffer();const g=this._innerSubscribe(f),{_infiniteTimeWindow:c,_buffer:m}=this,C=m.slice();for(let v=0;v<C.length&&!f.closed;v+=c?1:2)f.next(C[v]);return this._checkFinalizedStatuses(f),g}_trimBuffer(){const{_bufferSize:f,_timestampProvider:g,_buffer:c,_infiniteTimeWindow:m}=this,C=(m?1:2)*f;if(f<1/0&&C<c.length&&c.splice(0,c.length-C),!m){const v=g.now();let a=0;for(let y=1;y<c.length&&c[y]<=v;y+=2)a=y;a&&c.splice(0,a+1)}}}},7579:(A,w,u)=>{u.d(w,{u:()=>m,x:()=>c});var o=u(9751),p=u(727);const D=(0,u(3888).d)(C=>function(){C(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var f=u(8737),g=u(2806);let c=(()=>{class C extends o.y{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(a){const y=new m(this,this);return y.operator=a,y}_throwIfClosed(){if(this.closed)throw new D}next(a){(0,g.x)(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(const y of this.currentObservers)y.next(a)}})}error(a){(0,g.x)(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=a;const{observers:y}=this;for(;y.length;)y.shift().error(a)}})}complete(){(0,g.x)(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;const{observers:a}=this;for(;a.length;)a.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var a;return(null===(a=this.observers)||void 0===a?void 0:a.length)>0}_trySubscribe(a){return this._throwIfClosed(),super._trySubscribe(a)}_subscribe(a){return this._throwIfClosed(),this._checkFinalizedStatuses(a),this._innerSubscribe(a)}_innerSubscribe(a){const{hasError:y,isStopped:x,observers:O}=this;return y||x?p.Lc:(this.currentObservers=null,O.push(a),new p.w0(()=>{this.currentObservers=null,(0,f.P)(O,a)}))}_checkFinalizedStatuses(a){const{hasError:y,thrownError:x,isStopped:O}=this;y?a.error(x):O&&a.complete()}asObservable(){const a=new o.y;return a.source=this,a}}return C.create=(v,a)=>new m(v,a),C})();class m extends c{constructor(v,a){super(),this.destination=v,this.source=a}next(v){var a,y;null===(y=null===(a=this.destination)||void 0===a?void 0:a.next)||void 0===y||y.call(a,v)}error(v){var a,y;null===(y=null===(a=this.destination)||void 0===a?void 0:a.error)||void 0===y||y.call(a,v)}complete(){var v,a;null===(a=null===(v=this.destination)||void 0===v?void 0:v.complete)||void 0===a||a.call(v)}_subscribe(v){var a,y;return null!==(y=null===(a=this.source)||void 0===a?void 0:a.subscribe(v))&&void 0!==y?y:p.Lc}}},3905:(A,w,u)=>{u.d(w,{z:()=>P});var o=u(6805),p=u(930);function P(D,f){const g="object"==typeof f;return new Promise((c,m)=>{const C=new p.Hp({next:v=>{c(v),C.unsubscribe()},error:m,complete:()=>{g?c(f.defaultValue):m(new o.K)}});D.subscribe(C)})}},515:(A,w,u)=>{u.d(w,{E:()=>p});const p=new(u(9751).y)(f=>f.complete())},9646:(A,w,u)=>{u.d(w,{of:()=>P});var o=u(3269),p=u(2076);function P(...D){const f=(0,o.yG)(D);return(0,p.D)(D,f)}},262:(A,w,u)=>{u.d(w,{K:()=>D});var o=u(8421),p=u(5403),P=u(4482);function D(f){return(0,P.e)((g,c)=>{let v,m=null,C=!1;m=g.subscribe((0,p.x)(c,void 0,void 0,a=>{v=(0,o.Xf)(f(a,D(f)(g))),m?(m.unsubscribe(),m=null,v.subscribe(c)):C=!0})),C&&(m.unsubscribe(),m=null,v.subscribe(c))})}},4004:(A,w,u)=>{u.d(w,{U:()=>P});var o=u(4482),p=u(5403);function P(D,f){return(0,o.e)((g,c)=>{let m=0;g.subscribe((0,p.x)(c,C=>{c.next(D.call(f,C,m++))}))})}},2035:(A,w,u)=>{u.d(w,{h:()=>D});var o=u(515),p=u(4482),P=u(5403);function D(f){return f<=0?()=>o.E:(0,p.e)((g,c)=>{let m=[];g.subscribe((0,P.x)(c,C=>{m.push(C),f<m.length&&m.shift()},()=>{for(const C of m)c.next(C);c.complete()},void 0,()=>{m=null}))})}},6063:(A,w,u)=>{u.d(w,{l:()=>o});const o={now:()=>(o.delegate||Date).now(),delegate:void 0}},6805:(A,w,u)=>{u.d(w,{K:()=>p});const p=(0,u(3888).d)(P=>function(){P(this),this.name="EmptyError",this.message="no elements in sequence"})},3269:(A,w,u)=>{u.d(w,{_6:()=>g,jO:()=>D,yG:()=>f});var o=u(576),p=u(3532);function P(c){return c[c.length-1]}function D(c){return(0,o.m)(P(c))?c.pop():void 0}function f(c){return(0,p.K)(P(c))?c.pop():void 0}function g(c,m){return"number"==typeof P(c)?c.pop():m}},4245:(A,w,u)=>{u.r(w),u.d(w,{AbstractDynamicComponent:()=>j,AbstractDynamicLoaderComponent:()=>$,AbstractPluginHandler:()=>ge,AbstractReferenceComponent:()=>ye,BaseDynamicEvent:()=>ee,BaseDynamicEventSource:()=>q,BeautifierPipe:()=>Y,COMMAND_PROVIDER:()=>Q,ComponentLoaderService:()=>W,DONT_CODE_CORE:()=>B,DONT_CODE_DOC_API_URL:()=>ve,DONT_CODE_STORE_API_URL:()=>me,DynamicEventType:()=>V,DynamicInsertPoint:()=>z,EntityListManager:()=>te,EntityStoreService:()=>_e,PluginBaseComponent:()=>J,PluginCommonModule:()=>Ee,PluginHandlerHelper:()=>N,PossibleTemplateList:()=>Z,SubFieldInfo:()=>U,TemplateList:()=>X,ValueService:()=>Ce});var o=u(549),p=u(7022),P=u(727),D=u(4707),f=u(9646),g=u(2076),c=u(3905),m=u(6805);new Error("timeout while waiting for mutex to become available"),new Error("mutex already locked");const y=new Error("request for lock canceled");class O{constructor(n,e=y){this._value=n,this._cancelError=e,this._weightedQueues=[],this._weightedWaiters=[]}acquire(n=1){if(n<=0)throw new Error(`invalid weight ${n}: must be positive`);return new Promise((e,t)=>{this._weightedQueues[n-1]||(this._weightedQueues[n-1]=[]),this._weightedQueues[n-1].push({resolve:e,reject:t}),this._dispatch()})}runExclusive(n,e=1){return function(i,n,e,t){return new(e||(e=Promise))(function(s,l){function d(b){try{_(t.next(b))}catch(M){l(M)}}function h(b){try{_(t.throw(b))}catch(M){l(M)}}function _(b){b.done?s(b.value):function r(s){return s instanceof e?s:new e(function(l){l(s)})}(b.value).then(d,h)}_((t=t.apply(i,n||[])).next())})}(this,void 0,void 0,function*(){const[t,r]=yield this.acquire(e);try{return yield n(t)}finally{r()}})}waitForUnlock(n=1){if(n<=0)throw new Error(`invalid weight ${n}: must be positive`);return new Promise(e=>{this._weightedWaiters[n-1]||(this._weightedWaiters[n-1]=[]),this._weightedWaiters[n-1].push(e),this._dispatch()})}isLocked(){return this._value<=0}getValue(){return this._value}setValue(n){this._value=n,this._dispatch()}release(n=1){if(n<=0)throw new Error(`invalid weight ${n}: must be positive`);this._value+=n,this._dispatch()}cancel(){this._weightedQueues.forEach(n=>n.forEach(e=>e.reject(this._cancelError))),this._weightedQueues=[]}_dispatch(){var n;for(let e=this._value;e>0;e--){const t=null===(n=this._weightedQueues[e-1])||void 0===n?void 0:n.shift();if(!t)continue;const r=this._value,s=e;this._value-=e,e=this._value+1,t.resolve([r,this._newReleaser(s)])}this._drainUnlockWaiters()}_newReleaser(n){let e=!1;return()=>{e||(e=!0,this.release(n))}}_drainUnlockWaiters(){for(let n=this._value;n>0;n--)this._weightedWaiters[n-1]&&(this._weightedWaiters[n-1].forEach(e=>e()),this._weightedWaiters[n-1]=[])}}class H{constructor(n){this._semaphore=new O(1,n)}acquire(){return i=this,n=void 0,t=function*(){const[,n]=yield this._semaphore.acquire();return n},new((e=void 0)||(e=Promise))(function(s,l){function d(b){try{_(t.next(b))}catch(M){l(M)}}function h(b){try{_(t.throw(b))}catch(M){l(M)}}function _(b){b.done?s(b.value):function r(s){return s instanceof e?s:new e(function(l){l(s)})}(b.value).then(d,h)}_((t=t.apply(i,n||[])).next())});var i,n,e,t}runExclusive(n){return this._semaphore.runExclusive(()=>n())}isLocked(){return this._semaphore.isLocked()}waitForUnlock(){return this._semaphore.waitForUnlock()}release(){this._semaphore.isLocked()&&this._semaphore.release()}cancel(){return this._semaphore.cancel()}}var E=u(4459),R=u(4004),ie=u(2035),oe=u(262),G=u(6674),k=u(7863),se=u(3134);const le=["inlineView"],ue=["fullEditView"];function ae(i,n){if(1&i&&o.\u0275\u0275text(0),2&i){const e=o.\u0275\u0275nextContext();o.\u0275\u0275textInterpolate(e.value)}}function ce(i,n){if(1&i&&(o.\u0275\u0275elementStart(0,"div"),o.\u0275\u0275text(1),o.\u0275\u0275elementEnd()),2&i){const e=o.\u0275\u0275nextContext(4);o.\u0275\u0275advance(1),o.\u0275\u0275textInterpolate1(" ",e.value," ")}}function de(i,n){if(1&i&&o.\u0275\u0275template(0,ce,2,1,"div",7),2&i){const e=o.\u0275\u0275nextContext(3);o.\u0275\u0275property("ngIf",e.value)}}function fe(i,n){1&i&&o.\u0275\u0275text(0),2&i&&o.\u0275\u0275textInterpolate1(" ",n.$implicit," ")}function he(i,n){if(1&i){const e=o.\u0275\u0275getCurrentView();o.\u0275\u0275elementContainerStart(0,3),o.\u0275\u0275elementStart(1,"p-dropdown",4),o.\u0275\u0275listener("onChange",function(r){o.\u0275\u0275restoreView(e);const s=o.\u0275\u0275nextContext(2);return o.\u0275\u0275resetView(s.valueChanged(r))}),o.\u0275\u0275template(2,de,1,1,"ng-template",5),o.\u0275\u0275template(3,fe,1,1,"ng-template",6),o.\u0275\u0275elementEnd(),o.\u0275\u0275elementContainerEnd()}if(2&i){const e=o.\u0275\u0275nextContext(2);o.\u0275\u0275property("formGroup",e.form),o.\u0275\u0275advance(1),o.\u0275\u0275property("options",e.options)("formControlName",e.name)("filter",!0)("showClear",!0)("lazy",!0)}}function pe(i,n){if(1&i&&o.\u0275\u0275template(0,he,4,6,"ng-container",2),2&i){const e=o.\u0275\u0275nextContext();o.\u0275\u0275property("ngIf",e.form)}}let j=(()=>{class i{constructor(){this.parentPosition=null,this.subscriptions=new P.w0}setName(e){this.name=e}getValue(){return null!=this.form&&this.updateValueFromForm(),this.value}setValue(e){this.value=e,null!=this.form&&this.hydrateValueToForm()}setParentPosition(e){this.parentPosition=e}setForm(e){this.form=e,null!=this.form&&null!=this.name&&this.createAndRegisterFormControls()}getForm(){return this.form}createAndRegisterFormControls(){const e=new p.FormControl(null,{updateOn:"blur"});this.form.registerControl(this.name,e)}transformToFormGroupValue(e){return e}transformFromFormGroupValue(e){return e}hydrateValueToForm(){if(null!=this.name){const e=this.form.get(this.name);if(null==e)throw new Error("No form control for the name "+this.name);{const t=this.transformToFormGroupValue(this.value);e.setValue(t,{emitEvent:!1})}}}updateValueFromForm(){if(null==this.name)return!1;const e=this.form.get(this.name);if(null==e)throw new Error("No form control for the name "+this.name);return!!e.dirty&&(this.value=this.transformFromFormGroupValue(e.value),e.markAsPristine({onlySelf:!0}),!0)}static toBeautifyString(e,t){if(null==e)return null;let r="";switch(Array.isArray(e)&&(e=e[0]),typeof e){case"string":r=e;break;case"object":r=e instanceof Date?e.toLocaleDateString():JSON.stringify(e,null,2);break;case"undefined":break;default:r=e.toLocaleString()}return null!=t&&r.length>t&&(r=r.substring(0,t-3)+"..."),r}listEventSources(){return[]}selectEventSourceFor(e,t){const r=this.listEventSources();for(const s of r)if(s.type===e){if(null==t)return s;if(s.name==t)return s}return null}ngOnDestroy(){this.subscriptions.unsubscribe()}}return i.\u0275fac=function(e){return new(e||i)},i.\u0275cmp=o.\u0275\u0275defineComponent({type:i,selectors:[["ng-component"]],decls:0,vars:0,template:function(e,t){},encapsulation:2}),i})(),Q=new o.InjectionToken("Inject the current command provider interface");const B=new o.InjectionToken("Dont-code core object"),me=new o.InjectionToken("DontCodeStoreApiUrl"),ve=new o.InjectionToken("DontCodeStoreDocUrl");let W=(()=>{class i{constructor(e,t,r,s){this.injector=e,this.dontCodeCore=t,this.previewMgr=r,this.provider=s,this.moduleMap=new Map,this.mutex=new H}getOrCreatePluginModuleRef(e){return this.mutex.acquire().then(t=>{try{let r=this.moduleMap.get(e);return r||(r=(0,o.createNgModule)((0,o.getNgModuleById)("dontcode-plugin/"+e),this.injector),r&&this.moduleMap.set(e,r)),r}finally{t()}})}loadPluginModule(e){return this.getOrCreatePluginModuleRef(e.class.source).then(t=>(null!=t&&this.dontCodeCore.initPlugins(),t))}insertComponentForFieldType(e,t){return this.insertComponent("creation/entities/fields/type",t,e)}insertComponent(e,t,r){let l,s=e.positionInSchema;s?(l=!0,r||(r=this.provider?.getJsonAt(e.position))):(l=!1,s=e);const d=this.previewMgr.retrieveHandlerConfig(s,r);return d?(console.debug("Importing from ",d.class.source),this.loadPluginModule(d).then(h=>{const _=h.instance.exposedPreviewHandlers().get(d.class.name);return this.createComponent(_,t,h,l?e:null)}).catch(h=>(console.error("Cannot load module because of ",h),Promise.reject("Cannot load module for source "+d.class.source+" because of "+h)))):Promise.resolve(null)}createComponent(e,t,r,s){const h=t.createComponent(e,{injector:this.injector,ngModuleRef:r}).instance;if(h.initCommandFlow){if(!s)throw new Error("Component "+h.constructor.name+" is a PreviewHandler and parent position is missing.");if(!this.provider)throw new Error("Component "+h.constructor.name+" is a PreviewHandler and CommandProviderInterface is missing.");h.initCommandFlow(this.provider,s)}return h}}return i.\u0275fac=function(e){return new(e||i)(o.\u0275\u0275inject(o.Injector),o.\u0275\u0275inject(B),o.\u0275\u0275inject(E.DontCodePreviewManager),o.\u0275\u0275inject(Q,8))},i.\u0275prov=o.\u0275\u0275defineInjectable({token:i,factory:i.\u0275fac,providedIn:"root"}),i})(),z=(()=>{class i{}return i.\u0275fac=function(e){return new(e||i)},i.\u0275dir=o.\u0275\u0275defineDirective({type:i,selectors:[["dtcde-dynamic"]]}),i})(),$=(()=>{class i extends j{constructor(e,t,r){super(),this.loader=e,this.injector=t,this.ref=r,this.fields=new Array,this.fieldsMap=new Map,this.parentForm=null,this.componentInited=new D.t}defineSubField(e,t){const r=new U(e,t);this.addSubField(r)}getSubField(e){const t=this.fieldsMap.get(e);if(null!=t)return this.fields[t]}addSubField(e){const t=this.fields.push(e);return this.fieldsMap.set(e.name,t-1),t}getSubFields(){return this.fields}setForm(e){if(this.name){const t=new p.FormGroup({},{updateOn:"blur"});e.registerControl(this.name,t),super.setForm(t),this.parentForm=e}else super.setForm(e),this.parentForm=null;this.preloadSubFields()}hydrateValueToForm(){if(null==this.parentForm)super.hydrateValueToForm();else{let e=this.transformToFormGroupValue(this.value);for(const t in this.form.controls)null==this.fieldsMap.get(t)&&this.form.get(t)?.setValue(e&&e[t],{emitEvent:!1})}}updateValueFromForm(){if(null==this.parentForm)return super.updateValueFromForm();{let e=!1;for(const t in this.form.controls)if(null==this.fieldsMap.get(t)){const r=this.form.get(t);if(null!=r&&r.dirty){const s=this.transformFromFormGroupValue(r?.value);null==this.value&&(this.value={}),this.value[t]=s,e=!0,r.markAsPristine({onlySelf:!0})}}return e}}setValue(e){super.setValue(e);for(const t of this.fields)this.setSubFieldValue(t,null!=e?e[t.name]:void 0)}getValue(){let e=super.getValue();for(const t of this.fields){const r=this.getSubFieldValue(t);null!=r&&null==e&&(this.value={},e=this.value),e[t.name]!==r&&(e[t.name]=r)}return e}subFieldFullEditTemplate(e){const t="string"==typeof e?this.getSubField(e):e,r=t?.component;let s=null;if(null!=r&&(s=r.providesTemplates(t?.type).forFullEdit),null==e)throw new Error("No template for subField "+t?.name+" of component "+this.name);return s}subFieldInlineViewTemplate(e){const t="string"==typeof e?this.getSubField(e):e,r=t?.component;let s=null;if(null!=r&&(s=r.providesTemplates(t?.type).forInlineView),null==e)throw new Error("No template for subField "+t?.name+" of component "+this.name);return s}subFieldFullViewTemplate(e){const t="string"==typeof e?this.getSubField(e):e,r=t?.component;let s=null;if(null!=r&&(s=r.providesTemplates(t?.type).forFullView),null==e)throw new Error("No template for subField "+t?.name+" of component "+this.name);return s}loadSubField(e,t,r){const s="string"==typeof e?this.getSubField(e):e,l=s?.component;return null==l?this.loader.insertComponentForFieldType(t,this.dynamicInsertPoint).then(d=>null!=d?(this.prepareComponent(d,t,null!=s?s.name:null,r),d):null):Promise.resolve(l)}getSubFieldValue(e){const t="string"==typeof e?this.getSubField(e):e,r=t?.component;if(null!=r)return r.getValue();if(null!=this.form&&null!=t)return this.form.get(t.name)?.value;throw new Error("Cannot provide value for non existent subField "+e)}setSubFieldValue(e,t){const r="string"==typeof e?this.getSubField(e):e,s=r?.component;if(null!=s)s.setValue(t);else if(null!=this.form&&null!=r){const l={};let d=i.toBeautifyString(t);null==d&&(d=null),l[r.name]=d,this.form.patchValue(l,{emitEvent:!1})}}loadSubComponent(e,t,r,s){return new Promise((l,d)=>this.componentInited.subscribe({complete:()=>{l()},error:h=>{d(h)}})).then(()=>(console.debug("LoadSubComponent:"+e.position+" with type "+t,this.dynamicInsertPoint),null==this.dynamicInsertPoint?null:this.loader.insertComponent(e,this.dynamicInsertPoint,s).then(l=>null!=l?this.prepareComponent(l,t,r,s):null)))}prepareComponent(e,t,r,s){return r&&(null!=this.form&&(e.setName(r),e.setForm(this.form)),e.setValue(s)),e}applyComponentToSubField(e,t,r){let s=this.getSubField(r);return null==s?(s=new U(r,t,e),this.addSubField(s),!0):(s.component=e,!1)}ngAfterViewInit(){this.componentInited.complete(),this.preloadSubFields()}preloadSubFields(){if(null!=this.dynamicInsertPoint){let e=!1;for(const t of this.fields)null==t.component&&this.loadSubField(t.name,t.type,this.value?this.value[t.name]:void 0).then(s=>{null!=s&&this.applyComponentToSubField(s,t.type,t.name),null!=this.value&&!e&&(this.ref.detectChanges(),e=!0)})}}}return i.\u0275fac=function(e){return new(e||i)(o.\u0275\u0275directiveInject(W),o.\u0275\u0275directiveInject(o.Injector),o.\u0275\u0275directiveInject(o.ChangeDetectorRef))},i.\u0275cmp=o.\u0275\u0275defineComponent({type:i,selectors:[["ng-component"]],viewQuery:function(e,t){if(1&e&&o.\u0275\u0275viewQuery(z,5,o.ViewContainerRef),2&e){let r;o.\u0275\u0275queryRefresh(r=o.\u0275\u0275loadQuery())&&(t.dynamicInsertPoint=r.first)}},features:[o.\u0275\u0275InheritDefinitionFeature],decls:0,vars:0,template:function(e,t){},encapsulation:2}),i})();class U{constructor(n,e,t){this.name=n,this.type=e,this.component=t}}class N{constructor(){this.subscriptions=new P.w0,this.entityPointer=null,this.provider=null,this.mutex=new H}initCommandFlow(n,e,t){this.entityPointer=e,this.provider=n,this.changeHandler=t}decomposeJsonToMultipleChanges(n,e){if("object"==typeof e&&this.provider){let t;const r=this.provider.getSchemaManager();for(const s in e)if(e.hasOwnProperty(s)){const l=r.generateSubSchemaPointer(n,s),d=r.locateItem(l.positionInSchema);d?.isArray()&&l.isProperty?this.decomposeJsonToMultipleChanges(l,e[s]):(t=new E.Change(E.ChangeType.RESET,n.position+"/"+s,e[s],l),!d&&t.pointer&&(t.pointer.isProperty=!1),this.changeHandler&&this.changeHandler.handleChange(t))}}}initChangeListening(n){if(!this.provider||!this.entityPointer)throw new Error("Cannot listen to change before initCommandFlow is called");{let e=this.entityPointer.position;!0!==n&&(e+="/?"),this.subscriptions.add(this.provider.receiveCommands(e).pipe((0,R.U)(t=>{this.changeHandler&&this.changeHandler.handleChange(t)})).subscribe())}}applyUpdatesToArray(n,e,t,r,s,l){return this.applyUpdatesToArrayAsync(n,e,t,r,(d,h)=>Promise.resolve(s(d,h)))}applyUpdatesToArrayAsync(n,e,t,r,s,l){return this.mutex.runExclusive(()=>{try{if(!this.provider)throw new Error("Cannot apply updates before initCommandFlow is called");t.pointer||(t.pointer=this.provider.calculatePointerFor(t.position));let d=this.entityPointer?.position;null!=r&&(d=d+"/"+r);const h=t.pointer.containerPosition===d;let _=h?t.pointer.lastElement:E.DontCodeModelPointer.lastElementOf(t.pointer.containerPosition)??null,b=t.pointer.isProperty?t.pointer.lastElement:null,M=null,L=null,T=-1,F=-1;switch(null!=_&&e.has(_)&&(T=e.get(_),L=n[T],M=(0,f.of)(L)),t.beforeKey&&(F=e.get(t.beforeKey)),t.type){case E.ChangeType.ADD:case E.ChangeType.UPDATE:case E.ChangeType.RESET:if(null!=b){if(!L||L&&(!l||!l(L,b,t.value))){const S=this.provider.getJsonAt(t.pointer.containerPosition),I=this.provider.calculatePointerFor(t.pointer.containerPosition);if(I.isProperty)throw new Error("A parent of a property "+t.pointer.position+" must be an array");M=(0,g.D)(s(I,S))}}else M=(0,g.D)(s(t.pointer,t.value));break;case E.ChangeType.MOVE:-1!==T&&h&&_&&(-1!==F&&F>T&&F--,n.splice(T,1),e.forEach((S,I)=>{S>T&&e.set(I,S-1)}),e.delete(_),T=-1);break;case E.ChangeType.DELETE:-1!==T&&h&&_&&(n.splice(T,1),e.forEach((S,I)=>{S>T&&e.set(I,S-1)}),e.delete(_)),M=null}return M?(0,c.z)(M.pipe((0,R.U)(S=>{if(-1!==T)n[T]=S;else if(-1!==F){if(n.splice(F,0,S),e.forEach((I,be)=>{I>=F&&e.set(be,I+1)}),null==_)throw new Error("Cannot set targetPos "+F+" without knowing the itemId");e.set(_,F)}else{if(n.push(S),null==_)throw new Error("Cannot set targetPos "+F+" without knowing the itemId");e.set(_,e.size)}return n}),(0,ie.h)(1),(0,oe.K)(S=>Promise.reject(S)))):Promise.resolve(n)}catch(d){return Promise.reject(d)}})}unsubscribe(){this.subscriptions.unsubscribe()}}let J=(()=>{class i extends ${constructor(e,t,r){super(e,t,r),this.pluginHelper=new N,this.entityPointer=null,this.provider=null}ngOnDestroy(){this.pluginHelper.unsubscribe(),super.ngOnDestroy()}updateValueOnFormChanges(){this.subscriptions.add(this.form.valueChanges.pipe((0,R.U)(e=>(console.debug("Value changed",e),this.getValue(),e))).subscribe())}initCommandFlow(e,t){this.entityPointer=t,this.provider=e,this.pluginHelper.initCommandFlow(e,t,this)}initChangeListening(e){this.pluginHelper.initChangeListening(e)}decomposeJsonToMultipleChanges(e,t){this.pluginHelper.decomposeJsonToMultipleChanges(e,t)}decodeStringField(e,t){if(e.pointer?.lastElement===t)return e.value}applyUpdatesToArray(e,t,r,s,l,d){return this.applyUpdatesToArrayAsync(e,t,r,s,(h,_)=>Promise.resolve(l(h,_)))}applyUpdatesToArrayAsync(e,t,r,s,l,d){return this.pluginHelper.applyUpdatesToArrayAsync(e,t,r,s,l,d)}updateSubFieldsWithChange(e,t){return this.applyUpdatesToArrayAsync(this.fields,this.fieldsMap,e,t,(r,s)=>this.loadSubComponent(r,s.type,s.name).then(l=>new U(s.name,s.type,l??void 0)),(r,s,l)=>s===E.DontCodeModel.APP_FIELDS_NAME_NODE&&(r.name=l,!0)).then(r=>(this.fields=r,this.rebuildForm(),r))}rebuildForm(){if(null==this.form)return;const e=new Set;for(const t in this.form.controls)e.add(t);for(const t of this.fields){let r=null;this.value&&this.value[t.name]&&(r=this.value[t.name]),e.delete(t.name),null!=t.component?t.component?.setValue(r):(r=i.toBeautifyString(r),this.form.registerControl(t.name,new p.FormControl(r,p.Validators.required)))}e.forEach(t=>{this.form.removeControl(t)})}}return i.\u0275fac=function(e){return new(e||i)(o.\u0275\u0275directiveInject(W),o.\u0275\u0275directiveInject(o.Injector),o.\u0275\u0275directiveInject(o.ChangeDetectorRef))},i.\u0275cmp=o.\u0275\u0275defineComponent({type:i,selectors:[["ng-component"]],features:[o.\u0275\u0275InheritDefinitionFeature],decls:0,vars:0,template:function(e,t){},encapsulation:2}),i})(),Y=(()=>{class i{transform(e,...t){return J.toBeautifyString(e,t[0])}}return i.\u0275fac=function(e){return new(e||i)},i.\u0275pipe=o.\u0275\u0275definePipe({name:"beautifier",type:i,pure:!0}),i})();class X{constructor(n,e,t){this.forInlineView=n,this.forFullView=e,this.forFullEdit=t}}class Z{constructor(n,e,t){this.forInlineView=n,this.forFullView=e,this.forFullEdit=t}}class q{constructor(n,e,t){this.name=n,this.type=e,this.eventSource=t}}var V=(()=>{return(i=V||(V={})).VALUE_CHANGE="VALUE_CHANGE",i.SELECTION_CHANGE="SELECTION_CHANGE",V;var i})();class ee{constructor(n,e,t){this.name=n,this.type=e,this.value=t}}let ye=(()=>{class i extends j{constructor(e,t){super(),this.modelMgr=e,this.storeMgr=t,this.valueChange=new o.EventEmitter,this.targetEntitiesPos=null,this.targetEntitiesProperty=null,this.options=new Array,null==e&&(this.modelMgr=E.dtcde.getModelManager()),null==t&&(this.storeMgr=E.dtcde.getStoreManager())}canProvide(e){return new Z(!0,!1,!0)}providesTemplates(e){return new X(this.inlineView,null,this.fullEditView)}setTargetEntitiesWithName(e,t){return this.targetEntitiesPos=this.modelMgr.queryModelToSingle("$.creation.entities[?(@.name=='"+e+"')]").pointer,null!=this.targetEntitiesPos&&(this.targetEntitiesProperty=t??null,this.subscriptions.add(this.possibleValues().subscribe({next:s=>{this.options=s},error:s=>{this.options=["Error",s.toString()]}})),!0)}possibleValues(){if(null==this.targetEntitiesPos)throw new Error("Missing query of target entity for class "+this.constructor.name);const e=this.storeMgr.searchEntities(this.targetEntitiesPos);if(null!=this.targetEntitiesProperty){const t=this.targetEntitiesProperty;return e.pipe((0,R.U)(r=>r.map(s=>s[t])))}return e}listEventSources(){const e=super.listEventSources();return e.push(new q("Value",V.VALUE_CHANGE,this.valueChange.asObservable())),e}valueChanged(e){this.valueChange.emit(new ee("Value",V.VALUE_CHANGE,e.value))}setValue(e){null!=e&&null!=this.options&&-1==this.options.findIndex(t=>t==e)&&null!=this.options[1]&&(e=this.options[1].toString()),super.setValue(e)}}return i.\u0275fac=function(e){return new(e||i)(o.\u0275\u0275directiveInject(E.DontCodeModelManager,8),o.\u0275\u0275directiveInject(E.DontCodeStoreManager,8))},i.\u0275cmp=o.\u0275\u0275defineComponent({type:i,selectors:[["dontcode-reference"]],viewQuery:function(e,t){if(1&e&&(o.\u0275\u0275viewQuery(le,7),o.\u0275\u0275viewQuery(ue,7)),2&e){let r;o.\u0275\u0275queryRefresh(r=o.\u0275\u0275loadQuery())&&(t.inlineView=r.first),o.\u0275\u0275queryRefresh(r=o.\u0275\u0275loadQuery())&&(t.fullEditView=r.first)}},outputs:{valueChange:"valueChange"},features:[o.\u0275\u0275InheritDefinitionFeature],decls:4,vars:0,consts:[["inlineView",""],["fullEditView",""],[3,"formGroup",4,"ngIf"],[3,"formGroup"],["placeholder","Select a reference",3,"options","formControlName","filter","showClear","lazy","onChange"],["pTemplate","selectedItem"],["pTemplate","item"],[4,"ngIf"]],template:function(e,t){1&e&&(o.\u0275\u0275template(0,ae,1,1,"ng-template",null,0,o.\u0275\u0275templateRefExtractor),o.\u0275\u0275template(2,pe,1,1,"ng-template",null,1,o.\u0275\u0275templateRefExtractor))},dependencies:[k.NgIf,G.Dropdown,se.PrimeTemplate,p.NgControlStatus,p.NgControlStatusGroup,p.FormGroupDirective,p.FormControlName],changeDetection:0}),i})();class ge{constructor(){this.subscriptions=new P.w0,this.pluginHelper=new N,this.entityPointer=null,this.provider=null}unsubscribe(){this.pluginHelper.unsubscribe(),this.subscriptions.unsubscribe()}initCommandFlow(n,e){this.entityPointer=e,this.provider=n,this.pluginHelper.initCommandFlow(n,e,this)}initChangeListening(){this.pluginHelper.initChangeListening()}decomposeJsonToMultipleChanges(n,e){this.pluginHelper.decomposeJsonToMultipleChanges(n,e)}applyUpdatesToArray(n,e,t,r,s,l){return this.applyUpdatesToArrayAsync(n,e,t,r,(d,h)=>Promise.resolve(s(d,h)))}applyUpdatesToArrayAsync(n,e,t,r,s,l){return this.pluginHelper.applyUpdatesToArrayAsync(n,e,t,r,s,l)}}let _e=(()=>{class i{constructor(e){this.storeMgr=e,this.listsByPosition=new Map}retrieveListManager(e,t){let r=this.listsByPosition.get(e);return null==r&&(r=new te(e,t,this.storeMgr),this.listsByPosition.set(e,r)),r}}return i.\u0275fac=function(e){return new(e||i)(o.\u0275\u0275inject(E.DontCodeStoreManager))},i.\u0275prov=o.\u0275\u0275defineInjectable({token:i,factory:i.\u0275fac,providedIn:"root"}),i})();class te{constructor(n,e,t){this.storeMgr=t,this.entities=new Array,this.position=n,this.description=e}push(n){this.entities=[...this.entities,n]}updateWithDetailedEntity(n){const e=new Array;return this.entities.forEach(t=>{t._id==n._id?(n={...n,...t},e.push(n)):e.push(t)}),this.entities=[...e],n}replace(n){let e=!1;const t=new Array;return this.entities.forEach(r=>{r._id==n._id?(t.push(n),e=!0):t.push(r)}),this.entities=[...t],e}remove(n){return null==n._id?new Promise(e=>{this.entities=this.entities.filter(t=>t!==n),e(!0)}):this.storeMgr.deleteEntity(this.position,n._id).then(e=>(e&&(this.entities=this.entities.filter(t=>t!==n)),e)).catch(e=>(console.error(e.message),!1))}reset(){this.entities.length=0}store(n){return this.storeMgr.storeEntity(this.position,n)}loadAll(){return function C(i,n){const e="object"==typeof n;return new Promise((t,r)=>{let l,s=!1;i.subscribe({next:d=>{l=d,s=!0},error:r,complete:()=>{s?t(l):e?t(n.defaultValue):r(new m.K)}})})}(this.storeMgr.searchEntities(this.position).pipe((0,R.U)(n=>{this.entities=[...n]})),{defaultValue:void 0})}loadDetailFromKey(n){return null==n?Promise.reject("Cannot load entity with null key"):this.storeMgr.loadEntity(this.position,n).then(e=>null!=e?this.updateWithDetailedEntity(e):e)}loadDetailOf(n){return this.loadDetailFromKey(n._id)}}let Ce=(()=>{class i{constructor(e){this.modelMgr=e}getContent(){return this.modelMgr.getContent()}resetContent(e){this.modelMgr.resetContent(e)}findAtPosition(e,t){return this.modelMgr.findAtPosition(e,t)}queryModelToArray(e,t){return this.modelMgr.queryModelToArray(e,t)}queryModelToSingle(e,t){return this.modelMgr.queryModelToSingle(e,t)}findAllPossibleTargetsOfProperty(e,t,r){return this.modelMgr.findAllPossibleTargetsOfProperty(e,t,r)}findTargetOfProperty(e,t,r){return this.modelMgr.findTargetOfProperty(e,t,r)}}return i.\u0275fac=function(e){return new(e||i)(o.\u0275\u0275inject(E.DontCodeModelManager))},i.\u0275prov=o.\u0275\u0275defineInjectable({token:i,factory:i.\u0275fac,providedIn:"root"}),i})(),Ee=(()=>{class i{static forRoot(){return{ngModule:i,providers:[{provide:B,useValue:E.dtcde},{provide:E.DontCodeSchemaManager,useValue:E.dtcde.getSchemaManager()},{provide:E.DontCodeModelManager,useValue:E.dtcde.getModelManager()},{provide:E.DontCodePreviewManager,useValue:E.dtcde.getPreviewManager()},{provide:E.DontCodeStoreManager,useValue:E.dtcde.getStoreManager()},{provide:E.DontCodeChangeManager,useValue:E.dtcde.getChangeManager()},Y]}}}return i.\u0275fac=function(e){return new(e||i)},i.\u0275mod=o.\u0275\u0275defineNgModule({type:i}),i.\u0275inj=o.\u0275\u0275defineInjector({imports:[k.CommonModule,G.DropdownModule,p.ReactiveFormsModule]}),i})()}}]);