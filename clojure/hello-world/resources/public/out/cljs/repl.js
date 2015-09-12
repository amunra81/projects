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
var seq__24611_24625 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m));
var chunk__24612_24626 = null;
var count__24613_24627 = (0);
var i__24614_24628 = (0);
while(true){
if((i__24614_24628 < count__24613_24627)){
var f_24629 = cljs.core._nth.call(null,chunk__24612_24626,i__24614_24628);
cljs.core.println.call(null,"  ",f_24629);

var G__24630 = seq__24611_24625;
var G__24631 = chunk__24612_24626;
var G__24632 = count__24613_24627;
var G__24633 = (i__24614_24628 + (1));
seq__24611_24625 = G__24630;
chunk__24612_24626 = G__24631;
count__24613_24627 = G__24632;
i__24614_24628 = G__24633;
continue;
} else {
var temp__4425__auto___24634 = cljs.core.seq.call(null,seq__24611_24625);
if(temp__4425__auto___24634){
var seq__24611_24635__$1 = temp__4425__auto___24634;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__24611_24635__$1)){
var c__17287__auto___24636 = cljs.core.chunk_first.call(null,seq__24611_24635__$1);
var G__24637 = cljs.core.chunk_rest.call(null,seq__24611_24635__$1);
var G__24638 = c__17287__auto___24636;
var G__24639 = cljs.core.count.call(null,c__17287__auto___24636);
var G__24640 = (0);
seq__24611_24625 = G__24637;
chunk__24612_24626 = G__24638;
count__24613_24627 = G__24639;
i__24614_24628 = G__24640;
continue;
} else {
var f_24641 = cljs.core.first.call(null,seq__24611_24635__$1);
cljs.core.println.call(null,"  ",f_24641);

var G__24642 = cljs.core.next.call(null,seq__24611_24635__$1);
var G__24643 = null;
var G__24644 = (0);
var G__24645 = (0);
seq__24611_24625 = G__24642;
chunk__24612_24626 = G__24643;
count__24613_24627 = G__24644;
i__24614_24628 = G__24645;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
var arglists_24646 = new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__16503__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__16503__auto__)){
return or__16503__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.call(null,arglists_24646);
} else {
cljs.core.prn.call(null,((cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first.call(null,arglists_24646)))?cljs.core.second.call(null,arglists_24646):arglists_24646));
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
var seq__24615 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m));
var chunk__24616 = null;
var count__24617 = (0);
var i__24618 = (0);
while(true){
if((i__24618 < count__24617)){
var vec__24619 = cljs.core._nth.call(null,chunk__24616,i__24618);
var name = cljs.core.nth.call(null,vec__24619,(0),null);
var map__24620 = cljs.core.nth.call(null,vec__24619,(1),null);
var map__24620__$1 = ((((!((map__24620 == null)))?((((map__24620.cljs$lang$protocol_mask$partition0$ & (64))) || (map__24620.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__24620):map__24620);
var doc = cljs.core.get.call(null,map__24620__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists = cljs.core.get.call(null,map__24620__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name);

cljs.core.println.call(null," ",arglists);

if(cljs.core.truth_(doc)){
cljs.core.println.call(null," ",doc);
} else {
}

var G__24647 = seq__24615;
var G__24648 = chunk__24616;
var G__24649 = count__24617;
var G__24650 = (i__24618 + (1));
seq__24615 = G__24647;
chunk__24616 = G__24648;
count__24617 = G__24649;
i__24618 = G__24650;
continue;
} else {
var temp__4425__auto__ = cljs.core.seq.call(null,seq__24615);
if(temp__4425__auto__){
var seq__24615__$1 = temp__4425__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__24615__$1)){
var c__17287__auto__ = cljs.core.chunk_first.call(null,seq__24615__$1);
var G__24651 = cljs.core.chunk_rest.call(null,seq__24615__$1);
var G__24652 = c__17287__auto__;
var G__24653 = cljs.core.count.call(null,c__17287__auto__);
var G__24654 = (0);
seq__24615 = G__24651;
chunk__24616 = G__24652;
count__24617 = G__24653;
i__24618 = G__24654;
continue;
} else {
var vec__24622 = cljs.core.first.call(null,seq__24615__$1);
var name = cljs.core.nth.call(null,vec__24622,(0),null);
var map__24623 = cljs.core.nth.call(null,vec__24622,(1),null);
var map__24623__$1 = ((((!((map__24623 == null)))?((((map__24623.cljs$lang$protocol_mask$partition0$ & (64))) || (map__24623.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__24623):map__24623);
var doc = cljs.core.get.call(null,map__24623__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists = cljs.core.get.call(null,map__24623__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name);

cljs.core.println.call(null," ",arglists);

if(cljs.core.truth_(doc)){
cljs.core.println.call(null," ",doc);
} else {
}

var G__24655 = cljs.core.next.call(null,seq__24615__$1);
var G__24656 = null;
var G__24657 = (0);
var G__24658 = (0);
seq__24615 = G__24655;
chunk__24616 = G__24656;
count__24617 = G__24657;
i__24618 = G__24658;
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