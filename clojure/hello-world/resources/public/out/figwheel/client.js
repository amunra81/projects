// Compiled by ClojureScript 1.7.48 {}
goog.provide('figwheel.client');
goog.require('cljs.core');
goog.require('goog.Uri');
goog.require('cljs.core.async');
goog.require('figwheel.client.socket');
goog.require('figwheel.client.file_reloading');
goog.require('clojure.string');
goog.require('figwheel.client.utils');
goog.require('cljs.repl');
goog.require('figwheel.client.heads_up');
figwheel.client.figwheel_repl_print = (function figwheel$client$figwheel_repl_print(args){
figwheel.client.socket.send_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"figwheel-event","figwheel-event",519570592),"callback",new cljs.core.Keyword(null,"callback-name","callback-name",336964714),"figwheel-repl-print",new cljs.core.Keyword(null,"content","content",15833224),args], null));

return args;
});
figwheel.client.console_print = (function figwheel$client$console_print(args){
console.log.apply(console,cljs.core.into_array.call(null,args));

return args;
});
figwheel.client.enable_repl_print_BANG_ = (function figwheel$client$enable_repl_print_BANG_(){
cljs.core._STAR_print_newline_STAR_ = false;

return cljs.core._STAR_print_fn_STAR_ = (function() { 
var G__23530__delegate = function (args){
return figwheel.client.figwheel_repl_print.call(null,figwheel.client.console_print.call(null,args));
};
var G__23530 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__23531__i = 0, G__23531__a = new Array(arguments.length -  0);
while (G__23531__i < G__23531__a.length) {G__23531__a[G__23531__i] = arguments[G__23531__i + 0]; ++G__23531__i;}
  args = new cljs.core.IndexedSeq(G__23531__a,0);
} 
return G__23530__delegate.call(this,args);};
G__23530.cljs$lang$maxFixedArity = 0;
G__23530.cljs$lang$applyTo = (function (arglist__23532){
var args = cljs.core.seq(arglist__23532);
return G__23530__delegate(args);
});
G__23530.cljs$core$IFn$_invoke$arity$variadic = G__23530__delegate;
return G__23530;
})()
;
});
figwheel.client.get_essential_messages = (function figwheel$client$get_essential_messages(ed){
if(cljs.core.truth_(ed)){
return cljs.core.cons.call(null,cljs.core.select_keys.call(null,ed,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"message","message",-406056002),new cljs.core.Keyword(null,"class","class",-2030961996)], null)),figwheel$client$get_essential_messages.call(null,new cljs.core.Keyword(null,"cause","cause",231901252).cljs$core$IFn$_invoke$arity$1(ed)));
} else {
return null;
}
});
figwheel.client.error_msg_format = (function figwheel$client$error_msg_format(p__23533){
var map__23536 = p__23533;
var map__23536__$1 = ((((!((map__23536 == null)))?((((map__23536.cljs$lang$protocol_mask$partition0$ & (64))) || (map__23536.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__23536):map__23536);
var message = cljs.core.get.call(null,map__23536__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var class$ = cljs.core.get.call(null,map__23536__$1,new cljs.core.Keyword(null,"class","class",-2030961996));
return [cljs.core.str(class$),cljs.core.str(" : "),cljs.core.str(message)].join('');
});
figwheel.client.format_messages = cljs.core.comp.call(null,cljs.core.partial.call(null,cljs.core.map,figwheel.client.error_msg_format),figwheel.client.get_essential_messages);
figwheel.client.focus_msgs = (function figwheel$client$focus_msgs(name_set,msg_hist){
return cljs.core.cons.call(null,cljs.core.first.call(null,msg_hist),cljs.core.filter.call(null,cljs.core.comp.call(null,name_set,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863)),cljs.core.rest.call(null,msg_hist)));
});
figwheel.client.reload_file_QMARK__STAR_ = (function figwheel$client$reload_file_QMARK__STAR_(msg_name,opts){
var or__16503__auto__ = new cljs.core.Keyword(null,"load-warninged-code","load-warninged-code",-2030345223).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__16503__auto__)){
return or__16503__auto__;
} else {
return cljs.core.not_EQ_.call(null,msg_name,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356));
}
});
figwheel.client.reload_file_state_QMARK_ = (function figwheel$client$reload_file_state_QMARK_(msg_names,opts){
var and__16491__auto__ = cljs.core._EQ_.call(null,cljs.core.first.call(null,msg_names),new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563));
if(and__16491__auto__){
return figwheel.client.reload_file_QMARK__STAR_.call(null,cljs.core.second.call(null,msg_names),opts);
} else {
return and__16491__auto__;
}
});
figwheel.client.block_reload_file_state_QMARK_ = (function figwheel$client$block_reload_file_state_QMARK_(msg_names,opts){
return (cljs.core._EQ_.call(null,cljs.core.first.call(null,msg_names),new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563))) && (cljs.core.not.call(null,figwheel.client.reload_file_QMARK__STAR_.call(null,cljs.core.second.call(null,msg_names),opts)));
});
figwheel.client.warning_append_state_QMARK_ = (function figwheel$client$warning_append_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356)], null),cljs.core.take.call(null,(2),msg_names));
});
figwheel.client.warning_state_QMARK_ = (function figwheel$client$warning_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),cljs.core.first.call(null,msg_names));
});
figwheel.client.rewarning_state_QMARK_ = (function figwheel$client$rewarning_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563),new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356)], null),cljs.core.take.call(null,(3),msg_names));
});
figwheel.client.compile_fail_state_QMARK_ = (function figwheel$client$compile_fail_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),cljs.core.first.call(null,msg_names));
});
figwheel.client.compile_refail_state_QMARK_ = (function figwheel$client$compile_refail_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289)], null),cljs.core.take.call(null,(2),msg_names));
});
figwheel.client.css_loaded_state_QMARK_ = (function figwheel$client$css_loaded_state_QMARK_(msg_names){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"css-files-changed","css-files-changed",720773874),cljs.core.first.call(null,msg_names));
});
figwheel.client.file_reloader_plugin = (function figwheel$client$file_reloader_plugin(opts){
var ch = cljs.core.async.chan.call(null);
var c__19686__auto___23666 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19686__auto___23666,ch){
return (function (){
var f__19687__auto__ = (function (){var switch__19621__auto__ = ((function (c__19686__auto___23666,ch){
return (function (state_23640){
var state_val_23641 = (state_23640[(1)]);
if((state_val_23641 === (7))){
var inst_23636 = (state_23640[(2)]);
var state_23640__$1 = state_23640;
var statearr_23642_23667 = state_23640__$1;
(statearr_23642_23667[(2)] = inst_23636);

(statearr_23642_23667[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23641 === (1))){
var state_23640__$1 = state_23640;
var statearr_23643_23668 = state_23640__$1;
(statearr_23643_23668[(2)] = null);

(statearr_23643_23668[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23641 === (4))){
var inst_23604 = (state_23640[(7)]);
var inst_23604__$1 = (state_23640[(2)]);
var state_23640__$1 = (function (){var statearr_23644 = state_23640;
(statearr_23644[(7)] = inst_23604__$1);

return statearr_23644;
})();
if(cljs.core.truth_(inst_23604__$1)){
var statearr_23645_23669 = state_23640__$1;
(statearr_23645_23669[(1)] = (5));

} else {
var statearr_23646_23670 = state_23640__$1;
(statearr_23646_23670[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23641 === (13))){
var state_23640__$1 = state_23640;
var statearr_23647_23671 = state_23640__$1;
(statearr_23647_23671[(2)] = null);

(statearr_23647_23671[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23641 === (6))){
var state_23640__$1 = state_23640;
var statearr_23648_23672 = state_23640__$1;
(statearr_23648_23672[(2)] = null);

(statearr_23648_23672[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23641 === (3))){
var inst_23638 = (state_23640[(2)]);
var state_23640__$1 = state_23640;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_23640__$1,inst_23638);
} else {
if((state_val_23641 === (12))){
var inst_23611 = (state_23640[(8)]);
var inst_23624 = new cljs.core.Keyword(null,"files","files",-472457450).cljs$core$IFn$_invoke$arity$1(inst_23611);
var inst_23625 = cljs.core.first.call(null,inst_23624);
var inst_23626 = new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(inst_23625);
var inst_23627 = console.warn("Figwheel: Not loading code with warnings - ",inst_23626);
var state_23640__$1 = state_23640;
var statearr_23649_23673 = state_23640__$1;
(statearr_23649_23673[(2)] = inst_23627);

(statearr_23649_23673[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23641 === (2))){
var state_23640__$1 = state_23640;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_23640__$1,(4),ch);
} else {
if((state_val_23641 === (11))){
var inst_23620 = (state_23640[(2)]);
var state_23640__$1 = state_23640;
var statearr_23650_23674 = state_23640__$1;
(statearr_23650_23674[(2)] = inst_23620);

(statearr_23650_23674[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23641 === (9))){
var inst_23610 = (state_23640[(9)]);
var inst_23622 = figwheel.client.block_reload_file_state_QMARK_.call(null,inst_23610,opts);
var state_23640__$1 = state_23640;
if(cljs.core.truth_(inst_23622)){
var statearr_23651_23675 = state_23640__$1;
(statearr_23651_23675[(1)] = (12));

} else {
var statearr_23652_23676 = state_23640__$1;
(statearr_23652_23676[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23641 === (5))){
var inst_23604 = (state_23640[(7)]);
var inst_23610 = (state_23640[(9)]);
var inst_23606 = [new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),null,new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563),null];
var inst_23607 = (new cljs.core.PersistentArrayMap(null,2,inst_23606,null));
var inst_23608 = (new cljs.core.PersistentHashSet(null,inst_23607,null));
var inst_23609 = figwheel.client.focus_msgs.call(null,inst_23608,inst_23604);
var inst_23610__$1 = cljs.core.map.call(null,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863),inst_23609);
var inst_23611 = cljs.core.first.call(null,inst_23609);
var inst_23612 = figwheel.client.reload_file_state_QMARK_.call(null,inst_23610__$1,opts);
var state_23640__$1 = (function (){var statearr_23653 = state_23640;
(statearr_23653[(9)] = inst_23610__$1);

(statearr_23653[(8)] = inst_23611);

return statearr_23653;
})();
if(cljs.core.truth_(inst_23612)){
var statearr_23654_23677 = state_23640__$1;
(statearr_23654_23677[(1)] = (8));

} else {
var statearr_23655_23678 = state_23640__$1;
(statearr_23655_23678[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23641 === (14))){
var inst_23630 = (state_23640[(2)]);
var state_23640__$1 = state_23640;
var statearr_23656_23679 = state_23640__$1;
(statearr_23656_23679[(2)] = inst_23630);

(statearr_23656_23679[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23641 === (10))){
var inst_23632 = (state_23640[(2)]);
var state_23640__$1 = (function (){var statearr_23657 = state_23640;
(statearr_23657[(10)] = inst_23632);

return statearr_23657;
})();
var statearr_23658_23680 = state_23640__$1;
(statearr_23658_23680[(2)] = null);

(statearr_23658_23680[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23641 === (8))){
var inst_23611 = (state_23640[(8)]);
var inst_23614 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_23615 = figwheel.client.file_reloading.reload_js_files.call(null,opts,inst_23611);
var inst_23616 = cljs.core.async.timeout.call(null,(1000));
var inst_23617 = [inst_23615,inst_23616];
var inst_23618 = (new cljs.core.PersistentVector(null,2,(5),inst_23614,inst_23617,null));
var state_23640__$1 = state_23640;
return cljs.core.async.ioc_alts_BANG_.call(null,state_23640__$1,(11),inst_23618);
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
});})(c__19686__auto___23666,ch))
;
return ((function (switch__19621__auto__,c__19686__auto___23666,ch){
return (function() {
var figwheel$client$file_reloader_plugin_$_state_machine__19622__auto__ = null;
var figwheel$client$file_reloader_plugin_$_state_machine__19622__auto____0 = (function (){
var statearr_23662 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_23662[(0)] = figwheel$client$file_reloader_plugin_$_state_machine__19622__auto__);

(statearr_23662[(1)] = (1));

return statearr_23662;
});
var figwheel$client$file_reloader_plugin_$_state_machine__19622__auto____1 = (function (state_23640){
while(true){
var ret_value__19623__auto__ = (function (){try{while(true){
var result__19624__auto__ = switch__19621__auto__.call(null,state_23640);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19624__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19624__auto__;
}
break;
}
}catch (e23663){if((e23663 instanceof Object)){
var ex__19625__auto__ = e23663;
var statearr_23664_23681 = state_23640;
(statearr_23664_23681[(5)] = ex__19625__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_23640);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e23663;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19623__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__23682 = state_23640;
state_23640 = G__23682;
continue;
} else {
return ret_value__19623__auto__;
}
break;
}
});
figwheel$client$file_reloader_plugin_$_state_machine__19622__auto__ = function(state_23640){
switch(arguments.length){
case 0:
return figwheel$client$file_reloader_plugin_$_state_machine__19622__auto____0.call(this);
case 1:
return figwheel$client$file_reloader_plugin_$_state_machine__19622__auto____1.call(this,state_23640);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$file_reloader_plugin_$_state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$file_reloader_plugin_$_state_machine__19622__auto____0;
figwheel$client$file_reloader_plugin_$_state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$file_reloader_plugin_$_state_machine__19622__auto____1;
return figwheel$client$file_reloader_plugin_$_state_machine__19622__auto__;
})()
;})(switch__19621__auto__,c__19686__auto___23666,ch))
})();
var state__19688__auto__ = (function (){var statearr_23665 = f__19687__auto__.call(null);
(statearr_23665[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19686__auto___23666);

return statearr_23665;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19688__auto__);
});})(c__19686__auto___23666,ch))
);


return ((function (ch){
return (function (msg_hist){
cljs.core.async.put_BANG_.call(null,ch,msg_hist);

return msg_hist;
});
;})(ch))
});
figwheel.client.truncate_stack_trace = (function figwheel$client$truncate_stack_trace(stack_str){
return cljs.core.take_while.call(null,(function (p1__23683_SHARP_){
return cljs.core.not.call(null,cljs.core.re_matches.call(null,/.*eval_javascript_STAR__STAR_.*/,p1__23683_SHARP_));
}),clojure.string.split_lines.call(null,stack_str));
});
var base_path_23690 = figwheel.client.utils.base_url_path.call(null);
figwheel.client.eval_javascript_STAR__STAR_ = ((function (base_path_23690){
return (function figwheel$client$eval_javascript_STAR__STAR_(code,opts,result_handler){
try{var _STAR_print_fn_STAR_23688 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR_23689 = cljs.core._STAR_print_newline_STAR_;
cljs.core._STAR_print_fn_STAR_ = ((function (_STAR_print_fn_STAR_23688,_STAR_print_newline_STAR_23689,base_path_23690){
return (function() { 
var G__23691__delegate = function (args){
return figwheel.client.figwheel_repl_print.call(null,figwheel.client.console_print.call(null,args));
};
var G__23691 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__23692__i = 0, G__23692__a = new Array(arguments.length -  0);
while (G__23692__i < G__23692__a.length) {G__23692__a[G__23692__i] = arguments[G__23692__i + 0]; ++G__23692__i;}
  args = new cljs.core.IndexedSeq(G__23692__a,0);
} 
return G__23691__delegate.call(this,args);};
G__23691.cljs$lang$maxFixedArity = 0;
G__23691.cljs$lang$applyTo = (function (arglist__23693){
var args = cljs.core.seq(arglist__23693);
return G__23691__delegate(args);
});
G__23691.cljs$core$IFn$_invoke$arity$variadic = G__23691__delegate;
return G__23691;
})()
;})(_STAR_print_fn_STAR_23688,_STAR_print_newline_STAR_23689,base_path_23690))
;

cljs.core._STAR_print_newline_STAR_ = false;

try{return result_handler.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"success","success",1890645906),new cljs.core.Keyword(null,"value","value",305978217),[cljs.core.str(figwheel.client.utils.eval_helper.call(null,code,opts))].join('')], null));
}finally {cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_23689;

cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_23688;
}}catch (e23687){if((e23687 instanceof Error)){
var e = e23687;
return result_handler.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"exception","exception",-335277064),new cljs.core.Keyword(null,"value","value",305978217),cljs.core.pr_str.call(null,e),new cljs.core.Keyword(null,"stacktrace","stacktrace",-95588394),clojure.string.join.call(null,"\n",figwheel.client.truncate_stack_trace.call(null,e.stack)),new cljs.core.Keyword(null,"base-path","base-path",495760020),base_path_23690], null));
} else {
var e = e23687;
return result_handler.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"status","status",-1997798413),new cljs.core.Keyword(null,"exception","exception",-335277064),new cljs.core.Keyword(null,"value","value",305978217),cljs.core.pr_str.call(null,e),new cljs.core.Keyword(null,"stacktrace","stacktrace",-95588394),"No stacktrace available."], null));

}
}});})(base_path_23690))
;
/**
 * The REPL can disconnect and reconnect lets ensure cljs.user exists at least.
 */
figwheel.client.ensure_cljs_user = (function figwheel$client$ensure_cljs_user(){
if(cljs.core.truth_(cljs.user)){
return null;
} else {
return cljs.user = {};
}
});
figwheel.client.repl_plugin = (function figwheel$client$repl_plugin(p__23694){
var map__23701 = p__23694;
var map__23701__$1 = ((((!((map__23701 == null)))?((((map__23701.cljs$lang$protocol_mask$partition0$ & (64))) || (map__23701.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__23701):map__23701);
var opts = map__23701__$1;
var build_id = cljs.core.get.call(null,map__23701__$1,new cljs.core.Keyword(null,"build-id","build-id",1642831089));
return ((function (map__23701,map__23701__$1,opts,build_id){
return (function (p__23703){
var vec__23704 = p__23703;
var map__23705 = cljs.core.nth.call(null,vec__23704,(0),null);
var map__23705__$1 = ((((!((map__23705 == null)))?((((map__23705.cljs$lang$protocol_mask$partition0$ & (64))) || (map__23705.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__23705):map__23705);
var msg = map__23705__$1;
var msg_name = cljs.core.get.call(null,map__23705__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
var _ = cljs.core.nthnext.call(null,vec__23704,(1));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"repl-eval","repl-eval",-1784727398),msg_name)){
figwheel.client.ensure_cljs_user.call(null);

return figwheel.client.eval_javascript_STAR__STAR_.call(null,new cljs.core.Keyword(null,"code","code",1586293142).cljs$core$IFn$_invoke$arity$1(msg),opts,((function (vec__23704,map__23705,map__23705__$1,msg,msg_name,_,map__23701,map__23701__$1,opts,build_id){
return (function (res){
return figwheel.client.socket.send_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"figwheel-event","figwheel-event",519570592),"callback",new cljs.core.Keyword(null,"callback-name","callback-name",336964714),new cljs.core.Keyword(null,"callback-name","callback-name",336964714).cljs$core$IFn$_invoke$arity$1(msg),new cljs.core.Keyword(null,"content","content",15833224),res], null));
});})(vec__23704,map__23705,map__23705__$1,msg,msg_name,_,map__23701,map__23701__$1,opts,build_id))
);
} else {
return null;
}
});
;})(map__23701,map__23701__$1,opts,build_id))
});
figwheel.client.css_reloader_plugin = (function figwheel$client$css_reloader_plugin(opts){
return (function (p__23711){
var vec__23712 = p__23711;
var map__23713 = cljs.core.nth.call(null,vec__23712,(0),null);
var map__23713__$1 = ((((!((map__23713 == null)))?((((map__23713.cljs$lang$protocol_mask$partition0$ & (64))) || (map__23713.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__23713):map__23713);
var msg = map__23713__$1;
var msg_name = cljs.core.get.call(null,map__23713__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
var _ = cljs.core.nthnext.call(null,vec__23712,(1));
if(cljs.core._EQ_.call(null,msg_name,new cljs.core.Keyword(null,"css-files-changed","css-files-changed",720773874))){
return figwheel.client.file_reloading.reload_css_files.call(null,opts,msg);
} else {
return null;
}
});
});
figwheel.client.compile_fail_warning_plugin = (function figwheel$client$compile_fail_warning_plugin(p__23715){
var map__23725 = p__23715;
var map__23725__$1 = ((((!((map__23725 == null)))?((((map__23725.cljs$lang$protocol_mask$partition0$ & (64))) || (map__23725.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__23725):map__23725);
var on_compile_warning = cljs.core.get.call(null,map__23725__$1,new cljs.core.Keyword(null,"on-compile-warning","on-compile-warning",-1195585947));
var on_compile_fail = cljs.core.get.call(null,map__23725__$1,new cljs.core.Keyword(null,"on-compile-fail","on-compile-fail",728013036));
return ((function (map__23725,map__23725__$1,on_compile_warning,on_compile_fail){
return (function (p__23727){
var vec__23728 = p__23727;
var map__23729 = cljs.core.nth.call(null,vec__23728,(0),null);
var map__23729__$1 = ((((!((map__23729 == null)))?((((map__23729.cljs$lang$protocol_mask$partition0$ & (64))) || (map__23729.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__23729):map__23729);
var msg = map__23729__$1;
var msg_name = cljs.core.get.call(null,map__23729__$1,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863));
var _ = cljs.core.nthnext.call(null,vec__23728,(1));
var pred__23731 = cljs.core._EQ_;
var expr__23732 = msg_name;
if(cljs.core.truth_(pred__23731.call(null,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),expr__23732))){
return on_compile_warning.call(null,msg);
} else {
if(cljs.core.truth_(pred__23731.call(null,new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),expr__23732))){
return on_compile_fail.call(null,msg);
} else {
return null;
}
}
});
;})(map__23725,map__23725__$1,on_compile_warning,on_compile_fail))
});
figwheel.client.heads_up_plugin_msg_handler = (function figwheel$client$heads_up_plugin_msg_handler(opts,msg_hist_SINGLEQUOTE_){
var msg_hist = figwheel.client.focus_msgs.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"compile-failed","compile-failed",-477639289),null,new cljs.core.Keyword(null,"compile-warning","compile-warning",43425356),null,new cljs.core.Keyword(null,"files-changed","files-changed",-1418200563),null], null), null),msg_hist_SINGLEQUOTE_);
var msg_names = cljs.core.map.call(null,new cljs.core.Keyword(null,"msg-name","msg-name",-353709863),msg_hist);
var msg = cljs.core.first.call(null,msg_hist);
var c__19686__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19686__auto__,msg_hist,msg_names,msg){
return (function (){
var f__19687__auto__ = (function (){var switch__19621__auto__ = ((function (c__19686__auto__,msg_hist,msg_names,msg){
return (function (state_23933){
var state_val_23934 = (state_23933[(1)]);
if((state_val_23934 === (7))){
var inst_23867 = (state_23933[(2)]);
var state_23933__$1 = state_23933;
var statearr_23935_23976 = state_23933__$1;
(statearr_23935_23976[(2)] = inst_23867);

(statearr_23935_23976[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23934 === (20))){
var inst_23895 = figwheel.client.rewarning_state_QMARK_.call(null,msg_names);
var state_23933__$1 = state_23933;
if(cljs.core.truth_(inst_23895)){
var statearr_23936_23977 = state_23933__$1;
(statearr_23936_23977[(1)] = (22));

} else {
var statearr_23937_23978 = state_23933__$1;
(statearr_23937_23978[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23934 === (27))){
var inst_23907 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_23908 = figwheel.client.heads_up.display_warning.call(null,inst_23907);
var state_23933__$1 = state_23933;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_23933__$1,(30),inst_23908);
} else {
if((state_val_23934 === (1))){
var inst_23855 = figwheel.client.reload_file_state_QMARK_.call(null,msg_names,opts);
var state_23933__$1 = state_23933;
if(cljs.core.truth_(inst_23855)){
var statearr_23938_23979 = state_23933__$1;
(statearr_23938_23979[(1)] = (2));

} else {
var statearr_23939_23980 = state_23933__$1;
(statearr_23939_23980[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23934 === (24))){
var inst_23923 = (state_23933[(2)]);
var state_23933__$1 = state_23933;
var statearr_23940_23981 = state_23933__$1;
(statearr_23940_23981[(2)] = inst_23923);

(statearr_23940_23981[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23934 === (4))){
var inst_23931 = (state_23933[(2)]);
var state_23933__$1 = state_23933;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_23933__$1,inst_23931);
} else {
if((state_val_23934 === (15))){
var inst_23883 = new cljs.core.Keyword(null,"exception-data","exception-data",-512474886).cljs$core$IFn$_invoke$arity$1(msg);
var inst_23884 = figwheel.client.format_messages.call(null,inst_23883);
var inst_23885 = new cljs.core.Keyword(null,"cause","cause",231901252).cljs$core$IFn$_invoke$arity$1(msg);
var inst_23886 = figwheel.client.heads_up.display_error.call(null,inst_23884,inst_23885);
var state_23933__$1 = state_23933;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_23933__$1,(18),inst_23886);
} else {
if((state_val_23934 === (21))){
var inst_23925 = (state_23933[(2)]);
var state_23933__$1 = state_23933;
var statearr_23941_23982 = state_23933__$1;
(statearr_23941_23982[(2)] = inst_23925);

(statearr_23941_23982[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23934 === (31))){
var inst_23914 = figwheel.client.heads_up.flash_loaded.call(null);
var state_23933__$1 = state_23933;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_23933__$1,(34),inst_23914);
} else {
if((state_val_23934 === (32))){
var state_23933__$1 = state_23933;
var statearr_23942_23983 = state_23933__$1;
(statearr_23942_23983[(2)] = null);

(statearr_23942_23983[(1)] = (33));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23934 === (33))){
var inst_23919 = (state_23933[(2)]);
var state_23933__$1 = state_23933;
var statearr_23943_23984 = state_23933__$1;
(statearr_23943_23984[(2)] = inst_23919);

(statearr_23943_23984[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23934 === (13))){
var inst_23873 = (state_23933[(2)]);
var inst_23874 = new cljs.core.Keyword(null,"exception-data","exception-data",-512474886).cljs$core$IFn$_invoke$arity$1(msg);
var inst_23875 = figwheel.client.format_messages.call(null,inst_23874);
var inst_23876 = new cljs.core.Keyword(null,"cause","cause",231901252).cljs$core$IFn$_invoke$arity$1(msg);
var inst_23877 = figwheel.client.heads_up.display_error.call(null,inst_23875,inst_23876);
var state_23933__$1 = (function (){var statearr_23944 = state_23933;
(statearr_23944[(7)] = inst_23873);

return statearr_23944;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_23933__$1,(14),inst_23877);
} else {
if((state_val_23934 === (22))){
var inst_23897 = figwheel.client.heads_up.clear.call(null);
var state_23933__$1 = state_23933;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_23933__$1,(25),inst_23897);
} else {
if((state_val_23934 === (29))){
var inst_23921 = (state_23933[(2)]);
var state_23933__$1 = state_23933;
var statearr_23945_23985 = state_23933__$1;
(statearr_23945_23985[(2)] = inst_23921);

(statearr_23945_23985[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23934 === (6))){
var inst_23863 = figwheel.client.heads_up.clear.call(null);
var state_23933__$1 = state_23933;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_23933__$1,(9),inst_23863);
} else {
if((state_val_23934 === (28))){
var inst_23912 = figwheel.client.css_loaded_state_QMARK_.call(null,msg_names);
var state_23933__$1 = state_23933;
if(cljs.core.truth_(inst_23912)){
var statearr_23946_23986 = state_23933__$1;
(statearr_23946_23986[(1)] = (31));

} else {
var statearr_23947_23987 = state_23933__$1;
(statearr_23947_23987[(1)] = (32));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23934 === (25))){
var inst_23899 = (state_23933[(2)]);
var inst_23900 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_23901 = figwheel.client.heads_up.display_warning.call(null,inst_23900);
var state_23933__$1 = (function (){var statearr_23948 = state_23933;
(statearr_23948[(8)] = inst_23899);

return statearr_23948;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_23933__$1,(26),inst_23901);
} else {
if((state_val_23934 === (34))){
var inst_23916 = (state_23933[(2)]);
var state_23933__$1 = state_23933;
var statearr_23949_23988 = state_23933__$1;
(statearr_23949_23988[(2)] = inst_23916);

(statearr_23949_23988[(1)] = (33));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23934 === (17))){
var inst_23927 = (state_23933[(2)]);
var state_23933__$1 = state_23933;
var statearr_23950_23989 = state_23933__$1;
(statearr_23950_23989[(2)] = inst_23927);

(statearr_23950_23989[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23934 === (3))){
var inst_23869 = figwheel.client.compile_refail_state_QMARK_.call(null,msg_names);
var state_23933__$1 = state_23933;
if(cljs.core.truth_(inst_23869)){
var statearr_23951_23990 = state_23933__$1;
(statearr_23951_23990[(1)] = (10));

} else {
var statearr_23952_23991 = state_23933__$1;
(statearr_23952_23991[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23934 === (12))){
var inst_23929 = (state_23933[(2)]);
var state_23933__$1 = state_23933;
var statearr_23953_23992 = state_23933__$1;
(statearr_23953_23992[(2)] = inst_23929);

(statearr_23953_23992[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23934 === (2))){
var inst_23857 = new cljs.core.Keyword(null,"autoload","autoload",-354122500).cljs$core$IFn$_invoke$arity$1(opts);
var state_23933__$1 = state_23933;
if(cljs.core.truth_(inst_23857)){
var statearr_23954_23993 = state_23933__$1;
(statearr_23954_23993[(1)] = (5));

} else {
var statearr_23955_23994 = state_23933__$1;
(statearr_23955_23994[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23934 === (23))){
var inst_23905 = figwheel.client.warning_state_QMARK_.call(null,msg_names);
var state_23933__$1 = state_23933;
if(cljs.core.truth_(inst_23905)){
var statearr_23956_23995 = state_23933__$1;
(statearr_23956_23995[(1)] = (27));

} else {
var statearr_23957_23996 = state_23933__$1;
(statearr_23957_23996[(1)] = (28));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23934 === (19))){
var inst_23892 = new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(msg);
var inst_23893 = figwheel.client.heads_up.append_message.call(null,inst_23892);
var state_23933__$1 = state_23933;
var statearr_23958_23997 = state_23933__$1;
(statearr_23958_23997[(2)] = inst_23893);

(statearr_23958_23997[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23934 === (11))){
var inst_23881 = figwheel.client.compile_fail_state_QMARK_.call(null,msg_names);
var state_23933__$1 = state_23933;
if(cljs.core.truth_(inst_23881)){
var statearr_23959_23998 = state_23933__$1;
(statearr_23959_23998[(1)] = (15));

} else {
var statearr_23960_23999 = state_23933__$1;
(statearr_23960_23999[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23934 === (9))){
var inst_23865 = (state_23933[(2)]);
var state_23933__$1 = state_23933;
var statearr_23961_24000 = state_23933__$1;
(statearr_23961_24000[(2)] = inst_23865);

(statearr_23961_24000[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23934 === (5))){
var inst_23859 = figwheel.client.heads_up.flash_loaded.call(null);
var state_23933__$1 = state_23933;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_23933__$1,(8),inst_23859);
} else {
if((state_val_23934 === (14))){
var inst_23879 = (state_23933[(2)]);
var state_23933__$1 = state_23933;
var statearr_23962_24001 = state_23933__$1;
(statearr_23962_24001[(2)] = inst_23879);

(statearr_23962_24001[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23934 === (26))){
var inst_23903 = (state_23933[(2)]);
var state_23933__$1 = state_23933;
var statearr_23963_24002 = state_23933__$1;
(statearr_23963_24002[(2)] = inst_23903);

(statearr_23963_24002[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23934 === (16))){
var inst_23890 = figwheel.client.warning_append_state_QMARK_.call(null,msg_names);
var state_23933__$1 = state_23933;
if(cljs.core.truth_(inst_23890)){
var statearr_23964_24003 = state_23933__$1;
(statearr_23964_24003[(1)] = (19));

} else {
var statearr_23965_24004 = state_23933__$1;
(statearr_23965_24004[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23934 === (30))){
var inst_23910 = (state_23933[(2)]);
var state_23933__$1 = state_23933;
var statearr_23966_24005 = state_23933__$1;
(statearr_23966_24005[(2)] = inst_23910);

(statearr_23966_24005[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23934 === (10))){
var inst_23871 = figwheel.client.heads_up.clear.call(null);
var state_23933__$1 = state_23933;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_23933__$1,(13),inst_23871);
} else {
if((state_val_23934 === (18))){
var inst_23888 = (state_23933[(2)]);
var state_23933__$1 = state_23933;
var statearr_23967_24006 = state_23933__$1;
(statearr_23967_24006[(2)] = inst_23888);

(statearr_23967_24006[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_23934 === (8))){
var inst_23861 = (state_23933[(2)]);
var state_23933__$1 = state_23933;
var statearr_23968_24007 = state_23933__$1;
(statearr_23968_24007[(2)] = inst_23861);

(statearr_23968_24007[(1)] = (7));


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
});})(c__19686__auto__,msg_hist,msg_names,msg))
;
return ((function (switch__19621__auto__,c__19686__auto__,msg_hist,msg_names,msg){
return (function() {
var figwheel$client$heads_up_plugin_msg_handler_$_state_machine__19622__auto__ = null;
var figwheel$client$heads_up_plugin_msg_handler_$_state_machine__19622__auto____0 = (function (){
var statearr_23972 = [null,null,null,null,null,null,null,null,null];
(statearr_23972[(0)] = figwheel$client$heads_up_plugin_msg_handler_$_state_machine__19622__auto__);

(statearr_23972[(1)] = (1));

return statearr_23972;
});
var figwheel$client$heads_up_plugin_msg_handler_$_state_machine__19622__auto____1 = (function (state_23933){
while(true){
var ret_value__19623__auto__ = (function (){try{while(true){
var result__19624__auto__ = switch__19621__auto__.call(null,state_23933);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19624__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19624__auto__;
}
break;
}
}catch (e23973){if((e23973 instanceof Object)){
var ex__19625__auto__ = e23973;
var statearr_23974_24008 = state_23933;
(statearr_23974_24008[(5)] = ex__19625__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_23933);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e23973;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19623__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__24009 = state_23933;
state_23933 = G__24009;
continue;
} else {
return ret_value__19623__auto__;
}
break;
}
});
figwheel$client$heads_up_plugin_msg_handler_$_state_machine__19622__auto__ = function(state_23933){
switch(arguments.length){
case 0:
return figwheel$client$heads_up_plugin_msg_handler_$_state_machine__19622__auto____0.call(this);
case 1:
return figwheel$client$heads_up_plugin_msg_handler_$_state_machine__19622__auto____1.call(this,state_23933);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$heads_up_plugin_msg_handler_$_state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up_plugin_msg_handler_$_state_machine__19622__auto____0;
figwheel$client$heads_up_plugin_msg_handler_$_state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up_plugin_msg_handler_$_state_machine__19622__auto____1;
return figwheel$client$heads_up_plugin_msg_handler_$_state_machine__19622__auto__;
})()
;})(switch__19621__auto__,c__19686__auto__,msg_hist,msg_names,msg))
})();
var state__19688__auto__ = (function (){var statearr_23975 = f__19687__auto__.call(null);
(statearr_23975[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19686__auto__);

return statearr_23975;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19688__auto__);
});})(c__19686__auto__,msg_hist,msg_names,msg))
);

return c__19686__auto__;
});
figwheel.client.heads_up_plugin = (function figwheel$client$heads_up_plugin(opts){
var ch = cljs.core.async.chan.call(null);
figwheel.client.heads_up_config_options_STAR__STAR_ = opts;

var c__19686__auto___24072 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19686__auto___24072,ch){
return (function (){
var f__19687__auto__ = (function (){var switch__19621__auto__ = ((function (c__19686__auto___24072,ch){
return (function (state_24055){
var state_val_24056 = (state_24055[(1)]);
if((state_val_24056 === (1))){
var state_24055__$1 = state_24055;
var statearr_24057_24073 = state_24055__$1;
(statearr_24057_24073[(2)] = null);

(statearr_24057_24073[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24056 === (2))){
var state_24055__$1 = state_24055;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_24055__$1,(4),ch);
} else {
if((state_val_24056 === (3))){
var inst_24053 = (state_24055[(2)]);
var state_24055__$1 = state_24055;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_24055__$1,inst_24053);
} else {
if((state_val_24056 === (4))){
var inst_24043 = (state_24055[(7)]);
var inst_24043__$1 = (state_24055[(2)]);
var state_24055__$1 = (function (){var statearr_24058 = state_24055;
(statearr_24058[(7)] = inst_24043__$1);

return statearr_24058;
})();
if(cljs.core.truth_(inst_24043__$1)){
var statearr_24059_24074 = state_24055__$1;
(statearr_24059_24074[(1)] = (5));

} else {
var statearr_24060_24075 = state_24055__$1;
(statearr_24060_24075[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24056 === (5))){
var inst_24043 = (state_24055[(7)]);
var inst_24045 = figwheel.client.heads_up_plugin_msg_handler.call(null,opts,inst_24043);
var state_24055__$1 = state_24055;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_24055__$1,(8),inst_24045);
} else {
if((state_val_24056 === (6))){
var state_24055__$1 = state_24055;
var statearr_24061_24076 = state_24055__$1;
(statearr_24061_24076[(2)] = null);

(statearr_24061_24076[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24056 === (7))){
var inst_24051 = (state_24055[(2)]);
var state_24055__$1 = state_24055;
var statearr_24062_24077 = state_24055__$1;
(statearr_24062_24077[(2)] = inst_24051);

(statearr_24062_24077[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_24056 === (8))){
var inst_24047 = (state_24055[(2)]);
var state_24055__$1 = (function (){var statearr_24063 = state_24055;
(statearr_24063[(8)] = inst_24047);

return statearr_24063;
})();
var statearr_24064_24078 = state_24055__$1;
(statearr_24064_24078[(2)] = null);

(statearr_24064_24078[(1)] = (2));


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
});})(c__19686__auto___24072,ch))
;
return ((function (switch__19621__auto__,c__19686__auto___24072,ch){
return (function() {
var figwheel$client$heads_up_plugin_$_state_machine__19622__auto__ = null;
var figwheel$client$heads_up_plugin_$_state_machine__19622__auto____0 = (function (){
var statearr_24068 = [null,null,null,null,null,null,null,null,null];
(statearr_24068[(0)] = figwheel$client$heads_up_plugin_$_state_machine__19622__auto__);

(statearr_24068[(1)] = (1));

return statearr_24068;
});
var figwheel$client$heads_up_plugin_$_state_machine__19622__auto____1 = (function (state_24055){
while(true){
var ret_value__19623__auto__ = (function (){try{while(true){
var result__19624__auto__ = switch__19621__auto__.call(null,state_24055);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19624__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19624__auto__;
}
break;
}
}catch (e24069){if((e24069 instanceof Object)){
var ex__19625__auto__ = e24069;
var statearr_24070_24079 = state_24055;
(statearr_24070_24079[(5)] = ex__19625__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24055);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e24069;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19623__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__24080 = state_24055;
state_24055 = G__24080;
continue;
} else {
return ret_value__19623__auto__;
}
break;
}
});
figwheel$client$heads_up_plugin_$_state_machine__19622__auto__ = function(state_24055){
switch(arguments.length){
case 0:
return figwheel$client$heads_up_plugin_$_state_machine__19622__auto____0.call(this);
case 1:
return figwheel$client$heads_up_plugin_$_state_machine__19622__auto____1.call(this,state_24055);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$heads_up_plugin_$_state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up_plugin_$_state_machine__19622__auto____0;
figwheel$client$heads_up_plugin_$_state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up_plugin_$_state_machine__19622__auto____1;
return figwheel$client$heads_up_plugin_$_state_machine__19622__auto__;
})()
;})(switch__19621__auto__,c__19686__auto___24072,ch))
})();
var state__19688__auto__ = (function (){var statearr_24071 = f__19687__auto__.call(null);
(statearr_24071[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19686__auto___24072);

return statearr_24071;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19688__auto__);
});})(c__19686__auto___24072,ch))
);


figwheel.client.heads_up.ensure_container.call(null);

return ((function (ch){
return (function (msg_hist){
cljs.core.async.put_BANG_.call(null,ch,msg_hist);

return msg_hist;
});
;})(ch))
});
figwheel.client.enforce_project_plugin = (function figwheel$client$enforce_project_plugin(opts){
return (function (msg_hist){
if(((1) < cljs.core.count.call(null,cljs.core.set.call(null,cljs.core.keep.call(null,new cljs.core.Keyword(null,"project-id","project-id",206449307),cljs.core.take.call(null,(5),msg_hist)))))){
figwheel.client.socket.close_BANG_.call(null);

console.error("Figwheel: message received from different project. Shutting socket down.");

if(cljs.core.truth_(new cljs.core.Keyword(null,"heads-up-display","heads-up-display",-896577202).cljs$core$IFn$_invoke$arity$1(opts))){
var c__19686__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19686__auto__){
return (function (){
var f__19687__auto__ = (function (){var switch__19621__auto__ = ((function (c__19686__auto__){
return (function (state_24101){
var state_val_24102 = (state_24101[(1)]);
if((state_val_24102 === (1))){
var inst_24096 = cljs.core.async.timeout.call(null,(3000));
var state_24101__$1 = state_24101;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_24101__$1,(2),inst_24096);
} else {
if((state_val_24102 === (2))){
var inst_24098 = (state_24101[(2)]);
var inst_24099 = figwheel.client.heads_up.display_system_warning.call(null,"Connection from different project","Shutting connection down!!!!!");
var state_24101__$1 = (function (){var statearr_24103 = state_24101;
(statearr_24103[(7)] = inst_24098);

return statearr_24103;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_24101__$1,inst_24099);
} else {
return null;
}
}
});})(c__19686__auto__))
;
return ((function (switch__19621__auto__,c__19686__auto__){
return (function() {
var figwheel$client$enforce_project_plugin_$_state_machine__19622__auto__ = null;
var figwheel$client$enforce_project_plugin_$_state_machine__19622__auto____0 = (function (){
var statearr_24107 = [null,null,null,null,null,null,null,null];
(statearr_24107[(0)] = figwheel$client$enforce_project_plugin_$_state_machine__19622__auto__);

(statearr_24107[(1)] = (1));

return statearr_24107;
});
var figwheel$client$enforce_project_plugin_$_state_machine__19622__auto____1 = (function (state_24101){
while(true){
var ret_value__19623__auto__ = (function (){try{while(true){
var result__19624__auto__ = switch__19621__auto__.call(null,state_24101);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19624__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19624__auto__;
}
break;
}
}catch (e24108){if((e24108 instanceof Object)){
var ex__19625__auto__ = e24108;
var statearr_24109_24111 = state_24101;
(statearr_24109_24111[(5)] = ex__19625__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24101);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e24108;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19623__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__24112 = state_24101;
state_24101 = G__24112;
continue;
} else {
return ret_value__19623__auto__;
}
break;
}
});
figwheel$client$enforce_project_plugin_$_state_machine__19622__auto__ = function(state_24101){
switch(arguments.length){
case 0:
return figwheel$client$enforce_project_plugin_$_state_machine__19622__auto____0.call(this);
case 1:
return figwheel$client$enforce_project_plugin_$_state_machine__19622__auto____1.call(this,state_24101);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$enforce_project_plugin_$_state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$enforce_project_plugin_$_state_machine__19622__auto____0;
figwheel$client$enforce_project_plugin_$_state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$enforce_project_plugin_$_state_machine__19622__auto____1;
return figwheel$client$enforce_project_plugin_$_state_machine__19622__auto__;
})()
;})(switch__19621__auto__,c__19686__auto__))
})();
var state__19688__auto__ = (function (){var statearr_24110 = f__19687__auto__.call(null);
(statearr_24110[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19686__auto__);

return statearr_24110;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19688__auto__);
});})(c__19686__auto__))
);

return c__19686__auto__;
} else {
return null;
}
} else {
return null;
}
});
});
figwheel.client.default_on_jsload = cljs.core.identity;
figwheel.client.default_on_compile_fail = (function figwheel$client$default_on_compile_fail(p__24113){
var map__24120 = p__24113;
var map__24120__$1 = ((((!((map__24120 == null)))?((((map__24120.cljs$lang$protocol_mask$partition0$ & (64))) || (map__24120.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__24120):map__24120);
var ed = map__24120__$1;
var formatted_exception = cljs.core.get.call(null,map__24120__$1,new cljs.core.Keyword(null,"formatted-exception","formatted-exception",-116489026));
var exception_data = cljs.core.get.call(null,map__24120__$1,new cljs.core.Keyword(null,"exception-data","exception-data",-512474886));
var cause = cljs.core.get.call(null,map__24120__$1,new cljs.core.Keyword(null,"cause","cause",231901252));
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: Compile Exception");

var seq__24122_24126 = cljs.core.seq.call(null,figwheel.client.format_messages.call(null,exception_data));
var chunk__24123_24127 = null;
var count__24124_24128 = (0);
var i__24125_24129 = (0);
while(true){
if((i__24125_24129 < count__24124_24128)){
var msg_24130 = cljs.core._nth.call(null,chunk__24123_24127,i__24125_24129);
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),msg_24130);

var G__24131 = seq__24122_24126;
var G__24132 = chunk__24123_24127;
var G__24133 = count__24124_24128;
var G__24134 = (i__24125_24129 + (1));
seq__24122_24126 = G__24131;
chunk__24123_24127 = G__24132;
count__24124_24128 = G__24133;
i__24125_24129 = G__24134;
continue;
} else {
var temp__4425__auto___24135 = cljs.core.seq.call(null,seq__24122_24126);
if(temp__4425__auto___24135){
var seq__24122_24136__$1 = temp__4425__auto___24135;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__24122_24136__$1)){
var c__17287__auto___24137 = cljs.core.chunk_first.call(null,seq__24122_24136__$1);
var G__24138 = cljs.core.chunk_rest.call(null,seq__24122_24136__$1);
var G__24139 = c__17287__auto___24137;
var G__24140 = cljs.core.count.call(null,c__17287__auto___24137);
var G__24141 = (0);
seq__24122_24126 = G__24138;
chunk__24123_24127 = G__24139;
count__24124_24128 = G__24140;
i__24125_24129 = G__24141;
continue;
} else {
var msg_24142 = cljs.core.first.call(null,seq__24122_24136__$1);
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),msg_24142);

var G__24143 = cljs.core.next.call(null,seq__24122_24136__$1);
var G__24144 = null;
var G__24145 = (0);
var G__24146 = (0);
seq__24122_24126 = G__24143;
chunk__24123_24127 = G__24144;
count__24124_24128 = G__24145;
i__24125_24129 = G__24146;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(cause)){
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),[cljs.core.str("Error on file "),cljs.core.str(new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(cause)),cljs.core.str(", line "),cljs.core.str(new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(cause)),cljs.core.str(", column "),cljs.core.str(new cljs.core.Keyword(null,"column","column",2078222095).cljs$core$IFn$_invoke$arity$1(cause))].join(''));
} else {
}

return ed;
});
figwheel.client.default_on_compile_warning = (function figwheel$client$default_on_compile_warning(p__24147){
var map__24150 = p__24147;
var map__24150__$1 = ((((!((map__24150 == null)))?((((map__24150.cljs$lang$protocol_mask$partition0$ & (64))) || (map__24150.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__24150):map__24150);
var w = map__24150__$1;
var message = cljs.core.get.call(null,map__24150__$1,new cljs.core.Keyword(null,"message","message",-406056002));
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"warn","warn",-436710552),[cljs.core.str("Figwheel: Compile Warning - "),cljs.core.str(message)].join(''));

return w;
});
figwheel.client.default_before_load = (function figwheel$client$default_before_load(files){
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: notified of file changes");

return files;
});
figwheel.client.default_on_cssload = (function figwheel$client$default_on_cssload(files){
figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"debug","debug",-1608172596),"Figwheel: loaded CSS files");

figwheel.client.utils.log.call(null,new cljs.core.Keyword(null,"info","info",-317069002),cljs.core.pr_str.call(null,cljs.core.map.call(null,new cljs.core.Keyword(null,"file","file",-1269645878),files)));

return files;
});
if(typeof figwheel.client.config_defaults !== 'undefined'){
} else {
figwheel.client.config_defaults = cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"load-unchanged-files","load-unchanged-files",-1561468704),new cljs.core.Keyword(null,"on-compile-warning","on-compile-warning",-1195585947),new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602),new cljs.core.Keyword(null,"on-compile-fail","on-compile-fail",728013036),new cljs.core.Keyword(null,"debug","debug",-1608172596),new cljs.core.Keyword(null,"heads-up-display","heads-up-display",-896577202),new cljs.core.Keyword(null,"websocket-url","websocket-url",-490444938),new cljs.core.Keyword(null,"before-jsload","before-jsload",-847513128),new cljs.core.Keyword(null,"load-warninged-code","load-warninged-code",-2030345223),new cljs.core.Keyword(null,"eval-fn","eval-fn",-1111644294),new cljs.core.Keyword(null,"retry-count","retry-count",1936122875),new cljs.core.Keyword(null,"autoload","autoload",-354122500),new cljs.core.Keyword(null,"url-rewriter","url-rewriter",200543838),new cljs.core.Keyword(null,"on-cssload","on-cssload",1825432318)],[true,figwheel.client.default_on_compile_warning,figwheel.client.default_on_jsload,figwheel.client.default_on_compile_fail,false,true,[cljs.core.str("ws://"),cljs.core.str((cljs.core.truth_(figwheel.client.utils.html_env_QMARK_.call(null))?location.host:"localhost:3449")),cljs.core.str("/figwheel-ws")].join(''),figwheel.client.default_before_load,false,false,(100),true,false,figwheel.client.default_on_cssload]);
}
figwheel.client.handle_deprecated_jsload_callback = (function figwheel$client$handle_deprecated_jsload_callback(config){
if(cljs.core.truth_(new cljs.core.Keyword(null,"jsload-callback","jsload-callback",-1949628369).cljs$core$IFn$_invoke$arity$1(config))){
return cljs.core.dissoc.call(null,cljs.core.assoc.call(null,config,new cljs.core.Keyword(null,"on-jsload","on-jsload",-395756602),new cljs.core.Keyword(null,"jsload-callback","jsload-callback",-1949628369).cljs$core$IFn$_invoke$arity$1(config)),new cljs.core.Keyword(null,"jsload-callback","jsload-callback",-1949628369));
} else {
return config;
}
});
figwheel.client.base_plugins = (function figwheel$client$base_plugins(system_options){
var base = new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"enforce-project-plugin","enforce-project-plugin",959402899),figwheel.client.enforce_project_plugin,new cljs.core.Keyword(null,"file-reloader-plugin","file-reloader-plugin",-1792964733),figwheel.client.file_reloader_plugin,new cljs.core.Keyword(null,"comp-fail-warning-plugin","comp-fail-warning-plugin",634311),figwheel.client.compile_fail_warning_plugin,new cljs.core.Keyword(null,"css-reloader-plugin","css-reloader-plugin",2002032904),figwheel.client.css_reloader_plugin,new cljs.core.Keyword(null,"repl-plugin","repl-plugin",-1138952371),figwheel.client.repl_plugin], null);
var base__$1 = ((cljs.core.not.call(null,figwheel.client.utils.html_env_QMARK_.call(null)))?cljs.core.select_keys.call(null,base,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"file-reloader-plugin","file-reloader-plugin",-1792964733),new cljs.core.Keyword(null,"comp-fail-warning-plugin","comp-fail-warning-plugin",634311),new cljs.core.Keyword(null,"repl-plugin","repl-plugin",-1138952371)], null)):base);
var base__$2 = ((new cljs.core.Keyword(null,"autoload","autoload",-354122500).cljs$core$IFn$_invoke$arity$1(system_options) === false)?cljs.core.dissoc.call(null,base__$1,new cljs.core.Keyword(null,"file-reloader-plugin","file-reloader-plugin",-1792964733)):base__$1);
if(cljs.core.truth_((function (){var and__16491__auto__ = new cljs.core.Keyword(null,"heads-up-display","heads-up-display",-896577202).cljs$core$IFn$_invoke$arity$1(system_options);
if(cljs.core.truth_(and__16491__auto__)){
return figwheel.client.utils.html_env_QMARK_.call(null);
} else {
return and__16491__auto__;
}
})())){
return cljs.core.assoc.call(null,base__$2,new cljs.core.Keyword(null,"heads-up-display-plugin","heads-up-display-plugin",1745207501),figwheel.client.heads_up_plugin);
} else {
return base__$2;
}
});
figwheel.client.add_plugins = (function figwheel$client$add_plugins(plugins,system_options){
var seq__24158 = cljs.core.seq.call(null,plugins);
var chunk__24159 = null;
var count__24160 = (0);
var i__24161 = (0);
while(true){
if((i__24161 < count__24160)){
var vec__24162 = cljs.core._nth.call(null,chunk__24159,i__24161);
var k = cljs.core.nth.call(null,vec__24162,(0),null);
var plugin = cljs.core.nth.call(null,vec__24162,(1),null);
if(cljs.core.truth_(plugin)){
var pl_24164 = plugin.call(null,system_options);
cljs.core.add_watch.call(null,figwheel.client.socket.message_history_atom,k,((function (seq__24158,chunk__24159,count__24160,i__24161,pl_24164,vec__24162,k,plugin){
return (function (_,___$1,___$2,msg_hist){
return pl_24164.call(null,msg_hist);
});})(seq__24158,chunk__24159,count__24160,i__24161,pl_24164,vec__24162,k,plugin))
);
} else {
}

var G__24165 = seq__24158;
var G__24166 = chunk__24159;
var G__24167 = count__24160;
var G__24168 = (i__24161 + (1));
seq__24158 = G__24165;
chunk__24159 = G__24166;
count__24160 = G__24167;
i__24161 = G__24168;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__24158);
if(temp__4425__auto__){
var seq__24158__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__24158__$1)){
var c__17287__auto__ = cljs.core.chunk_first.call(null,seq__24158__$1);
var G__24169 = cljs.core.chunk_rest.call(null,seq__24158__$1);
var G__24170 = c__17287__auto__;
var G__24171 = cljs.core.count.call(null,c__17287__auto__);
var G__24172 = (0);
seq__24158 = G__24169;
chunk__24159 = G__24170;
count__24160 = G__24171;
i__24161 = G__24172;
continue;
} else {
var vec__24163 = cljs.core.first.call(null,seq__24158__$1);
var k = cljs.core.nth.call(null,vec__24163,(0),null);
var plugin = cljs.core.nth.call(null,vec__24163,(1),null);
if(cljs.core.truth_(plugin)){
var pl_24173 = plugin.call(null,system_options);
cljs.core.add_watch.call(null,figwheel.client.socket.message_history_atom,k,((function (seq__24158,chunk__24159,count__24160,i__24161,pl_24173,vec__24163,k,plugin,seq__24158__$1,temp__4425__auto__){
return (function (_,___$1,___$2,msg_hist){
return pl_24173.call(null,msg_hist);
});})(seq__24158,chunk__24159,count__24160,i__24161,pl_24173,vec__24163,k,plugin,seq__24158__$1,temp__4425__auto__))
);
} else {
}

var G__24174 = cljs.core.next.call(null,seq__24158__$1);
var G__24175 = null;
var G__24176 = (0);
var G__24177 = (0);
seq__24158 = G__24174;
chunk__24159 = G__24175;
count__24160 = G__24176;
i__24161 = G__24177;
continue;
}
} else {
return null;
}
}
break;
}
});
figwheel.client.start = (function figwheel$client$start(){
var args24178 = [];
var len__17542__auto___24181 = arguments.length;
var i__17543__auto___24182 = (0);
while(true){
if((i__17543__auto___24182 < len__17542__auto___24181)){
args24178.push((arguments[i__17543__auto___24182]));

var G__24183 = (i__17543__auto___24182 + (1));
i__17543__auto___24182 = G__24183;
continue;
} else {
}
break;
}

var G__24180 = args24178.length;
switch (G__24180) {
case 1:
return figwheel.client.start.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 0:
return figwheel.client.start.cljs$core$IFn$_invoke$arity$0();

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args24178.length)].join('')));

}
});

figwheel.client.start.cljs$core$IFn$_invoke$arity$1 = (function (opts){
if((goog.dependencies_ == null)){
return null;
} else {
if(typeof figwheel.client.__figwheel_start_once__ !== 'undefined'){
return null;
} else {
figwheel.client.__figwheel_start_once__ = setTimeout((function (){
var plugins_SINGLEQUOTE_ = new cljs.core.Keyword(null,"plugins","plugins",1900073717).cljs$core$IFn$_invoke$arity$1(opts);
var merge_plugins = new cljs.core.Keyword(null,"merge-plugins","merge-plugins",-1193912370).cljs$core$IFn$_invoke$arity$1(opts);
var system_options = figwheel.client.handle_deprecated_jsload_callback.call(null,cljs.core.merge.call(null,figwheel.client.config_defaults,cljs.core.dissoc.call(null,opts,new cljs.core.Keyword(null,"plugins","plugins",1900073717),new cljs.core.Keyword(null,"merge-plugins","merge-plugins",-1193912370))));
var plugins = (cljs.core.truth_(plugins_SINGLEQUOTE_)?plugins_SINGLEQUOTE_:cljs.core.merge.call(null,figwheel.client.base_plugins.call(null,system_options),merge_plugins));
figwheel.client.utils._STAR_print_debug_STAR_ = new cljs.core.Keyword(null,"debug","debug",-1608172596).cljs$core$IFn$_invoke$arity$1(opts);

figwheel.client.add_plugins.call(null,plugins,system_options);

figwheel.client.file_reloading.patch_goog_base.call(null);

return figwheel.client.socket.open.call(null,system_options);
}));
}
}
});

figwheel.client.start.cljs$core$IFn$_invoke$arity$0 = (function (){
return figwheel.client.start.call(null,cljs.core.PersistentArrayMap.EMPTY);
});

figwheel.client.start.cljs$lang$maxFixedArity = 1;
figwheel.client.watch_and_reload_with_opts = figwheel.client.start;
figwheel.client.watch_and_reload = (function figwheel$client$watch_and_reload(){
var args__17549__auto__ = [];
var len__17542__auto___24189 = arguments.length;
var i__17543__auto___24190 = (0);
while(true){
if((i__17543__auto___24190 < len__17542__auto___24189)){
args__17549__auto__.push((arguments[i__17543__auto___24190]));

var G__24191 = (i__17543__auto___24190 + (1));
i__17543__auto___24190 = G__24191;
continue;
} else {
}
break;
}

var argseq__17550__auto__ = ((((0) < args__17549__auto__.length))?(new cljs.core.IndexedSeq(args__17549__auto__.slice((0)),(0))):null);
return figwheel.client.watch_and_reload.cljs$core$IFn$_invoke$arity$variadic(argseq__17550__auto__);
});

figwheel.client.watch_and_reload.cljs$core$IFn$_invoke$arity$variadic = (function (p__24186){
var map__24187 = p__24186;
var map__24187__$1 = ((((!((map__24187 == null)))?((((map__24187.cljs$lang$protocol_mask$partition0$ & (64))) || (map__24187.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__24187):map__24187);
var opts = map__24187__$1;
return figwheel.client.start.call(null,opts);
});

figwheel.client.watch_and_reload.cljs$lang$maxFixedArity = (0);

figwheel.client.watch_and_reload.cljs$lang$applyTo = (function (seq24185){
return figwheel.client.watch_and_reload.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq24185));
});

//# sourceMappingURL=client.js.map