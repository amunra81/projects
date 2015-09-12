// Compiled by ClojureScript 0.0-3308 {}
React = require("react-native/Libraries/react-native/react-native.js");
goog.provide('awesome_project.core');
goog.require('cljs.core');
goog.require('om.core');
React = require("react-native/Libraries/react-native/react-native.js");
awesome_project.core.view = (function awesome_project$core$view(){
var argseq__5349__auto__ = ((((1) < arguments.length))?(new cljs.core.IndexedSeq(Array.prototype.slice.call(arguments,(1)),(0))):null);
return awesome_project.core.view.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5349__auto__);
});

awesome_project.core.view.cljs$core$IFn$_invoke$arity$variadic = (function (opts,children){
return cljs.core.apply.call(null,React.createElement,React.View,cljs.core.clj__GT_js.call(null,opts),children);
});

awesome_project.core.view.cljs$lang$maxFixedArity = (1);

awesome_project.core.view.cljs$lang$applyTo = (function (seq6610){
var G__6611 = cljs.core.first.call(null,seq6610);
var seq6610__$1 = cljs.core.next.call(null,seq6610);
return awesome_project.core.view.cljs$core$IFn$_invoke$arity$variadic(G__6611,seq6610__$1);
});
awesome_project.core.text = (function awesome_project$core$text(){
var argseq__5349__auto__ = ((((1) < arguments.length))?(new cljs.core.IndexedSeq(Array.prototype.slice.call(arguments,(1)),(0))):null);
return awesome_project.core.text.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5349__auto__);
});

awesome_project.core.text.cljs$core$IFn$_invoke$arity$variadic = (function (opts,children){
return cljs.core.apply.call(null,React.createElement,React.Text,cljs.core.clj__GT_js.call(null,opts),children);
});

awesome_project.core.text.cljs$lang$maxFixedArity = (1);

awesome_project.core.text.cljs$lang$applyTo = (function (seq6612){
var G__6613 = cljs.core.first.call(null,seq6612);
var seq6612__$1 = cljs.core.next.call(null,seq6612);
return awesome_project.core.text.cljs$core$IFn$_invoke$arity$variadic(G__6613,seq6612__$1);
});
if(typeof awesome_project.core.app_state !== 'undefined'){
} else {
awesome_project.core.app_state = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"text","text",-1790561697),"Hello from ClojureScript!"], null));
}
awesome_project.core.widget = (function awesome_project$core$widget(data,owner){
if(typeof awesome_project.core.t6617 !== 'undefined'){
} else {

/**
* @constructor
*/
awesome_project.core.t6617 = (function (widget,data,owner,meta6618){
this.widget = widget;
this.data = data;
this.owner = owner;
this.meta6618 = meta6618;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
awesome_project.core.t6617.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_6619,meta6618__$1){
var self__ = this;
var _6619__$1 = this;
return (new awesome_project.core.t6617(self__.widget,self__.data,self__.owner,meta6618__$1));
});

awesome_project.core.t6617.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_6619){
var self__ = this;
var _6619__$1 = this;
return self__.meta6618;
});

awesome_project.core.t6617.prototype.om$core$IRender$ = true;

awesome_project.core.t6617.prototype.om$core$IRender$render$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return awesome_project.core.view.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"flexDirection","flexDirection",1286039598),"row",new cljs.core.Keyword(null,"margin","margin",-995903681),(40),new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),"cyan"], null)], null),awesome_project.core.text.call(null,null,new cljs.core.Keyword(null,"text","text",-1790561697).cljs$core$IFn$_invoke$arity$1(self__.data)));
});

awesome_project.core.t6617.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"widget","widget",786562584,null),new cljs.core.Symbol(null,"data","data",1407862150,null),new cljs.core.Symbol(null,"owner","owner",1247919588,null),new cljs.core.Symbol(null,"meta6618","meta6618",-1317590448,null)], null);
});

awesome_project.core.t6617.cljs$lang$type = true;

awesome_project.core.t6617.cljs$lang$ctorStr = "awesome-project.core/t6617";

awesome_project.core.t6617.cljs$lang$ctorPrWriter = (function (this__4888__auto__,writer__4889__auto__,opt__4890__auto__){
return cljs.core._write.call(null,writer__4889__auto__,"awesome-project.core/t6617");
});

awesome_project.core.__GT_t6617 = (function awesome_project$core$widget_$___GT_t6617(widget__$1,data__$1,owner__$1,meta6618){
return (new awesome_project.core.t6617(widget__$1,data__$1,owner__$1,meta6618));
});

}

return (new awesome_project.core.t6617(awesome_project$core$widget,data,owner,cljs.core.PersistentArrayMap.EMPTY));
});
om.core.root.call(null,awesome_project.core.widget,awesome_project.core.app_state,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"target","target",253001721),(1)], null));
awesome_project.core.init = (function awesome_project$core$init(){
return (function awesome_project$core$init_$_render(){
return window.requestAnimationFrame(awesome_project$core$init_$_render);
}).call(null);
});
goog.exportSymbol('awesome_project.core.init', awesome_project.core.init);

//# sourceMappingURL=core.js.map