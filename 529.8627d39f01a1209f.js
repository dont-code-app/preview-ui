(self.webpackChunkpreview_ui=self.webpackChunkpreview_ui||[]).push([[529],{9646:(K,O,d)=>{d.d(O,{of:()=>w});var g=d(3269),o=d(2076);function w(...T){const b=(0,g.yG)(T);return(0,o.D)(T,b)}},4351:(K,O,d)=>{d.d(O,{b:()=>w});var g=d(5577),o=d(576);function w(T,b){return(0,o.m)(b)?(0,g.z)(T,b,1):(0,g.z)(T,1)}},9300:(K,O,d)=>{d.d(O,{h:()=>w});var g=d(4482),o=d(5403);function w(T,b){return(0,g.e)((j,f)=>{let I=0;j.subscribe((0,o.x)(f,M=>T.call(b,M,I++)&&f.next(M)))})}},5577:(K,O,d)=>{d.d(O,{z:()=>I});var g=d(4004),o=d(8421),w=d(4482),T=d(9672),b=d(5403),f=d(576);function I(M,c,S=1/0){return(0,f.m)(c)?I((H,x)=>(0,g.U)((k,A)=>c(H,k,x,A))((0,o.Xf)(M(H,x))),S):("number"==typeof c&&(S=c),(0,w.e)((H,x)=>function j(M,c,S,H,x,k,A,F){const D=[];let v=0,re=0,z=!1;const G=()=>{z&&!D.length&&!v&&c.complete()},W=N=>v<H?L(N):D.push(N),L=N=>{k&&c.next(N),v++;let Y=!1;(0,o.Xf)(S(N,re++)).subscribe((0,b.x)(c,C=>{x?.(C),k?W(C):c.next(C)},()=>{Y=!0},void 0,()=>{if(Y)try{for(v--;D.length&&v<H;){const C=D.shift();A?(0,T.f)(c,A,()=>L(C)):L(C)}G()}catch(C){c.error(C)}}))};return M.subscribe((0,b.x)(c,W,()=>{z=!0,G()})),()=>{F?.()}}(H,x,M,S)))}},3269:(K,O,d)=>{d.d(O,{_6:()=>j,jO:()=>T,yG:()=>b});var g=d(576),o=d(3532);function w(f){return f[f.length-1]}function T(f){return(0,g.m)(w(f))?f.pop():void 0}function b(f){return(0,o.K)(w(f))?f.pop():void 0}function j(f,I){return"number"==typeof w(f)?f.pop():I}},529:(K,O,d)=>{d.r(O),d.d(O,{HTTP_INTERCEPTORS:()=>oe,HttpBackend:()=>M,HttpClient:()=>he,HttpClientJsonpModule:()=>Je,HttpClientModule:()=>Be,HttpClientXsrfModule:()=>Xe,HttpContext:()=>z,HttpContextToken:()=>re,HttpErrorResponse:()=>V,HttpEventType:()=>u,HttpFeatureKind:()=>h,HttpHandler:()=>I,HttpHeaderResponse:()=>Z,HttpHeaders:()=>c,HttpParams:()=>v,HttpRequest:()=>C,HttpResponse:()=>U,HttpResponseBase:()=>Q,HttpUrlEncodingCodec:()=>H,HttpXhrBackend:()=>de,HttpXsrfTokenExtractor:()=>te,JsonpClientBackend:()=>ae,JsonpInterceptor:()=>ke,XhrFactory:()=>Ke,provideHttpClient:()=>Te,withInterceptors:()=>Le,withInterceptorsFromDi:()=>we,withJsonpSupport:()=>Re,withNoXsrfProtection:()=>be,withRequestsMadeViaParent:()=>Ue,withXsrfConfiguration:()=>ne,\u0275HttpInterceptingHandler:()=>q,\u0275HttpInterceptorHandler:()=>q});var g=d(7863),o=d(549),w=d(9646),T=d(9751),b=d(4351),j=d(9300),f=d(4004);class I{}class M{}class c{constructor(e){this.normalizedNames=new Map,this.lazyUpdate=null,e?this.lazyInit="string"==typeof e?()=>{this.headers=new Map,e.split("\n").forEach(t=>{const s=t.indexOf(":");if(s>0){const r=t.slice(0,s),i=r.toLowerCase(),l=t.slice(s+1).trim();this.maybeSetNormalizedName(r,i),this.headers.has(i)?this.headers.get(i).push(l):this.headers.set(i,[l])}})}:()=>{this.headers=new Map,Object.keys(e).forEach(t=>{let s=e[t];const r=t.toLowerCase();"string"==typeof s&&(s=[s]),s.length>0&&(this.headers.set(r,s),this.maybeSetNormalizedName(t,r))})}:this.headers=new Map}has(e){return this.init(),this.headers.has(e.toLowerCase())}get(e){this.init();const t=this.headers.get(e.toLowerCase());return t&&t.length>0?t[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(e){return this.init(),this.headers.get(e.toLowerCase())||null}append(e,t){return this.clone({name:e,value:t,op:"a"})}set(e,t){return this.clone({name:e,value:t,op:"s"})}delete(e,t){return this.clone({name:e,value:t,op:"d"})}maybeSetNormalizedName(e,t){this.normalizedNames.has(t)||this.normalizedNames.set(t,e)}init(){this.lazyInit&&(this.lazyInit instanceof c?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(e=>this.applyUpdate(e)),this.lazyUpdate=null))}copyFrom(e){e.init(),Array.from(e.headers.keys()).forEach(t=>{this.headers.set(t,e.headers.get(t)),this.normalizedNames.set(t,e.normalizedNames.get(t))})}clone(e){const t=new c;return t.lazyInit=this.lazyInit&&this.lazyInit instanceof c?this.lazyInit:this,t.lazyUpdate=(this.lazyUpdate||[]).concat([e]),t}applyUpdate(e){const t=e.name.toLowerCase();switch(e.op){case"a":case"s":let s=e.value;if("string"==typeof s&&(s=[s]),0===s.length)return;this.maybeSetNormalizedName(e.name,t);const r=("a"===e.op?this.headers.get(t):void 0)||[];r.push(...s),this.headers.set(t,r);break;case"d":const i=e.value;if(i){let l=this.headers.get(t);if(!l)return;l=l.filter(y=>-1===i.indexOf(y)),0===l.length?(this.headers.delete(t),this.normalizedNames.delete(t)):this.headers.set(t,l)}else this.headers.delete(t),this.normalizedNames.delete(t)}}forEach(e){this.init(),Array.from(this.normalizedNames.keys()).forEach(t=>e(this.normalizedNames.get(t),this.headers.get(t)))}}class H{encodeKey(e){return F(e)}encodeValue(e){return F(e)}decodeKey(e){return decodeURIComponent(e)}decodeValue(e){return decodeURIComponent(e)}}const k=/%(\d[a-f0-9])/gi,A={40:"@","3A":":",24:"$","2C":",","3B":";","3D":"=","3F":"?","2F":"/"};function F(n){return encodeURIComponent(n).replace(k,(e,t)=>A[t]??e)}function D(n){return`${n}`}class v{constructor(e={}){if(this.updates=null,this.cloneFrom=null,this.encoder=e.encoder||new H,e.fromString){if(e.fromObject)throw new Error("Cannot specify both fromString and fromObject.");this.map=function x(n,e){const t=new Map;return n.length>0&&n.replace(/^\?/,"").split("&").forEach(r=>{const i=r.indexOf("="),[l,y]=-1==i?[e.decodeKey(r),""]:[e.decodeKey(r.slice(0,i)),e.decodeValue(r.slice(i+1))],a=t.get(l)||[];a.push(y),t.set(l,a)}),t}(e.fromString,this.encoder)}else e.fromObject?(this.map=new Map,Object.keys(e.fromObject).forEach(t=>{const s=e.fromObject[t],r=Array.isArray(s)?s.map(D):[D(s)];this.map.set(t,r)})):this.map=null}has(e){return this.init(),this.map.has(e)}get(e){this.init();const t=this.map.get(e);return t?t[0]:null}getAll(e){return this.init(),this.map.get(e)||null}keys(){return this.init(),Array.from(this.map.keys())}append(e,t){return this.clone({param:e,value:t,op:"a"})}appendAll(e){const t=[];return Object.keys(e).forEach(s=>{const r=e[s];Array.isArray(r)?r.forEach(i=>{t.push({param:s,value:i,op:"a"})}):t.push({param:s,value:r,op:"a"})}),this.clone(t)}set(e,t){return this.clone({param:e,value:t,op:"s"})}delete(e,t){return this.clone({param:e,value:t,op:"d"})}toString(){return this.init(),this.keys().map(e=>{const t=this.encoder.encodeKey(e);return this.map.get(e).map(s=>t+"="+this.encoder.encodeValue(s)).join("&")}).filter(e=>""!==e).join("&")}clone(e){const t=new v({encoder:this.encoder});return t.cloneFrom=this.cloneFrom||this,t.updates=(this.updates||[]).concat(e),t}init(){null===this.map&&(this.map=new Map),null!==this.cloneFrom&&(this.cloneFrom.init(),this.cloneFrom.keys().forEach(e=>this.map.set(e,this.cloneFrom.map.get(e))),this.updates.forEach(e=>{switch(e.op){case"a":case"s":const t=("a"===e.op?this.map.get(e.param):void 0)||[];t.push(D(e.value)),this.map.set(e.param,t);break;case"d":if(void 0===e.value){this.map.delete(e.param);break}{let s=this.map.get(e.param)||[];const r=s.indexOf(D(e.value));-1!==r&&s.splice(r,1),s.length>0?this.map.set(e.param,s):this.map.delete(e.param)}}}),this.cloneFrom=this.updates=null)}}class re{constructor(e){this.defaultValue=e}}class z{constructor(){this.map=new Map}set(e,t){return this.map.set(e,t),this}get(e){return this.map.has(e)||this.map.set(e,e.defaultValue()),this.map.get(e)}delete(e){return this.map.delete(e),this}has(e){return this.map.has(e)}keys(){return this.map.keys()}}function W(n){return typeof ArrayBuffer<"u"&&n instanceof ArrayBuffer}function L(n){return typeof Blob<"u"&&n instanceof Blob}function N(n){return typeof FormData<"u"&&n instanceof FormData}class C{constructor(e,t,s,r){let i;if(this.url=t,this.body=null,this.reportProgress=!1,this.withCredentials=!1,this.responseType="json",this.method=e.toUpperCase(),function G(n){switch(n){case"DELETE":case"GET":case"HEAD":case"OPTIONS":case"JSONP":return!1;default:return!0}}(this.method)||r?(this.body=void 0!==s?s:null,i=r):i=s,i&&(this.reportProgress=!!i.reportProgress,this.withCredentials=!!i.withCredentials,i.responseType&&(this.responseType=i.responseType),i.headers&&(this.headers=i.headers),i.context&&(this.context=i.context),i.params&&(this.params=i.params)),this.headers||(this.headers=new c),this.context||(this.context=new z),this.params){const l=this.params.toString();if(0===l.length)this.urlWithParams=t;else{const y=t.indexOf("?");this.urlWithParams=t+(-1===y?"?":y<t.length-1?"&":"")+l}}else this.params=new v,this.urlWithParams=t}serializeBody(){return null===this.body?null:W(this.body)||L(this.body)||N(this.body)||function Y(n){return typeof URLSearchParams<"u"&&n instanceof URLSearchParams}(this.body)||"string"==typeof this.body?this.body:this.body instanceof v?this.body.toString():"object"==typeof this.body||"boolean"==typeof this.body||Array.isArray(this.body)?JSON.stringify(this.body):this.body.toString()}detectContentTypeHeader(){return null===this.body||N(this.body)?null:L(this.body)?this.body.type||null:W(this.body)?null:"string"==typeof this.body?"text/plain":this.body instanceof v?"application/x-www-form-urlencoded;charset=UTF-8":"object"==typeof this.body||"number"==typeof this.body||"boolean"==typeof this.body?"application/json":null}clone(e={}){const t=e.method||this.method,s=e.url||this.url,r=e.responseType||this.responseType,i=void 0!==e.body?e.body:this.body,l=void 0!==e.withCredentials?e.withCredentials:this.withCredentials,y=void 0!==e.reportProgress?e.reportProgress:this.reportProgress;let a=e.headers||this.headers,E=e.params||this.params;const B=e.context??this.context;return void 0!==e.setHeaders&&(a=Object.keys(e.setHeaders).reduce((_,R)=>_.set(R,e.setHeaders[R]),a)),e.setParams&&(E=Object.keys(e.setParams).reduce((_,R)=>_.set(R,e.setParams[R]),E)),new C(t,s,i,{params:E,headers:a,context:B,reportProgress:y,responseType:r,withCredentials:l})}}var u=(()=>((u=u||{})[u.Sent=0]="Sent",u[u.UploadProgress=1]="UploadProgress",u[u.ResponseHeader=2]="ResponseHeader",u[u.DownloadProgress=3]="DownloadProgress",u[u.Response=4]="Response",u[u.User=5]="User",u))();class Q{constructor(e,t=200,s="OK"){this.headers=e.headers||new c,this.status=void 0!==e.status?e.status:t,this.statusText=e.statusText||s,this.url=e.url||null,this.ok=this.status>=200&&this.status<300}}class Z extends Q{constructor(e={}){super(e),this.type=u.ResponseHeader}clone(e={}){return new Z({headers:e.headers||this.headers,status:void 0!==e.status?e.status:this.status,statusText:e.statusText||this.statusText,url:e.url||this.url||void 0})}}class U extends Q{constructor(e={}){super(e),this.type=u.Response,this.body=void 0!==e.body?e.body:null}clone(e={}){return new U({body:void 0!==e.body?e.body:this.body,headers:e.headers||this.headers,status:void 0!==e.status?e.status:this.status,statusText:e.statusText||this.statusText,url:e.url||this.url||void 0})}}class V extends Q{constructor(e){super(e,0,"Unknown Error"),this.name="HttpErrorResponse",this.ok=!1,this.message=this.status>=200&&this.status<300?`Http failure during parsing for ${e.url||"(unknown url)"}`:`Http failure response for ${e.url||"(unknown url)"}: ${e.status} ${e.statusText}`,this.error=e.error||null}}function se(n,e){return{body:e,headers:n.headers,context:n.context,observe:n.observe,params:n.params,reportProgress:n.reportProgress,responseType:n.responseType,withCredentials:n.withCredentials}}let he=(()=>{class n{constructor(t){this.handler=t}request(t,s,r={}){let i;if(t instanceof C)i=t;else{let a,E;a=r.headers instanceof c?r.headers:new c(r.headers),r.params&&(E=r.params instanceof v?r.params:new v({fromObject:r.params})),i=new C(t,s,void 0!==r.body?r.body:null,{headers:a,context:r.context,params:E,reportProgress:r.reportProgress,responseType:r.responseType||"json",withCredentials:r.withCredentials})}const l=(0,w.of)(i).pipe((0,b.b)(a=>this.handler.handle(a)));if(t instanceof C||"events"===r.observe)return l;const y=l.pipe((0,j.h)(a=>a instanceof U));switch(r.observe||"body"){case"body":switch(i.responseType){case"arraybuffer":return y.pipe((0,f.U)(a=>{if(null!==a.body&&!(a.body instanceof ArrayBuffer))throw new Error("Response is not an ArrayBuffer.");return a.body}));case"blob":return y.pipe((0,f.U)(a=>{if(null!==a.body&&!(a.body instanceof Blob))throw new Error("Response is not a Blob.");return a.body}));case"text":return y.pipe((0,f.U)(a=>{if(null!==a.body&&"string"!=typeof a.body)throw new Error("Response is not a string.");return a.body}));default:return y.pipe((0,f.U)(a=>a.body))}case"response":return y;default:throw new Error(`Unreachable: unhandled observe type ${r.observe}}`)}}delete(t,s={}){return this.request("DELETE",t,s)}get(t,s={}){return this.request("GET",t,s)}head(t,s={}){return this.request("HEAD",t,s)}jsonp(t,s){return this.request("JSONP",t,{params:(new v).append(s,"JSONP_CALLBACK"),observe:"body",responseType:"json"})}options(t,s={}){return this.request("OPTIONS",t,s)}patch(t,s,r={}){return this.request("PATCH",t,se(r,s))}post(t,s,r={}){return this.request("POST",t,se(r,s))}put(t,s,r={}){return this.request("PUT",t,se(r,s))}}return n.\u0275fac=function(t){return new(t||n)(o.\u0275\u0275inject(I))},n.\u0275prov=o.\u0275\u0275defineInjectable({token:n,factory:n.\u0275fac}),n})();function pe(n,e){return e(n)}function Ie(n,e){return(t,s)=>e.intercept(t,{handle:r=>n(r,s)})}const oe=new o.InjectionToken("HTTP_INTERCEPTORS"),$=new o.InjectionToken("HTTP_INTERCEPTOR_FNS");function He(){let n=null;return(e,t)=>(null===n&&(n=((0,o.inject)(oe,{optional:!0})??[]).reduceRight(Ie,pe)),n(e,t))}let ie,q=(()=>{class n extends I{constructor(t,s){super(),this.backend=t,this.injector=s,this.chain=null}handle(t){if(null===this.chain){const s=Array.from(new Set(this.injector.get($)));this.chain=s.reduceRight((r,i)=>function Me(n,e,t){return(s,r)=>t.runInContext(()=>e(s,i=>n(i,r)))}(r,i,this.injector),pe)}return this.chain(t,s=>this.backend.handle(s))}}return n.\u0275fac=function(t){return new(t||n)(o.\u0275\u0275inject(M),o.\u0275\u0275inject(o.EnvironmentInjector))},n.\u0275prov=o.\u0275\u0275defineInjectable({token:n,factory:n.\u0275fac}),n})(),xe=0;class fe{}function Se(){return"object"==typeof window?window:{}}let ae=(()=>{class n{constructor(t,s){this.callbackMap=t,this.document=s,this.resolvedPromise=Promise.resolve()}nextCallback(){return"ng_jsonp_callback_"+xe++}handle(t){if("JSONP"!==t.method)throw new Error("JSONP requests must use JSONP request method.");if("json"!==t.responseType)throw new Error("JSONP requests must use Json response type.");if(t.headers.keys().length>0)throw new Error("JSONP requests do not support headers.");return new T.y(s=>{const r=this.nextCallback(),i=t.urlWithParams.replace(/=JSONP_CALLBACK(&|$)/,`=${r}$1`),l=this.document.createElement("script");l.src=i;let y=null,a=!1;this.callbackMap[r]=R=>{delete this.callbackMap[r],y=R,a=!0};const E=()=>{l.parentNode&&l.parentNode.removeChild(l),delete this.callbackMap[r]};return l.addEventListener("load",R=>{this.resolvedPromise.then(()=>{E(),a?(s.next(new U({body:y,status:200,statusText:"OK",url:i})),s.complete()):s.error(new V({url:i,status:0,statusText:"JSONP Error",error:new Error("JSONP injected script did not invoke callback.")}))})}),l.addEventListener("error",R=>{E(),s.error(new V({error:R,status:0,statusText:"JSONP Error",url:i}))}),this.document.body.appendChild(l),s.next({type:u.Sent}),()=>{a||this.removeListeners(l),E()}})}removeListeners(t){ie||(ie=this.document.implementation.createHTMLDocument()),ie.adoptNode(t)}}return n.\u0275fac=function(t){return new(t||n)(o.\u0275\u0275inject(fe),o.\u0275\u0275inject(g.DOCUMENT))},n.\u0275prov=o.\u0275\u0275defineInjectable({token:n,factory:n.\u0275fac}),n})();function ye(n,e){return"JSONP"===n.method?(0,o.inject)(ae).handle(n):e(n)}let ke=(()=>{class n{constructor(t){this.injector=t}intercept(t,s){return this.injector.runInContext(()=>ye(t,r=>s.handle(r)))}}return n.\u0275fac=function(t){return new(t||n)(o.\u0275\u0275inject(o.EnvironmentInjector))},n.\u0275prov=o.\u0275\u0275defineInjectable({token:n,factory:n.\u0275fac}),n})();const Ae=/^\)\]\}',?\n/;let de=(()=>{class n{constructor(t){this.xhrFactory=t}handle(t){if("JSONP"===t.method)throw new Error("Attempted to construct Jsonp request without HttpClientJsonpModule installed.");return new T.y(s=>{const r=this.xhrFactory.build();if(r.open(t.method,t.urlWithParams),t.withCredentials&&(r.withCredentials=!0),t.headers.forEach((p,m)=>r.setRequestHeader(p,m.join(","))),t.headers.has("Accept")||r.setRequestHeader("Accept","application/json, text/plain, */*"),!t.headers.has("Content-Type")){const p=t.detectContentTypeHeader();null!==p&&r.setRequestHeader("Content-Type",p)}if(t.responseType){const p=t.responseType.toLowerCase();r.responseType="json"!==p?p:"text"}const i=t.serializeBody();let l=null;const y=()=>{if(null!==l)return l;const p=r.statusText||"OK",m=new c(r.getAllResponseHeaders()),J=function Fe(n){return"responseURL"in n&&n.responseURL?n.responseURL:/^X-Request-URL:/m.test(n.getAllResponseHeaders())?n.getResponseHeader("X-Request-URL"):null}(r)||t.url;return l=new Z({headers:m,status:r.status,statusText:p,url:J}),l},a=()=>{let{headers:p,status:m,statusText:J,url:Oe}=y(),P=null;204!==m&&(P=typeof r.response>"u"?r.responseText:r.response),0===m&&(m=P?200:0);let ue=m>=200&&m<300;if("json"===t.responseType&&"string"==typeof P){const ze=P;P=P.replace(Ae,"");try{P=""!==P?JSON.parse(P):null}catch(We){P=ze,ue&&(ue=!1,P={error:We,text:P})}}ue?(s.next(new U({body:P,headers:p,status:m,statusText:J,url:Oe||void 0})),s.complete()):s.error(new V({error:P,headers:p,status:m,statusText:J,url:Oe||void 0}))},E=p=>{const{url:m}=y(),J=new V({error:p,status:r.status||0,statusText:r.statusText||"Unknown Error",url:m||void 0});s.error(J)};let B=!1;const _=p=>{B||(s.next(y()),B=!0);let m={type:u.DownloadProgress,loaded:p.loaded};p.lengthComputable&&(m.total=p.total),"text"===t.responseType&&r.responseText&&(m.partialText=r.responseText),s.next(m)},R=p=>{let m={type:u.UploadProgress,loaded:p.loaded};p.lengthComputable&&(m.total=p.total),s.next(m)};return r.addEventListener("load",a),r.addEventListener("error",E),r.addEventListener("timeout",E),r.addEventListener("abort",E),t.reportProgress&&(r.addEventListener("progress",_),null!==i&&r.upload&&r.upload.addEventListener("progress",R)),r.send(i),s.next({type:u.Sent}),()=>{r.removeEventListener("error",E),r.removeEventListener("abort",E),r.removeEventListener("load",a),r.removeEventListener("timeout",E),t.reportProgress&&(r.removeEventListener("progress",_),null!==i&&r.upload&&r.upload.removeEventListener("progress",R)),r.readyState!==r.DONE&&r.abort()}})}}return n.\u0275fac=function(t){return new(t||n)(o.\u0275\u0275inject(g.XhrFactory))},n.\u0275prov=o.\u0275\u0275defineInjectable({token:n,factory:n.\u0275fac}),n})();const ee=new o.InjectionToken("XSRF_ENABLED"),le="XSRF-TOKEN",me=new o.InjectionToken("XSRF_COOKIE_NAME",{providedIn:"root",factory:()=>le}),ce="X-XSRF-TOKEN",Ee=new o.InjectionToken("XSRF_HEADER_NAME",{providedIn:"root",factory:()=>ce});class te{}let ge=(()=>{class n{constructor(t,s,r){this.doc=t,this.platform=s,this.cookieName=r,this.lastCookieString="",this.lastToken=null,this.parseCount=0}getToken(){if("server"===this.platform)return null;const t=this.doc.cookie||"";return t!==this.lastCookieString&&(this.parseCount++,this.lastToken=(0,g.\u0275parseCookieValue)(t,this.cookieName),this.lastCookieString=t),this.lastToken}}return n.\u0275fac=function(t){return new(t||n)(o.\u0275\u0275inject(g.DOCUMENT),o.\u0275\u0275inject(o.PLATFORM_ID),o.\u0275\u0275inject(me))},n.\u0275prov=o.\u0275\u0275defineInjectable({token:n,factory:n.\u0275fac}),n})();function ve(n,e){const t=n.url.toLowerCase();if(!(0,o.inject)(ee)||"GET"===n.method||"HEAD"===n.method||t.startsWith("http://")||t.startsWith("https://"))return e(n);const s=(0,o.inject)(te).getToken(),r=(0,o.inject)(Ee);return null!=s&&!n.headers.has(r)&&(n=n.clone({headers:n.headers.set(r,s)})),e(n)}let Ce=(()=>{class n{constructor(t){this.injector=t}intercept(t,s){return this.injector.runInContext(()=>ve(t,r=>s.handle(r)))}}return n.\u0275fac=function(t){return new(t||n)(o.\u0275\u0275inject(o.EnvironmentInjector))},n.\u0275prov=o.\u0275\u0275defineInjectable({token:n,factory:n.\u0275fac}),n})();var h=(()=>((h=h||{})[h.Interceptors=0]="Interceptors",h[h.LegacyInterceptors=1]="LegacyInterceptors",h[h.CustomXsrfConfiguration=2]="CustomXsrfConfiguration",h[h.NoXsrfProtection=3]="NoXsrfProtection",h[h.JsonpSupport=4]="JsonpSupport",h[h.RequestsMadeViaParent=5]="RequestsMadeViaParent",h))();function X(n,e){return{\u0275kind:n,\u0275providers:e}}function Te(...n){const e=[he,de,q,{provide:I,useExisting:q},{provide:M,useExisting:de},{provide:$,useValue:ve,multi:!0},{provide:ee,useValue:!0},{provide:te,useClass:ge}];for(const t of n)e.push(...t.\u0275providers);return(0,o.makeEnvironmentProviders)(e)}function Le(n){return X(h.Interceptors,n.map(e=>({provide:$,useValue:e,multi:!0})))}const Pe=new o.InjectionToken("LEGACY_INTERCEPTOR_FN");function we(){return X(h.LegacyInterceptors,[{provide:Pe,useFactory:He},{provide:$,useExisting:Pe,multi:!0}])}function ne({cookieName:n,headerName:e}){const t=[];return void 0!==n&&t.push({provide:me,useValue:n}),void 0!==e&&t.push({provide:Ee,useValue:e}),X(h.CustomXsrfConfiguration,t)}function be(){return X(h.NoXsrfProtection,[{provide:ee,useValue:!1}])}function Re(){return X(h.JsonpSupport,[ae,{provide:fe,useFactory:Se},{provide:$,useValue:ye,multi:!0}])}function Ue(){return X(h.RequestsMadeViaParent,[{provide:M,useFactory:()=>(0,o.inject)(I,{skipSelf:!0,optional:!0})}])}let Xe=(()=>{class n{static disable(){return{ngModule:n,providers:[be().\u0275providers]}}static withOptions(t={}){return{ngModule:n,providers:ne(t).\u0275providers}}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=o.\u0275\u0275defineNgModule({type:n}),n.\u0275inj=o.\u0275\u0275defineInjector({providers:[Ce,{provide:oe,useExisting:Ce,multi:!0},{provide:te,useClass:ge},ne({cookieName:le,headerName:ce}).\u0275providers,{provide:ee,useValue:!0}]}),n})(),Be=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=o.\u0275\u0275defineNgModule({type:n}),n.\u0275inj=o.\u0275\u0275defineInjector({providers:[Te(we(),ne({cookieName:le,headerName:ce}))]}),n})(),Je=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=o.\u0275\u0275defineNgModule({type:n}),n.\u0275inj=o.\u0275\u0275defineInjector({providers:[Re().\u0275providers]}),n})();const Ke=g.XhrFactory}}]);