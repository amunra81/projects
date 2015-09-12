// Compiled by ClojureScript 1.7.48 {}
goog.provide('figwheel.client.heads_up');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('figwheel.client.socket');
goog.require('cljs.core.async');
goog.require('goog.string');

figwheel.client.heads_up.node = (function figwheel$client$heads_up$node(){
var args__17549__auto__ = [];
var len__17542__auto___24363 = arguments.length;
var i__17543__auto___24364 = (0);
while(true){
if((i__17543__auto___24364 < len__17542__auto___24363)){
args__17549__auto__.push((arguments[i__17543__auto___24364]));

var G__24365 = (i__17543__auto___24364 + (1));
i__17543__auto___24364 = G__24365;
continue;
} else {
}
break;
}

var argseq__17550__auto__ = ((((2) < args__17549__auto__.length))?(new cljs.core.IndexedSeq(args__17549__auto__.slice((2)),(0))):null);
return figwheel.client.heads_up.node.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__17550__auto__);
});

figwheel.client.heads_up.node.cljs$core$IFn$_invoke$arity$variadic = (function (t,attrs,children){
var e = document.createElement(cljs.core.name.call(null,t));
var seq__24355_24366 = cljs.core.seq.call(null,cljs.core.keys.call(null,attrs));
var chunk__24356_24367 = null;
var count__24357_24368 = (0);
var i__24358_24369 = (0);
while(true){
if((i__24358_24369 < count__24357_24368)){
var k_24370 = cljs.core._nth.call(null,chunk__24356_24367,i__24358_24369);
e.setAttribute(cljs.core.name.call(null,k_24370),cljs.core.get.call(null,attrs,k_24370));

var G__24371 = seq__24355_24366;
var G__24372 = chunk__24356_24367;
var G__24373 = count__24357_24368;
var G__24374 = (i__24358_24369 + (1));
seq__24355_24366 = G__24371;
chunk__24356_24367 = G__24372;
count__24357_24368 = G__24373;
i__24358_24369 = G__24374;
continue;
} else {
var temp__4425__auto___24375 = cljs.core.seq.call(null,seq__24355_24366);
if(temp__4425__auto___24375){
var seq__24355_24376__$1 = temp__4425__auto___24375;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__24355_24376__$1)){
var c__17287__auto___24377 = cljs.core.chunk_first.call(null,seq__24355_24376__$1);
var G__24378 = cljs.core.chunk_rest.call(null,seq__24355_24376__$1);
var G__24379 = c__17287__auto___24377;
var G__24380 = cljs.core.count.call(null,c__17287__auto___24377);
var G__24381 = (0);
seq__24355_24366 = G__24378;
chunk__24356_24367 = G__24379;
count__24357_24368 = G__24380;
i__24358_24369 = G__24381;
continue;
} else {
var k_24382 = cljs.core.first.call(null,seq__24355_24376__$1);
e.setAttribute(cljs.core.name.call(null,k_24382),cljs.core.get.call(null,attrs,k_24382));

var G__24383 = cljs.core.next.call(null,seq__24355_24376__$1);
var G__24384 = null;
var G__24385 = (0);
var G__24386 = (0);
seq__24355_24366 = G__24383;
chunk__24356_24367 = G__24384;
count__24357_24368 = G__24385;
i__24358_24369 = G__24386;
continue;
}
} else {
}
}
break;
}

var seq__24359_24387 = cljs.core.seq.call(null,children);
var chunk__24360_24388 = null;
var count__24361_24389 = (0);
var i__24362_24390 = (0);
while(true){
if((i__24362_24390 < count__24361_24389)){
var ch_24391 = cljs.core._nth.call(null,chunk__24360_24388,i__24362_24390);
e.appendChild(ch_24391);

var G__24392 = seq__24359_24387;
var G__24393 = chunk__24360_24388;
var G__24394 = count__24361_24389;
var G__24395 = (i__24362_24390 + (1));
seq__24359_24387 = G__24392;
chunk__24360_24388 = G__24393;
count__24361_24389 = G__24394;
i__24362_24390 = G__24395;
continue;
} else {
var temp__4425__auto___24396 = cljs.core.seq.call(null,seq__24359_24387);
if(temp__4425__auto___24396){
var seq__24359_24397__$1 = temp__4425__auto___24396;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__24359_24397__$1)){
var c__17287__auto___24398 = cljs.core.chunk_first.call(null,seq__24359_24397__$1);
var G__24399 = cljs.core.chunk_rest.call(null,seq__24359_24397__$1);
var G__24400 = c__17287__auto___24398;
var G__24401 = cljs.core.count.call(null,c__17287__auto___24398);
var G__24402 = (0);
seq__24359_24387 = G__24399;
chunk__24360_24388 = G__24400;
count__24361_24389 = G__24401;
i__24362_24390 = G__24402;
continue;
} else {
var ch_24403 = cljs.core.first.call(null,seq__24359_24397__$1);
e.appendChild(ch_24403);

var G__24404 = cljs.core.next.call(null,seq__24359_24397__$1);
var G__24405 = null;
var G__24406 = (0);
var G__24407 = (0);
seq__24359_24387 = G__24404;
chunk__24360_24388 = G__24405;
count__24361_24389 = G__24406;
i__24362_24390 = G__24407;
continue;
}
} else {
}
}
break;
}

return e;
});

figwheel.client.heads_up.node.cljs$lang$maxFixedArity = (2);

figwheel.client.heads_up.node.cljs$lang$applyTo = (function (seq24352){
var G__24353 = cljs.core.first.call(null,seq24352);
var seq24352__$1 = cljs.core.next.call(null,seq24352);
var G__24354 = cljs.core.first.call(null,seq24352__$1);
var seq24352__$2 = cljs.core.next.call(null,seq24352__$1);
return figwheel.client.heads_up.node.cljs$core$IFn$_invoke$arity$variadic(G__24353,G__24354,seq24352__$2);
});
if(typeof figwheel.client.heads_up.heads_up_event_dispatch !== 'undefined'){
} else {
figwheel.client.heads_up.heads_up_event_dispatch = (function (){var method_table__17397__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__17398__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var method_cache__17399__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__17400__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__17401__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));
return (new cljs.core.MultiFn(cljs.core.symbol.call(null,"figwheel.client.heads-up","heads-up-event-dispatch"),((function (method_table__17397__auto__,prefer_table__17398__auto__,method_cache__17399__auto__,cached_hierarchy__17400__auto__,hierarchy__17401__auto__){
return (function (dataset){
return dataset.figwheelEvent;
});})(method_table__17397__auto__,prefer_table__17398__auto__,method_cache__17399__auto__,cached_hierarchy__17400__auto__,hierarchy__17401__auto__))
,new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__17401__auto__,method_table__17397__auto__,prefer_table__17398__auto__,method_cache__17399__auto__,cached_hierarchy__17400__auto__));
})();
}
cljs.core._add_method.call(null,figwheel.client.heads_up.heads_up_event_dispatch,new cljs.core.Keyword(null,"default","default",-1987822328),(function (_){
return cljs.core.PersistentArrayMap.EMPTY;
}));
cljs.core._add_method.call(null,figwheel.client.heads_up.heads_up_event_dispatch,"file-selected",(function (dataset){
return figwheel.client.socket.send_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"figwheel-event","figwheel-event",519570592),"file-selected",new cljs.core.Keyword(null,"file-name","file-name",-1654217259),dataset.fileName,new cljs.core.Keyword(null,"file-line","file-line",-1228823138),dataset.fileLine], null));
}));
cljs.core._add_method.call(null,figwheel.client.heads_up.heads_up_event_dispatch,"close-heads-up",(function (dataset){
return figwheel.client.heads_up.clear.call(null);
}));
figwheel.client.heads_up.ancestor_nodes = (function figwheel$client$heads_up$ancestor_nodes(el){
return cljs.core.iterate.call(null,(function (e){
return e.parentNode;
}),el);
});
figwheel.client.heads_up.get_dataset = (function figwheel$client$heads_up$get_dataset(el){
return cljs.core.first.call(null,cljs.core.keep.call(null,(function (x){
if(cljs.core.truth_(x.dataset.figwheelEvent)){
return x.dataset;
} else {
return null;
}
}),cljs.core.take.call(null,(4),figwheel.client.heads_up.ancestor_nodes.call(null,el))));
});
figwheel.client.heads_up.heads_up_onclick_handler = (function figwheel$client$heads_up$heads_up_onclick_handler(event){
var dataset = figwheel.client.heads_up.get_dataset.call(null,event.target);
event.preventDefault();

if(cljs.core.truth_(dataset)){
return figwheel.client.heads_up.heads_up_event_dispatch.call(null,dataset);
} else {
return null;
}
});
figwheel.client.heads_up.ensure_container = (function figwheel$client$heads_up$ensure_container(){
var cont_id = "figwheel-heads-up-container";
var content_id = "figwheel-heads-up-content-area";
if(cljs.core.not.call(null,document.querySelector([cljs.core.str("#"),cljs.core.str(cont_id)].join('')))){
var el_24408 = figwheel.client.heads_up.node.call(null,new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"id","id",-1388402092),cont_id,new cljs.core.Keyword(null,"style","style",-496642736),[cljs.core.str("-webkit-transition: all 0.2s ease-in-out;"),cljs.core.str("-moz-transition: all 0.2s ease-in-out;"),cljs.core.str("-o-transition: all 0.2s ease-in-out;"),cljs.core.str("transition: all 0.2s ease-in-out;"),cljs.core.str("font-size: 13px;"),cljs.core.str("border-top: 1px solid #f5f5f5;"),cljs.core.str("box-shadow: 0px 0px 1px #aaaaaa;"),cljs.core.str("line-height: 18px;"),cljs.core.str("color: #333;"),cljs.core.str("font-family: monospace;"),cljs.core.str("padding: 0px 10px 0px 70px;"),cljs.core.str("position: fixed;"),cljs.core.str("bottom: 0px;"),cljs.core.str("left: 0px;"),cljs.core.str("height: 0px;"),cljs.core.str("opacity: 0.0;"),cljs.core.str("box-sizing: border-box;"),cljs.core.str("z-index: 10000;")].join('')], null));
el_24408.onclick = figwheel.client.heads_up.heads_up_onclick_handler;

el_24408.innerHTML = [cljs.core.str(figwheel.client.heads_up.clojure_symbol_svg)].join('');

el_24408.appendChild(figwheel.client.heads_up.node.call(null,new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"id","id",-1388402092),content_id], null)));

document.body.appendChild(el_24408);
} else {
}

return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"container-el","container-el",109664205),document.getElementById(cont_id),new cljs.core.Keyword(null,"content-area-el","content-area-el",742757187),document.getElementById(content_id)], null);
});
figwheel.client.heads_up.set_style_BANG_ = (function figwheel$client$heads_up$set_style_BANG_(p__24409,st_map){
var map__24414 = p__24409;
var map__24414__$1 = ((((!((map__24414 == null)))?((((map__24414.cljs$lang$protocol_mask$partition0$ & (64))) || (map__24414.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__24414):map__24414);
var container_el = cljs.core.get.call(null,map__24414__$1,new cljs.core.Keyword(null,"container-el","container-el",109664205));
return cljs.core.mapv.call(null,((function (map__24414,map__24414__$1,container_el){
return (function (p__24416){
var vec__24417 = p__24416;
var k = cljs.core.nth.call(null,vec__24417,(0),null);
var v = cljs.core.nth.call(null,vec__24417,(1),null);
return (container_el.style[cljs.core.name.call(null,k)] = v);
});})(map__24414,map__24414__$1,container_el))
,st_map);
});
figwheel.client.heads_up.set_content_BANG_ = (function figwheel$client$heads_up$set_content_BANG_(p__24418,dom_str){
var map__24421 = p__24418;
var map__24421__$1 = ((((!((map__24421 == null)))?((((map__24421.cljs$lang$protocol_mask$partition0$ & (64))) || (map__24421.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__24421):map__24421);
var c = map__24421__$1;
var content_area_el = cljs.core.get.call(null,map__24421__$1,new cljs.core.Keyword(null,"content-area-el","content-area-el",742757187));
return content_area_el.innerHTML = dom_str;
});
figwheel.client.heads_up.get_content = (function figwheel$client$heads_up$get_content(p__24423){
var map__24426 = p__24423;
var map__24426__$1 = ((((!((map__24426 == null)))?((((map__24426.cljs$lang$protocol_mask$partition0$ & (64))) || (map__24426.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__24426):map__24426);
var content_area_el = cljs.core.get.call(null,map__24426__$1,new cljs.core.Keyword(null,"content-area-el","content-area-el",742757187));
return content_area_el.innerHTML;
});
figwheel.client.heads_up.close_link = (function figwheel$client$heads_up$close_link(){
return [cljs.core.str("<a style=\""),cljs.core.str("float: right;"),cljs.core.str("font-size: 18px;"),cljs.core.str("text-decoration: none;"),cljs.core.str("text-align: right;"),cljs.core.str("width: 30px;"),cljs.core.str("height: 30px;"),cljs.core.str("color: rgba(84,84,84, 0.5);"),cljs.core.str("\" href=\"#\"  data-figwheel-event=\"close-heads-up\">"),cljs.core.str("x"),cljs.core.str("</a>")].join('');
});
figwheel.client.heads_up.display_heads_up = (function figwheel$client$heads_up$display_heads_up(style,msg){
var c__19686__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19686__auto__){
return (function (){
var f__19687__auto__ = (function (){var switch__19621__auto__ = ((function (c__19686__auto__){
return (function (state_24469){
var state_val_24470 = (state_24469[(1)]);
if((state_val_24470 === (1))){
var inst_24454 = (state_24469[(7)]);
var inst_24454__$1 = figwheel.client.heads_up.ensure_container.call(null);
var inst_24455 = [new cljs.core.Keyword(null,"paddingTop","paddingTop",-1088692345),new cljs.core.Keyword(null,"paddingBottom","paddingBottom",-916694489),new cljs.core.Keyword(null,"width","width",-384071477),new cljs.core.Keyword(null,"minHeight","minHeight",-1635998980),new cljs.core.Keyword(null,"opacity","opacity",397153780)];
var inst_24456 = ["10px","10px","100%","68px","1.0"];
var inst_24457 = cljs.core.PersistentHashMap.fromArrays(inst_24455,inst_24456);
var inst_24458 = cljs.core.merge.call(null,inst_24457,style);
var inst_24459 = figwheel.client.heads_up.set_style_BANG_.call(null,inst_24454__$1,inst_24458);
var inst_24460 = figwheel.client.heads_up.set_content_BANG_.call(null,inst_24454__$1,msg);
var inst_24461 = cljs.core.async.timeout.call(null,(300));
var state_24469__$1 = (function (){var statearr_24471 = state_24469;
(statearr_24471[(7)] = inst_24454__$1);

(statearr_24471[(8)] = inst_24459);

(statearr_24471[(9)] = inst_24460);

return statearr_24471;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_24469__$1,(2),inst_24461);
} else {
if((state_val_24470 === (2))){
var inst_24454 = (state_24469[(7)]);
var inst_24463 = (state_24469[(2)]);
var inst_24464 = [new cljs.core.Keyword(null,"height","height",1025178622)];
var inst_24465 = ["auto"];
var inst_24466 = cljs.core.PersistentHashMap.fromArrays(inst_24464,inst_24465);
var inst_24467 = figwheel.client.heads_up.set_style_BANG_.call(null,inst_24454,inst_24466);
var state_24469__$1 = (function (){var statearr_24472 = state_24469;
(statearr_24472[(10)] = inst_24463);

return statearr_24472;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_24469__$1,inst_24467);
} else {
return null;
}
}
});})(c__19686__auto__))
;
return ((function (switch__19621__auto__,c__19686__auto__){
return (function() {
var figwheel$client$heads_up$display_heads_up_$_state_machine__19622__auto__ = null;
var figwheel$client$heads_up$display_heads_up_$_state_machine__19622__auto____0 = (function (){
var statearr_24476 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_24476[(0)] = figwheel$client$heads_up$display_heads_up_$_state_machine__19622__auto__);

(statearr_24476[(1)] = (1));

return statearr_24476;
});
var figwheel$client$heads_up$display_heads_up_$_state_machine__19622__auto____1 = (function (state_24469){
while(true){
var ret_value__19623__auto__ = (function (){try{while(true){
var result__19624__auto__ = switch__19621__auto__.call(null,state_24469);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19624__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19624__auto__;
}
break;
}
}catch (e24477){if((e24477 instanceof Object)){
var ex__19625__auto__ = e24477;
var statearr_24478_24480 = state_24469;
(statearr_24478_24480[(5)] = ex__19625__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24469);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e24477;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19623__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__24481 = state_24469;
state_24469 = G__24481;
continue;
} else {
return ret_value__19623__auto__;
}
break;
}
});
figwheel$client$heads_up$display_heads_up_$_state_machine__19622__auto__ = function(state_24469){
switch(arguments.length){
case 0:
return figwheel$client$heads_up$display_heads_up_$_state_machine__19622__auto____0.call(this);
case 1:
return figwheel$client$heads_up$display_heads_up_$_state_machine__19622__auto____1.call(this,state_24469);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$heads_up$display_heads_up_$_state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up$display_heads_up_$_state_machine__19622__auto____0;
figwheel$client$heads_up$display_heads_up_$_state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up$display_heads_up_$_state_machine__19622__auto____1;
return figwheel$client$heads_up$display_heads_up_$_state_machine__19622__auto__;
})()
;})(switch__19621__auto__,c__19686__auto__))
})();
var state__19688__auto__ = (function (){var statearr_24479 = f__19687__auto__.call(null);
(statearr_24479[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19686__auto__);

return statearr_24479;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19688__auto__);
});})(c__19686__auto__))
);

return c__19686__auto__;
});
figwheel.client.heads_up.heading = (function figwheel$client$heads_up$heading(s){
return [cljs.core.str("<div style=\""),cljs.core.str("font-size: 26px;"),cljs.core.str("line-height: 26px;"),cljs.core.str("margin-bottom: 2px;"),cljs.core.str("padding-top: 1px;"),cljs.core.str("\">"),cljs.core.str(s),cljs.core.str("</div>")].join('');
});
figwheel.client.heads_up.file_and_line_number = (function figwheel$client$heads_up$file_and_line_number(msg){
if(cljs.core.truth_(cljs.core.re_matches.call(null,/.*at\sline.*/,msg))){
return cljs.core.take.call(null,(2),cljs.core.reverse.call(null,clojure.string.split.call(null,msg," ")));
} else {
return null;
}
});
figwheel.client.heads_up.file_selector_div = (function figwheel$client$heads_up$file_selector_div(file_name,line_number,msg){
return [cljs.core.str("<div data-figwheel-event=\"file-selected\" data-file-name=\""),cljs.core.str(file_name),cljs.core.str("\" data-file-line=\""),cljs.core.str(line_number),cljs.core.str("\">"),cljs.core.str(msg),cljs.core.str("</div>")].join('');
});
figwheel.client.heads_up.format_line = (function figwheel$client$heads_up$format_line(msg){
var msg__$1 = goog.string.htmlEscape(msg);
var temp__4423__auto__ = figwheel.client.heads_up.file_and_line_number.call(null,msg__$1);
if(cljs.core.truth_(temp__4423__auto__)){
var vec__24483 = temp__4423__auto__;
var f = cljs.core.nth.call(null,vec__24483,(0),null);
var ln = cljs.core.nth.call(null,vec__24483,(1),null);
return figwheel.client.heads_up.file_selector_div.call(null,f,ln,msg__$1);
} else {
return [cljs.core.str("<div>"),cljs.core.str(msg__$1),cljs.core.str("</div>")].join('');
}
});
figwheel.client.heads_up.display_error = (function figwheel$client$heads_up$display_error(formatted_messages,cause){
var vec__24486 = (cljs.core.truth_(cause)?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(cause),new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(cause),new cljs.core.Keyword(null,"column","column",2078222095).cljs$core$IFn$_invoke$arity$1(cause)], null):cljs.core.first.call(null,cljs.core.keep.call(null,figwheel.client.heads_up.file_and_line_number,formatted_messages)));
var file_name = cljs.core.nth.call(null,vec__24486,(0),null);
var file_line = cljs.core.nth.call(null,vec__24486,(1),null);
var file_column = cljs.core.nth.call(null,vec__24486,(2),null);
var msg = cljs.core.apply.call(null,cljs.core.str,cljs.core.map.call(null,((function (vec__24486,file_name,file_line,file_column){
return (function (p1__24484_SHARP_){
return [cljs.core.str("<div>"),cljs.core.str(goog.string.htmlEscape(p1__24484_SHARP_)),cljs.core.str("</div>")].join('');
});})(vec__24486,file_name,file_line,file_column))
,formatted_messages));
return figwheel.client.heads_up.display_heads_up.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),"rgba(255, 161, 161, 0.95)"], null),[cljs.core.str(figwheel.client.heads_up.close_link.call(null)),cljs.core.str(figwheel.client.heads_up.heading.call(null,"Compile Error")),cljs.core.str(figwheel.client.heads_up.file_selector_div.call(null,file_name,(function (){var or__16503__auto__ = file_line;
if(cljs.core.truth_(or__16503__auto__)){
return or__16503__auto__;
} else {
var and__16491__auto__ = cause;
if(cljs.core.truth_(and__16491__auto__)){
return new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(cause);
} else {
return and__16491__auto__;
}
}
})(),[cljs.core.str(msg),cljs.core.str((cljs.core.truth_(cause)?[cljs.core.str("Error on file "),cljs.core.str(goog.string.htmlEscape(new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(cause))),cljs.core.str(", line "),cljs.core.str(new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(cause)),cljs.core.str(", column "),cljs.core.str(new cljs.core.Keyword(null,"column","column",2078222095).cljs$core$IFn$_invoke$arity$1(cause))].join(''):""))].join('')))].join(''));
});
figwheel.client.heads_up.display_system_warning = (function figwheel$client$heads_up$display_system_warning(header,msg){
return figwheel.client.heads_up.display_heads_up.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),"rgba(255, 220, 110, 0.95)"], null),[cljs.core.str(figwheel.client.heads_up.close_link.call(null)),cljs.core.str(figwheel.client.heads_up.heading.call(null,header)),cljs.core.str(figwheel.client.heads_up.format_line.call(null,msg))].join(''));
});
figwheel.client.heads_up.display_warning = (function figwheel$client$heads_up$display_warning(msg){
return figwheel.client.heads_up.display_system_warning.call(null,"Compile Warning",msg);
});
figwheel.client.heads_up.append_message = (function figwheel$client$heads_up$append_message(message){
var map__24489 = figwheel.client.heads_up.ensure_container.call(null);
var map__24489__$1 = ((((!((map__24489 == null)))?((((map__24489.cljs$lang$protocol_mask$partition0$ & (64))) || (map__24489.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__24489):map__24489);
var content_area_el = cljs.core.get.call(null,map__24489__$1,new cljs.core.Keyword(null,"content-area-el","content-area-el",742757187));
var el = document.createElement("div");
el.innerHTML = figwheel.client.heads_up.format_line.call(null,message);

return content_area_el.appendChild(el);
});
figwheel.client.heads_up.clear = (function figwheel$client$heads_up$clear(){
var c__19686__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19686__auto__){
return (function (){
var f__19687__auto__ = (function (){var switch__19621__auto__ = ((function (c__19686__auto__){
return (function (state_24537){
var state_val_24538 = (state_24537[(1)]);
if((state_val_24538 === (1))){
var inst_24520 = (state_24537[(7)]);
var inst_24520__$1 = figwheel.client.heads_up.ensure_container.call(null);
var inst_24521 = [new cljs.core.Keyword(null,"opacity","opacity",397153780)];
var inst_24522 = ["0.0"];
var inst_24523 = cljs.core.PersistentHashMap.fromArrays(inst_24521,inst_24522);
var inst_24524 = figwheel.client.heads_up.set_style_BANG_.call(null,inst_24520__$1,inst_24523);
var inst_24525 = cljs.core.async.timeout.call(null,(300));
var state_24537__$1 = (function (){var statearr_24539 = state_24537;
(statearr_24539[(7)] = inst_24520__$1);

(statearr_24539[(8)] = inst_24524);

return statearr_24539;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_24537__$1,(2),inst_24525);
} else {
if((state_val_24538 === (2))){
var inst_24520 = (state_24537[(7)]);
var inst_24527 = (state_24537[(2)]);
var inst_24528 = [new cljs.core.Keyword(null,"width","width",-384071477),new cljs.core.Keyword(null,"height","height",1025178622),new cljs.core.Keyword(null,"minHeight","minHeight",-1635998980),new cljs.core.Keyword(null,"padding","padding",1660304693),new cljs.core.Keyword(null,"borderRadius","borderRadius",-1505621083),new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491)];
var inst_24529 = ["auto","0px","0px","0px 10px 0px 70px","0px","transparent"];
var inst_24530 = cljs.core.PersistentHashMap.fromArrays(inst_24528,inst_24529);
var inst_24531 = figwheel.client.heads_up.set_style_BANG_.call(null,inst_24520,inst_24530);
var inst_24532 = cljs.core.async.timeout.call(null,(200));
var state_24537__$1 = (function (){var statearr_24540 = state_24537;
(statearr_24540[(9)] = inst_24527);

(statearr_24540[(10)] = inst_24531);

return statearr_24540;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_24537__$1,(3),inst_24532);
} else {
if((state_val_24538 === (3))){
var inst_24520 = (state_24537[(7)]);
var inst_24534 = (state_24537[(2)]);
var inst_24535 = figwheel.client.heads_up.set_content_BANG_.call(null,inst_24520,"");
var state_24537__$1 = (function (){var statearr_24541 = state_24537;
(statearr_24541[(11)] = inst_24534);

return statearr_24541;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_24537__$1,inst_24535);
} else {
return null;
}
}
}
});})(c__19686__auto__))
;
return ((function (switch__19621__auto__,c__19686__auto__){
return (function() {
var figwheel$client$heads_up$clear_$_state_machine__19622__auto__ = null;
var figwheel$client$heads_up$clear_$_state_machine__19622__auto____0 = (function (){
var statearr_24545 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_24545[(0)] = figwheel$client$heads_up$clear_$_state_machine__19622__auto__);

(statearr_24545[(1)] = (1));

return statearr_24545;
});
var figwheel$client$heads_up$clear_$_state_machine__19622__auto____1 = (function (state_24537){
while(true){
var ret_value__19623__auto__ = (function (){try{while(true){
var result__19624__auto__ = switch__19621__auto__.call(null,state_24537);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19624__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19624__auto__;
}
break;
}
}catch (e24546){if((e24546 instanceof Object)){
var ex__19625__auto__ = e24546;
var statearr_24547_24549 = state_24537;
(statearr_24547_24549[(5)] = ex__19625__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24537);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e24546;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19623__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__24550 = state_24537;
state_24537 = G__24550;
continue;
} else {
return ret_value__19623__auto__;
}
break;
}
});
figwheel$client$heads_up$clear_$_state_machine__19622__auto__ = function(state_24537){
switch(arguments.length){
case 0:
return figwheel$client$heads_up$clear_$_state_machine__19622__auto____0.call(this);
case 1:
return figwheel$client$heads_up$clear_$_state_machine__19622__auto____1.call(this,state_24537);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$heads_up$clear_$_state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up$clear_$_state_machine__19622__auto____0;
figwheel$client$heads_up$clear_$_state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up$clear_$_state_machine__19622__auto____1;
return figwheel$client$heads_up$clear_$_state_machine__19622__auto__;
})()
;})(switch__19621__auto__,c__19686__auto__))
})();
var state__19688__auto__ = (function (){var statearr_24548 = f__19687__auto__.call(null);
(statearr_24548[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19686__auto__);

return statearr_24548;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19688__auto__);
});})(c__19686__auto__))
);

return c__19686__auto__;
});
figwheel.client.heads_up.display_loaded_start = (function figwheel$client$heads_up$display_loaded_start(){
return figwheel.client.heads_up.display_heads_up.call(null,new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"backgroundColor","backgroundColor",1738438491),"rgba(211,234,172,1.0)",new cljs.core.Keyword(null,"width","width",-384071477),"68px",new cljs.core.Keyword(null,"height","height",1025178622),"68px",new cljs.core.Keyword(null,"paddingLeft","paddingLeft",262720813),"0px",new cljs.core.Keyword(null,"paddingRight","paddingRight",-1642313463),"0px",new cljs.core.Keyword(null,"borderRadius","borderRadius",-1505621083),"35px"], null),"");
});
figwheel.client.heads_up.flash_loaded = (function figwheel$client$heads_up$flash_loaded(){
var c__19686__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19686__auto__){
return (function (){
var f__19687__auto__ = (function (){var switch__19621__auto__ = ((function (c__19686__auto__){
return (function (state_24582){
var state_val_24583 = (state_24582[(1)]);
if((state_val_24583 === (1))){
var inst_24572 = figwheel.client.heads_up.display_loaded_start.call(null);
var state_24582__$1 = state_24582;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_24582__$1,(2),inst_24572);
} else {
if((state_val_24583 === (2))){
var inst_24574 = (state_24582[(2)]);
var inst_24575 = cljs.core.async.timeout.call(null,(400));
var state_24582__$1 = (function (){var statearr_24584 = state_24582;
(statearr_24584[(7)] = inst_24574);

return statearr_24584;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_24582__$1,(3),inst_24575);
} else {
if((state_val_24583 === (3))){
var inst_24577 = (state_24582[(2)]);
var inst_24578 = figwheel.client.heads_up.clear.call(null);
var state_24582__$1 = (function (){var statearr_24585 = state_24582;
(statearr_24585[(8)] = inst_24577);

return statearr_24585;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_24582__$1,(4),inst_24578);
} else {
if((state_val_24583 === (4))){
var inst_24580 = (state_24582[(2)]);
var state_24582__$1 = state_24582;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_24582__$1,inst_24580);
} else {
return null;
}
}
}
}
});})(c__19686__auto__))
;
return ((function (switch__19621__auto__,c__19686__auto__){
return (function() {
var figwheel$client$heads_up$flash_loaded_$_state_machine__19622__auto__ = null;
var figwheel$client$heads_up$flash_loaded_$_state_machine__19622__auto____0 = (function (){
var statearr_24589 = [null,null,null,null,null,null,null,null,null];
(statearr_24589[(0)] = figwheel$client$heads_up$flash_loaded_$_state_machine__19622__auto__);

(statearr_24589[(1)] = (1));

return statearr_24589;
});
var figwheel$client$heads_up$flash_loaded_$_state_machine__19622__auto____1 = (function (state_24582){
while(true){
var ret_value__19623__auto__ = (function (){try{while(true){
var result__19624__auto__ = switch__19621__auto__.call(null,state_24582);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19624__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19624__auto__;
}
break;
}
}catch (e24590){if((e24590 instanceof Object)){
var ex__19625__auto__ = e24590;
var statearr_24591_24593 = state_24582;
(statearr_24591_24593[(5)] = ex__19625__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_24582);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e24590;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19623__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__24594 = state_24582;
state_24582 = G__24594;
continue;
} else {
return ret_value__19623__auto__;
}
break;
}
});
figwheel$client$heads_up$flash_loaded_$_state_machine__19622__auto__ = function(state_24582){
switch(arguments.length){
case 0:
return figwheel$client$heads_up$flash_loaded_$_state_machine__19622__auto____0.call(this);
case 1:
return figwheel$client$heads_up$flash_loaded_$_state_machine__19622__auto____1.call(this,state_24582);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
figwheel$client$heads_up$flash_loaded_$_state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$0 = figwheel$client$heads_up$flash_loaded_$_state_machine__19622__auto____0;
figwheel$client$heads_up$flash_loaded_$_state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$1 = figwheel$client$heads_up$flash_loaded_$_state_machine__19622__auto____1;
return figwheel$client$heads_up$flash_loaded_$_state_machine__19622__auto__;
})()
;})(switch__19621__auto__,c__19686__auto__))
})();
var state__19688__auto__ = (function (){var statearr_24592 = f__19687__auto__.call(null);
(statearr_24592[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19686__auto__);

return statearr_24592;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19688__auto__);
});})(c__19686__auto__))
);

return c__19686__auto__;
});
figwheel.client.heads_up.clojure_symbol_svg = "<?xml version='1.0' encoding='UTF-8' ?>\n<!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'>\n<svg width='49px' height='49px' viewBox='0 0 100 99' version='1.1' xmlns='http://www.w3.org/2000/svg' style='position:absolute; top:9px; left: 10px;'>\n<circle fill='rgba(255,255,255,0.5)' cx='49.75' cy='49.5' r='48.5'/>\n<path fill='#5881d8' d=' M 39.30 6.22 C 51.71 3.11 65.45 5.64 75.83 13.16 C 88.68 22.10 96.12 38.22 94.43 53.80 C 93.66 60.11 89.40 66.01 83.37 68.24 C 79.21 69.97 74.64 69.78 70.23 69.80 C 80.77 59.67 81.41 41.33 71.45 30.60 C 63.60 21.32 49.75 18.52 38.65 23.16 C 31.27 18.80 21.83 18.68 14.27 22.69 C 20.65 14.79 29.32 8.56 39.30 6.22 Z' />\n<path fill='#90b4fe' d=' M 42.93 26.99 C 48.49 25.50 54.55 25.62 59.79 28.14 C 68.71 32.19 74.61 42.14 73.41 51.94 C 72.85 58.64 68.92 64.53 63.81 68.69 C 59.57 66.71 57.53 62.30 55.66 58.30 C 50.76 48.12 50.23 36.02 42.93 26.99 Z' />\n<path fill='#63b132' d=' M 12.30 33.30 C 17.11 28.49 24.33 26.90 30.91 28.06 C 25.22 33.49 21.44 41.03 21.46 48.99 C 21.11 58.97 26.58 68.76 35.08 73.92 C 43.28 79.06 53.95 79.28 62.66 75.29 C 70.37 77.57 78.52 77.36 86.31 75.57 C 80.05 84.00 70.94 90.35 60.69 92.84 C 48.02 96.03 34.00 93.24 23.56 85.37 C 12.16 77.09 5.12 63.11 5.44 49.00 C 5.15 43.06 8.22 37.42 12.30 33.30 Z' />\n<path fill='#91dc47' d=' M 26.94 54.00 C 24.97 45.06 29.20 35.59 36.45 30.24 C 41.99 33.71 44.23 40.14 46.55 45.91 C 43.00 53.40 38.44 60.46 35.94 68.42 C 31.50 64.74 27.96 59.77 26.94 54.00 Z' />\n<path fill='#91dc47' d=' M 41.97 71.80 C 41.46 64.27 45.31 57.52 48.11 50.80 C 50.40 58.13 51.84 66.19 57.18 72.06 C 52.17 73.37 46.93 73.26 41.97 71.80 Z' />\n</svg>";

//# sourceMappingURL=heads_up.js.map