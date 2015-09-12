// Compiled by ClojureScript 1.7.48 {}
goog.provide('cljs.repl');
goog.require('cljs.core');
cljs.repl.print_doc = (function cljs$repl$print_doc(m){
cljs.core.println.call(null,"-------------------------");

cljs.core.println.call(null,[cljs.core.str((function (){var temp__4425__auto__ = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(temp__4425__auto__)){
var ns = temp__4425__auto__;
return [cljs.core.str(ns),cljs.core.str("/")].join('');
} else {
return null;
}
})()),cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join(''));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Protocol");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m))){
var seq__7529_7543 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m));
var chunk__7530_7544 = null;
var count__7531_7545 = (0);
var i__7532_7546 = (0);
while(true){
if((i__7532_7546 < count__7531_7545)){
var f_7547 = cljs.core._nth.call(null,chunk__7530_7544,i__7532_7546);
cljs.core.println.call(null,"  ",f_7547);

var G__7548 = seq__7529_7543;
var G__7549 = chunk__7530_7544;
var G__7550 = count__7531_7545;
var G__7551 = (i__7532_7546 + (1));
seq__7529_7543 = G__7548;
chunk__7530_7544 = G__7549;
count__7531_7545 = G__7550;
i__7532_7546 = G__7551;
continue;
} else {
var temp__4425__auto___7552 = cljs.core.seq.call(null,seq__7529_7543);
if(temp__4425__auto___7552){
var seq__7529_7553__$1 = temp__4425__auto___7552;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__7529_7553__$1)){
var c__7176__auto___7554 = cljs.core.chunk_first.call(null,seq__7529_7553__$1);
var G__7555 = cljs.core.chunk_rest.call(null,seq__7529_7553__$1);
var G__7556 = c__7176__auto___7554;
var G__7557 = cljs.core.count.call(null,c__7176__auto___7554);
var G__7558 = (0);
seq__7529_7543 = G__7555;
chunk__7530_7544 = G__7556;
count__7531_7545 = G__7557;
i__7532_7546 = G__7558;
continue;
} else {
var f_7559 = cljs.core.first.call(null,seq__7529_7553__$1);
cljs.core.println.call(null,"  ",f_7559);

var G__7560 = cljs.core.next.call(null,seq__7529_7553__$1);
var G__7561 = null;
var G__7562 = (0);
var G__7563 = (0);
seq__7529_7543 = G__7560;
chunk__7530_7544 = G__7561;
count__7531_7545 = G__7562;
i__7532_7546 = G__7563;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
var arglists_7564 = new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__6392__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__6392__auto__)){
return or__6392__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.call(null,arglists_7564);
} else {
cljs.core.prn.call(null,((cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first.call(null,arglists_7564)))?cljs.core.second.call(null,arglists_7564):arglists_7564));
}
} else {
}
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"special-form","special-form",-1326536374).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Special Form");

cljs.core.println.call(null," ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m));

if(cljs.core.contains_QMARK_.call(null,m,new cljs.core.Keyword(null,"url","url",276297046))){
if(cljs.core.truth_(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))){
return cljs.core.println.call(null,[cljs.core.str("\n  Please see http://clojure.org/"),cljs.core.str(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))].join(''));
} else {
return null;
}
} else {
return cljs.core.println.call(null,[cljs.core.str("\n  Please see http://clojure.org/special_forms#"),cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join(''));
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Macro");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"REPL Special Function");
} else {
}

cljs.core.println.call(null," ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
var seq__7533 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m));
var chunk__7534 = null;
var count__7535 = (0);
var i__7536 = (0);
while(true){
if((i__7536 < count__7535)){
var vec__7537 = cljs.core._nth.call(null,chunk__7534,i__7536);
var name = cljs.core.nth.call(null,vec__7537,(0),null);
var map__7538 = cljs.core.nth.call(null,vec__7537,(1),null);
var map__7538__$1 = ((((!((map__7538 == null)))?((((map__7538.cljs$lang$protocol_mask$partition0$ & (64))) || (map__7538.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__7538):map__7538);
var doc = cljs.core.get.call(null,map__7538__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists = cljs.core.get.call(null,map__7538__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name);

cljs.core.println.call(null," ",arglists);

if(cljs.core.truth_(doc)){
cljs.core.println.call(null," ",doc);
} else {
}

var G__7565 = seq__7533;
var G__7566 = chunk__7534;
var G__7567 = count__7535;
var G__7568 = (i__7536 + (1));
seq__7533 = G__7565;
chunk__7534 = G__7566;
count__7535 = G__7567;
i__7536 = G__7568;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__7533);
if(temp__4425__auto__){
var seq__7533__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__7533__$1)){
var c__7176__auto__ = cljs.core.chunk_first.call(null,seq__7533__$1);
var G__7569 = cljs.core.chunk_rest.call(null,seq__7533__$1);
var G__7570 = c__7176__auto__;
var G__7571 = cljs.core.count.call(null,c__7176__auto__);
var G__7572 = (0);
seq__7533 = G__7569;
chunk__7534 = G__7570;
count__7535 = G__7571;
i__7536 = G__7572;
continue;
} else {
var vec__7540 = cljs.core.first.call(null,seq__7533__$1);
var name = cljs.core.nth.call(null,vec__7540,(0),null);
var map__7541 = cljs.core.nth.call(null,vec__7540,(1),null);
var map__7541__$1 = ((((!((map__7541 == null)))?((((map__7541.cljs$lang$protocol_mask$partition0$ & (64))) || (map__7541.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__7541):map__7541);
var doc = cljs.core.get.call(null,map__7541__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists = cljs.core.get.call(null,map__7541__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name);

cljs.core.println.call(null," ",arglists);

if(cljs.core.truth_(doc)){
cljs.core.println.call(null," ",doc);
} else {
}

var G__7573 = cljs.core.next.call(null,seq__7533__$1);
var G__7574 = null;
var G__7575 = (0);
var G__7576 = (0);
seq__7533 = G__7573;
chunk__7534 = G__7574;
count__7535 = G__7575;
i__7536 = G__7576;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
}
});

//# sourceMappingURL=repl.js.map