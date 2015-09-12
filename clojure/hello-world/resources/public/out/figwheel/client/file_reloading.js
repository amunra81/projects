// Compiled by ClojureScript 1.7.48 {}
goog.provide('figwheel.client.file_reloading');
goog.require('cljs.core');
goog.require('goog.Uri');
goog.require('goog.string');
goog.require('goog.net.jsloader');
goog.require('cljs.core.async');
goog.require('clojure.set');
goog.require('clojure.string');
goog.require('figwheel.client.utils');

figwheel.client.file_reloading.on_jsload_custom_event = (function figwheel$client$file_reloading$on_jsload_custom_event(url){
return figwheel.client.utils.dispatch_custom_event.call(null,"figwheel.js-reload",url);
});
figwheel.client.file_reloading.before_jsload_custom_event = (function figwheel$client$file_reloading$before_jsload_custom_event(files){
return figwheel.client.utils.dispatch_custom_event.call(null,"figwheel.before-js-reload",files);
});
figwheel.client.file_reloading.all_QMARK_ = (function figwheel$client$file_reloading$all_QMARK_(pred,coll){
return cljs.core.reduce.call(null,(function (p1__24688_SHARP_,p2__24689_SHARP_){
var and__16491__auto__ = p1__24688_SHARP_;
if(cljs.core.truth_(and__16491__auto__)){
return p2__24689_SHARP_;
} else {
return and__16491__auto__;
}
}),true,cljs.core.map.call(null,pred,coll));
});
figwheel.client.file_reloading.namespace_file_map_QMARK_ = (function figwheel$client$file_reloading$namespace_file_map_QMARK_(m){
var or__16503__auto__ = (cljs.core.map_QMARK_.call(null,m)) && (typeof new cljs.core.Keyword(null,"namespace","namespace",-377510372).cljs$core$IFn$_invoke$arity$1(m) === 'string') && (typeof new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(m) === 'string') && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(m),new cljs.core.Keyword(null,"namespace","namespace",-377510372)));
if(or__16503__auto__){
return or__16503__auto__;
} else {
cljs.core.println.call(null,"Error not namespace-file-map",cljs.core.pr_str.call(null,m));

return false;
}
});
figwheel.client.file_reloading.add_cache_buster = (function figwheel$client$file_reloading$add_cache_buster(url){

return goog.Uri.parse(url).makeUnique();
});
figwheel.client.file_reloading.ns_to_js_file = (function figwheel$client$file_reloading$ns_to_js_file(ns){

return [cljs.core.str(clojure.string.replace.call(null,ns,".","/")),cljs.core.str(".js")].join('');
});
figwheel.client.file_reloading.resolve_ns = (function figwheel$client$file_reloading$resolve_ns(ns){

return [cljs.core.str(figwheel.client.utils.base_url_path.call(null)),cljs.core.str(figwheel.client.file_reloading.ns_to_js_file.call(null,ns))].join('');
});
figwheel.client.file_reloading.patch_goog_base = (function figwheel$client$file_reloading$patch_goog_base(){
goog.isProvided = (function (x){
return false;
});

if(((cljs.core._STAR_loaded_libs_STAR_ == null)) || (cljs.core.empty_QMARK_.call(null,cljs.core._STAR_loaded_libs_STAR_))){
cljs.core._STAR_loaded_libs_STAR_ = (function (){var gntp = goog.dependencies_.nameToPath;
return cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.filter.call(null,((function (gntp){
return (function (name){
return (goog.dependencies_.visited[(gntp[name])]);
});})(gntp))
,cljs.core.js_keys.call(null,gntp)));
})();
} else {
}

goog.require = (function (name,reload){
if(cljs.core.truth_((function (){var or__16503__auto__ = !(cljs.core.contains_QMARK_.call(null,cljs.core._STAR_loaded_libs_STAR_,name));
if(or__16503__auto__){
return or__16503__auto__;
} else {
return reload;
}
})())){
cljs.core._STAR_loaded_libs_STAR_ = cljs.core.conj.call(null,(function (){var or__16503__auto__ = cljs.core._STAR_loaded_libs_STAR_;
if(cljs.core.truth_(or__16503__auto__)){
return or__16503__auto__;
} else {
return cljs.core.PersistentHashSet.EMPTY;
}
})(),name);

return figwheel.client.file_reloading.reload_file_STAR_.call(null,figwheel.client.file_reloading.resolve_ns.call(null,name));
} else {
return null;
}
});

goog.provide = goog.exportPath_;

return goog.global.CLOSURE_IMPORT_SCRIPT = figwheel.client.file_reloading.reload_file_STAR_;
});
if(typeof figwheel.client.file_reloading.resolve_url !== 'undefined'){
} else {
figwheel.client.file_reloading.resolve_url = (function (){var method_table__17397__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__17398__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var method_cache__17399__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__17400__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__17401__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));
return (new cljs.core.MultiFn(cljs.core.symbol.call(null,"figwheel.client.file-reloading","resolve-url"),new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__17401__auto__,method_table__17397__auto__,prefer_table__17398__auto__,method_cache__17399__auto__,cached_hierarchy__17400__auto__));
})();
}
cljs.core._add_method.call(null,figwheel.client.file_reloading.resolve_url,new cljs.core.Keyword(null,"default","default",-1987822328),(function (p__24690){
var map__24691 = p__24690;
var map__24691__$1 = ((((!((map__24691 == null)))?((((map__24691.cljs$lang$protocol_mask$partition0$ & (64))) || (map__24691.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__24691):map__24691);
var file = cljs.core.get.call(null,map__24691__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
return file;
}));
cljs.core._add_method.call(null,figwheel.client.file_reloading.resolve_url,new cljs.core.Keyword(null,"namespace","namespace",-377510372),(function (p__24693){
var map__24694 = p__24693;
var map__24694__$1 = ((((!((map__24694 == null)))?((((map__24694.cljs$lang$protocol_mask$partition0$ & (64))) || (map__24694.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__24694):map__24694);
var namespace = cljs.core.get.call(null,map__24694__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));

return figwheel.client.file_reloading.resolve_ns.call(null,namespace);
}));
if(typeof figwheel.client.file_reloading.reload_base !== 'undefined'){
} else {
figwheel.client.file_reloading.reload_base = (function (){var method_table__17397__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__17398__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var method_cache__17399__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__17400__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__17401__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));
return (new cljs.core.MultiFn(cljs.core.symbol.call(null,"figwheel.client.file-reloading","reload-base"),figwheel.client.utils.host_env_QMARK_,new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__17401__auto__,method_table__17397__auto__,prefer_table__17398__auto__,method_cache__17399__auto__,cached_hierarchy__17400__auto__));
})();
}
cljs.core._add_method.call(null,figwheel.client.file_reloading.reload_base,new cljs.core.Keyword(null,"node","node",581201198),(function (request_url,callback){

var root = clojure.string.join.call(null,"/",cljs.core.reverse.call(null,cljs.core.drop.call(null,(2),cljs.core.reverse.call(null,clojure.string.split.call(null,__dirname,"/")))));
var path = [cljs.core.str(root),cljs.core.str("/"),cljs.core.str(request_url)].join('');
(require.cache[path] = null);

return callback.call(null,(function (){try{return require(path);
}catch (e24696){if((e24696 instanceof Error)){
var e = e24696;
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),[cljs.core.str("Figwheel: Error loading file "),cljs.core.str(path)].join(''));

figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),e.stack);

return false;
} else {
throw e24696;

}
}})());
}));
cljs.core._add_method.call(null,figwheel.client.file_reloading.reload_base,new cljs.core.Keyword(null,"html","html",-998796897),(function (request_url,callback){

var deferred = goog.net.jsloader.load(figwheel.client.file_reloading.add_cache_buster.call(null,request_url),{"cleanupWhenDone": true});
deferred.addCallback(((function (deferred){
return (function (){
return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [true], null));
});})(deferred))
);

return deferred.addErrback(((function (deferred){
return (function (){
return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [false], null));
});})(deferred))
);
}));
figwheel.client.file_reloading.reload_file_STAR_ = (function figwheel$client$file_reloading$reload_file_STAR_(){
var args24697 = [];
var len__17542__auto___24700 = arguments.length;
var i__17543__auto___24701 = (0);
while(true){
if((i__17543__auto___24701 < len__17542__auto___24700)){
args24697.push((arguments[i__17543__auto___24701]));

var G__24702 = (i__17543__auto___24701 + (1));
i__17543__auto___24701 = G__24702;
continue;
} else {
}
break;
}

var G__24699 = args24697.length;
switch (G__24699) {
case 2:
return figwheel.client.file_reloading.reload_file_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return figwheel.client.file_reloading.reload_file_STAR_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args24697.length)].join('')));

}
});

figwheel.client.file_reloading.reload_file_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (request_url,callback){
return figwheel.client.file_reloading.reload_base.call(null,request_url,callback);
});

figwheel.client.file_reloading.reload_file_STAR_.cljs$core$IFn$_invoke$arity$1 = (function (request_url){
return figwheel.client.file_reloading.reload_file_STAR_.call(null,request_url,cljs.core.identity);
});

figwheel.client.file_reloading.reload_file_STAR_.cljs$lang$maxFixedArity = 2;
figwheel.client.file_reloading.reload_file = (function figwheel$client$file_reloading$reload_file(p__24704,callback){
var map__24707 = p__24704;
var map__24707__$1 = ((((!((map__24707 == null)))?((((map__24707.cljs$lang$protocol_mask$partition0$ & (64))) || (map__24707.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__24707):map__24707);
var file_msg = map__24707__$1;
var request_url = cljs.core.get.call(null,map__24707__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));

figwheel.client.utils.debug_prn.call(null,[cljs.core.str("FigWheel: Attempting to load "),cljs.core.str(request_url)].join(''));

return figwheel.client.file_reloading.reload_file_STAR_.call(null,request_url,((function (map__24707,map__24707__$1,file_msg,request_url){
return (function (success_QMARK_){
if(cljs.core.truth_(success_QMARK_)){
figwheel.client.utils.debug_prn.call(null,[cljs.core.str("FigWheel: Successfullly loaded "),cljs.core.str(request_url)].join(''));

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.assoc.call(null,file_msg,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),true)], null));
} else {
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),[cljs.core.str("Figwheel: Error loading file "),cljs.core.str(request_url)].join(''));

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [file_msg], null));
}
});})(map__24707,map__24707__$1,file_msg,request_url))
);
});
figwheel.client.file_reloading.reload_file_QMARK_ = (function figwheel$client$file_reloading$reload_file_QMARK_(p__24709){
var map__24712 = p__24709;
var map__24712__$1 = ((((!((map__24712 == null)))?((((map__24712.cljs$lang$protocol_mask$partition0$ & (64))) || (map__24712.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__24712):map__24712);
var file_msg = map__24712__$1;
var namespace = cljs.core.get.call(null,map__24712__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var meta_data = cljs.core.get.call(null,map__24712__$1,new cljs.core.Keyword(null,"meta-data","meta-data",-1613399157));

var meta_data__$1 = (function (){var or__16503__auto__ = meta_data;
if(cljs.core.truth_(or__16503__auto__)){
return or__16503__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
var and__16491__auto__ = cljs.core.not.call(null,new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179).cljs$core$IFn$_invoke$arity$1(meta_data__$1));
if(and__16491__auto__){
var or__16503__auto__ = new cljs.core.Keyword(null,"figwheel-always","figwheel-always",799819691).cljs$core$IFn$_invoke$arity$1(meta_data__$1);
if(cljs.core.truth_(or__16503__auto__)){
return or__16503__auto__;
} else {
var or__16503__auto____$1 = new cljs.core.Keyword(null,"figwheel-load","figwheel-load",1316089175).cljs$core$IFn$_invoke$arity$1(meta_data__$1);
if(cljs.core.truth_(or__16503__auto____$1)){
return or__16503__auto____$1;
} else {
var and__16491__auto____$1 = cljs.core.contains_QMARK_.call(null,cljs.core._STAR_loaded_libs_STAR_,namespace);
if(and__16491__auto____$1){
var or__16503__auto____$2 = !(cljs.core.contains_QMARK_.call(null,meta_data__$1,new cljs.core.Keyword(null,"file-changed-on-disk","file-changed-on-disk",1086171932)));
if(or__16503__auto____$2){
return or__16503__auto____$2;
} else {
return new cljs.core.Keyword(null,"file-changed-on-disk","file-changed-on-disk",1086171932).cljs$core$IFn$_invoke$arity$1(meta_data__$1);
}
} else {
return and__16491__auto____$1;
}
}
}
} else {
return and__16491__auto__;
}
});
figwheel.client.file_reloading.js_reload = (function figwheel$client$file_reloading$js_reload(p__24714,callback){
var map__24717 = p__24714;
var map__24717__$1 = ((((!((map__24717 == null)))?((((map__24717.cljs$lang$protocol_mask$partition0$ & (64))) || (map__24717.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__24717):map__24717);
var file_msg = map__24717__$1;
var request_url = cljs.core.get.call(null,map__24717__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));
var namespace = cljs.core.get.call(null,map__24717__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));

if(cljs.core.truth_(figwheel.client.file_reloading.reload_file_QMARK_.call(null,file_msg))){
return figwheel.client.file_reloading.reload_file.call(null,file_msg,callback);
} else {
figwheel.client.utils.debug_prn.call(null,[cljs.core.str("Figwheel: Not trying to load file "),cljs.core.str(request_url)].join(''));

return cljs.core.apply.call(null,callback,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [file_msg], null));
}
});
figwheel.client.file_reloading.reload_js_file = (function figwheel$client$file_reloading$reload_js_file(file_msg){
var out = cljs.core.async.chan.call(null);
setTimeout(((function (out){
return (function (){
return figwheel.client.file_reloading.js_reload.call(null,file_msg,((function (out){
return (function (url){
figwheel.client.file_reloading.patch_goog_base.call(null);

cljs.core.async.put_BANG_.call(null,out,url);

return cljs.core.async.close_BANG_.call(null,out);
});})(out))
);
});})(out))
,(0));

return out;
});
/**
 * Returns a chanel with one collection of loaded filenames on it.
 */
figwheel.client.file_reloading.load_all_js_files = (function figwheel$client$file_reloading$load_all_js_files(files){
var out = cljs.core.async.chan.call(null);
var c__19686__auto___24805 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19686__auto___24805,out){
return (function (){
var f__19687__auto__ = (function (){var switch__19621__auto__ = ((function (c__19686__auto___24805,out){
return (function (state_24787){
var state_val_24788 = (state_24787[(1)]);
if((state_val_24788 === (1))){
var inst_24765 = cljs.core.nth.call(null,files,(0),null);
var inst_24766 = cljs.core.nthnext.call(null,files,(1));
var inst_24767 = files;
var state_24787__$1 = (function (){var statearr_24789 = state_24787;
(statearr_24789[(7)] = inst_24766);

(statearr_24789[(8)] = inst_24765);

(statearr_24789[(9)] = inst_24767);

return statearr_24789;
})();
var statearr_24790_24806 = state_24787__$1;
(statearr_24790_24806[(2)] = null);

(statearr_24790_24806[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24788 === (2))){
var inst_24770 = (state_24787[(10)]);
var inst_24767 = (state_24787[(9)]);
var inst_24770__$1 = cljs.core.nth.call(null,inst_24767,(0),null);
var inst_24771 = cljs.core.nthnext.call(null,inst_24767,(1));
var inst_24772 = (inst_24770__$1 == null);
var inst_24773 = cljs.core.not.call(null,inst_24772);
var state_24787__$1 = (function (){var statearr_24791 = state_24787;
(statearr_24791[(11)] = inst_24771);

(statearr_24791[(10)] = inst_24770__$1);

return statearr_24791;
})();
if(inst_24773){
var statearr_24792_24807 = state_24787__$1;
(statearr_24792_24807[(1)] = (4));

} else {
var statearr_24793_24808 = state_24787__$1;
(statearr_24793_24808[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24788 === (3))){
var inst_24785 = (state_24787[(2)]);
var state_24787__$1 = state_24787;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_24787__$1,inst_24785);
} else {
if((state_val_24788 === (4))){
var inst_24770 = (state_24787[(10)]);
var inst_24775 = figwheel.client.file_reloading.reload_js_file.call(null,inst_24770);
var state_24787__$1 = state_24787;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_24787__$1,(7),inst_24775);
} else {
if((state_val_24788 === (5))){
var inst_24781 = cljs.core.async.close_BANG_.call(null,out);
var state_24787__$1 = state_24787;
var statearr_24794_24809 = state_24787__$1;
(statearr_24794_24809[(2)] = inst_24781);

(statearr_24794_24809[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24788 === (6))){
var inst_24783 = (state_24787[(2)]);
var state_24787__$1 = state_24787;
var statearr_24795_24810 = state_24787__$1;
(statearr_24795_24810[(2)] = inst_24783);

(statearr_24795_24810[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24788 === (7))){
var inst_24771 = (state_24787[(11)]);
var inst_24777 = (state_24787[(2)]);
var inst_24778 = cljs.core.async.put_BANG_.call(null,out,inst_24777);
var inst_24767 = inst_24771;
var state_24787__$1 = (function (){var statearr_24796 = state_24787;
(statearr_24796[(12)] = inst_24778);

(statearr_24796[(9)] = inst_24767);

return statearr_24796;
})();
var statearr_24797_24811 = state_24787__$1;
(statearr_24797_24811[(2)] = null);

(statearr_24797_24811[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(c__19686__auto___24805,out))
;
return ((function (switch__19621__auto__,c__19686__auto___24805,out){
return (function() {
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__19622__auto__ = null;
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__19622__auto____0 = (function (){
var statearr_24801 = [null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_24801[(0)] = figwheel$client$file_reloading$load_all_js_files_$_state_machine__19622__auto__);

(statearr_24801[(1)] = (1));

return statearr_24801;
});
var figwheel$client$file_reloading$load_all_js_files_$_state_machine__19622__auto____1 = (function (state_24787){
while(true){
var ret_value__19623__auto__ = (function (){try{while(true){
var result__19624__auto__ = switch__19621__auto__.call(null,state_24787);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19624__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19624__auto__;
}
break;
}
}catch (e24802){if((e24802 instanceof Object)){
var ex__19625__auto__ = e24802;
var statearr_24803_24812 = state_24787;
(statearr_24803_24812[(5)] = ex__19625__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24787);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e24802;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19623__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__24813 = state_24787;
state_24787 = G__24813;
continue;
} else {
return ret_value__19623__auto__;
}
break;
}
});
figwheel$client$file_reloading$load_all_js_files_$_state_machine__19622__auto__ = function(state_24787){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__19622__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__19622__auto____1.call(this,state_24787);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$load_all_js_files_$_state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$load_all_js_files_$_state_machine__19622__auto____0;
figwheel$client$file_reloading$load_all_js_files_$_state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$load_all_js_files_$_state_machine__19622__auto____1;
return figwheel$client$file_reloading$load_all_js_files_$_state_machine__19622__auto__;
})()
;})(switch__19621__auto__,c__19686__auto___24805,out))
})();
var state__19688__auto__ = (function (){var statearr_24804 = f__19687__auto__.call(null);
(statearr_24804[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19686__auto___24805);

return statearr_24804;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19688__auto__);
});})(c__19686__auto___24805,out))
);


return cljs.core.async.into.call(null,cljs.core.PersistentVector.EMPTY,out);
});
figwheel.client.file_reloading.add_request_url = (function figwheel$client$file_reloading$add_request_url(p__24814,p__24815){
var map__24820 = p__24814;
var map__24820__$1 = ((((!((map__24820 == null)))?((((map__24820.cljs$lang$protocol_mask$partition0$ & (64))) || (map__24820.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__24820):map__24820);
var opts = map__24820__$1;
var url_rewriter = cljs.core.get.call(null,map__24820__$1,new cljs.core.Keyword(null,"url-rewriter","url-rewriter",200543838));
var map__24821 = p__24815;
var map__24821__$1 = ((((!((map__24821 == null)))?((((map__24821.cljs$lang$protocol_mask$partition0$ & (64))) || (map__24821.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__24821):map__24821);
var file_msg = map__24821__$1;
var file = cljs.core.get.call(null,map__24821__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var resolved_path = figwheel.client.file_reloading.resolve_url.call(null,file_msg);
return cljs.core.assoc.call(null,file_msg,new cljs.core.Keyword(null,"request-url","request-url",2100346596),(cljs.core.truth_(url_rewriter)?url_rewriter.call(null,resolved_path):resolved_path));
});
figwheel.client.file_reloading.add_request_urls = (function figwheel$client$file_reloading$add_request_urls(opts,files){
return cljs.core.map.call(null,cljs.core.partial.call(null,figwheel.client.file_reloading.add_request_url,opts),files);
});
figwheel.client.file_reloading.eval_body = (function figwheel$client$file_reloading$eval_body(p__24824,opts){
var map__24828 = p__24824;
var map__24828__$1 = ((((!((map__24828 == null)))?((((map__24828.cljs$lang$protocol_mask$partition0$ & (64))) || (map__24828.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__24828):map__24828);
var eval_body__$1 = cljs.core.get.call(null,map__24828__$1,new cljs.core.Keyword(null,"eval-body","eval-body",-907279883));
var file = cljs.core.get.call(null,map__24828__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
if(cljs.core.truth_((function (){var and__16491__auto__ = eval_body__$1;
if(cljs.core.truth_(and__16491__auto__)){
return typeof eval_body__$1 === 'string';
} else {
return and__16491__auto__;
}
})())){
var code = eval_body__$1;
try{figwheel.client.utils.debug_prn.call(null,[cljs.core.str("Evaling file "),cljs.core.str(file)].join(''));

return figwheel.client.utils.eval_helper.call(null,code,opts);
}catch (e24830){var e = e24830;
return figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"error","error",-978969032),[cljs.core.str("Unable to evaluate "),cljs.core.str(file)].join(''));
}} else {
return null;
}
});
figwheel.client.file_reloading.reload_js_files = (function figwheel$client$file_reloading$reload_js_files(p__24835,p__24836){
var map__25064 = p__24835;
var map__25064__$1 = ((((!((map__25064 == null)))?((((map__25064.cljs$lang$protocol_mask$partition0$ & (64))) || (map__25064.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__25064):map__25064);
var opts = map__25064__$1;
var before_jsload = cljs.core.get.call(null,map__25064__$1,new cljs.core.Keyword(null,"before-jsload","before-jsload",-847513128));
var on_jsload = cljs.core.get.call(null,map__25064__$1,new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602));
var load_unchanged_files = cljs.core.get.call(null,map__25064__$1,new cljs.core.Keyword(null,"load-unchanged-files","load-unchanged-files",-1561468704));
var map__25065 = p__24836;
var map__25065__$1 = ((((!((map__25065 == null)))?((((map__25065.cljs$lang$protocol_mask$partition0$ & (64))) || (map__25065.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__25065):map__25065);
var msg = map__25065__$1;
var files = cljs.core.get.call(null,map__25065__$1,new cljs.core.Keyword(null,"files","files",-472457450));
var c__19686__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19686__auto__,map__25064,map__25064__$1,opts,before_jsload,on_jsload,load_unchanged_files,map__25065,map__25065__$1,msg,files){
return (function (){
var f__19687__auto__ = (function (){var switch__19621__auto__ = ((function (c__19686__auto__,map__25064,map__25064__$1,opts,before_jsload,on_jsload,load_unchanged_files,map__25065,map__25065__$1,msg,files){
return (function (state_25206){
var state_val_25207 = (state_25206[(1)]);
if((state_val_25207 === (7))){
var inst_25081 = (state_25206[(7)]);
var inst_25079 = (state_25206[(8)]);
var inst_25082 = (state_25206[(9)]);
var inst_25080 = (state_25206[(10)]);
var inst_25087 = cljs.core._nth.call(null,inst_25080,inst_25082);
var inst_25088 = figwheel.client.file_reloading.eval_body.call(null,inst_25087,opts);
var inst_25089 = (inst_25082 + (1));
var tmp25208 = inst_25081;
var tmp25209 = inst_25079;
var tmp25210 = inst_25080;
var inst_25079__$1 = tmp25209;
var inst_25080__$1 = tmp25210;
var inst_25081__$1 = tmp25208;
var inst_25082__$1 = inst_25089;
var state_25206__$1 = (function (){var statearr_25211 = state_25206;
(statearr_25211[(7)] = inst_25081__$1);

(statearr_25211[(8)] = inst_25079__$1);

(statearr_25211[(9)] = inst_25082__$1);

(statearr_25211[(11)] = inst_25088);

(statearr_25211[(10)] = inst_25080__$1);

return statearr_25211;
})();
var statearr_25212_25291 = state_25206__$1;
(statearr_25212_25291[(2)] = null);

(statearr_25212_25291[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25207 === (20))){
var inst_25131 = (state_25206[(12)]);
var inst_25124 = (state_25206[(13)]);
var inst_25128 = (state_25206[(14)]);
var inst_25125 = (state_25206[(15)]);
var inst_25129 = (state_25206[(16)]);
var inst_25134 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: loaded these files");
var inst_25136 = (function (){var all_files = inst_25124;
var files_SINGLEQUOTE_ = inst_25125;
var res_SINGLEQUOTE_ = inst_25128;
var res = inst_25129;
var files_not_loaded = inst_25131;
return ((function (all_files,files_SINGLEQUOTE_,res_SINGLEQUOTE_,res,files_not_loaded,inst_25131,inst_25124,inst_25128,inst_25125,inst_25129,inst_25134,state_val_25207,c__19686__auto__,map__25064,map__25064__$1,opts,before_jsload,on_jsload,load_unchanged_files,map__25065,map__25065__$1,msg,files){
return (function (p__25135){
var map__25213 = p__25135;
var map__25213__$1 = ((((!((map__25213 == null)))?((((map__25213.cljs$lang$protocol_mask$partition0$ & (64))) || (map__25213.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__25213):map__25213);
var namespace = cljs.core.get.call(null,map__25213__$1,new cljs.core.Keyword(null,"namespace","namespace",-377510372));
var file = cljs.core.get.call(null,map__25213__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
if(cljs.core.truth_(namespace)){
return figwheel.client.file_reloading.ns_to_js_file.call(null,namespace);
} else {
return file;
}
});
;})(all_files,files_SINGLEQUOTE_,res_SINGLEQUOTE_,res,files_not_loaded,inst_25131,inst_25124,inst_25128,inst_25125,inst_25129,inst_25134,state_val_25207,c__19686__auto__,map__25064,map__25064__$1,opts,before_jsload,on_jsload,load_unchanged_files,map__25065,map__25065__$1,msg,files))
})();
var inst_25137 = cljs.core.map.call(null,inst_25136,inst_25129);
var inst_25138 = cljs.core.pr_str.call(null,inst_25137);
var inst_25139 = figwheel.client.utils.log.call(null,inst_25138);
var inst_25140 = (function (){var all_files = inst_25124;
var files_SINGLEQUOTE_ = inst_25125;
var res_SINGLEQUOTE_ = inst_25128;
var res = inst_25129;
var files_not_loaded = inst_25131;
return ((function (all_files,files_SINGLEQUOTE_,res_SINGLEQUOTE_,res,files_not_loaded,inst_25131,inst_25124,inst_25128,inst_25125,inst_25129,inst_25134,inst_25136,inst_25137,inst_25138,inst_25139,state_val_25207,c__19686__auto__,map__25064,map__25064__$1,opts,before_jsload,on_jsload,load_unchanged_files,map__25065,map__25065__$1,msg,files){
return (function (){
figwheel.client.file_reloading.on_jsload_custom_event.call(null,res);

return cljs.core.apply.call(null,on_jsload,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [res], null));
});
;})(all_files,files_SINGLEQUOTE_,res_SINGLEQUOTE_,res,files_not_loaded,inst_25131,inst_25124,inst_25128,inst_25125,inst_25129,inst_25134,inst_25136,inst_25137,inst_25138,inst_25139,state_val_25207,c__19686__auto__,map__25064,map__25064__$1,opts,before_jsload,on_jsload,load_unchanged_files,map__25065,map__25065__$1,msg,files))
})();
var inst_25141 = setTimeout(inst_25140,(10));
var state_25206__$1 = (function (){var statearr_25215 = state_25206;
(statearr_25215[(17)] = inst_25139);

(statearr_25215[(18)] = inst_25134);

return statearr_25215;
})();
var statearr_25216_25292 = state_25206__$1;
(statearr_25216_25292[(2)] = inst_25141);

(statearr_25216_25292[(1)] = (22));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25207 === (27))){
var state_25206__$1 = state_25206;
var statearr_25217_25293 = state_25206__$1;
(statearr_25217_25293[(2)] = false);

(statearr_25217_25293[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25207 === (1))){
var inst_25071 = (state_25206[(19)]);
var inst_25068 = before_jsload.call(null,files);
var inst_25069 = figwheel.client.file_reloading.before_jsload_custom_event.call(null,files);
var inst_25070 = (function (){return ((function (inst_25071,inst_25068,inst_25069,state_val_25207,c__19686__auto__,map__25064,map__25064__$1,opts,before_jsload,on_jsload,load_unchanged_files,map__25065,map__25065__$1,msg,files){
return (function (p1__24831_SHARP_){
return new cljs.core.Keyword(null,"eval-body","eval-body",-907279883).cljs$core$IFn$_invoke$arity$1(p1__24831_SHARP_);
});
;})(inst_25071,inst_25068,inst_25069,state_val_25207,c__19686__auto__,map__25064,map__25064__$1,opts,before_jsload,on_jsload,load_unchanged_files,map__25065,map__25065__$1,msg,files))
})();
var inst_25071__$1 = cljs.core.filter.call(null,inst_25070,files);
var inst_25072 = cljs.core.not_empty.call(null,inst_25071__$1);
var state_25206__$1 = (function (){var statearr_25218 = state_25206;
(statearr_25218[(19)] = inst_25071__$1);

(statearr_25218[(20)] = inst_25069);

(statearr_25218[(21)] = inst_25068);

return statearr_25218;
})();
if(cljs.core.truth_(inst_25072)){
var statearr_25219_25294 = state_25206__$1;
(statearr_25219_25294[(1)] = (2));

} else {
var statearr_25220_25295 = state_25206__$1;
(statearr_25220_25295[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25207 === (24))){
var state_25206__$1 = state_25206;
var statearr_25221_25296 = state_25206__$1;
(statearr_25221_25296[(2)] = null);

(statearr_25221_25296[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25207 === (39))){
var state_25206__$1 = state_25206;
var statearr_25222_25297 = state_25206__$1;
(statearr_25222_25297[(2)] = null);

(statearr_25222_25297[(1)] = (40));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25207 === (4))){
var inst_25116 = (state_25206[(2)]);
var inst_25117 = (function (){return ((function (inst_25116,state_val_25207,c__19686__auto__,map__25064,map__25064__$1,opts,before_jsload,on_jsload,load_unchanged_files,map__25065,map__25065__$1,msg,files){
return (function (p1__24832_SHARP_){
var and__16491__auto__ = new cljs.core.Keyword(null,"namespace","namespace",-377510372).cljs$core$IFn$_invoke$arity$1(p1__24832_SHARP_);
if(cljs.core.truth_(and__16491__auto__)){
return cljs.core.not.call(null,new cljs.core.Keyword(null,"eval-body","eval-body",-907279883).cljs$core$IFn$_invoke$arity$1(p1__24832_SHARP_));
} else {
return and__16491__auto__;
}
});
;})(inst_25116,state_val_25207,c__19686__auto__,map__25064,map__25064__$1,opts,before_jsload,on_jsload,load_unchanged_files,map__25065,map__25065__$1,msg,files))
})();
var inst_25118 = cljs.core.filter.call(null,inst_25117,files);
var state_25206__$1 = (function (){var statearr_25223 = state_25206;
(statearr_25223[(22)] = inst_25116);

(statearr_25223[(23)] = inst_25118);

return statearr_25223;
})();
if(cljs.core.truth_(load_unchanged_files)){
var statearr_25224_25298 = state_25206__$1;
(statearr_25224_25298[(1)] = (16));

} else {
var statearr_25225_25299 = state_25206__$1;
(statearr_25225_25299[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25207 === (15))){
var inst_25106 = (state_25206[(2)]);
var state_25206__$1 = state_25206;
var statearr_25226_25300 = state_25206__$1;
(statearr_25226_25300[(2)] = inst_25106);

(statearr_25226_25300[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25207 === (21))){
var state_25206__$1 = state_25206;
var statearr_25227_25301 = state_25206__$1;
(statearr_25227_25301[(2)] = null);

(statearr_25227_25301[(1)] = (22));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25207 === (31))){
var inst_25163 = (state_25206[(2)]);
var state_25206__$1 = state_25206;
var statearr_25228_25302 = state_25206__$1;
(statearr_25228_25302[(2)] = inst_25163);

(statearr_25228_25302[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25207 === (32))){
var inst_25151 = (state_25206[(24)]);
var inst_25168 = cljs.core.apply.call(null,cljs.core.hash_map,inst_25151);
var state_25206__$1 = state_25206;
var statearr_25229_25303 = state_25206__$1;
(statearr_25229_25303[(2)] = inst_25168);

(statearr_25229_25303[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25207 === (40))){
var inst_25174 = (state_25206[(25)]);
var inst_25192 = (state_25206[(2)]);
var inst_25193 = cljs.core.not_empty.call(null,inst_25174);
var state_25206__$1 = (function (){var statearr_25230 = state_25206;
(statearr_25230[(26)] = inst_25192);

return statearr_25230;
})();
if(cljs.core.truth_(inst_25193)){
var statearr_25231_25304 = state_25206__$1;
(statearr_25231_25304[(1)] = (41));

} else {
var statearr_25232_25305 = state_25206__$1;
(statearr_25232_25305[(1)] = (42));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25207 === (33))){
var inst_25151 = (state_25206[(24)]);
var state_25206__$1 = state_25206;
var statearr_25233_25306 = state_25206__$1;
(statearr_25233_25306[(2)] = inst_25151);

(statearr_25233_25306[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25207 === (13))){
var inst_25092 = (state_25206[(27)]);
var inst_25096 = cljs.core.chunk_first.call(null,inst_25092);
var inst_25097 = cljs.core.chunk_rest.call(null,inst_25092);
var inst_25098 = cljs.core.count.call(null,inst_25096);
var inst_25079 = inst_25097;
var inst_25080 = inst_25096;
var inst_25081 = inst_25098;
var inst_25082 = (0);
var state_25206__$1 = (function (){var statearr_25234 = state_25206;
(statearr_25234[(7)] = inst_25081);

(statearr_25234[(8)] = inst_25079);

(statearr_25234[(9)] = inst_25082);

(statearr_25234[(10)] = inst_25080);

return statearr_25234;
})();
var statearr_25235_25307 = state_25206__$1;
(statearr_25235_25307[(2)] = null);

(statearr_25235_25307[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25207 === (22))){
var inst_25131 = (state_25206[(12)]);
var inst_25144 = (state_25206[(2)]);
var inst_25145 = cljs.core.not_empty.call(null,inst_25131);
var state_25206__$1 = (function (){var statearr_25236 = state_25206;
(statearr_25236[(28)] = inst_25144);

return statearr_25236;
})();
if(cljs.core.truth_(inst_25145)){
var statearr_25237_25308 = state_25206__$1;
(statearr_25237_25308[(1)] = (23));

} else {
var statearr_25238_25309 = state_25206__$1;
(statearr_25238_25309[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25207 === (36))){
var state_25206__$1 = state_25206;
var statearr_25239_25310 = state_25206__$1;
(statearr_25239_25310[(2)] = null);

(statearr_25239_25310[(1)] = (37));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25207 === (41))){
var inst_25174 = (state_25206[(25)]);
var inst_25195 = cljs.core.map.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),inst_25174);
var inst_25196 = cljs.core.pr_str.call(null,inst_25195);
var inst_25197 = [cljs.core.str("not required: "),cljs.core.str(inst_25196)].join('');
var inst_25198 = figwheel.client.utils.log.call(null,inst_25197);
var state_25206__$1 = state_25206;
var statearr_25240_25311 = state_25206__$1;
(statearr_25240_25311[(2)] = inst_25198);

(statearr_25240_25311[(1)] = (43));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25207 === (43))){
var inst_25201 = (state_25206[(2)]);
var state_25206__$1 = state_25206;
var statearr_25241_25312 = state_25206__$1;
(statearr_25241_25312[(2)] = inst_25201);

(statearr_25241_25312[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25207 === (29))){
var state_25206__$1 = state_25206;
var statearr_25242_25313 = state_25206__$1;
(statearr_25242_25313[(2)] = true);

(statearr_25242_25313[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25207 === (6))){
var inst_25113 = (state_25206[(2)]);
var state_25206__$1 = state_25206;
var statearr_25243_25314 = state_25206__$1;
(statearr_25243_25314[(2)] = inst_25113);

(statearr_25243_25314[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25207 === (28))){
var inst_25166 = (state_25206[(2)]);
var state_25206__$1 = state_25206;
if(cljs.core.truth_(inst_25166)){
var statearr_25244_25315 = state_25206__$1;
(statearr_25244_25315[(1)] = (32));

} else {
var statearr_25245_25316 = state_25206__$1;
(statearr_25245_25316[(1)] = (33));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25207 === (25))){
var inst_25204 = (state_25206[(2)]);
var state_25206__$1 = state_25206;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25206__$1,inst_25204);
} else {
if((state_val_25207 === (34))){
var inst_25172 = (state_25206[(29)]);
var inst_25171 = (state_25206[(2)]);
var inst_25172__$1 = cljs.core.get.call(null,inst_25171,new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179));
var inst_25173 = cljs.core.get.call(null,inst_25171,new cljs.core.Keyword(null,"file-changed-on-disk","file-changed-on-disk",1086171932));
var inst_25174 = cljs.core.get.call(null,inst_25171,new cljs.core.Keyword(null,"not-required","not-required",-950359114));
var inst_25175 = cljs.core.not_empty.call(null,inst_25172__$1);
var state_25206__$1 = (function (){var statearr_25246 = state_25206;
(statearr_25246[(30)] = inst_25173);

(statearr_25246[(29)] = inst_25172__$1);

(statearr_25246[(25)] = inst_25174);

return statearr_25246;
})();
if(cljs.core.truth_(inst_25175)){
var statearr_25247_25317 = state_25206__$1;
(statearr_25247_25317[(1)] = (35));

} else {
var statearr_25248_25318 = state_25206__$1;
(statearr_25248_25318[(1)] = (36));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25207 === (17))){
var inst_25118 = (state_25206[(23)]);
var state_25206__$1 = state_25206;
var statearr_25249_25319 = state_25206__$1;
(statearr_25249_25319[(2)] = inst_25118);

(statearr_25249_25319[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25207 === (3))){
var state_25206__$1 = state_25206;
var statearr_25250_25320 = state_25206__$1;
(statearr_25250_25320[(2)] = null);

(statearr_25250_25320[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25207 === (12))){
var inst_25109 = (state_25206[(2)]);
var state_25206__$1 = state_25206;
var statearr_25251_25321 = state_25206__$1;
(statearr_25251_25321[(2)] = inst_25109);

(statearr_25251_25321[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25207 === (2))){
var inst_25071 = (state_25206[(19)]);
var inst_25078 = cljs.core.seq.call(null,inst_25071);
var inst_25079 = inst_25078;
var inst_25080 = null;
var inst_25081 = (0);
var inst_25082 = (0);
var state_25206__$1 = (function (){var statearr_25252 = state_25206;
(statearr_25252[(7)] = inst_25081);

(statearr_25252[(8)] = inst_25079);

(statearr_25252[(9)] = inst_25082);

(statearr_25252[(10)] = inst_25080);

return statearr_25252;
})();
var statearr_25253_25322 = state_25206__$1;
(statearr_25253_25322[(2)] = null);

(statearr_25253_25322[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25207 === (23))){
var inst_25131 = (state_25206[(12)]);
var inst_25124 = (state_25206[(13)]);
var inst_25128 = (state_25206[(14)]);
var inst_25125 = (state_25206[(15)]);
var inst_25129 = (state_25206[(16)]);
var inst_25151 = (state_25206[(24)]);
var inst_25147 = figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: NOT loading these files ");
var inst_25150 = (function (){var all_files = inst_25124;
var files_SINGLEQUOTE_ = inst_25125;
var res_SINGLEQUOTE_ = inst_25128;
var res = inst_25129;
var files_not_loaded = inst_25131;
return ((function (all_files,files_SINGLEQUOTE_,res_SINGLEQUOTE_,res,files_not_loaded,inst_25131,inst_25124,inst_25128,inst_25125,inst_25129,inst_25151,inst_25147,state_val_25207,c__19686__auto__,map__25064,map__25064__$1,opts,before_jsload,on_jsload,load_unchanged_files,map__25065,map__25065__$1,msg,files){
return (function (p__25149){
var map__25254 = p__25149;
var map__25254__$1 = ((((!((map__25254 == null)))?((((map__25254.cljs$lang$protocol_mask$partition0$ & (64))) || (map__25254.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__25254):map__25254);
var meta_data = cljs.core.get.call(null,map__25254__$1,new cljs.core.Keyword(null,"meta-data","meta-data",-1613399157));
if((meta_data == null)){
return new cljs.core.Keyword(null,"not-required","not-required",-950359114);
} else {
if(cljs.core.contains_QMARK_.call(null,meta_data,new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179))){
return new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179);
} else {
if((cljs.core.contains_QMARK_.call(null,meta_data,new cljs.core.Keyword(null,"file-changed-on-disk","file-changed-on-disk",1086171932))) && (cljs.core.not.call(null,new cljs.core.Keyword(null,"file-changed-on-disk","file-changed-on-disk",1086171932).cljs$core$IFn$_invoke$arity$1(meta_data)))){
return new cljs.core.Keyword(null,"file-changed-on-disk","file-changed-on-disk",1086171932);
} else {
return new cljs.core.Keyword(null,"not-required","not-required",-950359114);

}
}
}
});
;})(all_files,files_SINGLEQUOTE_,res_SINGLEQUOTE_,res,files_not_loaded,inst_25131,inst_25124,inst_25128,inst_25125,inst_25129,inst_25151,inst_25147,state_val_25207,c__19686__auto__,map__25064,map__25064__$1,opts,before_jsload,on_jsload,load_unchanged_files,map__25065,map__25065__$1,msg,files))
})();
var inst_25151__$1 = cljs.core.group_by.call(null,inst_25150,inst_25131);
var inst_25153 = (inst_25151__$1 == null);
var inst_25154 = cljs.core.not.call(null,inst_25153);
var state_25206__$1 = (function (){var statearr_25256 = state_25206;
(statearr_25256[(31)] = inst_25147);

(statearr_25256[(24)] = inst_25151__$1);

return statearr_25256;
})();
if(inst_25154){
var statearr_25257_25323 = state_25206__$1;
(statearr_25257_25323[(1)] = (26));

} else {
var statearr_25258_25324 = state_25206__$1;
(statearr_25258_25324[(1)] = (27));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25207 === (35))){
var inst_25172 = (state_25206[(29)]);
var inst_25177 = cljs.core.map.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),inst_25172);
var inst_25178 = cljs.core.pr_str.call(null,inst_25177);
var inst_25179 = [cljs.core.str("figwheel-no-load meta-data: "),cljs.core.str(inst_25178)].join('');
var inst_25180 = figwheel.client.utils.log.call(null,inst_25179);
var state_25206__$1 = state_25206;
var statearr_25259_25325 = state_25206__$1;
(statearr_25259_25325[(2)] = inst_25180);

(statearr_25259_25325[(1)] = (37));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25207 === (19))){
var inst_25124 = (state_25206[(13)]);
var inst_25128 = (state_25206[(14)]);
var inst_25125 = (state_25206[(15)]);
var inst_25129 = (state_25206[(16)]);
var inst_25128__$1 = (state_25206[(2)]);
var inst_25129__$1 = cljs.core.filter.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375),inst_25128__$1);
var inst_25130 = (function (){var all_files = inst_25124;
var files_SINGLEQUOTE_ = inst_25125;
var res_SINGLEQUOTE_ = inst_25128__$1;
var res = inst_25129__$1;
return ((function (all_files,files_SINGLEQUOTE_,res_SINGLEQUOTE_,res,inst_25124,inst_25128,inst_25125,inst_25129,inst_25128__$1,inst_25129__$1,state_val_25207,c__19686__auto__,map__25064,map__25064__$1,opts,before_jsload,on_jsload,load_unchanged_files,map__25065,map__25065__$1,msg,files){
return (function (p1__24834_SHARP_){
return cljs.core.not.call(null,new cljs.core.Keyword(null,"loaded-file","loaded-file",-168399375).cljs$core$IFn$_invoke$arity$1(p1__24834_SHARP_));
});
;})(all_files,files_SINGLEQUOTE_,res_SINGLEQUOTE_,res,inst_25124,inst_25128,inst_25125,inst_25129,inst_25128__$1,inst_25129__$1,state_val_25207,c__19686__auto__,map__25064,map__25064__$1,opts,before_jsload,on_jsload,load_unchanged_files,map__25065,map__25065__$1,msg,files))
})();
var inst_25131 = cljs.core.filter.call(null,inst_25130,inst_25128__$1);
var inst_25132 = cljs.core.not_empty.call(null,inst_25129__$1);
var state_25206__$1 = (function (){var statearr_25260 = state_25206;
(statearr_25260[(12)] = inst_25131);

(statearr_25260[(14)] = inst_25128__$1);

(statearr_25260[(16)] = inst_25129__$1);

return statearr_25260;
})();
if(cljs.core.truth_(inst_25132)){
var statearr_25261_25326 = state_25206__$1;
(statearr_25261_25326[(1)] = (20));

} else {
var statearr_25262_25327 = state_25206__$1;
(statearr_25262_25327[(1)] = (21));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25207 === (11))){
var state_25206__$1 = state_25206;
var statearr_25263_25328 = state_25206__$1;
(statearr_25263_25328[(2)] = null);

(statearr_25263_25328[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25207 === (9))){
var inst_25111 = (state_25206[(2)]);
var state_25206__$1 = state_25206;
var statearr_25264_25329 = state_25206__$1;
(statearr_25264_25329[(2)] = inst_25111);

(statearr_25264_25329[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25207 === (5))){
var inst_25081 = (state_25206[(7)]);
var inst_25082 = (state_25206[(9)]);
var inst_25084 = (inst_25082 < inst_25081);
var inst_25085 = inst_25084;
var state_25206__$1 = state_25206;
if(cljs.core.truth_(inst_25085)){
var statearr_25265_25330 = state_25206__$1;
(statearr_25265_25330[(1)] = (7));

} else {
var statearr_25266_25331 = state_25206__$1;
(statearr_25266_25331[(1)] = (8));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25207 === (14))){
var inst_25092 = (state_25206[(27)]);
var inst_25101 = cljs.core.first.call(null,inst_25092);
var inst_25102 = figwheel.client.file_reloading.eval_body.call(null,inst_25101,opts);
var inst_25103 = cljs.core.next.call(null,inst_25092);
var inst_25079 = inst_25103;
var inst_25080 = null;
var inst_25081 = (0);
var inst_25082 = (0);
var state_25206__$1 = (function (){var statearr_25267 = state_25206;
(statearr_25267[(7)] = inst_25081);

(statearr_25267[(8)] = inst_25079);

(statearr_25267[(9)] = inst_25082);

(statearr_25267[(10)] = inst_25080);

(statearr_25267[(32)] = inst_25102);

return statearr_25267;
})();
var statearr_25268_25332 = state_25206__$1;
(statearr_25268_25332[(2)] = null);

(statearr_25268_25332[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25207 === (26))){
var inst_25151 = (state_25206[(24)]);
var inst_25156 = inst_25151.cljs$lang$protocol_mask$partition0$;
var inst_25157 = (inst_25156 & (64));
var inst_25158 = inst_25151.cljs$core$ISeq$;
var inst_25159 = (inst_25157) || (inst_25158);
var state_25206__$1 = state_25206;
if(cljs.core.truth_(inst_25159)){
var statearr_25269_25333 = state_25206__$1;
(statearr_25269_25333[(1)] = (29));

} else {
var statearr_25270_25334 = state_25206__$1;
(statearr_25270_25334[(1)] = (30));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25207 === (16))){
var inst_25118 = (state_25206[(23)]);
var inst_25120 = (function (){var all_files = inst_25118;
return ((function (all_files,inst_25118,state_val_25207,c__19686__auto__,map__25064,map__25064__$1,opts,before_jsload,on_jsload,load_unchanged_files,map__25065,map__25065__$1,msg,files){
return (function (p1__24833_SHARP_){
return cljs.core.update_in.call(null,p1__24833_SHARP_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"meta-data","meta-data",-1613399157)], null),cljs.core.dissoc,new cljs.core.Keyword(null,"file-changed-on-disk","file-changed-on-disk",1086171932));
});
;})(all_files,inst_25118,state_val_25207,c__19686__auto__,map__25064,map__25064__$1,opts,before_jsload,on_jsload,load_unchanged_files,map__25065,map__25065__$1,msg,files))
})();
var inst_25121 = cljs.core.map.call(null,inst_25120,inst_25118);
var state_25206__$1 = state_25206;
var statearr_25271_25335 = state_25206__$1;
(statearr_25271_25335[(2)] = inst_25121);

(statearr_25271_25335[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25207 === (38))){
var inst_25173 = (state_25206[(30)]);
var inst_25186 = cljs.core.map.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),inst_25173);
var inst_25187 = cljs.core.pr_str.call(null,inst_25186);
var inst_25188 = [cljs.core.str("file didn't change: "),cljs.core.str(inst_25187)].join('');
var inst_25189 = figwheel.client.utils.log.call(null,inst_25188);
var state_25206__$1 = state_25206;
var statearr_25272_25336 = state_25206__$1;
(statearr_25272_25336[(2)] = inst_25189);

(statearr_25272_25336[(1)] = (40));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25207 === (30))){
var state_25206__$1 = state_25206;
var statearr_25273_25337 = state_25206__$1;
(statearr_25273_25337[(2)] = false);

(statearr_25273_25337[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25207 === (10))){
var inst_25092 = (state_25206[(27)]);
var inst_25094 = cljs.core.chunked_seq_QMARK_.call(null,inst_25092);
var state_25206__$1 = state_25206;
if(inst_25094){
var statearr_25274_25338 = state_25206__$1;
(statearr_25274_25338[(1)] = (13));

} else {
var statearr_25275_25339 = state_25206__$1;
(statearr_25275_25339[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25207 === (18))){
var inst_25124 = (state_25206[(13)]);
var inst_25125 = (state_25206[(15)]);
var inst_25124__$1 = (state_25206[(2)]);
var inst_25125__$1 = figwheel.client.file_reloading.add_request_urls.call(null,opts,inst_25124__$1);
var inst_25126 = figwheel.client.file_reloading.load_all_js_files.call(null,inst_25125__$1);
var state_25206__$1 = (function (){var statearr_25276 = state_25206;
(statearr_25276[(13)] = inst_25124__$1);

(statearr_25276[(15)] = inst_25125__$1);

return statearr_25276;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25206__$1,(19),inst_25126);
} else {
if((state_val_25207 === (42))){
var state_25206__$1 = state_25206;
var statearr_25277_25340 = state_25206__$1;
(statearr_25277_25340[(2)] = null);

(statearr_25277_25340[(1)] = (43));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25207 === (37))){
var inst_25173 = (state_25206[(30)]);
var inst_25183 = (state_25206[(2)]);
var inst_25184 = cljs.core.not_empty.call(null,inst_25173);
var state_25206__$1 = (function (){var statearr_25278 = state_25206;
(statearr_25278[(33)] = inst_25183);

return statearr_25278;
})();
if(cljs.core.truth_(inst_25184)){
var statearr_25279_25341 = state_25206__$1;
(statearr_25279_25341[(1)] = (38));

} else {
var statearr_25280_25342 = state_25206__$1;
(statearr_25280_25342[(1)] = (39));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25207 === (8))){
var inst_25092 = (state_25206[(27)]);
var inst_25079 = (state_25206[(8)]);
var inst_25092__$1 = cljs.core.seq.call(null,inst_25079);
var state_25206__$1 = (function (){var statearr_25281 = state_25206;
(statearr_25281[(27)] = inst_25092__$1);

return statearr_25281;
})();
if(inst_25092__$1){
var statearr_25282_25343 = state_25206__$1;
(statearr_25282_25343[(1)] = (10));

} else {
var statearr_25283_25344 = state_25206__$1;
(statearr_25283_25344[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__19686__auto__,map__25064,map__25064__$1,opts,before_jsload,on_jsload,load_unchanged_files,map__25065,map__25065__$1,msg,files))
;
return ((function (switch__19621__auto__,c__19686__auto__,map__25064,map__25064__$1,opts,before_jsload,on_jsload,load_unchanged_files,map__25065,map__25065__$1,msg,files){
return (function() {
var figwheel$client$file_reloading$reload_js_files_$_state_machine__19622__auto__ = null;
var figwheel$client$file_reloading$reload_js_files_$_state_machine__19622__auto____0 = (function (){
var statearr_25287 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_25287[(0)] = figwheel$client$file_reloading$reload_js_files_$_state_machine__19622__auto__);

(statearr_25287[(1)] = (1));

return statearr_25287;
});
var figwheel$client$file_reloading$reload_js_files_$_state_machine__19622__auto____1 = (function (state_25206){
while(true){
var ret_value__19623__auto__ = (function (){try{while(true){
var result__19624__auto__ = switch__19621__auto__.call(null,state_25206);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19624__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19624__auto__;
}
break;
}
}catch (e25288){if((e25288 instanceof Object)){
var ex__19625__auto__ = e25288;
var statearr_25289_25345 = state_25206;
(statearr_25289_25345[(5)] = ex__19625__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25206);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e25288;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19623__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__25346 = state_25206;
state_25206 = G__25346;
continue;
} else {
return ret_value__19623__auto__;
}
break;
}
});
figwheel$client$file_reloading$reload_js_files_$_state_machine__19622__auto__ = function(state_25206){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$reload_js_files_$_state_machine__19622__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$reload_js_files_$_state_machine__19622__auto____1.call(this,state_25206);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$reload_js_files_$_state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$reload_js_files_$_state_machine__19622__auto____0;
figwheel$client$file_reloading$reload_js_files_$_state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$reload_js_files_$_state_machine__19622__auto____1;
return figwheel$client$file_reloading$reload_js_files_$_state_machine__19622__auto__;
})()
;})(switch__19621__auto__,c__19686__auto__,map__25064,map__25064__$1,opts,before_jsload,on_jsload,load_unchanged_files,map__25065,map__25065__$1,msg,files))
})();
var state__19688__auto__ = (function (){var statearr_25290 = f__19687__auto__.call(null);
(statearr_25290[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19686__auto__);

return statearr_25290;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19688__auto__);
});})(c__19686__auto__,map__25064,map__25064__$1,opts,before_jsload,on_jsload,load_unchanged_files,map__25065,map__25065__$1,msg,files))
);

return c__19686__auto__;
});
figwheel.client.file_reloading.current_links = (function figwheel$client$file_reloading$current_links(){
return Array.prototype.slice.call(document.getElementsByTagName("link"));
});
figwheel.client.file_reloading.truncate_url = (function figwheel$client$file_reloading$truncate_url(url){
return clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,clojure.string.replace_first.call(null,cljs.core.first.call(null,clojure.string.split.call(null,url,/\?/)),[cljs.core.str(location.protocol),cljs.core.str("//")].join(''),""),".*://",""),/^\/\//,""),/[^\\/]*/,"");
});
figwheel.client.file_reloading.matches_file_QMARK_ = (function figwheel$client$file_reloading$matches_file_QMARK_(p__25349,link){
var map__25352 = p__25349;
var map__25352__$1 = ((((!((map__25352 == null)))?((((map__25352.cljs$lang$protocol_mask$partition0$ & (64))) || (map__25352.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__25352):map__25352);
var file = cljs.core.get.call(null,map__25352__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var temp__4425__auto__ = link.href;
if(cljs.core.truth_(temp__4425__auto__)){
var link_href = temp__4425__auto__;
var match = clojure.string.join.call(null,"/",cljs.core.take_while.call(null,cljs.core.identity,cljs.core.map.call(null,((function (link_href,temp__4425__auto__,map__25352,map__25352__$1,file){
return (function (p1__25347_SHARP_,p2__25348_SHARP_){
if(cljs.core._EQ_.call(null,p1__25347_SHARP_,p2__25348_SHARP_)){
return p1__25347_SHARP_;
} else {
return false;
}
});})(link_href,temp__4425__auto__,map__25352,map__25352__$1,file))
,cljs.core.reverse.call(null,clojure.string.split.call(null,file,"/")),cljs.core.reverse.call(null,clojure.string.split.call(null,figwheel.client.file_reloading.truncate_url.call(null,link_href),"/")))));
var match_length = cljs.core.count.call(null,match);
var file_name_length = cljs.core.count.call(null,cljs.core.last.call(null,clojure.string.split.call(null,file,"/")));
if((match_length >= file_name_length)){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"link","link",-1769163468),link,new cljs.core.Keyword(null,"link-href","link-href",-250644450),link_href,new cljs.core.Keyword(null,"match-length","match-length",1101537310),match_length,new cljs.core.Keyword(null,"current-url-length","current-url-length",380404083),cljs.core.count.call(null,figwheel.client.file_reloading.truncate_url.call(null,link_href))], null);
} else {
return null;
}
} else {
return null;
}
});
figwheel.client.file_reloading.get_correct_link = (function figwheel$client$file_reloading$get_correct_link(f_data){
var temp__4425__auto__ = cljs.core.first.call(null,cljs.core.sort_by.call(null,(function (p__25358){
var map__25359 = p__25358;
var map__25359__$1 = ((((!((map__25359 == null)))?((((map__25359.cljs$lang$protocol_mask$partition0$ & (64))) || (map__25359.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__25359):map__25359);
var match_length = cljs.core.get.call(null,map__25359__$1,new cljs.core.Keyword(null,"match-length","match-length",1101537310));
var current_url_length = cljs.core.get.call(null,map__25359__$1,new cljs.core.Keyword(null,"current-url-length","current-url-length",380404083));
return (current_url_length - match_length);
}),cljs.core.keep.call(null,(function (p1__25354_SHARP_){
return figwheel.client.file_reloading.matches_file_QMARK_.call(null,f_data,p1__25354_SHARP_);
}),figwheel.client.file_reloading.current_links.call(null))));
if(cljs.core.truth_(temp__4425__auto__)){
var res = temp__4425__auto__;
return new cljs.core.Keyword(null,"link","link",-1769163468).cljs$core$IFn$_invoke$arity$1(res);
} else {
return null;
}
});
figwheel.client.file_reloading.clone_link = (function figwheel$client$file_reloading$clone_link(link,url){
var clone = document.createElement("link");
clone.rel = "stylesheet";

clone.media = link.media;

clone.disabled = link.disabled;

clone.href = figwheel.client.file_reloading.add_cache_buster.call(null,url);

return clone;
});
figwheel.client.file_reloading.create_link = (function figwheel$client$file_reloading$create_link(url){
var link = document.createElement("link");
link.rel = "stylesheet";

link.href = figwheel.client.file_reloading.add_cache_buster.call(null,url);

return link;
});
figwheel.client.file_reloading.add_link_to_doc = (function figwheel$client$file_reloading$add_link_to_doc(){
var args25361 = [];
var len__17542__auto___25364 = arguments.length;
var i__17543__auto___25365 = (0);
while(true){
if((i__17543__auto___25365 < len__17542__auto___25364)){
args25361.push((arguments[i__17543__auto___25365]));

var G__25366 = (i__17543__auto___25365 + (1));
i__17543__auto___25365 = G__25366;
continue;
} else {
}
break;
}

var G__25363 = args25361.length;
switch (G__25363) {
case 1:
return figwheel.client.file_reloading.add_link_to_doc.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return figwheel.client.file_reloading.add_link_to_doc.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args25361.length)].join('')));

}
});

figwheel.client.file_reloading.add_link_to_doc.cljs$core$IFn$_invoke$arity$1 = (function (new_link){
return (document.getElementsByTagName("head")[(0)]).appendChild(new_link);
});

figwheel.client.file_reloading.add_link_to_doc.cljs$core$IFn$_invoke$arity$2 = (function (orig_link,klone){
var parent = orig_link.parentNode;
if(cljs.core._EQ_.call(null,orig_link,parent.lastChild)){
parent.appendChild(klone);
} else {
parent.insertBefore(klone,orig_link.nextSibling);
}

return setTimeout(((function (parent){
return (function (){
return parent.removeChild(orig_link);
});})(parent))
,(300));
});

figwheel.client.file_reloading.add_link_to_doc.cljs$lang$maxFixedArity = 2;
figwheel.client.file_reloading.reload_css_file = (function figwheel$client$file_reloading$reload_css_file(p__25368){
var map__25371 = p__25368;
var map__25371__$1 = ((((!((map__25371 == null)))?((((map__25371.cljs$lang$protocol_mask$partition0$ & (64))) || (map__25371.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__25371):map__25371);
var f_data = map__25371__$1;
var file = cljs.core.get.call(null,map__25371__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var request_url = cljs.core.get.call(null,map__25371__$1,new cljs.core.Keyword(null,"request-url","request-url",2100346596));
var temp__4423__auto__ = figwheel.client.file_reloading.get_correct_link.call(null,f_data);
if(cljs.core.truth_(temp__4423__auto__)){
var link = temp__4423__auto__;
return figwheel.client.file_reloading.add_link_to_doc.call(null,link,figwheel.client.file_reloading.clone_link.call(null,link,link.href));
} else {
return figwheel.client.file_reloading.add_link_to_doc.call(null,figwheel.client.file_reloading.create_link.call(null,(function (){var or__16503__auto__ = request_url;
if(cljs.core.truth_(or__16503__auto__)){
return or__16503__auto__;
} else {
return file;
}
})()));
}
});
figwheel.client.file_reloading.reload_css_files = (function figwheel$client$file_reloading$reload_css_files(p__25373,files_msg){
var map__25396 = p__25373;
var map__25396__$1 = ((((!((map__25396 == null)))?((((map__25396.cljs$lang$protocol_mask$partition0$ & (64))) || (map__25396.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__25396):map__25396);
var opts = map__25396__$1;
var on_cssload = cljs.core.get.call(null,map__25396__$1,new cljs.core.Keyword(null,"on-cssload","on-cssload",1825432318));
if(cljs.core.truth_(figwheel.client.utils.html_env_QMARK_.call(null))){
var seq__25398_25418 = cljs.core.seq.call(null,figwheel.client.file_reloading.add_request_urls.call(null,opts,new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(files_msg)));
var chunk__25399_25419 = null;
var count__25400_25420 = (0);
var i__25401_25421 = (0);
while(true){
if((i__25401_25421 < count__25400_25420)){
var f_25422 = cljs.core._nth.call(null,chunk__25399_25419,i__25401_25421);
figwheel.client.file_reloading.reload_css_file.call(null,f_25422);

var G__25423 = seq__25398_25418;
var G__25424 = chunk__25399_25419;
var G__25425 = count__25400_25420;
var G__25426 = (i__25401_25421 + (1));
seq__25398_25418 = G__25423;
chunk__25399_25419 = G__25424;
count__25400_25420 = G__25425;
i__25401_25421 = G__25426;
continue;
} else {
var temp__4425__auto___25427 = cljs.core.seq.call(null,seq__25398_25418);
if(temp__4425__auto___25427){
var seq__25398_25428__$1 = temp__4425__auto___25427;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__25398_25428__$1)){
var c__17287__auto___25429 = cljs.core.chunk_first.call(null,seq__25398_25428__$1);
var G__25430 = cljs.core.chunk_rest.call(null,seq__25398_25428__$1);
var G__25431 = c__17287__auto___25429;
var G__25432 = cljs.core.count.call(null,c__17287__auto___25429);
var G__25433 = (0);
seq__25398_25418 = G__25430;
chunk__25399_25419 = G__25431;
count__25400_25420 = G__25432;
i__25401_25421 = G__25433;
continue;
} else {
var f_25434 = cljs.core.first.call(null,seq__25398_25428__$1);
figwheel.client.file_reloading.reload_css_file.call(null,f_25434);

var G__25435 = cljs.core.next.call(null,seq__25398_25428__$1);
var G__25436 = null;
var G__25437 = (0);
var G__25438 = (0);
seq__25398_25418 = G__25435;
chunk__25399_25419 = G__25436;
count__25400_25420 = G__25437;
i__25401_25421 = G__25438;
continue;
}
} else {
}
}
break;
}

var c__19686__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19686__auto__,map__25396,map__25396__$1,opts,on_cssload){
return (function (){
var f__19687__auto__ = (function (){var switch__19621__auto__ = ((function (c__19686__auto__,map__25396,map__25396__$1,opts,on_cssload){
return (function (state_25408){
var state_val_25409 = (state_25408[(1)]);
if((state_val_25409 === (1))){
var inst_25402 = cljs.core.async.timeout.call(null,(100));
var state_25408__$1 = state_25408;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25408__$1,(2),inst_25402);
} else {
if((state_val_25409 === (2))){
var inst_25404 = (state_25408[(2)]);
var inst_25405 = new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(files_msg);
var inst_25406 = on_cssload.call(null,inst_25405);
var state_25408__$1 = (function (){var statearr_25410 = state_25408;
(statearr_25410[(7)] = inst_25404);

return statearr_25410;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25408__$1,inst_25406);
} else {
return null;
}
}
});})(c__19686__auto__,map__25396,map__25396__$1,opts,on_cssload))
;
return ((function (switch__19621__auto__,c__19686__auto__,map__25396,map__25396__$1,opts,on_cssload){
return (function() {
var figwheel$client$file_reloading$reload_css_files_$_state_machine__19622__auto__ = null;
var figwheel$client$file_reloading$reload_css_files_$_state_machine__19622__auto____0 = (function (){
var statearr_25414 = [null,null,null,null,null,null,null,null];
(statearr_25414[(0)] = figwheel$client$file_reloading$reload_css_files_$_state_machine__19622__auto__);

(statearr_25414[(1)] = (1));

return statearr_25414;
});
var figwheel$client$file_reloading$reload_css_files_$_state_machine__19622__auto____1 = (function (state_25408){
while(true){
var ret_value__19623__auto__ = (function (){try{while(true){
var result__19624__auto__ = switch__19621__auto__.call(null,state_25408);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19624__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19624__auto__;
}
break;
}
}catch (e25415){if((e25415 instanceof Object)){
var ex__19625__auto__ = e25415;
var statearr_25416_25439 = state_25408;
(statearr_25416_25439[(5)] = ex__19625__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25408);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e25415;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19623__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__25440 = state_25408;
state_25408 = G__25440;
continue;
} else {
return ret_value__19623__auto__;
}
break;
}
});
figwheel$client$file_reloading$reload_css_files_$_state_machine__19622__auto__ = function(state_25408){
switch(arguments.length){
case 0:
return figwheel$client$file_reloading$reload_css_files_$_state_machine__19622__auto____0.call(this);
case 1:
return figwheel$client$file_reloading$reload_css_files_$_state_machine__19622__auto____1.call(this,state_25408);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloading$reload_css_files_$_state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloading$reload_css_files_$_state_machine__19622__auto____0;
figwheel$client$file_reloading$reload_css_files_$_state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloading$reload_css_files_$_state_machine__19622__auto____1;
return figwheel$client$file_reloading$reload_css_files_$_state_machine__19622__auto__;
})()
;})(switch__19621__auto__,c__19686__auto__,map__25396,map__25396__$1,opts,on_cssload))
})();
var state__19688__auto__ = (function (){var statearr_25417 = f__19687__auto__.call(null);
(statearr_25417[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19686__auto__);

return statearr_25417;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19688__auto__);
});})(c__19686__auto__,map__25396,map__25396__$1,opts,on_cssload))
);

return c__19686__auto__;
} else {
return null;
}
});

//# sourceMappingURL=file_reloading.js.map