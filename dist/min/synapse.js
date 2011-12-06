(function(a,b){return typeof exports!="undefined"?b(a,exports):typeof define=="function"&&define.amd?define("synapse/core",["exports"],function(c){return b(a,c)}):a.SynapseCore=b(a,{})})(this,function(a,b){var c;return c={},{toString:Object.prototype.toString,getType:function(a){return this.toString.call(a).match(/^\[object\s(.*)\]$/)[1]},isObject:function(a){return this.getType(a)==="Object"},isArray:function(a){return this.getType(a)==="Array"},isFunction:function(a){return this.getType(a)==="Function"},isString:function(a){return this.getType(a)==="String"},isBoolean:function(a){return this.getType(a)==="Boolean"}}});var __bind=function(a,b){return function(){return a.apply(b,arguments)}},__slice=Array.prototype.slice;(function(a,b){return typeof exports!="undefined"?b(a,exports,require("synapse/core")):typeof define=="function"&&define.amd?define("synapse",["synapse/core","exports"],function(c,d){return b(a,d,c)}):a.Synapse=b(a,{},a.SynapseCore)})(this,function(a,b,c){var d,e,f,g,h,i,j,k,l,m,n,o,p;return k=1,o={},n=[],j=["observe","notify","sync","stopObserving","pauseObserving","resumeObserving","stopNotifying","pauseNotifying","resumeNotifying"],b=function(){function a(b){var d,e,f,g,h,i,l,m,p;if(b instanceof a)return b;if(this.constructor!==a){g=new a(b),f=g.raw,h=__bind(function(a){return f[a]=function(){return g[a].apply(g,arguments),this}},this);for(i=0,m=j.length;i<m;i++)e=j[i],h(e);return f}for(l=0,p=n.length;l<p;l++){d=n[l];if(d.checkObjectType(b))break;d=null}if(!d)throw new Error("No hook exists for "+c.getType(b)+" types");this.raw=(typeof d.coerceObject=="function"?d.coerceObject(b):void 0)||b,this.hook=d,this.guid=k++,this._observing={},this._notifying={},o[this.guid]=this}return a.prototype.version="0.3.2",a.prototype.get=function(){var a;return(a=this.hook).getHandler.apply(a,[this.raw].concat(__slice.call(arguments)))},a.prototype.set=function(){var a;return(a=this.hook).setHandler.apply(a,[this.raw].concat(__slice.call(arguments))),this},a.prototype.observe=function(){var b,c;return c=arguments[0],b=2>arguments.length?[]:__slice.call(arguments,1),c=new a(c),d.apply(null,[c,this].concat(__slice.call(b))),this},a.prototype.notify=function(){var b,c;return c=arguments[0],b=2>arguments.length?[]:__slice.call(arguments,1),c=new a(c),d.apply(null,[this,c].concat(__slice.call(b))),this},a.prototype.sync=function(b){return b=new a(b),this.observe(b).notify(b),this},a.prototype.stopObserving=function(a){var b,c,d,e,f;if(!a)for(e in this._observing){b=this._observing[e],d=o[e];for(c in b)f=b[c],l(d,f.event,f.handler);this._observing={_open:!0}}else{b=this._observing[a.guid];for(c in b)f=b[c],l(a,f.event,f.handler);this._observing[a.guid]={_open:!0}}return this},a.prototype.pauseObserving=function(a){var b,c;if(!a)for(c in this._observing)b=this._observing[c],b._open=!1;else b=this._observing[a.guid],b._open=!1;return this},a.prototype.resumeObserving=function(a){var b,c;if(a){if(b=this._observing[a.guid])b._open=!0}else for(c in this._observing)this._observing[c]._open=!0;return this},a.prototype.stopNotifying=function(a){var b,c,d,e,f;if(!a)for(d in this._notifying){b=this._notifying[d],c=o[d];for(e in b)f=b[e],l(this,f.event,f.handler);this._notifying={_open:!0}}else{b=this._notifying[a.guid];for(e in b)f=b[e],l(this,f.event,f.handler);this._notifying[a.guid]={_open:!0}}return this},a.prototype.pauseNotifying=function(a){var b,c;if(!a)for(c in this._notifying)b=this._notifying[c],b._open=!1;else b=this._notifying[a.guid],b._open=!1;return this},a.prototype.resumeNotifying=function(a){var b,c;if(a){if(b=this._notifying[a.guid])b._open=!0}else for(c in this._notifying)this._notifying[c]._open=!0;return this},a}(),b.addHooks=function(){return n.push.apply(n,arguments)},b.clearHooks=function(){return n=[]},g=function(){var a,b,c,d;b=arguments[0],a=2>arguments.length?[]:__slice.call(arguments,1);if(c=(d=b.hook).detectEvent.apply(d,[b.raw].concat(__slice.call(a))))return c;throw new Error(""+b.hook.typeName+" types do not support events")},m=function(){var a,b,c,d;b=arguments[0],a=2>arguments.length?[]:__slice.call(arguments,1);if(c=typeof (d=b.hook).onEventHandler=="function"?d.onEventHandler.apply(d,[b.raw].concat(__slice.call(a))):void 0)return b;throw new Error(""+b.hook.typeName+" types do not support events")},l=function(){var a,b,c,d;b=arguments[0],a=2>arguments.length?[]:__slice.call(arguments,1);if(c=typeof (d=b.hook).offEventHandler=="function"?d.offEventHandler.apply(d,[b.raw].concat(__slice.call(a))):void 0)return b;throw new Error(""+b.hook.typeName+" types do not support events")},p=function(){var a,b,c,d;b=arguments[0],a=2>arguments.length?[]:__slice.call(arguments,1);if(c=typeof (d=b.hook).triggerEventHandler=="function"?d.triggerEventHandler.apply(d,[b.raw].concat(__slice.call(a))):void 0)return b;throw new Error(""+b.hook.typeName+" types do not support events")},h=function(a){var b;return typeof (b=a.hook).detectInterface=="function"?b.detectInterface(a.raw):void 0},i=function(a){var b;return typeof (b=a.hook).detectOtherInterface=="function"?b.detectOtherInterface(a.raw):void 0},f={event:null,subjectInterface:null,observerInterface:null,converter:null,triggerOnBind:!0},e=function(a,b,d){var e,j,k,l,n,o,q,r,s,t,u,v,w,x;for(o in f)v=f[o],d[o]==null&&(d[o]=v);(j=d.converter)&&!c.isFunction(j)&&(j=b.object[j]);if(!(t=d.subjectInterface)&&!(t=h(a)||i(b))&&!j)throw new Error("An interface for "+a.hook.typeName+" objects could not be detected");if(!(r=d.observerInterface)&&!(r=h(b)||i(a)))throw new Error("An interface for "+b.hook.typeName+" objects could not be detected");(l=d.event)||(l=g(a,t)),c.isArray(l)||(l=[l]),u=d.triggerOnBind;for(w=0,x=l.length;w<x;w++)k=l[w],n=function(){if(b._observing[a.guid]._open===!0&&a._notifying[b.guid]._open===!0)return v=a.get(t),j&&(v=j(v)),b.set(r,v)},(q=b._observing[a.guid])||(q=b._observing[a.guid]={_open:!0}),(s=a._notifying[b.guid])||(s=a._notifying[b.guid]={_open:!0}),e={event:k,handler:n},q[r]=e,s[r]=e,m(a,k,n),u&&p(a,k)},d=function(){var a,b,d,f,g,h,i,j,k;i=arguments[0],f=arguments[1],d=3>arguments.length?[]:__slice.call(arguments,2),h=d,a=d[0],b=d[1];if(c.isFunction(a))h={converter:a};else if(c.isArray(a)||!c.isObject(a))h={subjectInterface:a,observerInterface:b};c.isArray(h)||(h=[h]);for(j=0,k=h.length;j<k;j++)g=h[j],e(i,f,g)},b})