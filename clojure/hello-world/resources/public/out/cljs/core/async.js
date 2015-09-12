// Compiled by ClojureScript 1.7.48 {}
goog.provide('cljs.core.async');
goog.require('cljs.core');
goog.require('cljs.core.async.impl.channels');
goog.require('cljs.core.async.impl.dispatch');
goog.require('cljs.core.async.impl.ioc_helpers');
goog.require('cljs.core.async.impl.protocols');
goog.require('cljs.core.async.impl.buffers');
goog.require('cljs.core.async.impl.timers');
cljs.core.async.fn_handler = (function cljs$core$async$fn_handler(f){
if(typeof cljs.core.async.t25507 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t25507 = (function (fn_handler,f,meta25508){
this.fn_handler = fn_handler;
this.f = f;
this.meta25508 = meta25508;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t25507.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_25509,meta25508__$1){
var self__ = this;
var _25509__$1 = this;
return (new cljs.core.async.t25507(self__.fn_handler,self__.f,meta25508__$1));
});

cljs.core.async.t25507.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_25509){
var self__ = this;
var _25509__$1 = this;
return self__.meta25508;
});

cljs.core.async.t25507.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t25507.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
});

cljs.core.async.t25507.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.f;
});

cljs.core.async.t25507.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"fn-handler","fn-handler",648785851,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"private","private",-558947994),true,new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null)], null)))], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"meta25508","meta25508",-143373987,null)], null);
});

cljs.core.async.t25507.cljs$lang$type = true;

cljs.core.async.t25507.cljs$lang$ctorStr = "cljs.core.async/t25507";

cljs.core.async.t25507.cljs$lang$ctorPrWriter = (function (this__17082__auto__,writer__17083__auto__,opt__17084__auto__){
return cljs.core._write.call(null,writer__17083__auto__,"cljs.core.async/t25507");
});

cljs.core.async.__GT_t25507 = (function cljs$core$async$fn_handler_$___GT_t25507(fn_handler__$1,f__$1,meta25508){
return (new cljs.core.async.t25507(fn_handler__$1,f__$1,meta25508));
});

}

return (new cljs.core.async.t25507(cljs$core$async$fn_handler,f,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Returns a fixed buffer of size n. When full, puts will block/park.
 */
cljs.core.async.buffer = (function cljs$core$async$buffer(n){
return cljs.core.async.impl.buffers.fixed_buffer.call(null,n);
});
/**
 * Returns a buffer of size n. When full, puts will complete but
 * val will be dropped (no transfer).
 */
cljs.core.async.dropping_buffer = (function cljs$core$async$dropping_buffer(n){
return cljs.core.async.impl.buffers.dropping_buffer.call(null,n);
});
/**
 * Returns a buffer of size n. When full, puts will complete, and be
 * buffered, but oldest elements in buffer will be dropped (not
 * transferred).
 */
cljs.core.async.sliding_buffer = (function cljs$core$async$sliding_buffer(n){
return cljs.core.async.impl.buffers.sliding_buffer.call(null,n);
});
/**
 * Returns true if a channel created with buff will never block. That is to say,
 * puts into this buffer will never cause the buffer to be full.
 */
cljs.core.async.unblocking_buffer_QMARK_ = (function cljs$core$async$unblocking_buffer_QMARK_(buff){
if(!((buff == null))){
if((false) || (buff.cljs$core$async$impl$protocols$UnblockingBuffer$)){
return true;
} else {
if((!buff.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,buff);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,buff);
}
});
/**
 * Creates a channel with an optional buffer, an optional transducer (like (map f),
 * (filter p) etc or a composition thereof), and an optional exception handler.
 * If buf-or-n is a number, will create and use a fixed buffer of that size. If a
 * transducer is supplied a buffer must be specified. ex-handler must be a
 * fn of one argument - if an exception occurs during transformation it will be called
 * with the thrown value as an argument, and any non-nil return value will be placed
 * in the channel.
 */
cljs.core.async.chan = (function cljs$core$async$chan(){
var args25512 = [];
var len__17542__auto___25515 = arguments.length;
var i__17543__auto___25516 = (0);
while(true){
if((i__17543__auto___25516 < len__17542__auto___25515)){
args25512.push((arguments[i__17543__auto___25516]));

var G__25517 = (i__17543__auto___25516 + (1));
i__17543__auto___25516 = G__25517;
continue;
} else {
}
break;
}

var G__25514 = args25512.length;
switch (G__25514) {
case 0:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args25512.length)].join('')));

}
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.chan.call(null,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1 = (function (buf_or_n){
return cljs.core.async.chan.call(null,buf_or_n,null,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2 = (function (buf_or_n,xform){
return cljs.core.async.chan.call(null,buf_or_n,xform,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3 = (function (buf_or_n,xform,ex_handler){
var buf_or_n__$1 = ((cljs.core._EQ_.call(null,buf_or_n,(0)))?null:buf_or_n);
if(cljs.core.truth_(xform)){
if(cljs.core.truth_(buf_or_n__$1)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("buffer must be supplied when transducer is"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,new cljs.core.Symbol(null,"buf-or-n","buf-or-n",-1646815050,null)))].join('')));
}
} else {
}

return cljs.core.async.impl.channels.chan.call(null,((typeof buf_or_n__$1 === 'number')?cljs.core.async.buffer.call(null,buf_or_n__$1):buf_or_n__$1),xform,ex_handler);
});

cljs.core.async.chan.cljs$lang$maxFixedArity = 3;
/**
 * Returns a channel that will close after msecs
 */
cljs.core.async.timeout = (function cljs$core$async$timeout(msecs){
return cljs.core.async.impl.timers.timeout.call(null,msecs);
});
/**
 * takes a val from port. Must be called inside a (go ...) block. Will
 * return nil if closed. Will park if nothing is available.
 * Returns true unless port is already closed
 */
cljs.core.async._LT__BANG_ = (function cljs$core$async$_LT__BANG_(port){
throw (new Error("<! used not in (go ...) block"));
});
/**
 * Asynchronously takes a val from port, passing to fn1. Will pass nil
 * if closed. If on-caller? (default true) is true, and value is
 * immediately available, will call fn1 on calling thread.
 * Returns nil.
 */
cljs.core.async.take_BANG_ = (function cljs$core$async$take_BANG_(){
var args25519 = [];
var len__17542__auto___25522 = arguments.length;
var i__17543__auto___25523 = (0);
while(true){
if((i__17543__auto___25523 < len__17542__auto___25522)){
args25519.push((arguments[i__17543__auto___25523]));

var G__25524 = (i__17543__auto___25523 + (1));
i__17543__auto___25523 = G__25524;
continue;
} else {
}
break;
}

var G__25521 = args25519.length;
switch (G__25521) {
case 2:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args25519.length)].join('')));

}
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,fn1){
return cljs.core.async.take_BANG_.call(null,port,fn1,true);
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,fn1,on_caller_QMARK_){
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.fn_handler.call(null,fn1));
if(cljs.core.truth_(ret)){
var val_25526 = cljs.core.deref.call(null,ret);
if(cljs.core.truth_(on_caller_QMARK_)){
fn1.call(null,val_25526);
} else {
cljs.core.async.impl.dispatch.run.call(null,((function (val_25526,ret){
return (function (){
return fn1.call(null,val_25526);
});})(val_25526,ret))
);
}
} else {
}

return null;
});

cljs.core.async.take_BANG_.cljs$lang$maxFixedArity = 3;
cljs.core.async.nop = (function cljs$core$async$nop(_){
return null;
});
cljs.core.async.fhnop = cljs.core.async.fn_handler.call(null,cljs.core.async.nop);
/**
 * puts a val into port. nil values are not allowed. Must be called
 * inside a (go ...) block. Will park if no buffer space is available.
 * Returns true unless port is already closed.
 */
cljs.core.async._GT__BANG_ = (function cljs$core$async$_GT__BANG_(port,val){
throw (new Error(">! used not in (go ...) block"));
});
/**
 * Asynchronously puts a val into port, calling fn0 (if supplied) when
 * complete. nil values are not allowed. Will throw if closed. If
 * on-caller? (default true) is true, and the put is immediately
 * accepted, will call fn0 on calling thread.  Returns nil.
 */
cljs.core.async.put_BANG_ = (function cljs$core$async$put_BANG_(){
var args25527 = [];
var len__17542__auto___25530 = arguments.length;
var i__17543__auto___25531 = (0);
while(true){
if((i__17543__auto___25531 < len__17542__auto___25530)){
args25527.push((arguments[i__17543__auto___25531]));

var G__25532 = (i__17543__auto___25531 + (1));
i__17543__auto___25531 = G__25532;
continue;
} else {
}
break;
}

var G__25529 = args25527.length;
switch (G__25529) {
case 2:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args25527.length)].join('')));

}
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,val){
var temp__4423__auto__ = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fhnop);
if(cljs.core.truth_(temp__4423__auto__)){
var ret = temp__4423__auto__;
return cljs.core.deref.call(null,ret);
} else {
return true;
}
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,val,fn1){
return cljs.core.async.put_BANG_.call(null,port,val,fn1,true);
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (port,val,fn1,on_caller_QMARK_){
var temp__4423__auto__ = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fn_handler.call(null,fn1));
if(cljs.core.truth_(temp__4423__auto__)){
var retb = temp__4423__auto__;
var ret = cljs.core.deref.call(null,retb);
if(cljs.core.truth_(on_caller_QMARK_)){
fn1.call(null,ret);
} else {
cljs.core.async.impl.dispatch.run.call(null,((function (ret,retb,temp__4423__auto__){
return (function (){
return fn1.call(null,ret);
});})(ret,retb,temp__4423__auto__))
);
}

return ret;
} else {
return true;
}
});

cljs.core.async.put_BANG_.cljs$lang$maxFixedArity = 4;
cljs.core.async.close_BANG_ = (function cljs$core$async$close_BANG_(port){
return cljs.core.async.impl.protocols.close_BANG_.call(null,port);
});
cljs.core.async.random_array = (function cljs$core$async$random_array(n){
var a = (new Array(n));
var n__17387__auto___25534 = n;
var x_25535 = (0);
while(true){
if((x_25535 < n__17387__auto___25534)){
(a[x_25535] = (0));

var G__25536 = (x_25535 + (1));
x_25535 = G__25536;
continue;
} else {
}
break;
}

var i = (1);
while(true){
if(cljs.core._EQ_.call(null,i,n)){
return a;
} else {
var j = cljs.core.rand_int.call(null,i);
(a[i] = (a[j]));

(a[j] = i);

var G__25537 = (i + (1));
i = G__25537;
continue;
}
break;
}
});
cljs.core.async.alt_flag = (function cljs$core$async$alt_flag(){
var flag = cljs.core.atom.call(null,true);
if(typeof cljs.core.async.t25541 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t25541 = (function (alt_flag,flag,meta25542){
this.alt_flag = alt_flag;
this.flag = flag;
this.meta25542 = meta25542;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t25541.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (flag){
return (function (_25543,meta25542__$1){
var self__ = this;
var _25543__$1 = this;
return (new cljs.core.async.t25541(self__.alt_flag,self__.flag,meta25542__$1));
});})(flag))
;

cljs.core.async.t25541.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (flag){
return (function (_25543){
var self__ = this;
var _25543__$1 = this;
return self__.meta25542;
});})(flag))
;

cljs.core.async.t25541.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t25541.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.deref.call(null,self__.flag);
});})(flag))
;

cljs.core.async.t25541.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.flag,null);

return true;
});})(flag))
;

cljs.core.async.t25541.getBasis = ((function (flag){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"alt-flag","alt-flag",-1794972754,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"private","private",-558947994),true,new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(cljs.core.PersistentVector.EMPTY))], null)),new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"meta25542","meta25542",304588783,null)], null);
});})(flag))
;

cljs.core.async.t25541.cljs$lang$type = true;

cljs.core.async.t25541.cljs$lang$ctorStr = "cljs.core.async/t25541";

cljs.core.async.t25541.cljs$lang$ctorPrWriter = ((function (flag){
return (function (this__17082__auto__,writer__17083__auto__,opt__17084__auto__){
return cljs.core._write.call(null,writer__17083__auto__,"cljs.core.async/t25541");
});})(flag))
;

cljs.core.async.__GT_t25541 = ((function (flag){
return (function cljs$core$async$alt_flag_$___GT_t25541(alt_flag__$1,flag__$1,meta25542){
return (new cljs.core.async.t25541(alt_flag__$1,flag__$1,meta25542));
});})(flag))
;

}

return (new cljs.core.async.t25541(cljs$core$async$alt_flag,flag,cljs.core.PersistentArrayMap.EMPTY));
});
cljs.core.async.alt_handler = (function cljs$core$async$alt_handler(flag,cb){
if(typeof cljs.core.async.t25547 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t25547 = (function (alt_handler,flag,cb,meta25548){
this.alt_handler = alt_handler;
this.flag = flag;
this.cb = cb;
this.meta25548 = meta25548;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t25547.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_25549,meta25548__$1){
var self__ = this;
var _25549__$1 = this;
return (new cljs.core.async.t25547(self__.alt_handler,self__.flag,self__.cb,meta25548__$1));
});

cljs.core.async.t25547.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_25549){
var self__ = this;
var _25549__$1 = this;
return self__.meta25548;
});

cljs.core.async.t25547.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t25547.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.flag);
});

cljs.core.async.t25547.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.commit.call(null,self__.flag);

return self__.cb;
});

cljs.core.async.t25547.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"alt-handler","alt-handler",963786170,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"private","private",-558947994),true,new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null)], null)))], null)),new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null),new cljs.core.Symbol(null,"meta25548","meta25548",-675317736,null)], null);
});

cljs.core.async.t25547.cljs$lang$type = true;

cljs.core.async.t25547.cljs$lang$ctorStr = "cljs.core.async/t25547";

cljs.core.async.t25547.cljs$lang$ctorPrWriter = (function (this__17082__auto__,writer__17083__auto__,opt__17084__auto__){
return cljs.core._write.call(null,writer__17083__auto__,"cljs.core.async/t25547");
});

cljs.core.async.__GT_t25547 = (function cljs$core$async$alt_handler_$___GT_t25547(alt_handler__$1,flag__$1,cb__$1,meta25548){
return (new cljs.core.async.t25547(alt_handler__$1,flag__$1,cb__$1,meta25548));
});

}

return (new cljs.core.async.t25547(cljs$core$async$alt_handler,flag,cb,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * returns derefable [val port] if immediate, nil if enqueued
 */
cljs.core.async.do_alts = (function cljs$core$async$do_alts(fret,ports,opts){
var flag = cljs.core.async.alt_flag.call(null);
var n = cljs.core.count.call(null,ports);
var idxs = cljs.core.async.random_array.call(null,n);
var priority = new cljs.core.Keyword(null,"priority","priority",1431093715).cljs$core$IFn$_invoke$arity$1(opts);
var ret = (function (){var i = (0);
while(true){
if((i < n)){
var idx = (cljs.core.truth_(priority)?i:(idxs[i]));
var port = cljs.core.nth.call(null,ports,idx);
var wport = ((cljs.core.vector_QMARK_.call(null,port))?port.call(null,(0)):null);
var vbox = (cljs.core.truth_(wport)?(function (){var val = port.call(null,(1));
return cljs.core.async.impl.protocols.put_BANG_.call(null,wport,val,cljs.core.async.alt_handler.call(null,flag,((function (i,val,idx,port,wport,flag,n,idxs,priority){
return (function (p1__25550_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__25550_SHARP_,wport], null));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.alt_handler.call(null,flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__25551_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__25551_SHARP_,port], null));
});})(i,idx,port,wport,flag,n,idxs,priority))
)));
if(cljs.core.truth_(vbox)){
return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref.call(null,vbox),(function (){var or__16503__auto__ = wport;
if(cljs.core.truth_(or__16503__auto__)){
return or__16503__auto__;
} else {
return port;
}
})()], null));
} else {
var G__25552 = (i + (1));
i = G__25552;
continue;
}
} else {
return null;
}
break;
}
})();
var or__16503__auto__ = ret;
if(cljs.core.truth_(or__16503__auto__)){
return or__16503__auto__;
} else {
if(cljs.core.contains_QMARK_.call(null,opts,new cljs.core.Keyword(null,"default","default",-1987822328))){
var temp__4425__auto__ = (function (){var and__16491__auto__ = cljs.core.async.impl.protocols.active_QMARK_.call(null,flag);
if(cljs.core.truth_(and__16491__auto__)){
return cljs.core.async.impl.protocols.commit.call(null,flag);
} else {
return and__16491__auto__;
}
})();
if(cljs.core.truth_(temp__4425__auto__)){
var got = temp__4425__auto__;
return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"default","default",-1987822328).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"default","default",-1987822328)], null));
} else {
return null;
}
} else {
return null;
}
}
});
/**
 * Completes at most one of several channel operations. Must be called
 * inside a (go ...) block. ports is a vector of channel endpoints,
 * which can be either a channel to take from or a vector of
 * [channel-to-put-to val-to-put], in any combination. Takes will be
 * made as if by <!, and puts will be made as if by >!. Unless
 * the :priority option is true, if more than one port operation is
 * ready a non-deterministic choice will be made. If no operation is
 * ready and a :default value is supplied, [default-val :default] will
 * be returned, otherwise alts! will park until the first operation to
 * become ready completes. Returns [val port] of the completed
 * operation, where val is the value taken for takes, and a
 * boolean (true unless already closed, as per put!) for puts.
 * 
 * opts are passed as :key val ... Supported options:
 * 
 * :default val - the value to use if none of the operations are immediately ready
 * :priority true - (default nil) when true, the operations will be tried in order.
 * 
 * Note: there is no guarantee that the port exps or val exprs will be
 * used, nor in what order should they be, so they should not be
 * depended upon for side effects.
 */
cljs.core.async.alts_BANG_ = (function cljs$core$async$alts_BANG_(){
var args__17549__auto__ = [];
var len__17542__auto___25558 = arguments.length;
var i__17543__auto___25559 = (0);
while(true){
if((i__17543__auto___25559 < len__17542__auto___25558)){
args__17549__auto__.push((arguments[i__17543__auto___25559]));

var G__25560 = (i__17543__auto___25559 + (1));
i__17543__auto___25559 = G__25560;
continue;
} else {
}
break;
}

var argseq__17550__auto__ = ((((1) < args__17549__auto__.length))?(new cljs.core.IndexedSeq(args__17549__auto__.slice((1)),(0))):null);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__17550__auto__);
});

cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ports,p__25555){
var map__25556 = p__25555;
var map__25556__$1 = ((((!((map__25556 == null)))?((((map__25556.cljs$lang$protocol_mask$partition0$ & (64))) || (map__25556.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__25556):map__25556);
var opts = map__25556__$1;
throw (new Error("alts! used not in (go ...) block"));
});

cljs.core.async.alts_BANG_.cljs$lang$maxFixedArity = (1);

cljs.core.async.alts_BANG_.cljs$lang$applyTo = (function (seq25553){
var G__25554 = cljs.core.first.call(null,seq25553);
var seq25553__$1 = cljs.core.next.call(null,seq25553);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__25554,seq25553__$1);
});
/**
 * Takes elements from the from channel and supplies them to the to
 * channel. By default, the to channel will be closed when the from
 * channel closes, but can be determined by the close?  parameter. Will
 * stop consuming the from channel if the to channel closes
 */
cljs.core.async.pipe = (function cljs$core$async$pipe(){
var args25561 = [];
var len__17542__auto___25611 = arguments.length;
var i__17543__auto___25612 = (0);
while(true){
if((i__17543__auto___25612 < len__17542__auto___25611)){
args25561.push((arguments[i__17543__auto___25612]));

var G__25613 = (i__17543__auto___25612 + (1));
i__17543__auto___25612 = G__25613;
continue;
} else {
}
break;
}

var G__25563 = args25561.length;
switch (G__25563) {
case 2:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args25561.length)].join('')));

}
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2 = (function (from,to){
return cljs.core.async.pipe.call(null,from,to,true);
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3 = (function (from,to,close_QMARK_){
var c__19686__auto___25615 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19686__auto___25615){
return (function (){
var f__19687__auto__ = (function (){var switch__19621__auto__ = ((function (c__19686__auto___25615){
return (function (state_25587){
var state_val_25588 = (state_25587[(1)]);
if((state_val_25588 === (7))){
var inst_25583 = (state_25587[(2)]);
var state_25587__$1 = state_25587;
var statearr_25589_25616 = state_25587__$1;
(statearr_25589_25616[(2)] = inst_25583);

(statearr_25589_25616[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25588 === (1))){
var state_25587__$1 = state_25587;
var statearr_25590_25617 = state_25587__$1;
(statearr_25590_25617[(2)] = null);

(statearr_25590_25617[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25588 === (4))){
var inst_25566 = (state_25587[(7)]);
var inst_25566__$1 = (state_25587[(2)]);
var inst_25567 = (inst_25566__$1 == null);
var state_25587__$1 = (function (){var statearr_25591 = state_25587;
(statearr_25591[(7)] = inst_25566__$1);

return statearr_25591;
})();
if(cljs.core.truth_(inst_25567)){
var statearr_25592_25618 = state_25587__$1;
(statearr_25592_25618[(1)] = (5));

} else {
var statearr_25593_25619 = state_25587__$1;
(statearr_25593_25619[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25588 === (13))){
var state_25587__$1 = state_25587;
var statearr_25594_25620 = state_25587__$1;
(statearr_25594_25620[(2)] = null);

(statearr_25594_25620[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25588 === (6))){
var inst_25566 = (state_25587[(7)]);
var state_25587__$1 = state_25587;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_25587__$1,(11),to,inst_25566);
} else {
if((state_val_25588 === (3))){
var inst_25585 = (state_25587[(2)]);
var state_25587__$1 = state_25587;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25587__$1,inst_25585);
} else {
if((state_val_25588 === (12))){
var state_25587__$1 = state_25587;
var statearr_25595_25621 = state_25587__$1;
(statearr_25595_25621[(2)] = null);

(statearr_25595_25621[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25588 === (2))){
var state_25587__$1 = state_25587;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25587__$1,(4),from);
} else {
if((state_val_25588 === (11))){
var inst_25576 = (state_25587[(2)]);
var state_25587__$1 = state_25587;
if(cljs.core.truth_(inst_25576)){
var statearr_25596_25622 = state_25587__$1;
(statearr_25596_25622[(1)] = (12));

} else {
var statearr_25597_25623 = state_25587__$1;
(statearr_25597_25623[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25588 === (9))){
var state_25587__$1 = state_25587;
var statearr_25598_25624 = state_25587__$1;
(statearr_25598_25624[(2)] = null);

(statearr_25598_25624[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25588 === (5))){
var state_25587__$1 = state_25587;
if(cljs.core.truth_(close_QMARK_)){
var statearr_25599_25625 = state_25587__$1;
(statearr_25599_25625[(1)] = (8));

} else {
var statearr_25600_25626 = state_25587__$1;
(statearr_25600_25626[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25588 === (14))){
var inst_25581 = (state_25587[(2)]);
var state_25587__$1 = state_25587;
var statearr_25601_25627 = state_25587__$1;
(statearr_25601_25627[(2)] = inst_25581);

(statearr_25601_25627[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25588 === (10))){
var inst_25573 = (state_25587[(2)]);
var state_25587__$1 = state_25587;
var statearr_25602_25628 = state_25587__$1;
(statearr_25602_25628[(2)] = inst_25573);

(statearr_25602_25628[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25588 === (8))){
var inst_25570 = cljs.core.async.close_BANG_.call(null,to);
var state_25587__$1 = state_25587;
var statearr_25603_25629 = state_25587__$1;
(statearr_25603_25629[(2)] = inst_25570);

(statearr_25603_25629[(1)] = (10));


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
});})(c__19686__auto___25615))
;
return ((function (switch__19621__auto__,c__19686__auto___25615){
return (function() {
var cljs$core$async$state_machine__19622__auto__ = null;
var cljs$core$async$state_machine__19622__auto____0 = (function (){
var statearr_25607 = [null,null,null,null,null,null,null,null];
(statearr_25607[(0)] = cljs$core$async$state_machine__19622__auto__);

(statearr_25607[(1)] = (1));

return statearr_25607;
});
var cljs$core$async$state_machine__19622__auto____1 = (function (state_25587){
while(true){
var ret_value__19623__auto__ = (function (){try{while(true){
var result__19624__auto__ = switch__19621__auto__.call(null,state_25587);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19624__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19624__auto__;
}
break;
}
}catch (e25608){if((e25608 instanceof Object)){
var ex__19625__auto__ = e25608;
var statearr_25609_25630 = state_25587;
(statearr_25609_25630[(5)] = ex__19625__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25587);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e25608;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19623__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__25631 = state_25587;
state_25587 = G__25631;
continue;
} else {
return ret_value__19623__auto__;
}
break;
}
});
cljs$core$async$state_machine__19622__auto__ = function(state_25587){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__19622__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__19622__auto____1.call(this,state_25587);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__19622__auto____0;
cljs$core$async$state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__19622__auto____1;
return cljs$core$async$state_machine__19622__auto__;
})()
;})(switch__19621__auto__,c__19686__auto___25615))
})();
var state__19688__auto__ = (function (){var statearr_25610 = f__19687__auto__.call(null);
(statearr_25610[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19686__auto___25615);

return statearr_25610;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19688__auto__);
});})(c__19686__auto___25615))
);


return to;
});

cljs.core.async.pipe.cljs$lang$maxFixedArity = 3;
cljs.core.async.pipeline_STAR_ = (function cljs$core$async$pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,type){
if((n > (0))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"pos?","pos?",-244377722,null),new cljs.core.Symbol(null,"n","n",-2092305744,null))))].join('')));
}

var jobs = cljs.core.async.chan.call(null,n);
var results = cljs.core.async.chan.call(null,n);
var process = ((function (jobs,results){
return (function (p__25815){
var vec__25816 = p__25815;
var v = cljs.core.nth.call(null,vec__25816,(0),null);
var p = cljs.core.nth.call(null,vec__25816,(1),null);
var job = vec__25816;
if((job == null)){
cljs.core.async.close_BANG_.call(null,results);

return null;
} else {
var res = cljs.core.async.chan.call(null,(1),xf,ex_handler);
var c__19686__auto___25998 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19686__auto___25998,res,vec__25816,v,p,job,jobs,results){
return (function (){
var f__19687__auto__ = (function (){var switch__19621__auto__ = ((function (c__19686__auto___25998,res,vec__25816,v,p,job,jobs,results){
return (function (state_25821){
var state_val_25822 = (state_25821[(1)]);
if((state_val_25822 === (1))){
var state_25821__$1 = state_25821;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_25821__$1,(2),res,v);
} else {
if((state_val_25822 === (2))){
var inst_25818 = (state_25821[(2)]);
var inst_25819 = cljs.core.async.close_BANG_.call(null,res);
var state_25821__$1 = (function (){var statearr_25823 = state_25821;
(statearr_25823[(7)] = inst_25818);

return statearr_25823;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25821__$1,inst_25819);
} else {
return null;
}
}
});})(c__19686__auto___25998,res,vec__25816,v,p,job,jobs,results))
;
return ((function (switch__19621__auto__,c__19686__auto___25998,res,vec__25816,v,p,job,jobs,results){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__19622__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__19622__auto____0 = (function (){
var statearr_25827 = [null,null,null,null,null,null,null,null];
(statearr_25827[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__19622__auto__);

(statearr_25827[(1)] = (1));

return statearr_25827;
});
var cljs$core$async$pipeline_STAR__$_state_machine__19622__auto____1 = (function (state_25821){
while(true){
var ret_value__19623__auto__ = (function (){try{while(true){
var result__19624__auto__ = switch__19621__auto__.call(null,state_25821);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19624__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19624__auto__;
}
break;
}
}catch (e25828){if((e25828 instanceof Object)){
var ex__19625__auto__ = e25828;
var statearr_25829_25999 = state_25821;
(statearr_25829_25999[(5)] = ex__19625__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25821);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e25828;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19623__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26000 = state_25821;
state_25821 = G__26000;
continue;
} else {
return ret_value__19623__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__19622__auto__ = function(state_25821){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__19622__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__19622__auto____1.call(this,state_25821);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__19622__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__19622__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__19622__auto__;
})()
;})(switch__19621__auto__,c__19686__auto___25998,res,vec__25816,v,p,job,jobs,results))
})();
var state__19688__auto__ = (function (){var statearr_25830 = f__19687__auto__.call(null);
(statearr_25830[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19686__auto___25998);

return statearr_25830;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19688__auto__);
});})(c__19686__auto___25998,res,vec__25816,v,p,job,jobs,results))
);


cljs.core.async.put_BANG_.call(null,p,res);

return true;
}
});})(jobs,results))
;
var async = ((function (jobs,results,process){
return (function (p__25831){
var vec__25832 = p__25831;
var v = cljs.core.nth.call(null,vec__25832,(0),null);
var p = cljs.core.nth.call(null,vec__25832,(1),null);
var job = vec__25832;
if((job == null)){
cljs.core.async.close_BANG_.call(null,results);

return null;
} else {
var res = cljs.core.async.chan.call(null,(1));
xf.call(null,v,res);

cljs.core.async.put_BANG_.call(null,p,res);

return true;
}
});})(jobs,results,process))
;
var n__17387__auto___26001 = n;
var __26002 = (0);
while(true){
if((__26002 < n__17387__auto___26001)){
var G__25833_26003 = (((type instanceof cljs.core.Keyword))?type.fqn:null);
switch (G__25833_26003) {
case "compute":
var c__19686__auto___26005 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__26002,c__19686__auto___26005,G__25833_26003,n__17387__auto___26001,jobs,results,process,async){
return (function (){
var f__19687__auto__ = (function (){var switch__19621__auto__ = ((function (__26002,c__19686__auto___26005,G__25833_26003,n__17387__auto___26001,jobs,results,process,async){
return (function (state_25846){
var state_val_25847 = (state_25846[(1)]);
if((state_val_25847 === (1))){
var state_25846__$1 = state_25846;
var statearr_25848_26006 = state_25846__$1;
(statearr_25848_26006[(2)] = null);

(statearr_25848_26006[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25847 === (2))){
var state_25846__$1 = state_25846;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25846__$1,(4),jobs);
} else {
if((state_val_25847 === (3))){
var inst_25844 = (state_25846[(2)]);
var state_25846__$1 = state_25846;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25846__$1,inst_25844);
} else {
if((state_val_25847 === (4))){
var inst_25836 = (state_25846[(2)]);
var inst_25837 = process.call(null,inst_25836);
var state_25846__$1 = state_25846;
if(cljs.core.truth_(inst_25837)){
var statearr_25849_26007 = state_25846__$1;
(statearr_25849_26007[(1)] = (5));

} else {
var statearr_25850_26008 = state_25846__$1;
(statearr_25850_26008[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25847 === (5))){
var state_25846__$1 = state_25846;
var statearr_25851_26009 = state_25846__$1;
(statearr_25851_26009[(2)] = null);

(statearr_25851_26009[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25847 === (6))){
var state_25846__$1 = state_25846;
var statearr_25852_26010 = state_25846__$1;
(statearr_25852_26010[(2)] = null);

(statearr_25852_26010[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25847 === (7))){
var inst_25842 = (state_25846[(2)]);
var state_25846__$1 = state_25846;
var statearr_25853_26011 = state_25846__$1;
(statearr_25853_26011[(2)] = inst_25842);

(statearr_25853_26011[(1)] = (3));


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
});})(__26002,c__19686__auto___26005,G__25833_26003,n__17387__auto___26001,jobs,results,process,async))
;
return ((function (__26002,switch__19621__auto__,c__19686__auto___26005,G__25833_26003,n__17387__auto___26001,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__19622__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__19622__auto____0 = (function (){
var statearr_25857 = [null,null,null,null,null,null,null];
(statearr_25857[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__19622__auto__);

(statearr_25857[(1)] = (1));

return statearr_25857;
});
var cljs$core$async$pipeline_STAR__$_state_machine__19622__auto____1 = (function (state_25846){
while(true){
var ret_value__19623__auto__ = (function (){try{while(true){
var result__19624__auto__ = switch__19621__auto__.call(null,state_25846);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19624__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19624__auto__;
}
break;
}
}catch (e25858){if((e25858 instanceof Object)){
var ex__19625__auto__ = e25858;
var statearr_25859_26012 = state_25846;
(statearr_25859_26012[(5)] = ex__19625__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25846);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e25858;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19623__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26013 = state_25846;
state_25846 = G__26013;
continue;
} else {
return ret_value__19623__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__19622__auto__ = function(state_25846){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__19622__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__19622__auto____1.call(this,state_25846);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__19622__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__19622__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__19622__auto__;
})()
;})(__26002,switch__19621__auto__,c__19686__auto___26005,G__25833_26003,n__17387__auto___26001,jobs,results,process,async))
})();
var state__19688__auto__ = (function (){var statearr_25860 = f__19687__auto__.call(null);
(statearr_25860[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19686__auto___26005);

return statearr_25860;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19688__auto__);
});})(__26002,c__19686__auto___26005,G__25833_26003,n__17387__auto___26001,jobs,results,process,async))
);


break;
case "async":
var c__19686__auto___26014 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__26002,c__19686__auto___26014,G__25833_26003,n__17387__auto___26001,jobs,results,process,async){
return (function (){
var f__19687__auto__ = (function (){var switch__19621__auto__ = ((function (__26002,c__19686__auto___26014,G__25833_26003,n__17387__auto___26001,jobs,results,process,async){
return (function (state_25873){
var state_val_25874 = (state_25873[(1)]);
if((state_val_25874 === (1))){
var state_25873__$1 = state_25873;
var statearr_25875_26015 = state_25873__$1;
(statearr_25875_26015[(2)] = null);

(statearr_25875_26015[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25874 === (2))){
var state_25873__$1 = state_25873;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25873__$1,(4),jobs);
} else {
if((state_val_25874 === (3))){
var inst_25871 = (state_25873[(2)]);
var state_25873__$1 = state_25873;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25873__$1,inst_25871);
} else {
if((state_val_25874 === (4))){
var inst_25863 = (state_25873[(2)]);
var inst_25864 = async.call(null,inst_25863);
var state_25873__$1 = state_25873;
if(cljs.core.truth_(inst_25864)){
var statearr_25876_26016 = state_25873__$1;
(statearr_25876_26016[(1)] = (5));

} else {
var statearr_25877_26017 = state_25873__$1;
(statearr_25877_26017[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25874 === (5))){
var state_25873__$1 = state_25873;
var statearr_25878_26018 = state_25873__$1;
(statearr_25878_26018[(2)] = null);

(statearr_25878_26018[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25874 === (6))){
var state_25873__$1 = state_25873;
var statearr_25879_26019 = state_25873__$1;
(statearr_25879_26019[(2)] = null);

(statearr_25879_26019[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25874 === (7))){
var inst_25869 = (state_25873[(2)]);
var state_25873__$1 = state_25873;
var statearr_25880_26020 = state_25873__$1;
(statearr_25880_26020[(2)] = inst_25869);

(statearr_25880_26020[(1)] = (3));


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
});})(__26002,c__19686__auto___26014,G__25833_26003,n__17387__auto___26001,jobs,results,process,async))
;
return ((function (__26002,switch__19621__auto__,c__19686__auto___26014,G__25833_26003,n__17387__auto___26001,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__19622__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__19622__auto____0 = (function (){
var statearr_25884 = [null,null,null,null,null,null,null];
(statearr_25884[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__19622__auto__);

(statearr_25884[(1)] = (1));

return statearr_25884;
});
var cljs$core$async$pipeline_STAR__$_state_machine__19622__auto____1 = (function (state_25873){
while(true){
var ret_value__19623__auto__ = (function (){try{while(true){
var result__19624__auto__ = switch__19621__auto__.call(null,state_25873);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19624__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19624__auto__;
}
break;
}
}catch (e25885){if((e25885 instanceof Object)){
var ex__19625__auto__ = e25885;
var statearr_25886_26021 = state_25873;
(statearr_25886_26021[(5)] = ex__19625__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25873);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e25885;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19623__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26022 = state_25873;
state_25873 = G__26022;
continue;
} else {
return ret_value__19623__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__19622__auto__ = function(state_25873){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__19622__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__19622__auto____1.call(this,state_25873);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__19622__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__19622__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__19622__auto__;
})()
;})(__26002,switch__19621__auto__,c__19686__auto___26014,G__25833_26003,n__17387__auto___26001,jobs,results,process,async))
})();
var state__19688__auto__ = (function (){var statearr_25887 = f__19687__auto__.call(null);
(statearr_25887[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19686__auto___26014);

return statearr_25887;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19688__auto__);
});})(__26002,c__19686__auto___26014,G__25833_26003,n__17387__auto___26001,jobs,results,process,async))
);


break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(type)].join('')));

}

var G__26023 = (__26002 + (1));
__26002 = G__26023;
continue;
} else {
}
break;
}

var c__19686__auto___26024 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19686__auto___26024,jobs,results,process,async){
return (function (){
var f__19687__auto__ = (function (){var switch__19621__auto__ = ((function (c__19686__auto___26024,jobs,results,process,async){
return (function (state_25909){
var state_val_25910 = (state_25909[(1)]);
if((state_val_25910 === (1))){
var state_25909__$1 = state_25909;
var statearr_25911_26025 = state_25909__$1;
(statearr_25911_26025[(2)] = null);

(statearr_25911_26025[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25910 === (2))){
var state_25909__$1 = state_25909;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25909__$1,(4),from);
} else {
if((state_val_25910 === (3))){
var inst_25907 = (state_25909[(2)]);
var state_25909__$1 = state_25909;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25909__$1,inst_25907);
} else {
if((state_val_25910 === (4))){
var inst_25890 = (state_25909[(7)]);
var inst_25890__$1 = (state_25909[(2)]);
var inst_25891 = (inst_25890__$1 == null);
var state_25909__$1 = (function (){var statearr_25912 = state_25909;
(statearr_25912[(7)] = inst_25890__$1);

return statearr_25912;
})();
if(cljs.core.truth_(inst_25891)){
var statearr_25913_26026 = state_25909__$1;
(statearr_25913_26026[(1)] = (5));

} else {
var statearr_25914_26027 = state_25909__$1;
(statearr_25914_26027[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25910 === (5))){
var inst_25893 = cljs.core.async.close_BANG_.call(null,jobs);
var state_25909__$1 = state_25909;
var statearr_25915_26028 = state_25909__$1;
(statearr_25915_26028[(2)] = inst_25893);

(statearr_25915_26028[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25910 === (6))){
var inst_25890 = (state_25909[(7)]);
var inst_25895 = (state_25909[(8)]);
var inst_25895__$1 = cljs.core.async.chan.call(null,(1));
var inst_25896 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_25897 = [inst_25890,inst_25895__$1];
var inst_25898 = (new cljs.core.PersistentVector(null,2,(5),inst_25896,inst_25897,null));
var state_25909__$1 = (function (){var statearr_25916 = state_25909;
(statearr_25916[(8)] = inst_25895__$1);

return statearr_25916;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_25909__$1,(8),jobs,inst_25898);
} else {
if((state_val_25910 === (7))){
var inst_25905 = (state_25909[(2)]);
var state_25909__$1 = state_25909;
var statearr_25917_26029 = state_25909__$1;
(statearr_25917_26029[(2)] = inst_25905);

(statearr_25917_26029[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25910 === (8))){
var inst_25895 = (state_25909[(8)]);
var inst_25900 = (state_25909[(2)]);
var state_25909__$1 = (function (){var statearr_25918 = state_25909;
(statearr_25918[(9)] = inst_25900);

return statearr_25918;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_25909__$1,(9),results,inst_25895);
} else {
if((state_val_25910 === (9))){
var inst_25902 = (state_25909[(2)]);
var state_25909__$1 = (function (){var statearr_25919 = state_25909;
(statearr_25919[(10)] = inst_25902);

return statearr_25919;
})();
var statearr_25920_26030 = state_25909__$1;
(statearr_25920_26030[(2)] = null);

(statearr_25920_26030[(1)] = (2));


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
});})(c__19686__auto___26024,jobs,results,process,async))
;
return ((function (switch__19621__auto__,c__19686__auto___26024,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__19622__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__19622__auto____0 = (function (){
var statearr_25924 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_25924[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__19622__auto__);

(statearr_25924[(1)] = (1));

return statearr_25924;
});
var cljs$core$async$pipeline_STAR__$_state_machine__19622__auto____1 = (function (state_25909){
while(true){
var ret_value__19623__auto__ = (function (){try{while(true){
var result__19624__auto__ = switch__19621__auto__.call(null,state_25909);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19624__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19624__auto__;
}
break;
}
}catch (e25925){if((e25925 instanceof Object)){
var ex__19625__auto__ = e25925;
var statearr_25926_26031 = state_25909;
(statearr_25926_26031[(5)] = ex__19625__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25909);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e25925;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19623__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26032 = state_25909;
state_25909 = G__26032;
continue;
} else {
return ret_value__19623__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__19622__auto__ = function(state_25909){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__19622__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__19622__auto____1.call(this,state_25909);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__19622__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__19622__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__19622__auto__;
})()
;})(switch__19621__auto__,c__19686__auto___26024,jobs,results,process,async))
})();
var state__19688__auto__ = (function (){var statearr_25927 = f__19687__auto__.call(null);
(statearr_25927[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19686__auto___26024);

return statearr_25927;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19688__auto__);
});})(c__19686__auto___26024,jobs,results,process,async))
);


var c__19686__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19686__auto__,jobs,results,process,async){
return (function (){
var f__19687__auto__ = (function (){var switch__19621__auto__ = ((function (c__19686__auto__,jobs,results,process,async){
return (function (state_25965){
var state_val_25966 = (state_25965[(1)]);
if((state_val_25966 === (7))){
var inst_25961 = (state_25965[(2)]);
var state_25965__$1 = state_25965;
var statearr_25967_26033 = state_25965__$1;
(statearr_25967_26033[(2)] = inst_25961);

(statearr_25967_26033[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25966 === (20))){
var state_25965__$1 = state_25965;
var statearr_25968_26034 = state_25965__$1;
(statearr_25968_26034[(2)] = null);

(statearr_25968_26034[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25966 === (1))){
var state_25965__$1 = state_25965;
var statearr_25969_26035 = state_25965__$1;
(statearr_25969_26035[(2)] = null);

(statearr_25969_26035[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25966 === (4))){
var inst_25930 = (state_25965[(7)]);
var inst_25930__$1 = (state_25965[(2)]);
var inst_25931 = (inst_25930__$1 == null);
var state_25965__$1 = (function (){var statearr_25970 = state_25965;
(statearr_25970[(7)] = inst_25930__$1);

return statearr_25970;
})();
if(cljs.core.truth_(inst_25931)){
var statearr_25971_26036 = state_25965__$1;
(statearr_25971_26036[(1)] = (5));

} else {
var statearr_25972_26037 = state_25965__$1;
(statearr_25972_26037[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25966 === (15))){
var inst_25943 = (state_25965[(8)]);
var state_25965__$1 = state_25965;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_25965__$1,(18),to,inst_25943);
} else {
if((state_val_25966 === (21))){
var inst_25956 = (state_25965[(2)]);
var state_25965__$1 = state_25965;
var statearr_25973_26038 = state_25965__$1;
(statearr_25973_26038[(2)] = inst_25956);

(statearr_25973_26038[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25966 === (13))){
var inst_25958 = (state_25965[(2)]);
var state_25965__$1 = (function (){var statearr_25974 = state_25965;
(statearr_25974[(9)] = inst_25958);

return statearr_25974;
})();
var statearr_25975_26039 = state_25965__$1;
(statearr_25975_26039[(2)] = null);

(statearr_25975_26039[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25966 === (6))){
var inst_25930 = (state_25965[(7)]);
var state_25965__$1 = state_25965;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25965__$1,(11),inst_25930);
} else {
if((state_val_25966 === (17))){
var inst_25951 = (state_25965[(2)]);
var state_25965__$1 = state_25965;
if(cljs.core.truth_(inst_25951)){
var statearr_25976_26040 = state_25965__$1;
(statearr_25976_26040[(1)] = (19));

} else {
var statearr_25977_26041 = state_25965__$1;
(statearr_25977_26041[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25966 === (3))){
var inst_25963 = (state_25965[(2)]);
var state_25965__$1 = state_25965;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_25965__$1,inst_25963);
} else {
if((state_val_25966 === (12))){
var inst_25940 = (state_25965[(10)]);
var state_25965__$1 = state_25965;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25965__$1,(14),inst_25940);
} else {
if((state_val_25966 === (2))){
var state_25965__$1 = state_25965;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_25965__$1,(4),results);
} else {
if((state_val_25966 === (19))){
var state_25965__$1 = state_25965;
var statearr_25978_26042 = state_25965__$1;
(statearr_25978_26042[(2)] = null);

(statearr_25978_26042[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25966 === (11))){
var inst_25940 = (state_25965[(2)]);
var state_25965__$1 = (function (){var statearr_25979 = state_25965;
(statearr_25979[(10)] = inst_25940);

return statearr_25979;
})();
var statearr_25980_26043 = state_25965__$1;
(statearr_25980_26043[(2)] = null);

(statearr_25980_26043[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25966 === (9))){
var state_25965__$1 = state_25965;
var statearr_25981_26044 = state_25965__$1;
(statearr_25981_26044[(2)] = null);

(statearr_25981_26044[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25966 === (5))){
var state_25965__$1 = state_25965;
if(cljs.core.truth_(close_QMARK_)){
var statearr_25982_26045 = state_25965__$1;
(statearr_25982_26045[(1)] = (8));

} else {
var statearr_25983_26046 = state_25965__$1;
(statearr_25983_26046[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25966 === (14))){
var inst_25943 = (state_25965[(8)]);
var inst_25945 = (state_25965[(11)]);
var inst_25943__$1 = (state_25965[(2)]);
var inst_25944 = (inst_25943__$1 == null);
var inst_25945__$1 = cljs.core.not.call(null,inst_25944);
var state_25965__$1 = (function (){var statearr_25984 = state_25965;
(statearr_25984[(8)] = inst_25943__$1);

(statearr_25984[(11)] = inst_25945__$1);

return statearr_25984;
})();
if(inst_25945__$1){
var statearr_25985_26047 = state_25965__$1;
(statearr_25985_26047[(1)] = (15));

} else {
var statearr_25986_26048 = state_25965__$1;
(statearr_25986_26048[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25966 === (16))){
var inst_25945 = (state_25965[(11)]);
var state_25965__$1 = state_25965;
var statearr_25987_26049 = state_25965__$1;
(statearr_25987_26049[(2)] = inst_25945);

(statearr_25987_26049[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25966 === (10))){
var inst_25937 = (state_25965[(2)]);
var state_25965__$1 = state_25965;
var statearr_25988_26050 = state_25965__$1;
(statearr_25988_26050[(2)] = inst_25937);

(statearr_25988_26050[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25966 === (18))){
var inst_25948 = (state_25965[(2)]);
var state_25965__$1 = state_25965;
var statearr_25989_26051 = state_25965__$1;
(statearr_25989_26051[(2)] = inst_25948);

(statearr_25989_26051[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_25966 === (8))){
var inst_25934 = cljs.core.async.close_BANG_.call(null,to);
var state_25965__$1 = state_25965;
var statearr_25990_26052 = state_25965__$1;
(statearr_25990_26052[(2)] = inst_25934);

(statearr_25990_26052[(1)] = (10));


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
});})(c__19686__auto__,jobs,results,process,async))
;
return ((function (switch__19621__auto__,c__19686__auto__,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__19622__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__19622__auto____0 = (function (){
var statearr_25994 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_25994[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__19622__auto__);

(statearr_25994[(1)] = (1));

return statearr_25994;
});
var cljs$core$async$pipeline_STAR__$_state_machine__19622__auto____1 = (function (state_25965){
while(true){
var ret_value__19623__auto__ = (function (){try{while(true){
var result__19624__auto__ = switch__19621__auto__.call(null,state_25965);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19624__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19624__auto__;
}
break;
}
}catch (e25995){if((e25995 instanceof Object)){
var ex__19625__auto__ = e25995;
var statearr_25996_26053 = state_25965;
(statearr_25996_26053[(5)] = ex__19625__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_25965);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e25995;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19623__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26054 = state_25965;
state_25965 = G__26054;
continue;
} else {
return ret_value__19623__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__19622__auto__ = function(state_25965){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__19622__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__19622__auto____1.call(this,state_25965);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__19622__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__19622__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__19622__auto__;
})()
;})(switch__19621__auto__,c__19686__auto__,jobs,results,process,async))
})();
var state__19688__auto__ = (function (){var statearr_25997 = f__19687__auto__.call(null);
(statearr_25997[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19686__auto__);

return statearr_25997;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19688__auto__);
});})(c__19686__auto__,jobs,results,process,async))
);

return c__19686__auto__;
});
/**
 * Takes elements from the from channel and supplies them to the to
 * channel, subject to the async function af, with parallelism n. af
 * must be a function of two arguments, the first an input value and
 * the second a channel on which to place the result(s). af must close!
 * the channel before returning.  The presumption is that af will
 * return immediately, having launched some asynchronous operation
 * whose completion/callback will manipulate the result channel. Outputs
 * will be returned in order relative to  the inputs. By default, the to
 * channel will be closed when the from channel closes, but can be
 * determined by the close?  parameter. Will stop consuming the from
 * channel if the to channel closes.
 */
cljs.core.async.pipeline_async = (function cljs$core$async$pipeline_async(){
var args26055 = [];
var len__17542__auto___26058 = arguments.length;
var i__17543__auto___26059 = (0);
while(true){
if((i__17543__auto___26059 < len__17542__auto___26058)){
args26055.push((arguments[i__17543__auto___26059]));

var G__26060 = (i__17543__auto___26059 + (1));
i__17543__auto___26059 = G__26060;
continue;
} else {
}
break;
}

var G__26057 = args26055.length;
switch (G__26057) {
case 4:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26055.length)].join('')));

}
});

cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4 = (function (n,to,af,from){
return cljs.core.async.pipeline_async.call(null,n,to,af,from,true);
});

cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5 = (function (n,to,af,from,close_QMARK_){
return cljs.core.async.pipeline_STAR_.call(null,n,to,af,from,close_QMARK_,null,new cljs.core.Keyword(null,"async","async",1050769601));
});

cljs.core.async.pipeline_async.cljs$lang$maxFixedArity = 5;
/**
 * Takes elements from the from channel and supplies them to the to
 * channel, subject to the transducer xf, with parallelism n. Because
 * it is parallel, the transducer will be applied independently to each
 * element, not across elements, and may produce zero or more outputs
 * per input.  Outputs will be returned in order relative to the
 * inputs. By default, the to channel will be closed when the from
 * channel closes, but can be determined by the close?  parameter. Will
 * stop consuming the from channel if the to channel closes.
 * 
 * Note this is supplied for API compatibility with the Clojure version.
 * Values of N > 1 will not result in actual concurrency in a
 * single-threaded runtime.
 */
cljs.core.async.pipeline = (function cljs$core$async$pipeline(){
var args26062 = [];
var len__17542__auto___26065 = arguments.length;
var i__17543__auto___26066 = (0);
while(true){
if((i__17543__auto___26066 < len__17542__auto___26065)){
args26062.push((arguments[i__17543__auto___26066]));

var G__26067 = (i__17543__auto___26066 + (1));
i__17543__auto___26066 = G__26067;
continue;
} else {
}
break;
}

var G__26064 = args26062.length;
switch (G__26064) {
case 4:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26062.length)].join('')));

}
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4 = (function (n,to,xf,from){
return cljs.core.async.pipeline.call(null,n,to,xf,from,true);
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5 = (function (n,to,xf,from,close_QMARK_){
return cljs.core.async.pipeline.call(null,n,to,xf,from,close_QMARK_,null);
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6 = (function (n,to,xf,from,close_QMARK_,ex_handler){
return cljs.core.async.pipeline_STAR_.call(null,n,to,xf,from,close_QMARK_,ex_handler,new cljs.core.Keyword(null,"compute","compute",1555393130));
});

cljs.core.async.pipeline.cljs$lang$maxFixedArity = 6;
/**
 * Takes a predicate and a source channel and returns a vector of two
 * channels, the first of which will contain the values for which the
 * predicate returned true, the second those for which it returned
 * false.
 * 
 * The out channels will be unbuffered by default, or two buf-or-ns can
 * be supplied. The channels will close after the source channel has
 * closed.
 */
cljs.core.async.split = (function cljs$core$async$split(){
var args26069 = [];
var len__17542__auto___26122 = arguments.length;
var i__17543__auto___26123 = (0);
while(true){
if((i__17543__auto___26123 < len__17542__auto___26122)){
args26069.push((arguments[i__17543__auto___26123]));

var G__26124 = (i__17543__auto___26123 + (1));
i__17543__auto___26123 = G__26124;
continue;
} else {
}
break;
}

var G__26071 = args26069.length;
switch (G__26071) {
case 2:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26069.length)].join('')));

}
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.split.call(null,p,ch,null,null);
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$4 = (function (p,ch,t_buf_or_n,f_buf_or_n){
var tc = cljs.core.async.chan.call(null,t_buf_or_n);
var fc = cljs.core.async.chan.call(null,f_buf_or_n);
var c__19686__auto___26126 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19686__auto___26126,tc,fc){
return (function (){
var f__19687__auto__ = (function (){var switch__19621__auto__ = ((function (c__19686__auto___26126,tc,fc){
return (function (state_26097){
var state_val_26098 = (state_26097[(1)]);
if((state_val_26098 === (7))){
var inst_26093 = (state_26097[(2)]);
var state_26097__$1 = state_26097;
var statearr_26099_26127 = state_26097__$1;
(statearr_26099_26127[(2)] = inst_26093);

(statearr_26099_26127[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26098 === (1))){
var state_26097__$1 = state_26097;
var statearr_26100_26128 = state_26097__$1;
(statearr_26100_26128[(2)] = null);

(statearr_26100_26128[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26098 === (4))){
var inst_26074 = (state_26097[(7)]);
var inst_26074__$1 = (state_26097[(2)]);
var inst_26075 = (inst_26074__$1 == null);
var state_26097__$1 = (function (){var statearr_26101 = state_26097;
(statearr_26101[(7)] = inst_26074__$1);

return statearr_26101;
})();
if(cljs.core.truth_(inst_26075)){
var statearr_26102_26129 = state_26097__$1;
(statearr_26102_26129[(1)] = (5));

} else {
var statearr_26103_26130 = state_26097__$1;
(statearr_26103_26130[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26098 === (13))){
var state_26097__$1 = state_26097;
var statearr_26104_26131 = state_26097__$1;
(statearr_26104_26131[(2)] = null);

(statearr_26104_26131[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26098 === (6))){
var inst_26074 = (state_26097[(7)]);
var inst_26080 = p.call(null,inst_26074);
var state_26097__$1 = state_26097;
if(cljs.core.truth_(inst_26080)){
var statearr_26105_26132 = state_26097__$1;
(statearr_26105_26132[(1)] = (9));

} else {
var statearr_26106_26133 = state_26097__$1;
(statearr_26106_26133[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26098 === (3))){
var inst_26095 = (state_26097[(2)]);
var state_26097__$1 = state_26097;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26097__$1,inst_26095);
} else {
if((state_val_26098 === (12))){
var state_26097__$1 = state_26097;
var statearr_26107_26134 = state_26097__$1;
(statearr_26107_26134[(2)] = null);

(statearr_26107_26134[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26098 === (2))){
var state_26097__$1 = state_26097;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26097__$1,(4),ch);
} else {
if((state_val_26098 === (11))){
var inst_26074 = (state_26097[(7)]);
var inst_26084 = (state_26097[(2)]);
var state_26097__$1 = state_26097;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26097__$1,(8),inst_26084,inst_26074);
} else {
if((state_val_26098 === (9))){
var state_26097__$1 = state_26097;
var statearr_26108_26135 = state_26097__$1;
(statearr_26108_26135[(2)] = tc);

(statearr_26108_26135[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26098 === (5))){
var inst_26077 = cljs.core.async.close_BANG_.call(null,tc);
var inst_26078 = cljs.core.async.close_BANG_.call(null,fc);
var state_26097__$1 = (function (){var statearr_26109 = state_26097;
(statearr_26109[(8)] = inst_26077);

return statearr_26109;
})();
var statearr_26110_26136 = state_26097__$1;
(statearr_26110_26136[(2)] = inst_26078);

(statearr_26110_26136[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26098 === (14))){
var inst_26091 = (state_26097[(2)]);
var state_26097__$1 = state_26097;
var statearr_26111_26137 = state_26097__$1;
(statearr_26111_26137[(2)] = inst_26091);

(statearr_26111_26137[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26098 === (10))){
var state_26097__$1 = state_26097;
var statearr_26112_26138 = state_26097__$1;
(statearr_26112_26138[(2)] = fc);

(statearr_26112_26138[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26098 === (8))){
var inst_26086 = (state_26097[(2)]);
var state_26097__$1 = state_26097;
if(cljs.core.truth_(inst_26086)){
var statearr_26113_26139 = state_26097__$1;
(statearr_26113_26139[(1)] = (12));

} else {
var statearr_26114_26140 = state_26097__$1;
(statearr_26114_26140[(1)] = (13));

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
});})(c__19686__auto___26126,tc,fc))
;
return ((function (switch__19621__auto__,c__19686__auto___26126,tc,fc){
return (function() {
var cljs$core$async$state_machine__19622__auto__ = null;
var cljs$core$async$state_machine__19622__auto____0 = (function (){
var statearr_26118 = [null,null,null,null,null,null,null,null,null];
(statearr_26118[(0)] = cljs$core$async$state_machine__19622__auto__);

(statearr_26118[(1)] = (1));

return statearr_26118;
});
var cljs$core$async$state_machine__19622__auto____1 = (function (state_26097){
while(true){
var ret_value__19623__auto__ = (function (){try{while(true){
var result__19624__auto__ = switch__19621__auto__.call(null,state_26097);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19624__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19624__auto__;
}
break;
}
}catch (e26119){if((e26119 instanceof Object)){
var ex__19625__auto__ = e26119;
var statearr_26120_26141 = state_26097;
(statearr_26120_26141[(5)] = ex__19625__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26097);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26119;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19623__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26142 = state_26097;
state_26097 = G__26142;
continue;
} else {
return ret_value__19623__auto__;
}
break;
}
});
cljs$core$async$state_machine__19622__auto__ = function(state_26097){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__19622__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__19622__auto____1.call(this,state_26097);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__19622__auto____0;
cljs$core$async$state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__19622__auto____1;
return cljs$core$async$state_machine__19622__auto__;
})()
;})(switch__19621__auto__,c__19686__auto___26126,tc,fc))
})();
var state__19688__auto__ = (function (){var statearr_26121 = f__19687__auto__.call(null);
(statearr_26121[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19686__auto___26126);

return statearr_26121;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19688__auto__);
});})(c__19686__auto___26126,tc,fc))
);


return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tc,fc], null);
});

cljs.core.async.split.cljs$lang$maxFixedArity = 4;
/**
 * f should be a function of 2 arguments. Returns a channel containing
 * the single result of applying f to init and the first item from the
 * channel, then applying f to that result and the 2nd item, etc. If
 * the channel closes without yielding items, returns init and f is not
 * called. ch must close before reduce produces a result.
 */
cljs.core.async.reduce = (function cljs$core$async$reduce(f,init,ch){
var c__19686__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19686__auto__){
return (function (){
var f__19687__auto__ = (function (){var switch__19621__auto__ = ((function (c__19686__auto__){
return (function (state_26189){
var state_val_26190 = (state_26189[(1)]);
if((state_val_26190 === (1))){
var inst_26175 = init;
var state_26189__$1 = (function (){var statearr_26191 = state_26189;
(statearr_26191[(7)] = inst_26175);

return statearr_26191;
})();
var statearr_26192_26207 = state_26189__$1;
(statearr_26192_26207[(2)] = null);

(statearr_26192_26207[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26190 === (2))){
var state_26189__$1 = state_26189;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26189__$1,(4),ch);
} else {
if((state_val_26190 === (3))){
var inst_26187 = (state_26189[(2)]);
var state_26189__$1 = state_26189;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26189__$1,inst_26187);
} else {
if((state_val_26190 === (4))){
var inst_26178 = (state_26189[(8)]);
var inst_26178__$1 = (state_26189[(2)]);
var inst_26179 = (inst_26178__$1 == null);
var state_26189__$1 = (function (){var statearr_26193 = state_26189;
(statearr_26193[(8)] = inst_26178__$1);

return statearr_26193;
})();
if(cljs.core.truth_(inst_26179)){
var statearr_26194_26208 = state_26189__$1;
(statearr_26194_26208[(1)] = (5));

} else {
var statearr_26195_26209 = state_26189__$1;
(statearr_26195_26209[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26190 === (5))){
var inst_26175 = (state_26189[(7)]);
var state_26189__$1 = state_26189;
var statearr_26196_26210 = state_26189__$1;
(statearr_26196_26210[(2)] = inst_26175);

(statearr_26196_26210[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26190 === (6))){
var inst_26178 = (state_26189[(8)]);
var inst_26175 = (state_26189[(7)]);
var inst_26182 = f.call(null,inst_26175,inst_26178);
var inst_26175__$1 = inst_26182;
var state_26189__$1 = (function (){var statearr_26197 = state_26189;
(statearr_26197[(7)] = inst_26175__$1);

return statearr_26197;
})();
var statearr_26198_26211 = state_26189__$1;
(statearr_26198_26211[(2)] = null);

(statearr_26198_26211[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26190 === (7))){
var inst_26185 = (state_26189[(2)]);
var state_26189__$1 = state_26189;
var statearr_26199_26212 = state_26189__$1;
(statearr_26199_26212[(2)] = inst_26185);

(statearr_26199_26212[(1)] = (3));


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
});})(c__19686__auto__))
;
return ((function (switch__19621__auto__,c__19686__auto__){
return (function() {
var cljs$core$async$reduce_$_state_machine__19622__auto__ = null;
var cljs$core$async$reduce_$_state_machine__19622__auto____0 = (function (){
var statearr_26203 = [null,null,null,null,null,null,null,null,null];
(statearr_26203[(0)] = cljs$core$async$reduce_$_state_machine__19622__auto__);

(statearr_26203[(1)] = (1));

return statearr_26203;
});
var cljs$core$async$reduce_$_state_machine__19622__auto____1 = (function (state_26189){
while(true){
var ret_value__19623__auto__ = (function (){try{while(true){
var result__19624__auto__ = switch__19621__auto__.call(null,state_26189);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19624__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19624__auto__;
}
break;
}
}catch (e26204){if((e26204 instanceof Object)){
var ex__19625__auto__ = e26204;
var statearr_26205_26213 = state_26189;
(statearr_26205_26213[(5)] = ex__19625__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26189);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26204;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19623__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26214 = state_26189;
state_26189 = G__26214;
continue;
} else {
return ret_value__19623__auto__;
}
break;
}
});
cljs$core$async$reduce_$_state_machine__19622__auto__ = function(state_26189){
switch(arguments.length){
case 0:
return cljs$core$async$reduce_$_state_machine__19622__auto____0.call(this);
case 1:
return cljs$core$async$reduce_$_state_machine__19622__auto____1.call(this,state_26189);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$reduce_$_state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$reduce_$_state_machine__19622__auto____0;
cljs$core$async$reduce_$_state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$reduce_$_state_machine__19622__auto____1;
return cljs$core$async$reduce_$_state_machine__19622__auto__;
})()
;})(switch__19621__auto__,c__19686__auto__))
})();
var state__19688__auto__ = (function (){var statearr_26206 = f__19687__auto__.call(null);
(statearr_26206[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19686__auto__);

return statearr_26206;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19688__auto__);
});})(c__19686__auto__))
);

return c__19686__auto__;
});
/**
 * Puts the contents of coll into the supplied channel.
 * 
 * By default the channel will be closed after the items are copied,
 * but can be determined by the close? parameter.
 * 
 * Returns a channel which will close after the items are copied.
 */
cljs.core.async.onto_chan = (function cljs$core$async$onto_chan(){
var args26215 = [];
var len__17542__auto___26267 = arguments.length;
var i__17543__auto___26268 = (0);
while(true){
if((i__17543__auto___26268 < len__17542__auto___26267)){
args26215.push((arguments[i__17543__auto___26268]));

var G__26269 = (i__17543__auto___26268 + (1));
i__17543__auto___26268 = G__26269;
continue;
} else {
}
break;
}

var G__26217 = args26215.length;
switch (G__26217) {
case 2:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26215.length)].join('')));

}
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan.call(null,ch,coll,true);
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
var c__19686__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19686__auto__){
return (function (){
var f__19687__auto__ = (function (){var switch__19621__auto__ = ((function (c__19686__auto__){
return (function (state_26242){
var state_val_26243 = (state_26242[(1)]);
if((state_val_26243 === (7))){
var inst_26224 = (state_26242[(2)]);
var state_26242__$1 = state_26242;
var statearr_26244_26271 = state_26242__$1;
(statearr_26244_26271[(2)] = inst_26224);

(statearr_26244_26271[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26243 === (1))){
var inst_26218 = cljs.core.seq.call(null,coll);
var inst_26219 = inst_26218;
var state_26242__$1 = (function (){var statearr_26245 = state_26242;
(statearr_26245[(7)] = inst_26219);

return statearr_26245;
})();
var statearr_26246_26272 = state_26242__$1;
(statearr_26246_26272[(2)] = null);

(statearr_26246_26272[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26243 === (4))){
var inst_26219 = (state_26242[(7)]);
var inst_26222 = cljs.core.first.call(null,inst_26219);
var state_26242__$1 = state_26242;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_26242__$1,(7),ch,inst_26222);
} else {
if((state_val_26243 === (13))){
var inst_26236 = (state_26242[(2)]);
var state_26242__$1 = state_26242;
var statearr_26247_26273 = state_26242__$1;
(statearr_26247_26273[(2)] = inst_26236);

(statearr_26247_26273[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26243 === (6))){
var inst_26227 = (state_26242[(2)]);
var state_26242__$1 = state_26242;
if(cljs.core.truth_(inst_26227)){
var statearr_26248_26274 = state_26242__$1;
(statearr_26248_26274[(1)] = (8));

} else {
var statearr_26249_26275 = state_26242__$1;
(statearr_26249_26275[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26243 === (3))){
var inst_26240 = (state_26242[(2)]);
var state_26242__$1 = state_26242;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26242__$1,inst_26240);
} else {
if((state_val_26243 === (12))){
var state_26242__$1 = state_26242;
var statearr_26250_26276 = state_26242__$1;
(statearr_26250_26276[(2)] = null);

(statearr_26250_26276[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26243 === (2))){
var inst_26219 = (state_26242[(7)]);
var state_26242__$1 = state_26242;
if(cljs.core.truth_(inst_26219)){
var statearr_26251_26277 = state_26242__$1;
(statearr_26251_26277[(1)] = (4));

} else {
var statearr_26252_26278 = state_26242__$1;
(statearr_26252_26278[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26243 === (11))){
var inst_26233 = cljs.core.async.close_BANG_.call(null,ch);
var state_26242__$1 = state_26242;
var statearr_26253_26279 = state_26242__$1;
(statearr_26253_26279[(2)] = inst_26233);

(statearr_26253_26279[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26243 === (9))){
var state_26242__$1 = state_26242;
if(cljs.core.truth_(close_QMARK_)){
var statearr_26254_26280 = state_26242__$1;
(statearr_26254_26280[(1)] = (11));

} else {
var statearr_26255_26281 = state_26242__$1;
(statearr_26255_26281[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26243 === (5))){
var inst_26219 = (state_26242[(7)]);
var state_26242__$1 = state_26242;
var statearr_26256_26282 = state_26242__$1;
(statearr_26256_26282[(2)] = inst_26219);

(statearr_26256_26282[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26243 === (10))){
var inst_26238 = (state_26242[(2)]);
var state_26242__$1 = state_26242;
var statearr_26257_26283 = state_26242__$1;
(statearr_26257_26283[(2)] = inst_26238);

(statearr_26257_26283[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26243 === (8))){
var inst_26219 = (state_26242[(7)]);
var inst_26229 = cljs.core.next.call(null,inst_26219);
var inst_26219__$1 = inst_26229;
var state_26242__$1 = (function (){var statearr_26258 = state_26242;
(statearr_26258[(7)] = inst_26219__$1);

return statearr_26258;
})();
var statearr_26259_26284 = state_26242__$1;
(statearr_26259_26284[(2)] = null);

(statearr_26259_26284[(1)] = (2));


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
});})(c__19686__auto__))
;
return ((function (switch__19621__auto__,c__19686__auto__){
return (function() {
var cljs$core$async$state_machine__19622__auto__ = null;
var cljs$core$async$state_machine__19622__auto____0 = (function (){
var statearr_26263 = [null,null,null,null,null,null,null,null];
(statearr_26263[(0)] = cljs$core$async$state_machine__19622__auto__);

(statearr_26263[(1)] = (1));

return statearr_26263;
});
var cljs$core$async$state_machine__19622__auto____1 = (function (state_26242){
while(true){
var ret_value__19623__auto__ = (function (){try{while(true){
var result__19624__auto__ = switch__19621__auto__.call(null,state_26242);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19624__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19624__auto__;
}
break;
}
}catch (e26264){if((e26264 instanceof Object)){
var ex__19625__auto__ = e26264;
var statearr_26265_26285 = state_26242;
(statearr_26265_26285[(5)] = ex__19625__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26242);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26264;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19623__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26286 = state_26242;
state_26242 = G__26286;
continue;
} else {
return ret_value__19623__auto__;
}
break;
}
});
cljs$core$async$state_machine__19622__auto__ = function(state_26242){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__19622__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__19622__auto____1.call(this,state_26242);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__19622__auto____0;
cljs$core$async$state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__19622__auto____1;
return cljs$core$async$state_machine__19622__auto__;
})()
;})(switch__19621__auto__,c__19686__auto__))
})();
var state__19688__auto__ = (function (){var statearr_26266 = f__19687__auto__.call(null);
(statearr_26266[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19686__auto__);

return statearr_26266;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19688__auto__);
});})(c__19686__auto__))
);

return c__19686__auto__;
});

cljs.core.async.onto_chan.cljs$lang$maxFixedArity = 3;
/**
 * Creates and returns a channel which contains the contents of coll,
 * closing when exhausted.
 */
cljs.core.async.to_chan = (function cljs$core$async$to_chan(coll){
var ch = cljs.core.async.chan.call(null,cljs.core.bounded_count.call(null,(100),coll));
cljs.core.async.onto_chan.call(null,ch,coll);

return ch;
});

cljs.core.async.Mux = {};

cljs.core.async.muxch_STAR_ = (function cljs$core$async$muxch_STAR_(_){
if((!((_ == null))) && (!((_.cljs$core$async$Mux$muxch_STAR_$arity$1 == null)))){
return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else {
var x__17139__auto__ = (((_ == null))?null:_);
var m__17140__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__17139__auto__)]);
if(!((m__17140__auto__ == null))){
return m__17140__auto__.call(null,_);
} else {
var m__17140__auto____$1 = (cljs.core.async.muxch_STAR_["_"]);
if(!((m__17140__auto____$1 == null))){
return m__17140__auto____$1.call(null,_);
} else {
throw cljs.core.missing_protocol.call(null,"Mux.muxch*",_);
}
}
}
});


cljs.core.async.Mult = {};

cljs.core.async.tap_STAR_ = (function cljs$core$async$tap_STAR_(m,ch,close_QMARK_){
if((!((m == null))) && (!((m.cljs$core$async$Mult$tap_STAR_$arity$3 == null)))){
return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else {
var x__17139__auto__ = (((m == null))?null:m);
var m__17140__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__17139__auto__)]);
if(!((m__17140__auto__ == null))){
return m__17140__auto__.call(null,m,ch,close_QMARK_);
} else {
var m__17140__auto____$1 = (cljs.core.async.tap_STAR_["_"]);
if(!((m__17140__auto____$1 == null))){
return m__17140__auto____$1.call(null,m,ch,close_QMARK_);
} else {
throw cljs.core.missing_protocol.call(null,"Mult.tap*",m);
}
}
}
});

cljs.core.async.untap_STAR_ = (function cljs$core$async$untap_STAR_(m,ch){
if((!((m == null))) && (!((m.cljs$core$async$Mult$untap_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else {
var x__17139__auto__ = (((m == null))?null:m);
var m__17140__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__17139__auto__)]);
if(!((m__17140__auto__ == null))){
return m__17140__auto__.call(null,m,ch);
} else {
var m__17140__auto____$1 = (cljs.core.async.untap_STAR_["_"]);
if(!((m__17140__auto____$1 == null))){
return m__17140__auto____$1.call(null,m,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Mult.untap*",m);
}
}
}
});

cljs.core.async.untap_all_STAR_ = (function cljs$core$async$untap_all_STAR_(m){
if((!((m == null))) && (!((m.cljs$core$async$Mult$untap_all_STAR_$arity$1 == null)))){
return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else {
var x__17139__auto__ = (((m == null))?null:m);
var m__17140__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__17139__auto__)]);
if(!((m__17140__auto__ == null))){
return m__17140__auto__.call(null,m);
} else {
var m__17140__auto____$1 = (cljs.core.async.untap_all_STAR_["_"]);
if(!((m__17140__auto____$1 == null))){
return m__17140__auto____$1.call(null,m);
} else {
throw cljs.core.missing_protocol.call(null,"Mult.untap-all*",m);
}
}
}
});

/**
 * Creates and returns a mult(iple) of the supplied channel. Channels
 * containing copies of the channel can be created with 'tap', and
 * detached with 'untap'.
 * 
 * Each item is distributed to all taps in parallel and synchronously,
 * i.e. each tap must accept before the next item is distributed. Use
 * buffering/windowing to prevent slow taps from holding up the mult.
 * 
 * Items received when there are no taps get dropped.
 * 
 * If a tap puts to a closed channel, it will be removed from the mult.
 */
cljs.core.async.mult = (function cljs$core$async$mult(ch){
var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var m = (function (){
if(typeof cljs.core.async.t26512 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t26512 = (function (mult,ch,cs,meta26513){
this.mult = mult;
this.ch = ch;
this.cs = cs;
this.meta26513 = meta26513;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t26512.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs){
return (function (_26514,meta26513__$1){
var self__ = this;
var _26514__$1 = this;
return (new cljs.core.async.t26512(self__.mult,self__.ch,self__.cs,meta26513__$1));
});})(cs))
;

cljs.core.async.t26512.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs){
return (function (_26514){
var self__ = this;
var _26514__$1 = this;
return self__.meta26513;
});})(cs))
;

cljs.core.async.t26512.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t26512.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(cs))
;

cljs.core.async.t26512.prototype.cljs$core$async$Mult$ = true;

cljs.core.async.t26512.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = ((function (cs){
return (function (_,ch__$1,close_QMARK_){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch__$1,close_QMARK_);

return null;
});})(cs))
;

cljs.core.async.t26512.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = ((function (cs){
return (function (_,ch__$1){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch__$1);

return null;
});})(cs))
;

cljs.core.async.t26512.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return null;
});})(cs))
;

cljs.core.async.t26512.getBasis = ((function (cs){
return (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"mult","mult",-1187640995,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Creates and returns a mult(iple) of the supplied channel. Channels\n  containing copies of the channel can be created with 'tap', and\n  detached with 'untap'.\n\n  Each item is distributed to all taps in parallel and synchronously,\n  i.e. each tap must accept before the next item is distributed. Use\n  buffering/windowing to prevent slow taps from holding up the mult.\n\n  Items received when there are no taps get dropped.\n\n  If a tap puts to a closed channel, it will be removed from the mult."], null)),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"meta26513","meta26513",-265050945,null)], null);
});})(cs))
;

cljs.core.async.t26512.cljs$lang$type = true;

cljs.core.async.t26512.cljs$lang$ctorStr = "cljs.core.async/t26512";

cljs.core.async.t26512.cljs$lang$ctorPrWriter = ((function (cs){
return (function (this__17082__auto__,writer__17083__auto__,opt__17084__auto__){
return cljs.core._write.call(null,writer__17083__auto__,"cljs.core.async/t26512");
});})(cs))
;

cljs.core.async.__GT_t26512 = ((function (cs){
return (function cljs$core$async$mult_$___GT_t26512(mult__$1,ch__$1,cs__$1,meta26513){
return (new cljs.core.async.t26512(mult__$1,ch__$1,cs__$1,meta26513));
});})(cs))
;

}

return (new cljs.core.async.t26512(cljs$core$async$mult,ch,cs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var dchan = cljs.core.async.chan.call(null,(1));
var dctr = cljs.core.atom.call(null,null);
var done = ((function (cs,m,dchan,dctr){
return (function (_){
if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.call(null,dchan,true);
} else {
return null;
}
});})(cs,m,dchan,dctr))
;
var c__19686__auto___26733 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19686__auto___26733,cs,m,dchan,dctr,done){
return (function (){
var f__19687__auto__ = (function (){var switch__19621__auto__ = ((function (c__19686__auto___26733,cs,m,dchan,dctr,done){
return (function (state_26645){
var state_val_26646 = (state_26645[(1)]);
if((state_val_26646 === (7))){
var inst_26641 = (state_26645[(2)]);
var state_26645__$1 = state_26645;
var statearr_26647_26734 = state_26645__$1;
(statearr_26647_26734[(2)] = inst_26641);

(statearr_26647_26734[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26646 === (20))){
var inst_26546 = (state_26645[(7)]);
var inst_26556 = cljs.core.first.call(null,inst_26546);
var inst_26557 = cljs.core.nth.call(null,inst_26556,(0),null);
var inst_26558 = cljs.core.nth.call(null,inst_26556,(1),null);
var state_26645__$1 = (function (){var statearr_26648 = state_26645;
(statearr_26648[(8)] = inst_26557);

return statearr_26648;
})();
if(cljs.core.truth_(inst_26558)){
var statearr_26649_26735 = state_26645__$1;
(statearr_26649_26735[(1)] = (22));

} else {
var statearr_26650_26736 = state_26645__$1;
(statearr_26650_26736[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26646 === (27))){
var inst_26588 = (state_26645[(9)]);
var inst_26593 = (state_26645[(10)]);
var inst_26586 = (state_26645[(11)]);
var inst_26517 = (state_26645[(12)]);
var inst_26593__$1 = cljs.core._nth.call(null,inst_26586,inst_26588);
var inst_26594 = cljs.core.async.put_BANG_.call(null,inst_26593__$1,inst_26517,done);
var state_26645__$1 = (function (){var statearr_26651 = state_26645;
(statearr_26651[(10)] = inst_26593__$1);

return statearr_26651;
})();
if(cljs.core.truth_(inst_26594)){
var statearr_26652_26737 = state_26645__$1;
(statearr_26652_26737[(1)] = (30));

} else {
var statearr_26653_26738 = state_26645__$1;
(statearr_26653_26738[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26646 === (1))){
var state_26645__$1 = state_26645;
var statearr_26654_26739 = state_26645__$1;
(statearr_26654_26739[(2)] = null);

(statearr_26654_26739[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26646 === (24))){
var inst_26546 = (state_26645[(7)]);
var inst_26563 = (state_26645[(2)]);
var inst_26564 = cljs.core.next.call(null,inst_26546);
var inst_26526 = inst_26564;
var inst_26527 = null;
var inst_26528 = (0);
var inst_26529 = (0);
var state_26645__$1 = (function (){var statearr_26655 = state_26645;
(statearr_26655[(13)] = inst_26527);

(statearr_26655[(14)] = inst_26563);

(statearr_26655[(15)] = inst_26526);

(statearr_26655[(16)] = inst_26528);

(statearr_26655[(17)] = inst_26529);

return statearr_26655;
})();
var statearr_26656_26740 = state_26645__$1;
(statearr_26656_26740[(2)] = null);

(statearr_26656_26740[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26646 === (39))){
var state_26645__$1 = state_26645;
var statearr_26660_26741 = state_26645__$1;
(statearr_26660_26741[(2)] = null);

(statearr_26660_26741[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26646 === (4))){
var inst_26517 = (state_26645[(12)]);
var inst_26517__$1 = (state_26645[(2)]);
var inst_26518 = (inst_26517__$1 == null);
var state_26645__$1 = (function (){var statearr_26661 = state_26645;
(statearr_26661[(12)] = inst_26517__$1);

return statearr_26661;
})();
if(cljs.core.truth_(inst_26518)){
var statearr_26662_26742 = state_26645__$1;
(statearr_26662_26742[(1)] = (5));

} else {
var statearr_26663_26743 = state_26645__$1;
(statearr_26663_26743[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26646 === (15))){
var inst_26527 = (state_26645[(13)]);
var inst_26526 = (state_26645[(15)]);
var inst_26528 = (state_26645[(16)]);
var inst_26529 = (state_26645[(17)]);
var inst_26542 = (state_26645[(2)]);
var inst_26543 = (inst_26529 + (1));
var tmp26657 = inst_26527;
var tmp26658 = inst_26526;
var tmp26659 = inst_26528;
var inst_26526__$1 = tmp26658;
var inst_26527__$1 = tmp26657;
var inst_26528__$1 = tmp26659;
var inst_26529__$1 = inst_26543;
var state_26645__$1 = (function (){var statearr_26664 = state_26645;
(statearr_26664[(18)] = inst_26542);

(statearr_26664[(13)] = inst_26527__$1);

(statearr_26664[(15)] = inst_26526__$1);

(statearr_26664[(16)] = inst_26528__$1);

(statearr_26664[(17)] = inst_26529__$1);

return statearr_26664;
})();
var statearr_26665_26744 = state_26645__$1;
(statearr_26665_26744[(2)] = null);

(statearr_26665_26744[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26646 === (21))){
var inst_26567 = (state_26645[(2)]);
var state_26645__$1 = state_26645;
var statearr_26669_26745 = state_26645__$1;
(statearr_26669_26745[(2)] = inst_26567);

(statearr_26669_26745[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26646 === (31))){
var inst_26593 = (state_26645[(10)]);
var inst_26597 = done.call(null,null);
var inst_26598 = cljs.core.async.untap_STAR_.call(null,m,inst_26593);
var state_26645__$1 = (function (){var statearr_26670 = state_26645;
(statearr_26670[(19)] = inst_26597);

return statearr_26670;
})();
var statearr_26671_26746 = state_26645__$1;
(statearr_26671_26746[(2)] = inst_26598);

(statearr_26671_26746[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26646 === (32))){
var inst_26588 = (state_26645[(9)]);
var inst_26587 = (state_26645[(20)]);
var inst_26586 = (state_26645[(11)]);
var inst_26585 = (state_26645[(21)]);
var inst_26600 = (state_26645[(2)]);
var inst_26601 = (inst_26588 + (1));
var tmp26666 = inst_26587;
var tmp26667 = inst_26586;
var tmp26668 = inst_26585;
var inst_26585__$1 = tmp26668;
var inst_26586__$1 = tmp26667;
var inst_26587__$1 = tmp26666;
var inst_26588__$1 = inst_26601;
var state_26645__$1 = (function (){var statearr_26672 = state_26645;
(statearr_26672[(9)] = inst_26588__$1);

(statearr_26672[(20)] = inst_26587__$1);

(statearr_26672[(22)] = inst_26600);

(statearr_26672[(11)] = inst_26586__$1);

(statearr_26672[(21)] = inst_26585__$1);

return statearr_26672;
})();
var statearr_26673_26747 = state_26645__$1;
(statearr_26673_26747[(2)] = null);

(statearr_26673_26747[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26646 === (40))){
var inst_26613 = (state_26645[(23)]);
var inst_26617 = done.call(null,null);
var inst_26618 = cljs.core.async.untap_STAR_.call(null,m,inst_26613);
var state_26645__$1 = (function (){var statearr_26674 = state_26645;
(statearr_26674[(24)] = inst_26617);

return statearr_26674;
})();
var statearr_26675_26748 = state_26645__$1;
(statearr_26675_26748[(2)] = inst_26618);

(statearr_26675_26748[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26646 === (33))){
var inst_26604 = (state_26645[(25)]);
var inst_26606 = cljs.core.chunked_seq_QMARK_.call(null,inst_26604);
var state_26645__$1 = state_26645;
if(inst_26606){
var statearr_26676_26749 = state_26645__$1;
(statearr_26676_26749[(1)] = (36));

} else {
var statearr_26677_26750 = state_26645__$1;
(statearr_26677_26750[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26646 === (13))){
var inst_26536 = (state_26645[(26)]);
var inst_26539 = cljs.core.async.close_BANG_.call(null,inst_26536);
var state_26645__$1 = state_26645;
var statearr_26678_26751 = state_26645__$1;
(statearr_26678_26751[(2)] = inst_26539);

(statearr_26678_26751[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26646 === (22))){
var inst_26557 = (state_26645[(8)]);
var inst_26560 = cljs.core.async.close_BANG_.call(null,inst_26557);
var state_26645__$1 = state_26645;
var statearr_26679_26752 = state_26645__$1;
(statearr_26679_26752[(2)] = inst_26560);

(statearr_26679_26752[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26646 === (36))){
var inst_26604 = (state_26645[(25)]);
var inst_26608 = cljs.core.chunk_first.call(null,inst_26604);
var inst_26609 = cljs.core.chunk_rest.call(null,inst_26604);
var inst_26610 = cljs.core.count.call(null,inst_26608);
var inst_26585 = inst_26609;
var inst_26586 = inst_26608;
var inst_26587 = inst_26610;
var inst_26588 = (0);
var state_26645__$1 = (function (){var statearr_26680 = state_26645;
(statearr_26680[(9)] = inst_26588);

(statearr_26680[(20)] = inst_26587);

(statearr_26680[(11)] = inst_26586);

(statearr_26680[(21)] = inst_26585);

return statearr_26680;
})();
var statearr_26681_26753 = state_26645__$1;
(statearr_26681_26753[(2)] = null);

(statearr_26681_26753[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26646 === (41))){
var inst_26604 = (state_26645[(25)]);
var inst_26620 = (state_26645[(2)]);
var inst_26621 = cljs.core.next.call(null,inst_26604);
var inst_26585 = inst_26621;
var inst_26586 = null;
var inst_26587 = (0);
var inst_26588 = (0);
var state_26645__$1 = (function (){var statearr_26682 = state_26645;
(statearr_26682[(9)] = inst_26588);

(statearr_26682[(20)] = inst_26587);

(statearr_26682[(11)] = inst_26586);

(statearr_26682[(27)] = inst_26620);

(statearr_26682[(21)] = inst_26585);

return statearr_26682;
})();
var statearr_26683_26754 = state_26645__$1;
(statearr_26683_26754[(2)] = null);

(statearr_26683_26754[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26646 === (43))){
var state_26645__$1 = state_26645;
var statearr_26684_26755 = state_26645__$1;
(statearr_26684_26755[(2)] = null);

(statearr_26684_26755[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26646 === (29))){
var inst_26629 = (state_26645[(2)]);
var state_26645__$1 = state_26645;
var statearr_26685_26756 = state_26645__$1;
(statearr_26685_26756[(2)] = inst_26629);

(statearr_26685_26756[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26646 === (44))){
var inst_26638 = (state_26645[(2)]);
var state_26645__$1 = (function (){var statearr_26686 = state_26645;
(statearr_26686[(28)] = inst_26638);

return statearr_26686;
})();
var statearr_26687_26757 = state_26645__$1;
(statearr_26687_26757[(2)] = null);

(statearr_26687_26757[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26646 === (6))){
var inst_26577 = (state_26645[(29)]);
var inst_26576 = cljs.core.deref.call(null,cs);
var inst_26577__$1 = cljs.core.keys.call(null,inst_26576);
var inst_26578 = cljs.core.count.call(null,inst_26577__$1);
var inst_26579 = cljs.core.reset_BANG_.call(null,dctr,inst_26578);
var inst_26584 = cljs.core.seq.call(null,inst_26577__$1);
var inst_26585 = inst_26584;
var inst_26586 = null;
var inst_26587 = (0);
var inst_26588 = (0);
var state_26645__$1 = (function (){var statearr_26688 = state_26645;
(statearr_26688[(9)] = inst_26588);

(statearr_26688[(20)] = inst_26587);

(statearr_26688[(11)] = inst_26586);

(statearr_26688[(29)] = inst_26577__$1);

(statearr_26688[(21)] = inst_26585);

(statearr_26688[(30)] = inst_26579);

return statearr_26688;
})();
var statearr_26689_26758 = state_26645__$1;
(statearr_26689_26758[(2)] = null);

(statearr_26689_26758[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26646 === (28))){
var inst_26604 = (state_26645[(25)]);
var inst_26585 = (state_26645[(21)]);
var inst_26604__$1 = cljs.core.seq.call(null,inst_26585);
var state_26645__$1 = (function (){var statearr_26690 = state_26645;
(statearr_26690[(25)] = inst_26604__$1);

return statearr_26690;
})();
if(inst_26604__$1){
var statearr_26691_26759 = state_26645__$1;
(statearr_26691_26759[(1)] = (33));

} else {
var statearr_26692_26760 = state_26645__$1;
(statearr_26692_26760[(1)] = (34));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26646 === (25))){
var inst_26588 = (state_26645[(9)]);
var inst_26587 = (state_26645[(20)]);
var inst_26590 = (inst_26588 < inst_26587);
var inst_26591 = inst_26590;
var state_26645__$1 = state_26645;
if(cljs.core.truth_(inst_26591)){
var statearr_26693_26761 = state_26645__$1;
(statearr_26693_26761[(1)] = (27));

} else {
var statearr_26694_26762 = state_26645__$1;
(statearr_26694_26762[(1)] = (28));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26646 === (34))){
var state_26645__$1 = state_26645;
var statearr_26695_26763 = state_26645__$1;
(statearr_26695_26763[(2)] = null);

(statearr_26695_26763[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26646 === (17))){
var state_26645__$1 = state_26645;
var statearr_26696_26764 = state_26645__$1;
(statearr_26696_26764[(2)] = null);

(statearr_26696_26764[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26646 === (3))){
var inst_26643 = (state_26645[(2)]);
var state_26645__$1 = state_26645;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_26645__$1,inst_26643);
} else {
if((state_val_26646 === (12))){
var inst_26572 = (state_26645[(2)]);
var state_26645__$1 = state_26645;
var statearr_26697_26765 = state_26645__$1;
(statearr_26697_26765[(2)] = inst_26572);

(statearr_26697_26765[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26646 === (2))){
var state_26645__$1 = state_26645;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26645__$1,(4),ch);
} else {
if((state_val_26646 === (23))){
var state_26645__$1 = state_26645;
var statearr_26698_26766 = state_26645__$1;
(statearr_26698_26766[(2)] = null);

(statearr_26698_26766[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26646 === (35))){
var inst_26627 = (state_26645[(2)]);
var state_26645__$1 = state_26645;
var statearr_26699_26767 = state_26645__$1;
(statearr_26699_26767[(2)] = inst_26627);

(statearr_26699_26767[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26646 === (19))){
var inst_26546 = (state_26645[(7)]);
var inst_26550 = cljs.core.chunk_first.call(null,inst_26546);
var inst_26551 = cljs.core.chunk_rest.call(null,inst_26546);
var inst_26552 = cljs.core.count.call(null,inst_26550);
var inst_26526 = inst_26551;
var inst_26527 = inst_26550;
var inst_26528 = inst_26552;
var inst_26529 = (0);
var state_26645__$1 = (function (){var statearr_26700 = state_26645;
(statearr_26700[(13)] = inst_26527);

(statearr_26700[(15)] = inst_26526);

(statearr_26700[(16)] = inst_26528);

(statearr_26700[(17)] = inst_26529);

return statearr_26700;
})();
var statearr_26701_26768 = state_26645__$1;
(statearr_26701_26768[(2)] = null);

(statearr_26701_26768[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26646 === (11))){
var inst_26526 = (state_26645[(15)]);
var inst_26546 = (state_26645[(7)]);
var inst_26546__$1 = cljs.core.seq.call(null,inst_26526);
var state_26645__$1 = (function (){var statearr_26702 = state_26645;
(statearr_26702[(7)] = inst_26546__$1);

return statearr_26702;
})();
if(inst_26546__$1){
var statearr_26703_26769 = state_26645__$1;
(statearr_26703_26769[(1)] = (16));

} else {
var statearr_26704_26770 = state_26645__$1;
(statearr_26704_26770[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26646 === (9))){
var inst_26574 = (state_26645[(2)]);
var state_26645__$1 = state_26645;
var statearr_26705_26771 = state_26645__$1;
(statearr_26705_26771[(2)] = inst_26574);

(statearr_26705_26771[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26646 === (5))){
var inst_26524 = cljs.core.deref.call(null,cs);
var inst_26525 = cljs.core.seq.call(null,inst_26524);
var inst_26526 = inst_26525;
var inst_26527 = null;
var inst_26528 = (0);
var inst_26529 = (0);
var state_26645__$1 = (function (){var statearr_26706 = state_26645;
(statearr_26706[(13)] = inst_26527);

(statearr_26706[(15)] = inst_26526);

(statearr_26706[(16)] = inst_26528);

(statearr_26706[(17)] = inst_26529);

return statearr_26706;
})();
var statearr_26707_26772 = state_26645__$1;
(statearr_26707_26772[(2)] = null);

(statearr_26707_26772[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26646 === (14))){
var state_26645__$1 = state_26645;
var statearr_26708_26773 = state_26645__$1;
(statearr_26708_26773[(2)] = null);

(statearr_26708_26773[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26646 === (45))){
var inst_26635 = (state_26645[(2)]);
var state_26645__$1 = state_26645;
var statearr_26709_26774 = state_26645__$1;
(statearr_26709_26774[(2)] = inst_26635);

(statearr_26709_26774[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26646 === (26))){
var inst_26577 = (state_26645[(29)]);
var inst_26631 = (state_26645[(2)]);
var inst_26632 = cljs.core.seq.call(null,inst_26577);
var state_26645__$1 = (function (){var statearr_26710 = state_26645;
(statearr_26710[(31)] = inst_26631);

return statearr_26710;
})();
if(inst_26632){
var statearr_26711_26775 = state_26645__$1;
(statearr_26711_26775[(1)] = (42));

} else {
var statearr_26712_26776 = state_26645__$1;
(statearr_26712_26776[(1)] = (43));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26646 === (16))){
var inst_26546 = (state_26645[(7)]);
var inst_26548 = cljs.core.chunked_seq_QMARK_.call(null,inst_26546);
var state_26645__$1 = state_26645;
if(inst_26548){
var statearr_26713_26777 = state_26645__$1;
(statearr_26713_26777[(1)] = (19));

} else {
var statearr_26714_26778 = state_26645__$1;
(statearr_26714_26778[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26646 === (38))){
var inst_26624 = (state_26645[(2)]);
var state_26645__$1 = state_26645;
var statearr_26715_26779 = state_26645__$1;
(statearr_26715_26779[(2)] = inst_26624);

(statearr_26715_26779[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26646 === (30))){
var state_26645__$1 = state_26645;
var statearr_26716_26780 = state_26645__$1;
(statearr_26716_26780[(2)] = null);

(statearr_26716_26780[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26646 === (10))){
var inst_26527 = (state_26645[(13)]);
var inst_26529 = (state_26645[(17)]);
var inst_26535 = cljs.core._nth.call(null,inst_26527,inst_26529);
var inst_26536 = cljs.core.nth.call(null,inst_26535,(0),null);
var inst_26537 = cljs.core.nth.call(null,inst_26535,(1),null);
var state_26645__$1 = (function (){var statearr_26717 = state_26645;
(statearr_26717[(26)] = inst_26536);

return statearr_26717;
})();
if(cljs.core.truth_(inst_26537)){
var statearr_26718_26781 = state_26645__$1;
(statearr_26718_26781[(1)] = (13));

} else {
var statearr_26719_26782 = state_26645__$1;
(statearr_26719_26782[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26646 === (18))){
var inst_26570 = (state_26645[(2)]);
var state_26645__$1 = state_26645;
var statearr_26720_26783 = state_26645__$1;
(statearr_26720_26783[(2)] = inst_26570);

(statearr_26720_26783[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26646 === (42))){
var state_26645__$1 = state_26645;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_26645__$1,(45),dchan);
} else {
if((state_val_26646 === (37))){
var inst_26613 = (state_26645[(23)]);
var inst_26517 = (state_26645[(12)]);
var inst_26604 = (state_26645[(25)]);
var inst_26613__$1 = cljs.core.first.call(null,inst_26604);
var inst_26614 = cljs.core.async.put_BANG_.call(null,inst_26613__$1,inst_26517,done);
var state_26645__$1 = (function (){var statearr_26721 = state_26645;
(statearr_26721[(23)] = inst_26613__$1);

return statearr_26721;
})();
if(cljs.core.truth_(inst_26614)){
var statearr_26722_26784 = state_26645__$1;
(statearr_26722_26784[(1)] = (39));

} else {
var statearr_26723_26785 = state_26645__$1;
(statearr_26723_26785[(1)] = (40));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_26646 === (8))){
var inst_26528 = (state_26645[(16)]);
var inst_26529 = (state_26645[(17)]);
var inst_26531 = (inst_26529 < inst_26528);
var inst_26532 = inst_26531;
var state_26645__$1 = state_26645;
if(cljs.core.truth_(inst_26532)){
var statearr_26724_26786 = state_26645__$1;
(statearr_26724_26786[(1)] = (10));

} else {
var statearr_26725_26787 = state_26645__$1;
(statearr_26725_26787[(1)] = (11));

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
}
}
});})(c__19686__auto___26733,cs,m,dchan,dctr,done))
;
return ((function (switch__19621__auto__,c__19686__auto___26733,cs,m,dchan,dctr,done){
return (function() {
var cljs$core$async$mult_$_state_machine__19622__auto__ = null;
var cljs$core$async$mult_$_state_machine__19622__auto____0 = (function (){
var statearr_26729 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_26729[(0)] = cljs$core$async$mult_$_state_machine__19622__auto__);

(statearr_26729[(1)] = (1));

return statearr_26729;
});
var cljs$core$async$mult_$_state_machine__19622__auto____1 = (function (state_26645){
while(true){
var ret_value__19623__auto__ = (function (){try{while(true){
var result__19624__auto__ = switch__19621__auto__.call(null,state_26645);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19624__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19624__auto__;
}
break;
}
}catch (e26730){if((e26730 instanceof Object)){
var ex__19625__auto__ = e26730;
var statearr_26731_26788 = state_26645;
(statearr_26731_26788[(5)] = ex__19625__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_26645);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e26730;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19623__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__26789 = state_26645;
state_26645 = G__26789;
continue;
} else {
return ret_value__19623__auto__;
}
break;
}
});
cljs$core$async$mult_$_state_machine__19622__auto__ = function(state_26645){
switch(arguments.length){
case 0:
return cljs$core$async$mult_$_state_machine__19622__auto____0.call(this);
case 1:
return cljs$core$async$mult_$_state_machine__19622__auto____1.call(this,state_26645);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mult_$_state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mult_$_state_machine__19622__auto____0;
cljs$core$async$mult_$_state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mult_$_state_machine__19622__auto____1;
return cljs$core$async$mult_$_state_machine__19622__auto__;
})()
;})(switch__19621__auto__,c__19686__auto___26733,cs,m,dchan,dctr,done))
})();
var state__19688__auto__ = (function (){var statearr_26732 = f__19687__auto__.call(null);
(statearr_26732[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19686__auto___26733);

return statearr_26732;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19688__auto__);
});})(c__19686__auto___26733,cs,m,dchan,dctr,done))
);


return m;
});
/**
 * Copies the mult source onto the supplied channel.
 * 
 * By default the channel will be closed when the source closes,
 * but can be determined by the close? parameter.
 */
cljs.core.async.tap = (function cljs$core$async$tap(){
var args26790 = [];
var len__17542__auto___26793 = arguments.length;
var i__17543__auto___26794 = (0);
while(true){
if((i__17543__auto___26794 < len__17542__auto___26793)){
args26790.push((arguments[i__17543__auto___26794]));

var G__26795 = (i__17543__auto___26794 + (1));
i__17543__auto___26794 = G__26795;
continue;
} else {
}
break;
}

var G__26792 = args26790.length;
switch (G__26792) {
case 2:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args26790.length)].join('')));

}
});

cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2 = (function (mult,ch){
return cljs.core.async.tap.call(null,mult,ch,true);
});

cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3 = (function (mult,ch,close_QMARK_){
cljs.core.async.tap_STAR_.call(null,mult,ch,close_QMARK_);

return ch;
});

cljs.core.async.tap.cljs$lang$maxFixedArity = 3;
/**
 * Disconnects a target channel from a mult
 */
cljs.core.async.untap = (function cljs$core$async$untap(mult,ch){
return cljs.core.async.untap_STAR_.call(null,mult,ch);
});
/**
 * Disconnects all target channels from a mult
 */
cljs.core.async.untap_all = (function cljs$core$async$untap_all(mult){
return cljs.core.async.untap_all_STAR_.call(null,mult);
});

cljs.core.async.Mix = {};

cljs.core.async.admix_STAR_ = (function cljs$core$async$admix_STAR_(m,ch){
if((!((m == null))) && (!((m.cljs$core$async$Mix$admix_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else {
var x__17139__auto__ = (((m == null))?null:m);
var m__17140__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__17139__auto__)]);
if(!((m__17140__auto__ == null))){
return m__17140__auto__.call(null,m,ch);
} else {
var m__17140__auto____$1 = (cljs.core.async.admix_STAR_["_"]);
if(!((m__17140__auto____$1 == null))){
return m__17140__auto____$1.call(null,m,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.admix*",m);
}
}
}
});

cljs.core.async.unmix_STAR_ = (function cljs$core$async$unmix_STAR_(m,ch){
if((!((m == null))) && (!((m.cljs$core$async$Mix$unmix_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else {
var x__17139__auto__ = (((m == null))?null:m);
var m__17140__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__17139__auto__)]);
if(!((m__17140__auto__ == null))){
return m__17140__auto__.call(null,m,ch);
} else {
var m__17140__auto____$1 = (cljs.core.async.unmix_STAR_["_"]);
if(!((m__17140__auto____$1 == null))){
return m__17140__auto____$1.call(null,m,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.unmix*",m);
}
}
}
});

cljs.core.async.unmix_all_STAR_ = (function cljs$core$async$unmix_all_STAR_(m){
if((!((m == null))) && (!((m.cljs$core$async$Mix$unmix_all_STAR_$arity$1 == null)))){
return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else {
var x__17139__auto__ = (((m == null))?null:m);
var m__17140__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__17139__auto__)]);
if(!((m__17140__auto__ == null))){
return m__17140__auto__.call(null,m);
} else {
var m__17140__auto____$1 = (cljs.core.async.unmix_all_STAR_["_"]);
if(!((m__17140__auto____$1 == null))){
return m__17140__auto____$1.call(null,m);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.unmix-all*",m);
}
}
}
});

cljs.core.async.toggle_STAR_ = (function cljs$core$async$toggle_STAR_(m,state_map){
if((!((m == null))) && (!((m.cljs$core$async$Mix$toggle_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else {
var x__17139__auto__ = (((m == null))?null:m);
var m__17140__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__17139__auto__)]);
if(!((m__17140__auto__ == null))){
return m__17140__auto__.call(null,m,state_map);
} else {
var m__17140__auto____$1 = (cljs.core.async.toggle_STAR_["_"]);
if(!((m__17140__auto____$1 == null))){
return m__17140__auto____$1.call(null,m,state_map);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.toggle*",m);
}
}
}
});

cljs.core.async.solo_mode_STAR_ = (function cljs$core$async$solo_mode_STAR_(m,mode){
if((!((m == null))) && (!((m.cljs$core$async$Mix$solo_mode_STAR_$arity$2 == null)))){
return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else {
var x__17139__auto__ = (((m == null))?null:m);
var m__17140__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__17139__auto__)]);
if(!((m__17140__auto__ == null))){
return m__17140__auto__.call(null,m,mode);
} else {
var m__17140__auto____$1 = (cljs.core.async.solo_mode_STAR_["_"]);
if(!((m__17140__auto____$1 == null))){
return m__17140__auto____$1.call(null,m,mode);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.solo-mode*",m);
}
}
}
});

cljs.core.async.ioc_alts_BANG_ = (function cljs$core$async$ioc_alts_BANG_(){
var args__17549__auto__ = [];
var len__17542__auto___26809 = arguments.length;
var i__17543__auto___26810 = (0);
while(true){
if((i__17543__auto___26810 < len__17542__auto___26809)){
args__17549__auto__.push((arguments[i__17543__auto___26810]));

var G__26811 = (i__17543__auto___26810 + (1));
i__17543__auto___26810 = G__26811;
continue;
} else {
}
break;
}

var argseq__17550__auto__ = ((((3) < args__17549__auto__.length))?(new cljs.core.IndexedSeq(args__17549__auto__.slice((3)),(0))):null);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__17550__auto__);
});

cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,cont_block,ports,p__26803){
var map__26804 = p__26803;
var map__26804__$1 = ((((!((map__26804 == null)))?((((map__26804.cljs$lang$protocol_mask$partition0$ & (64))) || (map__26804.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__26804):map__26804);
var opts = map__26804__$1;
var statearr_26806_26812 = state;
(statearr_26806_26812[cljs.core.async.impl.ioc_helpers.STATE_IDX] = cont_block);


var temp__4425__auto__ = cljs.core.async.do_alts.call(null,((function (map__26804,map__26804__$1,opts){
return (function (val){
var statearr_26807_26813 = state;
(statearr_26807_26813[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = val);


return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state);
});})(map__26804,map__26804__$1,opts))
,ports,opts);
if(cljs.core.truth_(temp__4425__auto__)){
var cb = temp__4425__auto__;
var statearr_26808_26814 = state;
(statearr_26808_26814[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = cljs.core.deref.call(null,cb));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
});

cljs.core.async.ioc_alts_BANG_.cljs$lang$maxFixedArity = (3);

cljs.core.async.ioc_alts_BANG_.cljs$lang$applyTo = (function (seq26799){
var G__26800 = cljs.core.first.call(null,seq26799);
var seq26799__$1 = cljs.core.next.call(null,seq26799);
var G__26801 = cljs.core.first.call(null,seq26799__$1);
var seq26799__$2 = cljs.core.next.call(null,seq26799__$1);
var G__26802 = cljs.core.first.call(null,seq26799__$2);
var seq26799__$3 = cljs.core.next.call(null,seq26799__$2);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(G__26800,G__26801,G__26802,seq26799__$3);
});
/**
 * Creates and returns a mix of one or more input channels which will
 * be put on the supplied out channel. Input sources can be added to
 * the mix with 'admix', and removed with 'unmix'. A mix supports
 * soloing, muting and pausing multiple inputs atomically using
 * 'toggle', and can solo using either muting or pausing as determined
 * by 'solo-mode'.
 * 
 * Each channel can have zero or more boolean modes set via 'toggle':
 * 
 * :solo - when true, only this (ond other soloed) channel(s) will appear
 * in the mix output channel. :mute and :pause states of soloed
 * channels are ignored. If solo-mode is :mute, non-soloed
 * channels are muted, if :pause, non-soloed channels are
 * paused.
 * 
 * :mute - muted channels will have their contents consumed but not included in the mix
 * :pause - paused channels will not have their contents consumed (and thus also not included in the mix)
 */
cljs.core.async.mix = (function cljs$core$async$mix(out){
var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var solo_modes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pause","pause",-2095325672),null,new cljs.core.Keyword(null,"mute","mute",1151223646),null], null), null);
var attrs = cljs.core.conj.call(null,solo_modes,new cljs.core.Keyword(null,"solo","solo",-316350075));
var solo_mode = cljs.core.atom.call(null,new cljs.core.Keyword(null,"mute","mute",1151223646));
var change = cljs.core.async.chan.call(null);
var changed = ((function (cs,solo_modes,attrs,solo_mode,change){
return (function (){
return cljs.core.async.put_BANG_.call(null,change,true);
});})(cs,solo_modes,attrs,solo_mode,change))
;
var pick = ((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (attr,chs){
return cljs.core.reduce_kv.call(null,((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (ret,c,v){
if(cljs.core.truth_(attr.call(null,v))){
return cljs.core.conj.call(null,ret,c);
} else {
return ret;
}
});})(cs,solo_modes,attrs,solo_mode,change,changed))
,cljs.core.PersistentHashSet.EMPTY,chs);
});})(cs,solo_modes,attrs,solo_mode,change,changed))
;
var calc_state = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick){
return (function (){
var chs = cljs.core.deref.call(null,cs);
var mode = cljs.core.deref.call(null,solo_mode);
var solos = pick.call(null,new cljs.core.Keyword(null,"solo","solo",-316350075),chs);
var pauses = pick.call(null,new cljs.core.Keyword(null,"pause","pause",-2095325672),chs);
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"solos","solos",1441458643),solos,new cljs.core.Keyword(null,"mutes","mutes",1068806309),pick.call(null,new cljs.core.Keyword(null,"mute","mute",1151223646),chs),new cljs.core.Keyword(null,"reads","reads",-1215067361),cljs.core.conj.call(null,(((cljs.core._EQ_.call(null,mode,new cljs.core.Keyword(null,"pause","pause",-2095325672))) && (!(cljs.core.empty_QMARK_.call(null,solos))))?cljs.core.vec.call(null,solos):cljs.core.vec.call(null,cljs.core.remove.call(null,pauses,cljs.core.keys.call(null,chs)))),change)], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick))
;
var m = (function (){
if(typeof cljs.core.async.t26978 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t26978 = (function (change,mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta26979){
this.change = change;
this.mix = mix;
this.solo_mode = solo_mode;
this.pick = pick;
this.cs = cs;
this.calc_state = calc_state;
this.out = out;
this.changed = changed;
this.solo_modes = solo_modes;
this.attrs = attrs;
this.meta26979 = meta26979;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t26978.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_26980,meta26979__$1){
var self__ = this;
var _26980__$1 = this;
return (new cljs.core.async.t26978(self__.change,self__.mix,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta26979__$1));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t26978.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_26980){
var self__ = this;
var _26980__$1 = this;
return self__.meta26979;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t26978.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t26978.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.out;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t26978.prototype.cljs$core$async$Mix$ = true;

cljs.core.async.t26978.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t26978.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t26978.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t26978.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,state_map){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.partial.call(null,cljs.core.merge_with,cljs.core.merge),state_map);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t26978.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,mode){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.solo_modes.call(null,mode))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str([cljs.core.str("mode must be one of: "),cljs.core.str(self__.solo_modes)].join('')),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"mode","mode",-2000032078,null))))].join('')));
}

cljs.core.reset_BANG_.call(null,self__.solo_mode,mode);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t26978.getBasis = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (){
return new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"change","change",477485025,null),cljs.core.with_meta(new cljs.core.Symbol(null,"mix","mix",2121373763,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"out","out",729986010,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Creates and returns a mix of one or more input channels which will\n  be put on the supplied out channel. Input sources can be added to\n  the mix with 'admix', and removed with 'unmix'. A mix supports\n  soloing, muting and pausing multiple inputs atomically using\n  'toggle', and can solo using either muting or pausing as determined\n  by 'solo-mode'.\n\n  Each channel can have zero or more boolean modes set via 'toggle':\n\n  :solo - when true, only this (ond other soloed) channel(s) will appear\n          in the mix output channel. :mute and :pause states of soloed\n          channels are ignored. If solo-mode is :mute, non-soloed\n          channels are muted, if :pause, non-soloed channels are\n          paused.\n\n  :mute - muted channels will have their contents consumed but not included in the mix\n  :pause - paused channels will not have their contents consumed (and thus also not included in the mix)\n"], null)),new cljs.core.Symbol(null,"solo-mode","solo-mode",2031788074,null),new cljs.core.Symbol(null,"pick","pick",1300068175,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"calc-state","calc-state",-349968968,null),new cljs.core.Symbol(null,"out","out",729986010,null),new cljs.core.Symbol(null,"changed","changed",-2083710852,null),new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"attrs","attrs",-450137186,null),new cljs.core.Symbol(null,"meta26979","meta26979",802506954,null)], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t26978.cljs$lang$type = true;

cljs.core.async.t26978.cljs$lang$ctorStr = "cljs.core.async/t26978";

cljs.core.async.t26978.cljs$lang$ctorPrWriter = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (this__17082__auto__,writer__17083__auto__,opt__17084__auto__){
return cljs.core._write.call(null,writer__17083__auto__,"cljs.core.async/t26978");
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.__GT_t26978 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function cljs$core$async$mix_$___GT_t26978(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta26979){
return (new cljs.core.async.t26978(change__$1,mix__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta26979));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

}

return (new cljs.core.async.t26978(change,cljs$core$async$mix,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__19686__auto___27141 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19686__auto___27141,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (){
var f__19687__auto__ = (function (){var switch__19621__auto__ = ((function (c__19686__auto___27141,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (state_27078){
var state_val_27079 = (state_27078[(1)]);
if((state_val_27079 === (7))){
var inst_26996 = (state_27078[(2)]);
var state_27078__$1 = state_27078;
var statearr_27080_27142 = state_27078__$1;
(statearr_27080_27142[(2)] = inst_26996);

(statearr_27080_27142[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27079 === (20))){
var inst_27008 = (state_27078[(7)]);
var state_27078__$1 = state_27078;
var statearr_27081_27143 = state_27078__$1;
(statearr_27081_27143[(2)] = inst_27008);

(statearr_27081_27143[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27079 === (27))){
var state_27078__$1 = state_27078;
var statearr_27082_27144 = state_27078__$1;
(statearr_27082_27144[(2)] = null);

(statearr_27082_27144[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27079 === (1))){
var inst_26984 = (state_27078[(8)]);
var inst_26984__$1 = calc_state.call(null);
var inst_26986 = (inst_26984__$1 == null);
var inst_26987 = cljs.core.not.call(null,inst_26986);
var state_27078__$1 = (function (){var statearr_27083 = state_27078;
(statearr_27083[(8)] = inst_26984__$1);

return statearr_27083;
})();
if(inst_26987){
var statearr_27084_27145 = state_27078__$1;
(statearr_27084_27145[(1)] = (2));

} else {
var statearr_27085_27146 = state_27078__$1;
(statearr_27085_27146[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27079 === (24))){
var inst_27052 = (state_27078[(9)]);
var inst_27031 = (state_27078[(10)]);
var inst_27038 = (state_27078[(11)]);
var inst_27052__$1 = inst_27031.call(null,inst_27038);
var state_27078__$1 = (function (){var statearr_27086 = state_27078;
(statearr_27086[(9)] = inst_27052__$1);

return statearr_27086;
})();
if(cljs.core.truth_(inst_27052__$1)){
var statearr_27087_27147 = state_27078__$1;
(statearr_27087_27147[(1)] = (29));

} else {
var statearr_27088_27148 = state_27078__$1;
(statearr_27088_27148[(1)] = (30));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27079 === (4))){
var inst_26999 = (state_27078[(2)]);
var state_27078__$1 = state_27078;
if(cljs.core.truth_(inst_26999)){
var statearr_27089_27149 = state_27078__$1;
(statearr_27089_27149[(1)] = (8));

} else {
var statearr_27090_27150 = state_27078__$1;
(statearr_27090_27150[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27079 === (15))){
var inst_27025 = (state_27078[(2)]);
var state_27078__$1 = state_27078;
if(cljs.core.truth_(inst_27025)){
var statearr_27091_27151 = state_27078__$1;
(statearr_27091_27151[(1)] = (19));

} else {
var statearr_27092_27152 = state_27078__$1;
(statearr_27092_27152[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27079 === (21))){
var inst_27030 = (state_27078[(12)]);
var inst_27030__$1 = (state_27078[(2)]);
var inst_27031 = cljs.core.get.call(null,inst_27030__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_27032 = cljs.core.get.call(null,inst_27030__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_27033 = cljs.core.get.call(null,inst_27030__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var state_27078__$1 = (function (){var statearr_27093 = state_27078;
(statearr_27093[(13)] = inst_27032);

(statearr_27093[(12)] = inst_27030__$1);

(statearr_27093[(10)] = inst_27031);

return statearr_27093;
})();
return cljs.core.async.ioc_alts_BANG_.call(null,state_27078__$1,(22),inst_27033);
} else {
if((state_val_27079 === (31))){
var inst_27060 = (state_27078[(2)]);
var state_27078__$1 = state_27078;
if(cljs.core.truth_(inst_27060)){
var statearr_27094_27153 = state_27078__$1;
(statearr_27094_27153[(1)] = (32));

} else {
var statearr_27095_27154 = state_27078__$1;
(statearr_27095_27154[(1)] = (33));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27079 === (32))){
var inst_27037 = (state_27078[(14)]);
var state_27078__$1 = state_27078;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_27078__$1,(35),out,inst_27037);
} else {
if((state_val_27079 === (33))){
var inst_27030 = (state_27078[(12)]);
var inst_27008 = inst_27030;
var state_27078__$1 = (function (){var statearr_27096 = state_27078;
(statearr_27096[(7)] = inst_27008);

return statearr_27096;
})();
var statearr_27097_27155 = state_27078__$1;
(statearr_27097_27155[(2)] = null);

(statearr_27097_27155[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27079 === (13))){
var inst_27008 = (state_27078[(7)]);
var inst_27015 = inst_27008.cljs$lang$protocol_mask$partition0$;
var inst_27016 = (inst_27015 & (64));
var inst_27017 = inst_27008.cljs$core$ISeq$;
var inst_27018 = (inst_27016) || (inst_27017);
var state_27078__$1 = state_27078;
if(cljs.core.truth_(inst_27018)){
var statearr_27098_27156 = state_27078__$1;
(statearr_27098_27156[(1)] = (16));

} else {
var statearr_27099_27157 = state_27078__$1;
(statearr_27099_27157[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27079 === (22))){
var inst_27037 = (state_27078[(14)]);
var inst_27038 = (state_27078[(11)]);
var inst_27036 = (state_27078[(2)]);
var inst_27037__$1 = cljs.core.nth.call(null,inst_27036,(0),null);
var inst_27038__$1 = cljs.core.nth.call(null,inst_27036,(1),null);
var inst_27039 = (inst_27037__$1 == null);
var inst_27040 = cljs.core._EQ_.call(null,inst_27038__$1,change);
var inst_27041 = (inst_27039) || (inst_27040);
var state_27078__$1 = (function (){var statearr_27100 = state_27078;
(statearr_27100[(14)] = inst_27037__$1);

(statearr_27100[(11)] = inst_27038__$1);

return statearr_27100;
})();
if(cljs.core.truth_(inst_27041)){
var statearr_27101_27158 = state_27078__$1;
(statearr_27101_27158[(1)] = (23));

} else {
var statearr_27102_27159 = state_27078__$1;
(statearr_27102_27159[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27079 === (36))){
var inst_27030 = (state_27078[(12)]);
var inst_27008 = inst_27030;
var state_27078__$1 = (function (){var statearr_27103 = state_27078;
(statearr_27103[(7)] = inst_27008);

return statearr_27103;
})();
var statearr_27104_27160 = state_27078__$1;
(statearr_27104_27160[(2)] = null);

(statearr_27104_27160[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27079 === (29))){
var inst_27052 = (state_27078[(9)]);
var state_27078__$1 = state_27078;
var statearr_27105_27161 = state_27078__$1;
(statearr_27105_27161[(2)] = inst_27052);

(statearr_27105_27161[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27079 === (6))){
var state_27078__$1 = state_27078;
var statearr_27106_27162 = state_27078__$1;
(statearr_27106_27162[(2)] = false);

(statearr_27106_27162[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27079 === (28))){
var inst_27048 = (state_27078[(2)]);
var inst_27049 = calc_state.call(null);
var inst_27008 = inst_27049;
var state_27078__$1 = (function (){var statearr_27107 = state_27078;
(statearr_27107[(15)] = inst_27048);

(statearr_27107[(7)] = inst_27008);

return statearr_27107;
})();
var statearr_27108_27163 = state_27078__$1;
(statearr_27108_27163[(2)] = null);

(statearr_27108_27163[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27079 === (25))){
var inst_27074 = (state_27078[(2)]);
var state_27078__$1 = state_27078;
var statearr_27109_27164 = state_27078__$1;
(statearr_27109_27164[(2)] = inst_27074);

(statearr_27109_27164[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27079 === (34))){
var inst_27072 = (state_27078[(2)]);
var state_27078__$1 = state_27078;
var statearr_27110_27165 = state_27078__$1;
(statearr_27110_27165[(2)] = inst_27072);

(statearr_27110_27165[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27079 === (17))){
var state_27078__$1 = state_27078;
var statearr_27111_27166 = state_27078__$1;
(statearr_27111_27166[(2)] = false);

(statearr_27111_27166[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27079 === (3))){
var state_27078__$1 = state_27078;
var statearr_27112_27167 = state_27078__$1;
(statearr_27112_27167[(2)] = false);

(statearr_27112_27167[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27079 === (12))){
var inst_27076 = (state_27078[(2)]);
var state_27078__$1 = state_27078;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27078__$1,inst_27076);
} else {
if((state_val_27079 === (2))){
var inst_26984 = (state_27078[(8)]);
var inst_26989 = inst_26984.cljs$lang$protocol_mask$partition0$;
var inst_26990 = (inst_26989 & (64));
var inst_26991 = inst_26984.cljs$core$ISeq$;
var inst_26992 = (inst_26990) || (inst_26991);
var state_27078__$1 = state_27078;
if(cljs.core.truth_(inst_26992)){
var statearr_27113_27168 = state_27078__$1;
(statearr_27113_27168[(1)] = (5));

} else {
var statearr_27114_27169 = state_27078__$1;
(statearr_27114_27169[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27079 === (23))){
var inst_27037 = (state_27078[(14)]);
var inst_27043 = (inst_27037 == null);
var state_27078__$1 = state_27078;
if(cljs.core.truth_(inst_27043)){
var statearr_27115_27170 = state_27078__$1;
(statearr_27115_27170[(1)] = (26));

} else {
var statearr_27116_27171 = state_27078__$1;
(statearr_27116_27171[(1)] = (27));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27079 === (35))){
var inst_27063 = (state_27078[(2)]);
var state_27078__$1 = state_27078;
if(cljs.core.truth_(inst_27063)){
var statearr_27117_27172 = state_27078__$1;
(statearr_27117_27172[(1)] = (36));

} else {
var statearr_27118_27173 = state_27078__$1;
(statearr_27118_27173[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27079 === (19))){
var inst_27008 = (state_27078[(7)]);
var inst_27027 = cljs.core.apply.call(null,cljs.core.hash_map,inst_27008);
var state_27078__$1 = state_27078;
var statearr_27119_27174 = state_27078__$1;
(statearr_27119_27174[(2)] = inst_27027);

(statearr_27119_27174[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27079 === (11))){
var inst_27008 = (state_27078[(7)]);
var inst_27012 = (inst_27008 == null);
var inst_27013 = cljs.core.not.call(null,inst_27012);
var state_27078__$1 = state_27078;
if(inst_27013){
var statearr_27120_27175 = state_27078__$1;
(statearr_27120_27175[(1)] = (13));

} else {
var statearr_27121_27176 = state_27078__$1;
(statearr_27121_27176[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27079 === (9))){
var inst_26984 = (state_27078[(8)]);
var state_27078__$1 = state_27078;
var statearr_27122_27177 = state_27078__$1;
(statearr_27122_27177[(2)] = inst_26984);

(statearr_27122_27177[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27079 === (5))){
var state_27078__$1 = state_27078;
var statearr_27123_27178 = state_27078__$1;
(statearr_27123_27178[(2)] = true);

(statearr_27123_27178[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27079 === (14))){
var state_27078__$1 = state_27078;
var statearr_27124_27179 = state_27078__$1;
(statearr_27124_27179[(2)] = false);

(statearr_27124_27179[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27079 === (26))){
var inst_27038 = (state_27078[(11)]);
var inst_27045 = cljs.core.swap_BANG_.call(null,cs,cljs.core.dissoc,inst_27038);
var state_27078__$1 = state_27078;
var statearr_27125_27180 = state_27078__$1;
(statearr_27125_27180[(2)] = inst_27045);

(statearr_27125_27180[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27079 === (16))){
var state_27078__$1 = state_27078;
var statearr_27126_27181 = state_27078__$1;
(statearr_27126_27181[(2)] = true);

(statearr_27126_27181[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27079 === (38))){
var inst_27068 = (state_27078[(2)]);
var state_27078__$1 = state_27078;
var statearr_27127_27182 = state_27078__$1;
(statearr_27127_27182[(2)] = inst_27068);

(statearr_27127_27182[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27079 === (30))){
var inst_27032 = (state_27078[(13)]);
var inst_27031 = (state_27078[(10)]);
var inst_27038 = (state_27078[(11)]);
var inst_27055 = cljs.core.empty_QMARK_.call(null,inst_27031);
var inst_27056 = inst_27032.call(null,inst_27038);
var inst_27057 = cljs.core.not.call(null,inst_27056);
var inst_27058 = (inst_27055) && (inst_27057);
var state_27078__$1 = state_27078;
var statearr_27128_27183 = state_27078__$1;
(statearr_27128_27183[(2)] = inst_27058);

(statearr_27128_27183[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27079 === (10))){
var inst_26984 = (state_27078[(8)]);
var inst_27004 = (state_27078[(2)]);
var inst_27005 = cljs.core.get.call(null,inst_27004,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_27006 = cljs.core.get.call(null,inst_27004,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_27007 = cljs.core.get.call(null,inst_27004,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var inst_27008 = inst_26984;
var state_27078__$1 = (function (){var statearr_27129 = state_27078;
(statearr_27129[(16)] = inst_27006);

(statearr_27129[(17)] = inst_27005);

(statearr_27129[(18)] = inst_27007);

(statearr_27129[(7)] = inst_27008);

return statearr_27129;
})();
var statearr_27130_27184 = state_27078__$1;
(statearr_27130_27184[(2)] = null);

(statearr_27130_27184[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27079 === (18))){
var inst_27022 = (state_27078[(2)]);
var state_27078__$1 = state_27078;
var statearr_27131_27185 = state_27078__$1;
(statearr_27131_27185[(2)] = inst_27022);

(statearr_27131_27185[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27079 === (37))){
var state_27078__$1 = state_27078;
var statearr_27132_27186 = state_27078__$1;
(statearr_27132_27186[(2)] = null);

(statearr_27132_27186[(1)] = (38));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27079 === (8))){
var inst_26984 = (state_27078[(8)]);
var inst_27001 = cljs.core.apply.call(null,cljs.core.hash_map,inst_26984);
var state_27078__$1 = state_27078;
var statearr_27133_27187 = state_27078__$1;
(statearr_27133_27187[(2)] = inst_27001);

(statearr_27133_27187[(1)] = (10));


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
});})(c__19686__auto___27141,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
;
return ((function (switch__19621__auto__,c__19686__auto___27141,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function() {
var cljs$core$async$mix_$_state_machine__19622__auto__ = null;
var cljs$core$async$mix_$_state_machine__19622__auto____0 = (function (){
var statearr_27137 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_27137[(0)] = cljs$core$async$mix_$_state_machine__19622__auto__);

(statearr_27137[(1)] = (1));

return statearr_27137;
});
var cljs$core$async$mix_$_state_machine__19622__auto____1 = (function (state_27078){
while(true){
var ret_value__19623__auto__ = (function (){try{while(true){
var result__19624__auto__ = switch__19621__auto__.call(null,state_27078);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19624__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19624__auto__;
}
break;
}
}catch (e27138){if((e27138 instanceof Object)){
var ex__19625__auto__ = e27138;
var statearr_27139_27188 = state_27078;
(statearr_27139_27188[(5)] = ex__19625__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27078);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e27138;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19623__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27189 = state_27078;
state_27078 = G__27189;
continue;
} else {
return ret_value__19623__auto__;
}
break;
}
});
cljs$core$async$mix_$_state_machine__19622__auto__ = function(state_27078){
switch(arguments.length){
case 0:
return cljs$core$async$mix_$_state_machine__19622__auto____0.call(this);
case 1:
return cljs$core$async$mix_$_state_machine__19622__auto____1.call(this,state_27078);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mix_$_state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mix_$_state_machine__19622__auto____0;
cljs$core$async$mix_$_state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mix_$_state_machine__19622__auto____1;
return cljs$core$async$mix_$_state_machine__19622__auto__;
})()
;})(switch__19621__auto__,c__19686__auto___27141,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
})();
var state__19688__auto__ = (function (){var statearr_27140 = f__19687__auto__.call(null);
(statearr_27140[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19686__auto___27141);

return statearr_27140;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19688__auto__);
});})(c__19686__auto___27141,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
);


return m;
});
/**
 * Adds ch as an input to the mix
 */
cljs.core.async.admix = (function cljs$core$async$admix(mix,ch){
return cljs.core.async.admix_STAR_.call(null,mix,ch);
});
/**
 * Removes ch as an input to the mix
 */
cljs.core.async.unmix = (function cljs$core$async$unmix(mix,ch){
return cljs.core.async.unmix_STAR_.call(null,mix,ch);
});
/**
 * removes all inputs from the mix
 */
cljs.core.async.unmix_all = (function cljs$core$async$unmix_all(mix){
return cljs.core.async.unmix_all_STAR_.call(null,mix);
});
/**
 * Atomically sets the state(s) of one or more channels in a mix. The
 * state map is a map of channels -> channel-state-map. A
 * channel-state-map is a map of attrs -> boolean, where attr is one or
 * more of :mute, :pause or :solo. Any states supplied are merged with
 * the current state.
 * 
 * Note that channels can be added to a mix via toggle, which can be
 * used to add channels in a particular (e.g. paused) state.
 */
cljs.core.async.toggle = (function cljs$core$async$toggle(mix,state_map){
return cljs.core.async.toggle_STAR_.call(null,mix,state_map);
});
/**
 * Sets the solo mode of the mix. mode must be one of :mute or :pause
 */
cljs.core.async.solo_mode = (function cljs$core$async$solo_mode(mix,mode){
return cljs.core.async.solo_mode_STAR_.call(null,mix,mode);
});

cljs.core.async.Pub = {};

cljs.core.async.sub_STAR_ = (function cljs$core$async$sub_STAR_(p,v,ch,close_QMARK_){
if((!((p == null))) && (!((p.cljs$core$async$Pub$sub_STAR_$arity$4 == null)))){
return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else {
var x__17139__auto__ = (((p == null))?null:p);
var m__17140__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__17139__auto__)]);
if(!((m__17140__auto__ == null))){
return m__17140__auto__.call(null,p,v,ch,close_QMARK_);
} else {
var m__17140__auto____$1 = (cljs.core.async.sub_STAR_["_"]);
if(!((m__17140__auto____$1 == null))){
return m__17140__auto____$1.call(null,p,v,ch,close_QMARK_);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.sub*",p);
}
}
}
});

cljs.core.async.unsub_STAR_ = (function cljs$core$async$unsub_STAR_(p,v,ch){
if((!((p == null))) && (!((p.cljs$core$async$Pub$unsub_STAR_$arity$3 == null)))){
return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else {
var x__17139__auto__ = (((p == null))?null:p);
var m__17140__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__17139__auto__)]);
if(!((m__17140__auto__ == null))){
return m__17140__auto__.call(null,p,v,ch);
} else {
var m__17140__auto____$1 = (cljs.core.async.unsub_STAR_["_"]);
if(!((m__17140__auto____$1 == null))){
return m__17140__auto____$1.call(null,p,v,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_ = (function cljs$core$async$unsub_all_STAR_(){
var args27192 = [];
var len__17542__auto___27195 = arguments.length;
var i__17543__auto___27196 = (0);
while(true){
if((i__17543__auto___27196 < len__17542__auto___27195)){
args27192.push((arguments[i__17543__auto___27196]));

var G__27197 = (i__17543__auto___27196 + (1));
i__17543__auto___27196 = G__27197;
continue;
} else {
}
break;
}

var G__27194 = args27192.length;
switch (G__27194) {
case 1:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args27192.length)].join('')));

}
});

cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1 = (function (p){
if((!((p == null))) && (!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$1 == null)))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else {
var x__17139__auto__ = (((p == null))?null:p);
var m__17140__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__17139__auto__)]);
if(!((m__17140__auto__ == null))){
return m__17140__auto__.call(null,p);
} else {
var m__17140__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);
if(!((m__17140__auto____$1 == null))){
return m__17140__auto____$1.call(null,p);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (p,v){
if((!((p == null))) && (!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$2 == null)))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else {
var x__17139__auto__ = (((p == null))?null:p);
var m__17140__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__17139__auto__)]);
if(!((m__17140__auto__ == null))){
return m__17140__auto__.call(null,p,v);
} else {
var m__17140__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);
if(!((m__17140__auto____$1 == null))){
return m__17140__auto____$1.call(null,p,v);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_.cljs$lang$maxFixedArity = 2;

/**
 * Creates and returns a pub(lication) of the supplied channel,
 * partitioned into topics by the topic-fn. topic-fn will be applied to
 * each value on the channel and the result will determine the 'topic'
 * on which that value will be put. Channels can be subscribed to
 * receive copies of topics using 'sub', and unsubscribed using
 * 'unsub'. Each topic will be handled by an internal mult on a
 * dedicated channel. By default these internal channels are
 * unbuffered, but a buf-fn can be supplied which, given a topic,
 * creates a buffer with desired properties.
 * 
 * Each item is distributed to all subs in parallel and synchronously,
 * i.e. each sub must accept before the next item is distributed. Use
 * buffering/windowing to prevent slow subs from holding up the pub.
 * 
 * Items received when there are no matching subs get dropped.
 * 
 * Note that if buf-fns are used then each topic is handled
 * asynchronously, i.e. if a channel is subscribed to more than one
 * topic it should not expect them to be interleaved identically with
 * the source.
 */
cljs.core.async.pub = (function cljs$core$async$pub(){
var args27200 = [];
var len__17542__auto___27325 = arguments.length;
var i__17543__auto___27326 = (0);
while(true){
if((i__17543__auto___27326 < len__17542__auto___27325)){
args27200.push((arguments[i__17543__auto___27326]));

var G__27327 = (i__17543__auto___27326 + (1));
i__17543__auto___27326 = G__27327;
continue;
} else {
}
break;
}

var G__27202 = args27200.length;
switch (G__27202) {
case 2:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args27200.length)].join('')));

}
});

cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2 = (function (ch,topic_fn){
return cljs.core.async.pub.call(null,ch,topic_fn,cljs.core.constantly.call(null,null));
});

cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3 = (function (ch,topic_fn,buf_fn){
var mults = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var ensure_mult = ((function (mults){
return (function (topic){
var or__16503__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,mults),topic);
if(cljs.core.truth_(or__16503__auto__)){
return or__16503__auto__;
} else {
return cljs.core.get.call(null,cljs.core.swap_BANG_.call(null,mults,((function (or__16503__auto__,mults){
return (function (p1__27199_SHARP_){
if(cljs.core.truth_(p1__27199_SHARP_.call(null,topic))){
return p1__27199_SHARP_;
} else {
return cljs.core.assoc.call(null,p1__27199_SHARP_,topic,cljs.core.async.mult.call(null,cljs.core.async.chan.call(null,buf_fn.call(null,topic))));
}
});})(or__16503__auto__,mults))
),topic);
}
});})(mults))
;
var p = (function (){
if(typeof cljs.core.async.t27203 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t27203 = (function (ch,topic_fn,buf_fn,mults,ensure_mult,meta27204){
this.ch = ch;
this.topic_fn = topic_fn;
this.buf_fn = buf_fn;
this.mults = mults;
this.ensure_mult = ensure_mult;
this.meta27204 = meta27204;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t27203.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (mults,ensure_mult){
return (function (_27205,meta27204__$1){
var self__ = this;
var _27205__$1 = this;
return (new cljs.core.async.t27203(self__.ch,self__.topic_fn,self__.buf_fn,self__.mults,self__.ensure_mult,meta27204__$1));
});})(mults,ensure_mult))
;

cljs.core.async.t27203.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (mults,ensure_mult){
return (function (_27205){
var self__ = this;
var _27205__$1 = this;
return self__.meta27204;
});})(mults,ensure_mult))
;

cljs.core.async.t27203.prototype.cljs$core$async$Mux$ = true;

cljs.core.async.t27203.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(mults,ensure_mult))
;

cljs.core.async.t27203.prototype.cljs$core$async$Pub$ = true;

cljs.core.async.t27203.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$1,close_QMARK_){
var self__ = this;
var p__$1 = this;
var m = self__.ensure_mult.call(null,topic);
return cljs.core.async.tap.call(null,m,ch__$1,close_QMARK_);
});})(mults,ensure_mult))
;

cljs.core.async.t27203.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$1){
var self__ = this;
var p__$1 = this;
var temp__4425__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,self__.mults),topic);
if(cljs.core.truth_(temp__4425__auto__)){
var m = temp__4425__auto__;
return cljs.core.async.untap.call(null,m,ch__$1);
} else {
return null;
}
});})(mults,ensure_mult))
;

cljs.core.async.t27203.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.reset_BANG_.call(null,self__.mults,cljs.core.PersistentArrayMap.EMPTY);
});})(mults,ensure_mult))
;

cljs.core.async.t27203.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = ((function (mults,ensure_mult){
return (function (_,topic){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.call(null,self__.mults,cljs.core.dissoc,topic);
});})(mults,ensure_mult))
;

cljs.core.async.t27203.getBasis = ((function (mults,ensure_mult){
return (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"topic-fn","topic-fn",-862449736,null),new cljs.core.Symbol(null,"buf-fn","buf-fn",-1200281591,null),new cljs.core.Symbol(null,"mults","mults",-461114485,null),new cljs.core.Symbol(null,"ensure-mult","ensure-mult",1796584816,null),new cljs.core.Symbol(null,"meta27204","meta27204",-1563281429,null)], null);
});})(mults,ensure_mult))
;

cljs.core.async.t27203.cljs$lang$type = true;

cljs.core.async.t27203.cljs$lang$ctorStr = "cljs.core.async/t27203";

cljs.core.async.t27203.cljs$lang$ctorPrWriter = ((function (mults,ensure_mult){
return (function (this__17082__auto__,writer__17083__auto__,opt__17084__auto__){
return cljs.core._write.call(null,writer__17083__auto__,"cljs.core.async/t27203");
});})(mults,ensure_mult))
;

cljs.core.async.__GT_t27203 = ((function (mults,ensure_mult){
return (function cljs$core$async$__GT_t27203(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta27204){
return (new cljs.core.async.t27203(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta27204));
});})(mults,ensure_mult))
;

}

return (new cljs.core.async.t27203(ch,topic_fn,buf_fn,mults,ensure_mult,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__19686__auto___27329 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19686__auto___27329,mults,ensure_mult,p){
return (function (){
var f__19687__auto__ = (function (){var switch__19621__auto__ = ((function (c__19686__auto___27329,mults,ensure_mult,p){
return (function (state_27277){
var state_val_27278 = (state_27277[(1)]);
if((state_val_27278 === (7))){
var inst_27273 = (state_27277[(2)]);
var state_27277__$1 = state_27277;
var statearr_27279_27330 = state_27277__$1;
(statearr_27279_27330[(2)] = inst_27273);

(statearr_27279_27330[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27278 === (20))){
var state_27277__$1 = state_27277;
var statearr_27280_27331 = state_27277__$1;
(statearr_27280_27331[(2)] = null);

(statearr_27280_27331[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27278 === (1))){
var state_27277__$1 = state_27277;
var statearr_27281_27332 = state_27277__$1;
(statearr_27281_27332[(2)] = null);

(statearr_27281_27332[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27278 === (24))){
var inst_27256 = (state_27277[(7)]);
var inst_27265 = cljs.core.swap_BANG_.call(null,mults,cljs.core.dissoc,inst_27256);
var state_27277__$1 = state_27277;
var statearr_27282_27333 = state_27277__$1;
(statearr_27282_27333[(2)] = inst_27265);

(statearr_27282_27333[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27278 === (4))){
var inst_27208 = (state_27277[(8)]);
var inst_27208__$1 = (state_27277[(2)]);
var inst_27209 = (inst_27208__$1 == null);
var state_27277__$1 = (function (){var statearr_27283 = state_27277;
(statearr_27283[(8)] = inst_27208__$1);

return statearr_27283;
})();
if(cljs.core.truth_(inst_27209)){
var statearr_27284_27334 = state_27277__$1;
(statearr_27284_27334[(1)] = (5));

} else {
var statearr_27285_27335 = state_27277__$1;
(statearr_27285_27335[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27278 === (15))){
var inst_27250 = (state_27277[(2)]);
var state_27277__$1 = state_27277;
var statearr_27286_27336 = state_27277__$1;
(statearr_27286_27336[(2)] = inst_27250);

(statearr_27286_27336[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27278 === (21))){
var inst_27270 = (state_27277[(2)]);
var state_27277__$1 = (function (){var statearr_27287 = state_27277;
(statearr_27287[(9)] = inst_27270);

return statearr_27287;
})();
var statearr_27288_27337 = state_27277__$1;
(statearr_27288_27337[(2)] = null);

(statearr_27288_27337[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27278 === (13))){
var inst_27232 = (state_27277[(10)]);
var inst_27234 = cljs.core.chunked_seq_QMARK_.call(null,inst_27232);
var state_27277__$1 = state_27277;
if(inst_27234){
var statearr_27289_27338 = state_27277__$1;
(statearr_27289_27338[(1)] = (16));

} else {
var statearr_27290_27339 = state_27277__$1;
(statearr_27290_27339[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27278 === (22))){
var inst_27262 = (state_27277[(2)]);
var state_27277__$1 = state_27277;
if(cljs.core.truth_(inst_27262)){
var statearr_27291_27340 = state_27277__$1;
(statearr_27291_27340[(1)] = (23));

} else {
var statearr_27292_27341 = state_27277__$1;
(statearr_27292_27341[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27278 === (6))){
var inst_27258 = (state_27277[(11)]);
var inst_27256 = (state_27277[(7)]);
var inst_27208 = (state_27277[(8)]);
var inst_27256__$1 = topic_fn.call(null,inst_27208);
var inst_27257 = cljs.core.deref.call(null,mults);
var inst_27258__$1 = cljs.core.get.call(null,inst_27257,inst_27256__$1);
var state_27277__$1 = (function (){var statearr_27293 = state_27277;
(statearr_27293[(11)] = inst_27258__$1);

(statearr_27293[(7)] = inst_27256__$1);

return statearr_27293;
})();
if(cljs.core.truth_(inst_27258__$1)){
var statearr_27294_27342 = state_27277__$1;
(statearr_27294_27342[(1)] = (19));

} else {
var statearr_27295_27343 = state_27277__$1;
(statearr_27295_27343[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27278 === (25))){
var inst_27267 = (state_27277[(2)]);
var state_27277__$1 = state_27277;
var statearr_27296_27344 = state_27277__$1;
(statearr_27296_27344[(2)] = inst_27267);

(statearr_27296_27344[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27278 === (17))){
var inst_27232 = (state_27277[(10)]);
var inst_27241 = cljs.core.first.call(null,inst_27232);
var inst_27242 = cljs.core.async.muxch_STAR_.call(null,inst_27241);
var inst_27243 = cljs.core.async.close_BANG_.call(null,inst_27242);
var inst_27244 = cljs.core.next.call(null,inst_27232);
var inst_27218 = inst_27244;
var inst_27219 = null;
var inst_27220 = (0);
var inst_27221 = (0);
var state_27277__$1 = (function (){var statearr_27297 = state_27277;
(statearr_27297[(12)] = inst_27221);

(statearr_27297[(13)] = inst_27218);

(statearr_27297[(14)] = inst_27220);

(statearr_27297[(15)] = inst_27243);

(statearr_27297[(16)] = inst_27219);

return statearr_27297;
})();
var statearr_27298_27345 = state_27277__$1;
(statearr_27298_27345[(2)] = null);

(statearr_27298_27345[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27278 === (3))){
var inst_27275 = (state_27277[(2)]);
var state_27277__$1 = state_27277;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27277__$1,inst_27275);
} else {
if((state_val_27278 === (12))){
var inst_27252 = (state_27277[(2)]);
var state_27277__$1 = state_27277;
var statearr_27299_27346 = state_27277__$1;
(statearr_27299_27346[(2)] = inst_27252);

(statearr_27299_27346[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27278 === (2))){
var state_27277__$1 = state_27277;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27277__$1,(4),ch);
} else {
if((state_val_27278 === (23))){
var state_27277__$1 = state_27277;
var statearr_27300_27347 = state_27277__$1;
(statearr_27300_27347[(2)] = null);

(statearr_27300_27347[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27278 === (19))){
var inst_27258 = (state_27277[(11)]);
var inst_27208 = (state_27277[(8)]);
var inst_27260 = cljs.core.async.muxch_STAR_.call(null,inst_27258);
var state_27277__$1 = state_27277;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_27277__$1,(22),inst_27260,inst_27208);
} else {
if((state_val_27278 === (11))){
var inst_27218 = (state_27277[(13)]);
var inst_27232 = (state_27277[(10)]);
var inst_27232__$1 = cljs.core.seq.call(null,inst_27218);
var state_27277__$1 = (function (){var statearr_27301 = state_27277;
(statearr_27301[(10)] = inst_27232__$1);

return statearr_27301;
})();
if(inst_27232__$1){
var statearr_27302_27348 = state_27277__$1;
(statearr_27302_27348[(1)] = (13));

} else {
var statearr_27303_27349 = state_27277__$1;
(statearr_27303_27349[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27278 === (9))){
var inst_27254 = (state_27277[(2)]);
var state_27277__$1 = state_27277;
var statearr_27304_27350 = state_27277__$1;
(statearr_27304_27350[(2)] = inst_27254);

(statearr_27304_27350[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27278 === (5))){
var inst_27215 = cljs.core.deref.call(null,mults);
var inst_27216 = cljs.core.vals.call(null,inst_27215);
var inst_27217 = cljs.core.seq.call(null,inst_27216);
var inst_27218 = inst_27217;
var inst_27219 = null;
var inst_27220 = (0);
var inst_27221 = (0);
var state_27277__$1 = (function (){var statearr_27305 = state_27277;
(statearr_27305[(12)] = inst_27221);

(statearr_27305[(13)] = inst_27218);

(statearr_27305[(14)] = inst_27220);

(statearr_27305[(16)] = inst_27219);

return statearr_27305;
})();
var statearr_27306_27351 = state_27277__$1;
(statearr_27306_27351[(2)] = null);

(statearr_27306_27351[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27278 === (14))){
var state_27277__$1 = state_27277;
var statearr_27310_27352 = state_27277__$1;
(statearr_27310_27352[(2)] = null);

(statearr_27310_27352[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27278 === (16))){
var inst_27232 = (state_27277[(10)]);
var inst_27236 = cljs.core.chunk_first.call(null,inst_27232);
var inst_27237 = cljs.core.chunk_rest.call(null,inst_27232);
var inst_27238 = cljs.core.count.call(null,inst_27236);
var inst_27218 = inst_27237;
var inst_27219 = inst_27236;
var inst_27220 = inst_27238;
var inst_27221 = (0);
var state_27277__$1 = (function (){var statearr_27311 = state_27277;
(statearr_27311[(12)] = inst_27221);

(statearr_27311[(13)] = inst_27218);

(statearr_27311[(14)] = inst_27220);

(statearr_27311[(16)] = inst_27219);

return statearr_27311;
})();
var statearr_27312_27353 = state_27277__$1;
(statearr_27312_27353[(2)] = null);

(statearr_27312_27353[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27278 === (10))){
var inst_27221 = (state_27277[(12)]);
var inst_27218 = (state_27277[(13)]);
var inst_27220 = (state_27277[(14)]);
var inst_27219 = (state_27277[(16)]);
var inst_27226 = cljs.core._nth.call(null,inst_27219,inst_27221);
var inst_27227 = cljs.core.async.muxch_STAR_.call(null,inst_27226);
var inst_27228 = cljs.core.async.close_BANG_.call(null,inst_27227);
var inst_27229 = (inst_27221 + (1));
var tmp27307 = inst_27218;
var tmp27308 = inst_27220;
var tmp27309 = inst_27219;
var inst_27218__$1 = tmp27307;
var inst_27219__$1 = tmp27309;
var inst_27220__$1 = tmp27308;
var inst_27221__$1 = inst_27229;
var state_27277__$1 = (function (){var statearr_27313 = state_27277;
(statearr_27313[(12)] = inst_27221__$1);

(statearr_27313[(13)] = inst_27218__$1);

(statearr_27313[(14)] = inst_27220__$1);

(statearr_27313[(17)] = inst_27228);

(statearr_27313[(16)] = inst_27219__$1);

return statearr_27313;
})();
var statearr_27314_27354 = state_27277__$1;
(statearr_27314_27354[(2)] = null);

(statearr_27314_27354[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27278 === (18))){
var inst_27247 = (state_27277[(2)]);
var state_27277__$1 = state_27277;
var statearr_27315_27355 = state_27277__$1;
(statearr_27315_27355[(2)] = inst_27247);

(statearr_27315_27355[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27278 === (8))){
var inst_27221 = (state_27277[(12)]);
var inst_27220 = (state_27277[(14)]);
var inst_27223 = (inst_27221 < inst_27220);
var inst_27224 = inst_27223;
var state_27277__$1 = state_27277;
if(cljs.core.truth_(inst_27224)){
var statearr_27316_27356 = state_27277__$1;
(statearr_27316_27356[(1)] = (10));

} else {
var statearr_27317_27357 = state_27277__$1;
(statearr_27317_27357[(1)] = (11));

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
});})(c__19686__auto___27329,mults,ensure_mult,p))
;
return ((function (switch__19621__auto__,c__19686__auto___27329,mults,ensure_mult,p){
return (function() {
var cljs$core$async$state_machine__19622__auto__ = null;
var cljs$core$async$state_machine__19622__auto____0 = (function (){
var statearr_27321 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_27321[(0)] = cljs$core$async$state_machine__19622__auto__);

(statearr_27321[(1)] = (1));

return statearr_27321;
});
var cljs$core$async$state_machine__19622__auto____1 = (function (state_27277){
while(true){
var ret_value__19623__auto__ = (function (){try{while(true){
var result__19624__auto__ = switch__19621__auto__.call(null,state_27277);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19624__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19624__auto__;
}
break;
}
}catch (e27322){if((e27322 instanceof Object)){
var ex__19625__auto__ = e27322;
var statearr_27323_27358 = state_27277;
(statearr_27323_27358[(5)] = ex__19625__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27277);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e27322;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19623__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27359 = state_27277;
state_27277 = G__27359;
continue;
} else {
return ret_value__19623__auto__;
}
break;
}
});
cljs$core$async$state_machine__19622__auto__ = function(state_27277){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__19622__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__19622__auto____1.call(this,state_27277);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__19622__auto____0;
cljs$core$async$state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__19622__auto____1;
return cljs$core$async$state_machine__19622__auto__;
})()
;})(switch__19621__auto__,c__19686__auto___27329,mults,ensure_mult,p))
})();
var state__19688__auto__ = (function (){var statearr_27324 = f__19687__auto__.call(null);
(statearr_27324[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19686__auto___27329);

return statearr_27324;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19688__auto__);
});})(c__19686__auto___27329,mults,ensure_mult,p))
);


return p;
});

cljs.core.async.pub.cljs$lang$maxFixedArity = 3;
/**
 * Subscribes a channel to a topic of a pub.
 * 
 * By default the channel will be closed when the source closes,
 * but can be determined by the close? parameter.
 */
cljs.core.async.sub = (function cljs$core$async$sub(){
var args27360 = [];
var len__17542__auto___27363 = arguments.length;
var i__17543__auto___27364 = (0);
while(true){
if((i__17543__auto___27364 < len__17542__auto___27363)){
args27360.push((arguments[i__17543__auto___27364]));

var G__27365 = (i__17543__auto___27364 + (1));
i__17543__auto___27364 = G__27365;
continue;
} else {
}
break;
}

var G__27362 = args27360.length;
switch (G__27362) {
case 3:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args27360.length)].join('')));

}
});

cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3 = (function (p,topic,ch){
return cljs.core.async.sub.call(null,p,topic,ch,true);
});

cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4 = (function (p,topic,ch,close_QMARK_){
return cljs.core.async.sub_STAR_.call(null,p,topic,ch,close_QMARK_);
});

cljs.core.async.sub.cljs$lang$maxFixedArity = 4;
/**
 * Unsubscribes a channel from a topic of a pub
 */
cljs.core.async.unsub = (function cljs$core$async$unsub(p,topic,ch){
return cljs.core.async.unsub_STAR_.call(null,p,topic,ch);
});
/**
 * Unsubscribes all channels from a pub, or a topic of a pub
 */
cljs.core.async.unsub_all = (function cljs$core$async$unsub_all(){
var args27367 = [];
var len__17542__auto___27370 = arguments.length;
var i__17543__auto___27371 = (0);
while(true){
if((i__17543__auto___27371 < len__17542__auto___27370)){
args27367.push((arguments[i__17543__auto___27371]));

var G__27372 = (i__17543__auto___27371 + (1));
i__17543__auto___27371 = G__27372;
continue;
} else {
}
break;
}

var G__27369 = args27367.length;
switch (G__27369) {
case 1:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args27367.length)].join('')));

}
});

cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1 = (function (p){
return cljs.core.async.unsub_all_STAR_.call(null,p);
});

cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2 = (function (p,topic){
return cljs.core.async.unsub_all_STAR_.call(null,p,topic);
});

cljs.core.async.unsub_all.cljs$lang$maxFixedArity = 2;
/**
 * Takes a function and a collection of source channels, and returns a
 * channel which contains the values produced by applying f to the set
 * of first items taken from each source channel, followed by applying
 * f to the set of second items from each channel, until any one of the
 * channels is closed, at which point the output channel will be
 * closed. The returned channel will be unbuffered by default, or a
 * buf-or-n can be supplied
 */
cljs.core.async.map = (function cljs$core$async$map(){
var args27374 = [];
var len__17542__auto___27445 = arguments.length;
var i__17543__auto___27446 = (0);
while(true){
if((i__17543__auto___27446 < len__17542__auto___27445)){
args27374.push((arguments[i__17543__auto___27446]));

var G__27447 = (i__17543__auto___27446 + (1));
i__17543__auto___27446 = G__27447;
continue;
} else {
}
break;
}

var G__27376 = args27374.length;
switch (G__27376) {
case 2:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args27374.length)].join('')));

}
});

cljs.core.async.map.cljs$core$IFn$_invoke$arity$2 = (function (f,chs){
return cljs.core.async.map.call(null,f,chs,null);
});

cljs.core.async.map.cljs$core$IFn$_invoke$arity$3 = (function (f,chs,buf_or_n){
var chs__$1 = cljs.core.vec.call(null,chs);
var out = cljs.core.async.chan.call(null,buf_or_n);
var cnt = cljs.core.count.call(null,chs__$1);
var rets = cljs.core.object_array.call(null,cnt);
var dchan = cljs.core.async.chan.call(null,(1));
var dctr = cljs.core.atom.call(null,null);
var done = cljs.core.mapv.call(null,((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (i){
return ((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (ret){
(rets[i] = ret);

if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.call(null,dchan,rets.slice((0)));
} else {
return null;
}
});
;})(chs__$1,out,cnt,rets,dchan,dctr))
});})(chs__$1,out,cnt,rets,dchan,dctr))
,cljs.core.range.call(null,cnt));
var c__19686__auto___27449 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19686__auto___27449,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (){
var f__19687__auto__ = (function (){var switch__19621__auto__ = ((function (c__19686__auto___27449,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (state_27415){
var state_val_27416 = (state_27415[(1)]);
if((state_val_27416 === (7))){
var state_27415__$1 = state_27415;
var statearr_27417_27450 = state_27415__$1;
(statearr_27417_27450[(2)] = null);

(statearr_27417_27450[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (1))){
var state_27415__$1 = state_27415;
var statearr_27418_27451 = state_27415__$1;
(statearr_27418_27451[(2)] = null);

(statearr_27418_27451[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (4))){
var inst_27379 = (state_27415[(7)]);
var inst_27381 = (inst_27379 < cnt);
var state_27415__$1 = state_27415;
if(cljs.core.truth_(inst_27381)){
var statearr_27419_27452 = state_27415__$1;
(statearr_27419_27452[(1)] = (6));

} else {
var statearr_27420_27453 = state_27415__$1;
(statearr_27420_27453[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (15))){
var inst_27411 = (state_27415[(2)]);
var state_27415__$1 = state_27415;
var statearr_27421_27454 = state_27415__$1;
(statearr_27421_27454[(2)] = inst_27411);

(statearr_27421_27454[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (13))){
var inst_27404 = cljs.core.async.close_BANG_.call(null,out);
var state_27415__$1 = state_27415;
var statearr_27422_27455 = state_27415__$1;
(statearr_27422_27455[(2)] = inst_27404);

(statearr_27422_27455[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (6))){
var state_27415__$1 = state_27415;
var statearr_27423_27456 = state_27415__$1;
(statearr_27423_27456[(2)] = null);

(statearr_27423_27456[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (3))){
var inst_27413 = (state_27415[(2)]);
var state_27415__$1 = state_27415;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27415__$1,inst_27413);
} else {
if((state_val_27416 === (12))){
var inst_27401 = (state_27415[(8)]);
var inst_27401__$1 = (state_27415[(2)]);
var inst_27402 = cljs.core.some.call(null,cljs.core.nil_QMARK_,inst_27401__$1);
var state_27415__$1 = (function (){var statearr_27424 = state_27415;
(statearr_27424[(8)] = inst_27401__$1);

return statearr_27424;
})();
if(cljs.core.truth_(inst_27402)){
var statearr_27425_27457 = state_27415__$1;
(statearr_27425_27457[(1)] = (13));

} else {
var statearr_27426_27458 = state_27415__$1;
(statearr_27426_27458[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (2))){
var inst_27378 = cljs.core.reset_BANG_.call(null,dctr,cnt);
var inst_27379 = (0);
var state_27415__$1 = (function (){var statearr_27427 = state_27415;
(statearr_27427[(7)] = inst_27379);

(statearr_27427[(9)] = inst_27378);

return statearr_27427;
})();
var statearr_27428_27459 = state_27415__$1;
(statearr_27428_27459[(2)] = null);

(statearr_27428_27459[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (11))){
var inst_27379 = (state_27415[(7)]);
var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_27415,(10),Object,null,(9));
var inst_27388 = chs__$1.call(null,inst_27379);
var inst_27389 = done.call(null,inst_27379);
var inst_27390 = cljs.core.async.take_BANG_.call(null,inst_27388,inst_27389);
var state_27415__$1 = state_27415;
var statearr_27429_27460 = state_27415__$1;
(statearr_27429_27460[(2)] = inst_27390);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27415__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (9))){
var inst_27379 = (state_27415[(7)]);
var inst_27392 = (state_27415[(2)]);
var inst_27393 = (inst_27379 + (1));
var inst_27379__$1 = inst_27393;
var state_27415__$1 = (function (){var statearr_27430 = state_27415;
(statearr_27430[(7)] = inst_27379__$1);

(statearr_27430[(10)] = inst_27392);

return statearr_27430;
})();
var statearr_27431_27461 = state_27415__$1;
(statearr_27431_27461[(2)] = null);

(statearr_27431_27461[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (5))){
var inst_27399 = (state_27415[(2)]);
var state_27415__$1 = (function (){var statearr_27432 = state_27415;
(statearr_27432[(11)] = inst_27399);

return statearr_27432;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27415__$1,(12),dchan);
} else {
if((state_val_27416 === (14))){
var inst_27401 = (state_27415[(8)]);
var inst_27406 = cljs.core.apply.call(null,f,inst_27401);
var state_27415__$1 = state_27415;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_27415__$1,(16),out,inst_27406);
} else {
if((state_val_27416 === (16))){
var inst_27408 = (state_27415[(2)]);
var state_27415__$1 = (function (){var statearr_27433 = state_27415;
(statearr_27433[(12)] = inst_27408);

return statearr_27433;
})();
var statearr_27434_27462 = state_27415__$1;
(statearr_27434_27462[(2)] = null);

(statearr_27434_27462[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (10))){
var inst_27383 = (state_27415[(2)]);
var inst_27384 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);
var state_27415__$1 = (function (){var statearr_27435 = state_27415;
(statearr_27435[(13)] = inst_27383);

return statearr_27435;
})();
var statearr_27436_27463 = state_27415__$1;
(statearr_27436_27463[(2)] = inst_27384);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27415__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27416 === (8))){
var inst_27397 = (state_27415[(2)]);
var state_27415__$1 = state_27415;
var statearr_27437_27464 = state_27415__$1;
(statearr_27437_27464[(2)] = inst_27397);

(statearr_27437_27464[(1)] = (5));


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
});})(c__19686__auto___27449,chs__$1,out,cnt,rets,dchan,dctr,done))
;
return ((function (switch__19621__auto__,c__19686__auto___27449,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function() {
var cljs$core$async$state_machine__19622__auto__ = null;
var cljs$core$async$state_machine__19622__auto____0 = (function (){
var statearr_27441 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_27441[(0)] = cljs$core$async$state_machine__19622__auto__);

(statearr_27441[(1)] = (1));

return statearr_27441;
});
var cljs$core$async$state_machine__19622__auto____1 = (function (state_27415){
while(true){
var ret_value__19623__auto__ = (function (){try{while(true){
var result__19624__auto__ = switch__19621__auto__.call(null,state_27415);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19624__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19624__auto__;
}
break;
}
}catch (e27442){if((e27442 instanceof Object)){
var ex__19625__auto__ = e27442;
var statearr_27443_27465 = state_27415;
(statearr_27443_27465[(5)] = ex__19625__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27415);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e27442;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19623__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27466 = state_27415;
state_27415 = G__27466;
continue;
} else {
return ret_value__19623__auto__;
}
break;
}
});
cljs$core$async$state_machine__19622__auto__ = function(state_27415){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__19622__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__19622__auto____1.call(this,state_27415);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__19622__auto____0;
cljs$core$async$state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__19622__auto____1;
return cljs$core$async$state_machine__19622__auto__;
})()
;})(switch__19621__auto__,c__19686__auto___27449,chs__$1,out,cnt,rets,dchan,dctr,done))
})();
var state__19688__auto__ = (function (){var statearr_27444 = f__19687__auto__.call(null);
(statearr_27444[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19686__auto___27449);

return statearr_27444;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19688__auto__);
});})(c__19686__auto___27449,chs__$1,out,cnt,rets,dchan,dctr,done))
);


return out;
});

cljs.core.async.map.cljs$lang$maxFixedArity = 3;
/**
 * Takes a collection of source channels and returns a channel which
 * contains all values taken from them. The returned channel will be
 * unbuffered by default, or a buf-or-n can be supplied. The channel
 * will close after all the source channels have closed.
 */
cljs.core.async.merge = (function cljs$core$async$merge(){
var args27468 = [];
var len__17542__auto___27524 = arguments.length;
var i__17543__auto___27525 = (0);
while(true){
if((i__17543__auto___27525 < len__17542__auto___27524)){
args27468.push((arguments[i__17543__auto___27525]));

var G__27526 = (i__17543__auto___27525 + (1));
i__17543__auto___27525 = G__27526;
continue;
} else {
}
break;
}

var G__27470 = args27468.length;
switch (G__27470) {
case 1:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args27468.length)].join('')));

}
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1 = (function (chs){
return cljs.core.async.merge.call(null,chs,null);
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2 = (function (chs,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__19686__auto___27528 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19686__auto___27528,out){
return (function (){
var f__19687__auto__ = (function (){var switch__19621__auto__ = ((function (c__19686__auto___27528,out){
return (function (state_27500){
var state_val_27501 = (state_27500[(1)]);
if((state_val_27501 === (7))){
var inst_27480 = (state_27500[(7)]);
var inst_27479 = (state_27500[(8)]);
var inst_27479__$1 = (state_27500[(2)]);
var inst_27480__$1 = cljs.core.nth.call(null,inst_27479__$1,(0),null);
var inst_27481 = cljs.core.nth.call(null,inst_27479__$1,(1),null);
var inst_27482 = (inst_27480__$1 == null);
var state_27500__$1 = (function (){var statearr_27502 = state_27500;
(statearr_27502[(7)] = inst_27480__$1);

(statearr_27502[(9)] = inst_27481);

(statearr_27502[(8)] = inst_27479__$1);

return statearr_27502;
})();
if(cljs.core.truth_(inst_27482)){
var statearr_27503_27529 = state_27500__$1;
(statearr_27503_27529[(1)] = (8));

} else {
var statearr_27504_27530 = state_27500__$1;
(statearr_27504_27530[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27501 === (1))){
var inst_27471 = cljs.core.vec.call(null,chs);
var inst_27472 = inst_27471;
var state_27500__$1 = (function (){var statearr_27505 = state_27500;
(statearr_27505[(10)] = inst_27472);

return statearr_27505;
})();
var statearr_27506_27531 = state_27500__$1;
(statearr_27506_27531[(2)] = null);

(statearr_27506_27531[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27501 === (4))){
var inst_27472 = (state_27500[(10)]);
var state_27500__$1 = state_27500;
return cljs.core.async.ioc_alts_BANG_.call(null,state_27500__$1,(7),inst_27472);
} else {
if((state_val_27501 === (6))){
var inst_27496 = (state_27500[(2)]);
var state_27500__$1 = state_27500;
var statearr_27507_27532 = state_27500__$1;
(statearr_27507_27532[(2)] = inst_27496);

(statearr_27507_27532[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27501 === (3))){
var inst_27498 = (state_27500[(2)]);
var state_27500__$1 = state_27500;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27500__$1,inst_27498);
} else {
if((state_val_27501 === (2))){
var inst_27472 = (state_27500[(10)]);
var inst_27474 = cljs.core.count.call(null,inst_27472);
var inst_27475 = (inst_27474 > (0));
var state_27500__$1 = state_27500;
if(cljs.core.truth_(inst_27475)){
var statearr_27509_27533 = state_27500__$1;
(statearr_27509_27533[(1)] = (4));

} else {
var statearr_27510_27534 = state_27500__$1;
(statearr_27510_27534[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27501 === (11))){
var inst_27472 = (state_27500[(10)]);
var inst_27489 = (state_27500[(2)]);
var tmp27508 = inst_27472;
var inst_27472__$1 = tmp27508;
var state_27500__$1 = (function (){var statearr_27511 = state_27500;
(statearr_27511[(11)] = inst_27489);

(statearr_27511[(10)] = inst_27472__$1);

return statearr_27511;
})();
var statearr_27512_27535 = state_27500__$1;
(statearr_27512_27535[(2)] = null);

(statearr_27512_27535[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27501 === (9))){
var inst_27480 = (state_27500[(7)]);
var state_27500__$1 = state_27500;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_27500__$1,(11),out,inst_27480);
} else {
if((state_val_27501 === (5))){
var inst_27494 = cljs.core.async.close_BANG_.call(null,out);
var state_27500__$1 = state_27500;
var statearr_27513_27536 = state_27500__$1;
(statearr_27513_27536[(2)] = inst_27494);

(statearr_27513_27536[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27501 === (10))){
var inst_27492 = (state_27500[(2)]);
var state_27500__$1 = state_27500;
var statearr_27514_27537 = state_27500__$1;
(statearr_27514_27537[(2)] = inst_27492);

(statearr_27514_27537[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27501 === (8))){
var inst_27480 = (state_27500[(7)]);
var inst_27481 = (state_27500[(9)]);
var inst_27472 = (state_27500[(10)]);
var inst_27479 = (state_27500[(8)]);
var inst_27484 = (function (){var cs = inst_27472;
var vec__27477 = inst_27479;
var v = inst_27480;
var c = inst_27481;
return ((function (cs,vec__27477,v,c,inst_27480,inst_27481,inst_27472,inst_27479,state_val_27501,c__19686__auto___27528,out){
return (function (p1__27467_SHARP_){
return cljs.core.not_EQ_.call(null,c,p1__27467_SHARP_);
});
;})(cs,vec__27477,v,c,inst_27480,inst_27481,inst_27472,inst_27479,state_val_27501,c__19686__auto___27528,out))
})();
var inst_27485 = cljs.core.filterv.call(null,inst_27484,inst_27472);
var inst_27472__$1 = inst_27485;
var state_27500__$1 = (function (){var statearr_27515 = state_27500;
(statearr_27515[(10)] = inst_27472__$1);

return statearr_27515;
})();
var statearr_27516_27538 = state_27500__$1;
(statearr_27516_27538[(2)] = null);

(statearr_27516_27538[(1)] = (2));


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
});})(c__19686__auto___27528,out))
;
return ((function (switch__19621__auto__,c__19686__auto___27528,out){
return (function() {
var cljs$core$async$state_machine__19622__auto__ = null;
var cljs$core$async$state_machine__19622__auto____0 = (function (){
var statearr_27520 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_27520[(0)] = cljs$core$async$state_machine__19622__auto__);

(statearr_27520[(1)] = (1));

return statearr_27520;
});
var cljs$core$async$state_machine__19622__auto____1 = (function (state_27500){
while(true){
var ret_value__19623__auto__ = (function (){try{while(true){
var result__19624__auto__ = switch__19621__auto__.call(null,state_27500);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19624__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19624__auto__;
}
break;
}
}catch (e27521){if((e27521 instanceof Object)){
var ex__19625__auto__ = e27521;
var statearr_27522_27539 = state_27500;
(statearr_27522_27539[(5)] = ex__19625__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27500);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e27521;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19623__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27540 = state_27500;
state_27500 = G__27540;
continue;
} else {
return ret_value__19623__auto__;
}
break;
}
});
cljs$core$async$state_machine__19622__auto__ = function(state_27500){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__19622__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__19622__auto____1.call(this,state_27500);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__19622__auto____0;
cljs$core$async$state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__19622__auto____1;
return cljs$core$async$state_machine__19622__auto__;
})()
;})(switch__19621__auto__,c__19686__auto___27528,out))
})();
var state__19688__auto__ = (function (){var statearr_27523 = f__19687__auto__.call(null);
(statearr_27523[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19686__auto___27528);

return statearr_27523;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19688__auto__);
});})(c__19686__auto___27528,out))
);


return out;
});

cljs.core.async.merge.cljs$lang$maxFixedArity = 2;
/**
 * Returns a channel containing the single (collection) result of the
 * items taken from the channel conjoined to the supplied
 * collection. ch must close before into produces a result.
 */
cljs.core.async.into = (function cljs$core$async$into(coll,ch){
return cljs.core.async.reduce.call(null,cljs.core.conj,coll,ch);
});
/**
 * Returns a channel that will return, at most, n items from ch. After n items
 * have been returned, or ch has been closed, the return chanel will close.
 * 
 * The output channel is unbuffered by default, unless buf-or-n is given.
 */
cljs.core.async.take = (function cljs$core$async$take(){
var args27541 = [];
var len__17542__auto___27590 = arguments.length;
var i__17543__auto___27591 = (0);
while(true){
if((i__17543__auto___27591 < len__17542__auto___27590)){
args27541.push((arguments[i__17543__auto___27591]));

var G__27592 = (i__17543__auto___27591 + (1));
i__17543__auto___27591 = G__27592;
continue;
} else {
}
break;
}

var G__27543 = args27541.length;
switch (G__27543) {
case 2:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args27541.length)].join('')));

}
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.take.call(null,n,ch,null);
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__19686__auto___27594 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19686__auto___27594,out){
return (function (){
var f__19687__auto__ = (function (){var switch__19621__auto__ = ((function (c__19686__auto___27594,out){
return (function (state_27567){
var state_val_27568 = (state_27567[(1)]);
if((state_val_27568 === (7))){
var inst_27549 = (state_27567[(7)]);
var inst_27549__$1 = (state_27567[(2)]);
var inst_27550 = (inst_27549__$1 == null);
var inst_27551 = cljs.core.not.call(null,inst_27550);
var state_27567__$1 = (function (){var statearr_27569 = state_27567;
(statearr_27569[(7)] = inst_27549__$1);

return statearr_27569;
})();
if(inst_27551){
var statearr_27570_27595 = state_27567__$1;
(statearr_27570_27595[(1)] = (8));

} else {
var statearr_27571_27596 = state_27567__$1;
(statearr_27571_27596[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27568 === (1))){
var inst_27544 = (0);
var state_27567__$1 = (function (){var statearr_27572 = state_27567;
(statearr_27572[(8)] = inst_27544);

return statearr_27572;
})();
var statearr_27573_27597 = state_27567__$1;
(statearr_27573_27597[(2)] = null);

(statearr_27573_27597[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27568 === (4))){
var state_27567__$1 = state_27567;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27567__$1,(7),ch);
} else {
if((state_val_27568 === (6))){
var inst_27562 = (state_27567[(2)]);
var state_27567__$1 = state_27567;
var statearr_27574_27598 = state_27567__$1;
(statearr_27574_27598[(2)] = inst_27562);

(statearr_27574_27598[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27568 === (3))){
var inst_27564 = (state_27567[(2)]);
var inst_27565 = cljs.core.async.close_BANG_.call(null,out);
var state_27567__$1 = (function (){var statearr_27575 = state_27567;
(statearr_27575[(9)] = inst_27564);

return statearr_27575;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27567__$1,inst_27565);
} else {
if((state_val_27568 === (2))){
var inst_27544 = (state_27567[(8)]);
var inst_27546 = (inst_27544 < n);
var state_27567__$1 = state_27567;
if(cljs.core.truth_(inst_27546)){
var statearr_27576_27599 = state_27567__$1;
(statearr_27576_27599[(1)] = (4));

} else {
var statearr_27577_27600 = state_27567__$1;
(statearr_27577_27600[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27568 === (11))){
var inst_27544 = (state_27567[(8)]);
var inst_27554 = (state_27567[(2)]);
var inst_27555 = (inst_27544 + (1));
var inst_27544__$1 = inst_27555;
var state_27567__$1 = (function (){var statearr_27578 = state_27567;
(statearr_27578[(8)] = inst_27544__$1);

(statearr_27578[(10)] = inst_27554);

return statearr_27578;
})();
var statearr_27579_27601 = state_27567__$1;
(statearr_27579_27601[(2)] = null);

(statearr_27579_27601[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27568 === (9))){
var state_27567__$1 = state_27567;
var statearr_27580_27602 = state_27567__$1;
(statearr_27580_27602[(2)] = null);

(statearr_27580_27602[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27568 === (5))){
var state_27567__$1 = state_27567;
var statearr_27581_27603 = state_27567__$1;
(statearr_27581_27603[(2)] = null);

(statearr_27581_27603[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27568 === (10))){
var inst_27559 = (state_27567[(2)]);
var state_27567__$1 = state_27567;
var statearr_27582_27604 = state_27567__$1;
(statearr_27582_27604[(2)] = inst_27559);

(statearr_27582_27604[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27568 === (8))){
var inst_27549 = (state_27567[(7)]);
var state_27567__$1 = state_27567;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_27567__$1,(11),out,inst_27549);
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
});})(c__19686__auto___27594,out))
;
return ((function (switch__19621__auto__,c__19686__auto___27594,out){
return (function() {
var cljs$core$async$state_machine__19622__auto__ = null;
var cljs$core$async$state_machine__19622__auto____0 = (function (){
var statearr_27586 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_27586[(0)] = cljs$core$async$state_machine__19622__auto__);

(statearr_27586[(1)] = (1));

return statearr_27586;
});
var cljs$core$async$state_machine__19622__auto____1 = (function (state_27567){
while(true){
var ret_value__19623__auto__ = (function (){try{while(true){
var result__19624__auto__ = switch__19621__auto__.call(null,state_27567);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19624__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19624__auto__;
}
break;
}
}catch (e27587){if((e27587 instanceof Object)){
var ex__19625__auto__ = e27587;
var statearr_27588_27605 = state_27567;
(statearr_27588_27605[(5)] = ex__19625__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27567);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e27587;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19623__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27606 = state_27567;
state_27567 = G__27606;
continue;
} else {
return ret_value__19623__auto__;
}
break;
}
});
cljs$core$async$state_machine__19622__auto__ = function(state_27567){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__19622__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__19622__auto____1.call(this,state_27567);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__19622__auto____0;
cljs$core$async$state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__19622__auto____1;
return cljs$core$async$state_machine__19622__auto__;
})()
;})(switch__19621__auto__,c__19686__auto___27594,out))
})();
var state__19688__auto__ = (function (){var statearr_27589 = f__19687__auto__.call(null);
(statearr_27589[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19686__auto___27594);

return statearr_27589;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19688__auto__);
});})(c__19686__auto___27594,out))
);


return out;
});

cljs.core.async.take.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_LT_ = (function cljs$core$async$map_LT_(f,ch){
if(typeof cljs.core.async.t27614 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t27614 = (function (map_LT_,f,ch,meta27615){
this.map_LT_ = map_LT_;
this.f = f;
this.ch = ch;
this.meta27615 = meta27615;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t27614.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_27616,meta27615__$1){
var self__ = this;
var _27616__$1 = this;
return (new cljs.core.async.t27614(self__.map_LT_,self__.f,self__.ch,meta27615__$1));
});

cljs.core.async.t27614.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_27616){
var self__ = this;
var _27616__$1 = this;
return self__.meta27615;
});

cljs.core.async.t27614.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t27614.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t27614.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});

cljs.core.async.t27614.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t27614.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,(function (){
if(typeof cljs.core.async.t27617 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t27617 = (function (map_LT_,f,ch,meta27615,_,fn1,meta27618){
this.map_LT_ = map_LT_;
this.f = f;
this.ch = ch;
this.meta27615 = meta27615;
this._ = _;
this.fn1 = fn1;
this.meta27618 = meta27618;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t27617.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (___$1){
return (function (_27619,meta27618__$1){
var self__ = this;
var _27619__$1 = this;
return (new cljs.core.async.t27617(self__.map_LT_,self__.f,self__.ch,self__.meta27615,self__._,self__.fn1,meta27618__$1));
});})(___$1))
;

cljs.core.async.t27617.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (___$1){
return (function (_27619){
var self__ = this;
var _27619__$1 = this;
return self__.meta27618;
});})(___$1))
;

cljs.core.async.t27617.prototype.cljs$core$async$impl$protocols$Handler$ = true;

cljs.core.async.t27617.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.fn1);
});})(___$1))
;

cljs.core.async.t27617.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
var f1 = cljs.core.async.impl.protocols.commit.call(null,self__.fn1);
return ((function (f1,___$2,___$1){
return (function (p1__27607_SHARP_){
return f1.call(null,(((p1__27607_SHARP_ == null))?null:self__.f.call(null,p1__27607_SHARP_)));
});
;})(f1,___$2,___$1))
});})(___$1))
;

cljs.core.async.t27617.getBasis = ((function (___$1){
return (function (){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"map<","map<",-1235808357,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta27615","meta27615",1757013107,null),cljs.core.with_meta(new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol("cljs.core.async","t27614","cljs.core.async/t27614",1300675418,null)], null)),new cljs.core.Symbol(null,"fn1","fn1",895834444,null),new cljs.core.Symbol(null,"meta27618","meta27618",-261815034,null)], null);
});})(___$1))
;

cljs.core.async.t27617.cljs$lang$type = true;

cljs.core.async.t27617.cljs$lang$ctorStr = "cljs.core.async/t27617";

cljs.core.async.t27617.cljs$lang$ctorPrWriter = ((function (___$1){
return (function (this__17082__auto__,writer__17083__auto__,opt__17084__auto__){
return cljs.core._write.call(null,writer__17083__auto__,"cljs.core.async/t27617");
});})(___$1))
;

cljs.core.async.__GT_t27617 = ((function (___$1){
return (function cljs$core$async$map_LT__$___GT_t27617(map_LT___$1,f__$1,ch__$1,meta27615__$1,___$2,fn1__$1,meta27618){
return (new cljs.core.async.t27617(map_LT___$1,f__$1,ch__$1,meta27615__$1,___$2,fn1__$1,meta27618));
});})(___$1))
;

}

return (new cljs.core.async.t27617(self__.map_LT_,self__.f,self__.ch,self__.meta27615,___$1,fn1,cljs.core.PersistentArrayMap.EMPTY));
})()
);
if(cljs.core.truth_((function (){var and__16491__auto__ = ret;
if(cljs.core.truth_(and__16491__auto__)){
return !((cljs.core.deref.call(null,ret) == null));
} else {
return and__16491__auto__;
}
})())){
return cljs.core.async.impl.channels.box.call(null,self__.f.call(null,cljs.core.deref.call(null,ret)));
} else {
return ret;
}
});

cljs.core.async.t27614.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t27614.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
});

cljs.core.async.t27614.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"map<","map<",-1235808357,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta27615","meta27615",1757013107,null)], null);
});

cljs.core.async.t27614.cljs$lang$type = true;

cljs.core.async.t27614.cljs$lang$ctorStr = "cljs.core.async/t27614";

cljs.core.async.t27614.cljs$lang$ctorPrWriter = (function (this__17082__auto__,writer__17083__auto__,opt__17084__auto__){
return cljs.core._write.call(null,writer__17083__auto__,"cljs.core.async/t27614");
});

cljs.core.async.__GT_t27614 = (function cljs$core$async$map_LT__$___GT_t27614(map_LT___$1,f__$1,ch__$1,meta27615){
return (new cljs.core.async.t27614(map_LT___$1,f__$1,ch__$1,meta27615));
});

}

return (new cljs.core.async.t27614(cljs$core$async$map_LT_,f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_GT_ = (function cljs$core$async$map_GT_(f,ch){
if(typeof cljs.core.async.t27623 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t27623 = (function (map_GT_,f,ch,meta27624){
this.map_GT_ = map_GT_;
this.f = f;
this.ch = ch;
this.meta27624 = meta27624;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t27623.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_27625,meta27624__$1){
var self__ = this;
var _27625__$1 = this;
return (new cljs.core.async.t27623(self__.map_GT_,self__.f,self__.ch,meta27624__$1));
});

cljs.core.async.t27623.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_27625){
var self__ = this;
var _27625__$1 = this;
return self__.meta27624;
});

cljs.core.async.t27623.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t27623.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t27623.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t27623.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});

cljs.core.async.t27623.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t27623.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,self__.f.call(null,val),fn1);
});

cljs.core.async.t27623.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"map>","map>",1676369295,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta27624","meta27624",-1315395998,null)], null);
});

cljs.core.async.t27623.cljs$lang$type = true;

cljs.core.async.t27623.cljs$lang$ctorStr = "cljs.core.async/t27623";

cljs.core.async.t27623.cljs$lang$ctorPrWriter = (function (this__17082__auto__,writer__17083__auto__,opt__17084__auto__){
return cljs.core._write.call(null,writer__17083__auto__,"cljs.core.async/t27623");
});

cljs.core.async.__GT_t27623 = (function cljs$core$async$map_GT__$___GT_t27623(map_GT___$1,f__$1,ch__$1,meta27624){
return (new cljs.core.async.t27623(map_GT___$1,f__$1,ch__$1,meta27624));
});

}

return (new cljs.core.async.t27623(cljs$core$async$map_GT_,f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_GT_ = (function cljs$core$async$filter_GT_(p,ch){
if(typeof cljs.core.async.t27629 !== 'undefined'){
} else {

/**
* @constructor
*/
cljs.core.async.t27629 = (function (filter_GT_,p,ch,meta27630){
this.filter_GT_ = filter_GT_;
this.p = p;
this.ch = ch;
this.meta27630 = meta27630;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.t27629.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_27631,meta27630__$1){
var self__ = this;
var _27631__$1 = this;
return (new cljs.core.async.t27629(self__.filter_GT_,self__.p,self__.ch,meta27630__$1));
});

cljs.core.async.t27629.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_27631){
var self__ = this;
var _27631__$1 = this;
return self__.meta27630;
});

cljs.core.async.t27629.prototype.cljs$core$async$impl$protocols$Channel$ = true;

cljs.core.async.t27629.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t27629.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});

cljs.core.async.t27629.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

cljs.core.async.t27629.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});

cljs.core.async.t27629.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

cljs.core.async.t27629.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.p.call(null,val))){
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
} else {
return cljs.core.async.impl.channels.box.call(null,cljs.core.not.call(null,cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch)));
}
});

cljs.core.async.t27629.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"filter>","filter>",-37644455,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"arglists","arglists",1661989754),cljs.core.list(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.list(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null)], null))),new cljs.core.Keyword(null,"doc","doc",1913296891),"Deprecated - this function will be removed. Use transducer instead"], null)),new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta27630","meta27630",1205375918,null)], null);
});

cljs.core.async.t27629.cljs$lang$type = true;

cljs.core.async.t27629.cljs$lang$ctorStr = "cljs.core.async/t27629";

cljs.core.async.t27629.cljs$lang$ctorPrWriter = (function (this__17082__auto__,writer__17083__auto__,opt__17084__auto__){
return cljs.core._write.call(null,writer__17083__auto__,"cljs.core.async/t27629");
});

cljs.core.async.__GT_t27629 = (function cljs$core$async$filter_GT__$___GT_t27629(filter_GT___$1,p__$1,ch__$1,meta27630){
return (new cljs.core.async.t27629(filter_GT___$1,p__$1,ch__$1,meta27630));
});

}

return (new cljs.core.async.t27629(cljs$core$async$filter_GT_,p,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_GT_ = (function cljs$core$async$remove_GT_(p,ch){
return cljs.core.async.filter_GT_.call(null,cljs.core.complement.call(null,p),ch);
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_LT_ = (function cljs$core$async$filter_LT_(){
var args27632 = [];
var len__17542__auto___27676 = arguments.length;
var i__17543__auto___27677 = (0);
while(true){
if((i__17543__auto___27677 < len__17542__auto___27676)){
args27632.push((arguments[i__17543__auto___27677]));

var G__27678 = (i__17543__auto___27677 + (1));
i__17543__auto___27677 = G__27678;
continue;
} else {
}
break;
}

var G__27634 = args27632.length;
switch (G__27634) {
case 2:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args27632.length)].join('')));

}
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.filter_LT_.call(null,p,ch,null);
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__19686__auto___27680 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19686__auto___27680,out){
return (function (){
var f__19687__auto__ = (function (){var switch__19621__auto__ = ((function (c__19686__auto___27680,out){
return (function (state_27655){
var state_val_27656 = (state_27655[(1)]);
if((state_val_27656 === (7))){
var inst_27651 = (state_27655[(2)]);
var state_27655__$1 = state_27655;
var statearr_27657_27681 = state_27655__$1;
(statearr_27657_27681[(2)] = inst_27651);

(statearr_27657_27681[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27656 === (1))){
var state_27655__$1 = state_27655;
var statearr_27658_27682 = state_27655__$1;
(statearr_27658_27682[(2)] = null);

(statearr_27658_27682[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27656 === (4))){
var inst_27637 = (state_27655[(7)]);
var inst_27637__$1 = (state_27655[(2)]);
var inst_27638 = (inst_27637__$1 == null);
var state_27655__$1 = (function (){var statearr_27659 = state_27655;
(statearr_27659[(7)] = inst_27637__$1);

return statearr_27659;
})();
if(cljs.core.truth_(inst_27638)){
var statearr_27660_27683 = state_27655__$1;
(statearr_27660_27683[(1)] = (5));

} else {
var statearr_27661_27684 = state_27655__$1;
(statearr_27661_27684[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27656 === (6))){
var inst_27637 = (state_27655[(7)]);
var inst_27642 = p.call(null,inst_27637);
var state_27655__$1 = state_27655;
if(cljs.core.truth_(inst_27642)){
var statearr_27662_27685 = state_27655__$1;
(statearr_27662_27685[(1)] = (8));

} else {
var statearr_27663_27686 = state_27655__$1;
(statearr_27663_27686[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27656 === (3))){
var inst_27653 = (state_27655[(2)]);
var state_27655__$1 = state_27655;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27655__$1,inst_27653);
} else {
if((state_val_27656 === (2))){
var state_27655__$1 = state_27655;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27655__$1,(4),ch);
} else {
if((state_val_27656 === (11))){
var inst_27645 = (state_27655[(2)]);
var state_27655__$1 = state_27655;
var statearr_27664_27687 = state_27655__$1;
(statearr_27664_27687[(2)] = inst_27645);

(statearr_27664_27687[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27656 === (9))){
var state_27655__$1 = state_27655;
var statearr_27665_27688 = state_27655__$1;
(statearr_27665_27688[(2)] = null);

(statearr_27665_27688[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27656 === (5))){
var inst_27640 = cljs.core.async.close_BANG_.call(null,out);
var state_27655__$1 = state_27655;
var statearr_27666_27689 = state_27655__$1;
(statearr_27666_27689[(2)] = inst_27640);

(statearr_27666_27689[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27656 === (10))){
var inst_27648 = (state_27655[(2)]);
var state_27655__$1 = (function (){var statearr_27667 = state_27655;
(statearr_27667[(8)] = inst_27648);

return statearr_27667;
})();
var statearr_27668_27690 = state_27655__$1;
(statearr_27668_27690[(2)] = null);

(statearr_27668_27690[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27656 === (8))){
var inst_27637 = (state_27655[(7)]);
var state_27655__$1 = state_27655;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_27655__$1,(11),out,inst_27637);
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
});})(c__19686__auto___27680,out))
;
return ((function (switch__19621__auto__,c__19686__auto___27680,out){
return (function() {
var cljs$core$async$state_machine__19622__auto__ = null;
var cljs$core$async$state_machine__19622__auto____0 = (function (){
var statearr_27672 = [null,null,null,null,null,null,null,null,null];
(statearr_27672[(0)] = cljs$core$async$state_machine__19622__auto__);

(statearr_27672[(1)] = (1));

return statearr_27672;
});
var cljs$core$async$state_machine__19622__auto____1 = (function (state_27655){
while(true){
var ret_value__19623__auto__ = (function (){try{while(true){
var result__19624__auto__ = switch__19621__auto__.call(null,state_27655);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19624__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19624__auto__;
}
break;
}
}catch (e27673){if((e27673 instanceof Object)){
var ex__19625__auto__ = e27673;
var statearr_27674_27691 = state_27655;
(statearr_27674_27691[(5)] = ex__19625__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27655);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e27673;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19623__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27692 = state_27655;
state_27655 = G__27692;
continue;
} else {
return ret_value__19623__auto__;
}
break;
}
});
cljs$core$async$state_machine__19622__auto__ = function(state_27655){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__19622__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__19622__auto____1.call(this,state_27655);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__19622__auto____0;
cljs$core$async$state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__19622__auto____1;
return cljs$core$async$state_machine__19622__auto__;
})()
;})(switch__19621__auto__,c__19686__auto___27680,out))
})();
var state__19688__auto__ = (function (){var statearr_27675 = f__19687__auto__.call(null);
(statearr_27675[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19686__auto___27680);

return statearr_27675;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19688__auto__);
});})(c__19686__auto___27680,out))
);


return out;
});

cljs.core.async.filter_LT_.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_LT_ = (function cljs$core$async$remove_LT_(){
var args27693 = [];
var len__17542__auto___27696 = arguments.length;
var i__17543__auto___27697 = (0);
while(true){
if((i__17543__auto___27697 < len__17542__auto___27696)){
args27693.push((arguments[i__17543__auto___27697]));

var G__27698 = (i__17543__auto___27697 + (1));
i__17543__auto___27697 = G__27698;
continue;
} else {
}
break;
}

var G__27695 = args27693.length;
switch (G__27695) {
case 2:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args27693.length)].join('')));

}
});

cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.remove_LT_.call(null,p,ch,null);
});

cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
return cljs.core.async.filter_LT_.call(null,cljs.core.complement.call(null,p),ch,buf_or_n);
});

cljs.core.async.remove_LT_.cljs$lang$maxFixedArity = 3;
cljs.core.async.mapcat_STAR_ = (function cljs$core$async$mapcat_STAR_(f,in$,out){
var c__19686__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19686__auto__){
return (function (){
var f__19687__auto__ = (function (){var switch__19621__auto__ = ((function (c__19686__auto__){
return (function (state_27865){
var state_val_27866 = (state_27865[(1)]);
if((state_val_27866 === (7))){
var inst_27861 = (state_27865[(2)]);
var state_27865__$1 = state_27865;
var statearr_27867_27908 = state_27865__$1;
(statearr_27867_27908[(2)] = inst_27861);

(statearr_27867_27908[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27866 === (20))){
var inst_27831 = (state_27865[(7)]);
var inst_27842 = (state_27865[(2)]);
var inst_27843 = cljs.core.next.call(null,inst_27831);
var inst_27817 = inst_27843;
var inst_27818 = null;
var inst_27819 = (0);
var inst_27820 = (0);
var state_27865__$1 = (function (){var statearr_27868 = state_27865;
(statearr_27868[(8)] = inst_27820);

(statearr_27868[(9)] = inst_27817);

(statearr_27868[(10)] = inst_27818);

(statearr_27868[(11)] = inst_27819);

(statearr_27868[(12)] = inst_27842);

return statearr_27868;
})();
var statearr_27869_27909 = state_27865__$1;
(statearr_27869_27909[(2)] = null);

(statearr_27869_27909[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27866 === (1))){
var state_27865__$1 = state_27865;
var statearr_27870_27910 = state_27865__$1;
(statearr_27870_27910[(2)] = null);

(statearr_27870_27910[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27866 === (4))){
var inst_27806 = (state_27865[(13)]);
var inst_27806__$1 = (state_27865[(2)]);
var inst_27807 = (inst_27806__$1 == null);
var state_27865__$1 = (function (){var statearr_27871 = state_27865;
(statearr_27871[(13)] = inst_27806__$1);

return statearr_27871;
})();
if(cljs.core.truth_(inst_27807)){
var statearr_27872_27911 = state_27865__$1;
(statearr_27872_27911[(1)] = (5));

} else {
var statearr_27873_27912 = state_27865__$1;
(statearr_27873_27912[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27866 === (15))){
var state_27865__$1 = state_27865;
var statearr_27877_27913 = state_27865__$1;
(statearr_27877_27913[(2)] = null);

(statearr_27877_27913[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27866 === (21))){
var state_27865__$1 = state_27865;
var statearr_27878_27914 = state_27865__$1;
(statearr_27878_27914[(2)] = null);

(statearr_27878_27914[(1)] = (23));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27866 === (13))){
var inst_27820 = (state_27865[(8)]);
var inst_27817 = (state_27865[(9)]);
var inst_27818 = (state_27865[(10)]);
var inst_27819 = (state_27865[(11)]);
var inst_27827 = (state_27865[(2)]);
var inst_27828 = (inst_27820 + (1));
var tmp27874 = inst_27817;
var tmp27875 = inst_27818;
var tmp27876 = inst_27819;
var inst_27817__$1 = tmp27874;
var inst_27818__$1 = tmp27875;
var inst_27819__$1 = tmp27876;
var inst_27820__$1 = inst_27828;
var state_27865__$1 = (function (){var statearr_27879 = state_27865;
(statearr_27879[(8)] = inst_27820__$1);

(statearr_27879[(9)] = inst_27817__$1);

(statearr_27879[(10)] = inst_27818__$1);

(statearr_27879[(11)] = inst_27819__$1);

(statearr_27879[(14)] = inst_27827);

return statearr_27879;
})();
var statearr_27880_27915 = state_27865__$1;
(statearr_27880_27915[(2)] = null);

(statearr_27880_27915[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27866 === (22))){
var state_27865__$1 = state_27865;
var statearr_27881_27916 = state_27865__$1;
(statearr_27881_27916[(2)] = null);

(statearr_27881_27916[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27866 === (6))){
var inst_27806 = (state_27865[(13)]);
var inst_27815 = f.call(null,inst_27806);
var inst_27816 = cljs.core.seq.call(null,inst_27815);
var inst_27817 = inst_27816;
var inst_27818 = null;
var inst_27819 = (0);
var inst_27820 = (0);
var state_27865__$1 = (function (){var statearr_27882 = state_27865;
(statearr_27882[(8)] = inst_27820);

(statearr_27882[(9)] = inst_27817);

(statearr_27882[(10)] = inst_27818);

(statearr_27882[(11)] = inst_27819);

return statearr_27882;
})();
var statearr_27883_27917 = state_27865__$1;
(statearr_27883_27917[(2)] = null);

(statearr_27883_27917[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27866 === (17))){
var inst_27831 = (state_27865[(7)]);
var inst_27835 = cljs.core.chunk_first.call(null,inst_27831);
var inst_27836 = cljs.core.chunk_rest.call(null,inst_27831);
var inst_27837 = cljs.core.count.call(null,inst_27835);
var inst_27817 = inst_27836;
var inst_27818 = inst_27835;
var inst_27819 = inst_27837;
var inst_27820 = (0);
var state_27865__$1 = (function (){var statearr_27884 = state_27865;
(statearr_27884[(8)] = inst_27820);

(statearr_27884[(9)] = inst_27817);

(statearr_27884[(10)] = inst_27818);

(statearr_27884[(11)] = inst_27819);

return statearr_27884;
})();
var statearr_27885_27918 = state_27865__$1;
(statearr_27885_27918[(2)] = null);

(statearr_27885_27918[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27866 === (3))){
var inst_27863 = (state_27865[(2)]);
var state_27865__$1 = state_27865;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27865__$1,inst_27863);
} else {
if((state_val_27866 === (12))){
var inst_27851 = (state_27865[(2)]);
var state_27865__$1 = state_27865;
var statearr_27886_27919 = state_27865__$1;
(statearr_27886_27919[(2)] = inst_27851);

(statearr_27886_27919[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27866 === (2))){
var state_27865__$1 = state_27865;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27865__$1,(4),in$);
} else {
if((state_val_27866 === (23))){
var inst_27859 = (state_27865[(2)]);
var state_27865__$1 = state_27865;
var statearr_27887_27920 = state_27865__$1;
(statearr_27887_27920[(2)] = inst_27859);

(statearr_27887_27920[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27866 === (19))){
var inst_27846 = (state_27865[(2)]);
var state_27865__$1 = state_27865;
var statearr_27888_27921 = state_27865__$1;
(statearr_27888_27921[(2)] = inst_27846);

(statearr_27888_27921[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27866 === (11))){
var inst_27817 = (state_27865[(9)]);
var inst_27831 = (state_27865[(7)]);
var inst_27831__$1 = cljs.core.seq.call(null,inst_27817);
var state_27865__$1 = (function (){var statearr_27889 = state_27865;
(statearr_27889[(7)] = inst_27831__$1);

return statearr_27889;
})();
if(inst_27831__$1){
var statearr_27890_27922 = state_27865__$1;
(statearr_27890_27922[(1)] = (14));

} else {
var statearr_27891_27923 = state_27865__$1;
(statearr_27891_27923[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27866 === (9))){
var inst_27853 = (state_27865[(2)]);
var inst_27854 = cljs.core.async.impl.protocols.closed_QMARK_.call(null,out);
var state_27865__$1 = (function (){var statearr_27892 = state_27865;
(statearr_27892[(15)] = inst_27853);

return statearr_27892;
})();
if(cljs.core.truth_(inst_27854)){
var statearr_27893_27924 = state_27865__$1;
(statearr_27893_27924[(1)] = (21));

} else {
var statearr_27894_27925 = state_27865__$1;
(statearr_27894_27925[(1)] = (22));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27866 === (5))){
var inst_27809 = cljs.core.async.close_BANG_.call(null,out);
var state_27865__$1 = state_27865;
var statearr_27895_27926 = state_27865__$1;
(statearr_27895_27926[(2)] = inst_27809);

(statearr_27895_27926[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27866 === (14))){
var inst_27831 = (state_27865[(7)]);
var inst_27833 = cljs.core.chunked_seq_QMARK_.call(null,inst_27831);
var state_27865__$1 = state_27865;
if(inst_27833){
var statearr_27896_27927 = state_27865__$1;
(statearr_27896_27927[(1)] = (17));

} else {
var statearr_27897_27928 = state_27865__$1;
(statearr_27897_27928[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27866 === (16))){
var inst_27849 = (state_27865[(2)]);
var state_27865__$1 = state_27865;
var statearr_27898_27929 = state_27865__$1;
(statearr_27898_27929[(2)] = inst_27849);

(statearr_27898_27929[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27866 === (10))){
var inst_27820 = (state_27865[(8)]);
var inst_27818 = (state_27865[(10)]);
var inst_27825 = cljs.core._nth.call(null,inst_27818,inst_27820);
var state_27865__$1 = state_27865;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_27865__$1,(13),out,inst_27825);
} else {
if((state_val_27866 === (18))){
var inst_27831 = (state_27865[(7)]);
var inst_27840 = cljs.core.first.call(null,inst_27831);
var state_27865__$1 = state_27865;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_27865__$1,(20),out,inst_27840);
} else {
if((state_val_27866 === (8))){
var inst_27820 = (state_27865[(8)]);
var inst_27819 = (state_27865[(11)]);
var inst_27822 = (inst_27820 < inst_27819);
var inst_27823 = inst_27822;
var state_27865__$1 = state_27865;
if(cljs.core.truth_(inst_27823)){
var statearr_27899_27930 = state_27865__$1;
(statearr_27899_27930[(1)] = (10));

} else {
var statearr_27900_27931 = state_27865__$1;
(statearr_27900_27931[(1)] = (11));

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
});})(c__19686__auto__))
;
return ((function (switch__19621__auto__,c__19686__auto__){
return (function() {
var cljs$core$async$mapcat_STAR__$_state_machine__19622__auto__ = null;
var cljs$core$async$mapcat_STAR__$_state_machine__19622__auto____0 = (function (){
var statearr_27904 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_27904[(0)] = cljs$core$async$mapcat_STAR__$_state_machine__19622__auto__);

(statearr_27904[(1)] = (1));

return statearr_27904;
});
var cljs$core$async$mapcat_STAR__$_state_machine__19622__auto____1 = (function (state_27865){
while(true){
var ret_value__19623__auto__ = (function (){try{while(true){
var result__19624__auto__ = switch__19621__auto__.call(null,state_27865);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19624__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19624__auto__;
}
break;
}
}catch (e27905){if((e27905 instanceof Object)){
var ex__19625__auto__ = e27905;
var statearr_27906_27932 = state_27865;
(statearr_27906_27932[(5)] = ex__19625__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27865);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e27905;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19623__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__27933 = state_27865;
state_27865 = G__27933;
continue;
} else {
return ret_value__19623__auto__;
}
break;
}
});
cljs$core$async$mapcat_STAR__$_state_machine__19622__auto__ = function(state_27865){
switch(arguments.length){
case 0:
return cljs$core$async$mapcat_STAR__$_state_machine__19622__auto____0.call(this);
case 1:
return cljs$core$async$mapcat_STAR__$_state_machine__19622__auto____1.call(this,state_27865);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mapcat_STAR__$_state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mapcat_STAR__$_state_machine__19622__auto____0;
cljs$core$async$mapcat_STAR__$_state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mapcat_STAR__$_state_machine__19622__auto____1;
return cljs$core$async$mapcat_STAR__$_state_machine__19622__auto__;
})()
;})(switch__19621__auto__,c__19686__auto__))
})();
var state__19688__auto__ = (function (){var statearr_27907 = f__19687__auto__.call(null);
(statearr_27907[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19686__auto__);

return statearr_27907;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19688__auto__);
});})(c__19686__auto__))
);

return c__19686__auto__;
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_LT_ = (function cljs$core$async$mapcat_LT_(){
var args27934 = [];
var len__17542__auto___27937 = arguments.length;
var i__17543__auto___27938 = (0);
while(true){
if((i__17543__auto___27938 < len__17542__auto___27937)){
args27934.push((arguments[i__17543__auto___27938]));

var G__27939 = (i__17543__auto___27938 + (1));
i__17543__auto___27938 = G__27939;
continue;
} else {
}
break;
}

var G__27936 = args27934.length;
switch (G__27936) {
case 2:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args27934.length)].join('')));

}
});

cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2 = (function (f,in$){
return cljs.core.async.mapcat_LT_.call(null,f,in$,null);
});

cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3 = (function (f,in$,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
cljs.core.async.mapcat_STAR_.call(null,f,in$,out);

return out;
});

cljs.core.async.mapcat_LT_.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_GT_ = (function cljs$core$async$mapcat_GT_(){
var args27941 = [];
var len__17542__auto___27944 = arguments.length;
var i__17543__auto___27945 = (0);
while(true){
if((i__17543__auto___27945 < len__17542__auto___27944)){
args27941.push((arguments[i__17543__auto___27945]));

var G__27946 = (i__17543__auto___27945 + (1));
i__17543__auto___27945 = G__27946;
continue;
} else {
}
break;
}

var G__27943 = args27941.length;
switch (G__27943) {
case 2:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args27941.length)].join('')));

}
});

cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2 = (function (f,out){
return cljs.core.async.mapcat_GT_.call(null,f,out,null);
});

cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3 = (function (f,out,buf_or_n){
var in$ = cljs.core.async.chan.call(null,buf_or_n);
cljs.core.async.mapcat_STAR_.call(null,f,in$,out);

return in$;
});

cljs.core.async.mapcat_GT_.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.unique = (function cljs$core$async$unique(){
var args27948 = [];
var len__17542__auto___27999 = arguments.length;
var i__17543__auto___28000 = (0);
while(true){
if((i__17543__auto___28000 < len__17542__auto___27999)){
args27948.push((arguments[i__17543__auto___28000]));

var G__28001 = (i__17543__auto___28000 + (1));
i__17543__auto___28000 = G__28001;
continue;
} else {
}
break;
}

var G__27950 = args27948.length;
switch (G__27950) {
case 1:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args27948.length)].join('')));

}
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1 = (function (ch){
return cljs.core.async.unique.call(null,ch,null);
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2 = (function (ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__19686__auto___28003 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19686__auto___28003,out){
return (function (){
var f__19687__auto__ = (function (){var switch__19621__auto__ = ((function (c__19686__auto___28003,out){
return (function (state_27974){
var state_val_27975 = (state_27974[(1)]);
if((state_val_27975 === (7))){
var inst_27969 = (state_27974[(2)]);
var state_27974__$1 = state_27974;
var statearr_27976_28004 = state_27974__$1;
(statearr_27976_28004[(2)] = inst_27969);

(statearr_27976_28004[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27975 === (1))){
var inst_27951 = null;
var state_27974__$1 = (function (){var statearr_27977 = state_27974;
(statearr_27977[(7)] = inst_27951);

return statearr_27977;
})();
var statearr_27978_28005 = state_27974__$1;
(statearr_27978_28005[(2)] = null);

(statearr_27978_28005[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27975 === (4))){
var inst_27954 = (state_27974[(8)]);
var inst_27954__$1 = (state_27974[(2)]);
var inst_27955 = (inst_27954__$1 == null);
var inst_27956 = cljs.core.not.call(null,inst_27955);
var state_27974__$1 = (function (){var statearr_27979 = state_27974;
(statearr_27979[(8)] = inst_27954__$1);

return statearr_27979;
})();
if(inst_27956){
var statearr_27980_28006 = state_27974__$1;
(statearr_27980_28006[(1)] = (5));

} else {
var statearr_27981_28007 = state_27974__$1;
(statearr_27981_28007[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27975 === (6))){
var state_27974__$1 = state_27974;
var statearr_27982_28008 = state_27974__$1;
(statearr_27982_28008[(2)] = null);

(statearr_27982_28008[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27975 === (3))){
var inst_27971 = (state_27974[(2)]);
var inst_27972 = cljs.core.async.close_BANG_.call(null,out);
var state_27974__$1 = (function (){var statearr_27983 = state_27974;
(statearr_27983[(9)] = inst_27971);

return statearr_27983;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_27974__$1,inst_27972);
} else {
if((state_val_27975 === (2))){
var state_27974__$1 = state_27974;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_27974__$1,(4),ch);
} else {
if((state_val_27975 === (11))){
var inst_27954 = (state_27974[(8)]);
var inst_27963 = (state_27974[(2)]);
var inst_27951 = inst_27954;
var state_27974__$1 = (function (){var statearr_27984 = state_27974;
(statearr_27984[(7)] = inst_27951);

(statearr_27984[(10)] = inst_27963);

return statearr_27984;
})();
var statearr_27985_28009 = state_27974__$1;
(statearr_27985_28009[(2)] = null);

(statearr_27985_28009[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27975 === (9))){
var inst_27954 = (state_27974[(8)]);
var state_27974__$1 = state_27974;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_27974__$1,(11),out,inst_27954);
} else {
if((state_val_27975 === (5))){
var inst_27951 = (state_27974[(7)]);
var inst_27954 = (state_27974[(8)]);
var inst_27958 = cljs.core._EQ_.call(null,inst_27954,inst_27951);
var state_27974__$1 = state_27974;
if(inst_27958){
var statearr_27987_28010 = state_27974__$1;
(statearr_27987_28010[(1)] = (8));

} else {
var statearr_27988_28011 = state_27974__$1;
(statearr_27988_28011[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27975 === (10))){
var inst_27966 = (state_27974[(2)]);
var state_27974__$1 = state_27974;
var statearr_27989_28012 = state_27974__$1;
(statearr_27989_28012[(2)] = inst_27966);

(statearr_27989_28012[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_27975 === (8))){
var inst_27951 = (state_27974[(7)]);
var tmp27986 = inst_27951;
var inst_27951__$1 = tmp27986;
var state_27974__$1 = (function (){var statearr_27990 = state_27974;
(statearr_27990[(7)] = inst_27951__$1);

return statearr_27990;
})();
var statearr_27991_28013 = state_27974__$1;
(statearr_27991_28013[(2)] = null);

(statearr_27991_28013[(1)] = (2));


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
});})(c__19686__auto___28003,out))
;
return ((function (switch__19621__auto__,c__19686__auto___28003,out){
return (function() {
var cljs$core$async$state_machine__19622__auto__ = null;
var cljs$core$async$state_machine__19622__auto____0 = (function (){
var statearr_27995 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_27995[(0)] = cljs$core$async$state_machine__19622__auto__);

(statearr_27995[(1)] = (1));

return statearr_27995;
});
var cljs$core$async$state_machine__19622__auto____1 = (function (state_27974){
while(true){
var ret_value__19623__auto__ = (function (){try{while(true){
var result__19624__auto__ = switch__19621__auto__.call(null,state_27974);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19624__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19624__auto__;
}
break;
}
}catch (e27996){if((e27996 instanceof Object)){
var ex__19625__auto__ = e27996;
var statearr_27997_28014 = state_27974;
(statearr_27997_28014[(5)] = ex__19625__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_27974);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e27996;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19623__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__28015 = state_27974;
state_27974 = G__28015;
continue;
} else {
return ret_value__19623__auto__;
}
break;
}
});
cljs$core$async$state_machine__19622__auto__ = function(state_27974){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__19622__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__19622__auto____1.call(this,state_27974);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__19622__auto____0;
cljs$core$async$state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__19622__auto____1;
return cljs$core$async$state_machine__19622__auto__;
})()
;})(switch__19621__auto__,c__19686__auto___28003,out))
})();
var state__19688__auto__ = (function (){var statearr_27998 = f__19687__auto__.call(null);
(statearr_27998[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19686__auto___28003);

return statearr_27998;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19688__auto__);
});})(c__19686__auto___28003,out))
);


return out;
});

cljs.core.async.unique.cljs$lang$maxFixedArity = 2;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition = (function cljs$core$async$partition(){
var args28016 = [];
var len__17542__auto___28086 = arguments.length;
var i__17543__auto___28087 = (0);
while(true){
if((i__17543__auto___28087 < len__17542__auto___28086)){
args28016.push((arguments[i__17543__auto___28087]));

var G__28088 = (i__17543__auto___28087 + (1));
i__17543__auto___28087 = G__28088;
continue;
} else {
}
break;
}

var G__28018 = args28016.length;
switch (G__28018) {
case 2:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args28016.length)].join('')));

}
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.partition.call(null,n,ch,null);
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__19686__auto___28090 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19686__auto___28090,out){
return (function (){
var f__19687__auto__ = (function (){var switch__19621__auto__ = ((function (c__19686__auto___28090,out){
return (function (state_28056){
var state_val_28057 = (state_28056[(1)]);
if((state_val_28057 === (7))){
var inst_28052 = (state_28056[(2)]);
var state_28056__$1 = state_28056;
var statearr_28058_28091 = state_28056__$1;
(statearr_28058_28091[(2)] = inst_28052);

(statearr_28058_28091[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28057 === (1))){
var inst_28019 = (new Array(n));
var inst_28020 = inst_28019;
var inst_28021 = (0);
var state_28056__$1 = (function (){var statearr_28059 = state_28056;
(statearr_28059[(7)] = inst_28021);

(statearr_28059[(8)] = inst_28020);

return statearr_28059;
})();
var statearr_28060_28092 = state_28056__$1;
(statearr_28060_28092[(2)] = null);

(statearr_28060_28092[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28057 === (4))){
var inst_28024 = (state_28056[(9)]);
var inst_28024__$1 = (state_28056[(2)]);
var inst_28025 = (inst_28024__$1 == null);
var inst_28026 = cljs.core.not.call(null,inst_28025);
var state_28056__$1 = (function (){var statearr_28061 = state_28056;
(statearr_28061[(9)] = inst_28024__$1);

return statearr_28061;
})();
if(inst_28026){
var statearr_28062_28093 = state_28056__$1;
(statearr_28062_28093[(1)] = (5));

} else {
var statearr_28063_28094 = state_28056__$1;
(statearr_28063_28094[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28057 === (15))){
var inst_28046 = (state_28056[(2)]);
var state_28056__$1 = state_28056;
var statearr_28064_28095 = state_28056__$1;
(statearr_28064_28095[(2)] = inst_28046);

(statearr_28064_28095[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28057 === (13))){
var state_28056__$1 = state_28056;
var statearr_28065_28096 = state_28056__$1;
(statearr_28065_28096[(2)] = null);

(statearr_28065_28096[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28057 === (6))){
var inst_28021 = (state_28056[(7)]);
var inst_28042 = (inst_28021 > (0));
var state_28056__$1 = state_28056;
if(cljs.core.truth_(inst_28042)){
var statearr_28066_28097 = state_28056__$1;
(statearr_28066_28097[(1)] = (12));

} else {
var statearr_28067_28098 = state_28056__$1;
(statearr_28067_28098[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28057 === (3))){
var inst_28054 = (state_28056[(2)]);
var state_28056__$1 = state_28056;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_28056__$1,inst_28054);
} else {
if((state_val_28057 === (12))){
var inst_28020 = (state_28056[(8)]);
var inst_28044 = cljs.core.vec.call(null,inst_28020);
var state_28056__$1 = state_28056;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_28056__$1,(15),out,inst_28044);
} else {
if((state_val_28057 === (2))){
var state_28056__$1 = state_28056;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28056__$1,(4),ch);
} else {
if((state_val_28057 === (11))){
var inst_28036 = (state_28056[(2)]);
var inst_28037 = (new Array(n));
var inst_28020 = inst_28037;
var inst_28021 = (0);
var state_28056__$1 = (function (){var statearr_28068 = state_28056;
(statearr_28068[(10)] = inst_28036);

(statearr_28068[(7)] = inst_28021);

(statearr_28068[(8)] = inst_28020);

return statearr_28068;
})();
var statearr_28069_28099 = state_28056__$1;
(statearr_28069_28099[(2)] = null);

(statearr_28069_28099[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28057 === (9))){
var inst_28020 = (state_28056[(8)]);
var inst_28034 = cljs.core.vec.call(null,inst_28020);
var state_28056__$1 = state_28056;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_28056__$1,(11),out,inst_28034);
} else {
if((state_val_28057 === (5))){
var inst_28024 = (state_28056[(9)]);
var inst_28021 = (state_28056[(7)]);
var inst_28020 = (state_28056[(8)]);
var inst_28029 = (state_28056[(11)]);
var inst_28028 = (inst_28020[inst_28021] = inst_28024);
var inst_28029__$1 = (inst_28021 + (1));
var inst_28030 = (inst_28029__$1 < n);
var state_28056__$1 = (function (){var statearr_28070 = state_28056;
(statearr_28070[(12)] = inst_28028);

(statearr_28070[(11)] = inst_28029__$1);

return statearr_28070;
})();
if(cljs.core.truth_(inst_28030)){
var statearr_28071_28100 = state_28056__$1;
(statearr_28071_28100[(1)] = (8));

} else {
var statearr_28072_28101 = state_28056__$1;
(statearr_28072_28101[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28057 === (14))){
var inst_28049 = (state_28056[(2)]);
var inst_28050 = cljs.core.async.close_BANG_.call(null,out);
var state_28056__$1 = (function (){var statearr_28074 = state_28056;
(statearr_28074[(13)] = inst_28049);

return statearr_28074;
})();
var statearr_28075_28102 = state_28056__$1;
(statearr_28075_28102[(2)] = inst_28050);

(statearr_28075_28102[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28057 === (10))){
var inst_28040 = (state_28056[(2)]);
var state_28056__$1 = state_28056;
var statearr_28076_28103 = state_28056__$1;
(statearr_28076_28103[(2)] = inst_28040);

(statearr_28076_28103[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28057 === (8))){
var inst_28020 = (state_28056[(8)]);
var inst_28029 = (state_28056[(11)]);
var tmp28073 = inst_28020;
var inst_28020__$1 = tmp28073;
var inst_28021 = inst_28029;
var state_28056__$1 = (function (){var statearr_28077 = state_28056;
(statearr_28077[(7)] = inst_28021);

(statearr_28077[(8)] = inst_28020__$1);

return statearr_28077;
})();
var statearr_28078_28104 = state_28056__$1;
(statearr_28078_28104[(2)] = null);

(statearr_28078_28104[(1)] = (2));


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
});})(c__19686__auto___28090,out))
;
return ((function (switch__19621__auto__,c__19686__auto___28090,out){
return (function() {
var cljs$core$async$state_machine__19622__auto__ = null;
var cljs$core$async$state_machine__19622__auto____0 = (function (){
var statearr_28082 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_28082[(0)] = cljs$core$async$state_machine__19622__auto__);

(statearr_28082[(1)] = (1));

return statearr_28082;
});
var cljs$core$async$state_machine__19622__auto____1 = (function (state_28056){
while(true){
var ret_value__19623__auto__ = (function (){try{while(true){
var result__19624__auto__ = switch__19621__auto__.call(null,state_28056);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19624__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19624__auto__;
}
break;
}
}catch (e28083){if((e28083 instanceof Object)){
var ex__19625__auto__ = e28083;
var statearr_28084_28105 = state_28056;
(statearr_28084_28105[(5)] = ex__19625__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_28056);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e28083;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19623__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__28106 = state_28056;
state_28056 = G__28106;
continue;
} else {
return ret_value__19623__auto__;
}
break;
}
});
cljs$core$async$state_machine__19622__auto__ = function(state_28056){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__19622__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__19622__auto____1.call(this,state_28056);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__19622__auto____0;
cljs$core$async$state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__19622__auto____1;
return cljs$core$async$state_machine__19622__auto__;
})()
;})(switch__19621__auto__,c__19686__auto___28090,out))
})();
var state__19688__auto__ = (function (){var statearr_28085 = f__19687__auto__.call(null);
(statearr_28085[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19686__auto___28090);

return statearr_28085;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19688__auto__);
});})(c__19686__auto___28090,out))
);


return out;
});

cljs.core.async.partition.cljs$lang$maxFixedArity = 3;
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition_by = (function cljs$core$async$partition_by(){
var args28107 = [];
var len__17542__auto___28181 = arguments.length;
var i__17543__auto___28182 = (0);
while(true){
if((i__17543__auto___28182 < len__17542__auto___28181)){
args28107.push((arguments[i__17543__auto___28182]));

var G__28183 = (i__17543__auto___28182 + (1));
i__17543__auto___28182 = G__28183;
continue;
} else {
}
break;
}

var G__28109 = args28107.length;
switch (G__28109) {
case 2:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args28107.length)].join('')));

}
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2 = (function (f,ch){
return cljs.core.async.partition_by.call(null,f,ch,null);
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3 = (function (f,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__19686__auto___28185 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__19686__auto___28185,out){
return (function (){
var f__19687__auto__ = (function (){var switch__19621__auto__ = ((function (c__19686__auto___28185,out){
return (function (state_28151){
var state_val_28152 = (state_28151[(1)]);
if((state_val_28152 === (7))){
var inst_28147 = (state_28151[(2)]);
var state_28151__$1 = state_28151;
var statearr_28153_28186 = state_28151__$1;
(statearr_28153_28186[(2)] = inst_28147);

(statearr_28153_28186[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28152 === (1))){
var inst_28110 = [];
var inst_28111 = inst_28110;
var inst_28112 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);
var state_28151__$1 = (function (){var statearr_28154 = state_28151;
(statearr_28154[(7)] = inst_28111);

(statearr_28154[(8)] = inst_28112);

return statearr_28154;
})();
var statearr_28155_28187 = state_28151__$1;
(statearr_28155_28187[(2)] = null);

(statearr_28155_28187[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28152 === (4))){
var inst_28115 = (state_28151[(9)]);
var inst_28115__$1 = (state_28151[(2)]);
var inst_28116 = (inst_28115__$1 == null);
var inst_28117 = cljs.core.not.call(null,inst_28116);
var state_28151__$1 = (function (){var statearr_28156 = state_28151;
(statearr_28156[(9)] = inst_28115__$1);

return statearr_28156;
})();
if(inst_28117){
var statearr_28157_28188 = state_28151__$1;
(statearr_28157_28188[(1)] = (5));

} else {
var statearr_28158_28189 = state_28151__$1;
(statearr_28158_28189[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28152 === (15))){
var inst_28141 = (state_28151[(2)]);
var state_28151__$1 = state_28151;
var statearr_28159_28190 = state_28151__$1;
(statearr_28159_28190[(2)] = inst_28141);

(statearr_28159_28190[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28152 === (13))){
var state_28151__$1 = state_28151;
var statearr_28160_28191 = state_28151__$1;
(statearr_28160_28191[(2)] = null);

(statearr_28160_28191[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28152 === (6))){
var inst_28111 = (state_28151[(7)]);
var inst_28136 = inst_28111.length;
var inst_28137 = (inst_28136 > (0));
var state_28151__$1 = state_28151;
if(cljs.core.truth_(inst_28137)){
var statearr_28161_28192 = state_28151__$1;
(statearr_28161_28192[(1)] = (12));

} else {
var statearr_28162_28193 = state_28151__$1;
(statearr_28162_28193[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28152 === (3))){
var inst_28149 = (state_28151[(2)]);
var state_28151__$1 = state_28151;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_28151__$1,inst_28149);
} else {
if((state_val_28152 === (12))){
var inst_28111 = (state_28151[(7)]);
var inst_28139 = cljs.core.vec.call(null,inst_28111);
var state_28151__$1 = state_28151;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_28151__$1,(15),out,inst_28139);
} else {
if((state_val_28152 === (2))){
var state_28151__$1 = state_28151;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_28151__$1,(4),ch);
} else {
if((state_val_28152 === (11))){
var inst_28119 = (state_28151[(10)]);
var inst_28115 = (state_28151[(9)]);
var inst_28129 = (state_28151[(2)]);
var inst_28130 = [];
var inst_28131 = inst_28130.push(inst_28115);
var inst_28111 = inst_28130;
var inst_28112 = inst_28119;
var state_28151__$1 = (function (){var statearr_28163 = state_28151;
(statearr_28163[(7)] = inst_28111);

(statearr_28163[(8)] = inst_28112);

(statearr_28163[(11)] = inst_28131);

(statearr_28163[(12)] = inst_28129);

return statearr_28163;
})();
var statearr_28164_28194 = state_28151__$1;
(statearr_28164_28194[(2)] = null);

(statearr_28164_28194[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28152 === (9))){
var inst_28111 = (state_28151[(7)]);
var inst_28127 = cljs.core.vec.call(null,inst_28111);
var state_28151__$1 = state_28151;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_28151__$1,(11),out,inst_28127);
} else {
if((state_val_28152 === (5))){
var inst_28112 = (state_28151[(8)]);
var inst_28119 = (state_28151[(10)]);
var inst_28115 = (state_28151[(9)]);
var inst_28119__$1 = f.call(null,inst_28115);
var inst_28120 = cljs.core._EQ_.call(null,inst_28119__$1,inst_28112);
var inst_28121 = cljs.core.keyword_identical_QMARK_.call(null,inst_28112,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));
var inst_28122 = (inst_28120) || (inst_28121);
var state_28151__$1 = (function (){var statearr_28165 = state_28151;
(statearr_28165[(10)] = inst_28119__$1);

return statearr_28165;
})();
if(cljs.core.truth_(inst_28122)){
var statearr_28166_28195 = state_28151__$1;
(statearr_28166_28195[(1)] = (8));

} else {
var statearr_28167_28196 = state_28151__$1;
(statearr_28167_28196[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28152 === (14))){
var inst_28144 = (state_28151[(2)]);
var inst_28145 = cljs.core.async.close_BANG_.call(null,out);
var state_28151__$1 = (function (){var statearr_28169 = state_28151;
(statearr_28169[(13)] = inst_28144);

return statearr_28169;
})();
var statearr_28170_28197 = state_28151__$1;
(statearr_28170_28197[(2)] = inst_28145);

(statearr_28170_28197[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28152 === (10))){
var inst_28134 = (state_28151[(2)]);
var state_28151__$1 = state_28151;
var statearr_28171_28198 = state_28151__$1;
(statearr_28171_28198[(2)] = inst_28134);

(statearr_28171_28198[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_28152 === (8))){
var inst_28111 = (state_28151[(7)]);
var inst_28119 = (state_28151[(10)]);
var inst_28115 = (state_28151[(9)]);
var inst_28124 = inst_28111.push(inst_28115);
var tmp28168 = inst_28111;
var inst_28111__$1 = tmp28168;
var inst_28112 = inst_28119;
var state_28151__$1 = (function (){var statearr_28172 = state_28151;
(statearr_28172[(7)] = inst_28111__$1);

(statearr_28172[(8)] = inst_28112);

(statearr_28172[(14)] = inst_28124);

return statearr_28172;
})();
var statearr_28173_28199 = state_28151__$1;
(statearr_28173_28199[(2)] = null);

(statearr_28173_28199[(1)] = (2));


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
});})(c__19686__auto___28185,out))
;
return ((function (switch__19621__auto__,c__19686__auto___28185,out){
return (function() {
var cljs$core$async$state_machine__19622__auto__ = null;
var cljs$core$async$state_machine__19622__auto____0 = (function (){
var statearr_28177 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_28177[(0)] = cljs$core$async$state_machine__19622__auto__);

(statearr_28177[(1)] = (1));

return statearr_28177;
});
var cljs$core$async$state_machine__19622__auto____1 = (function (state_28151){
while(true){
var ret_value__19623__auto__ = (function (){try{while(true){
var result__19624__auto__ = switch__19621__auto__.call(null,state_28151);
if(cljs.core.keyword_identical_QMARK_.call(null,result__19624__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__19624__auto__;
}
break;
}
}catch (e28178){if((e28178 instanceof Object)){
var ex__19625__auto__ = e28178;
var statearr_28179_28200 = state_28151;
(statearr_28179_28200[(5)] = ex__19625__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_28151);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e28178;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__19623__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__28201 = state_28151;
state_28151 = G__28201;
continue;
} else {
return ret_value__19623__auto__;
}
break;
}
});
cljs$core$async$state_machine__19622__auto__ = function(state_28151){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__19622__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__19622__auto____1.call(this,state_28151);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__19622__auto____0;
cljs$core$async$state_machine__19622__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__19622__auto____1;
return cljs$core$async$state_machine__19622__auto__;
})()
;})(switch__19621__auto__,c__19686__auto___28185,out))
})();
var state__19688__auto__ = (function (){var statearr_28180 = f__19687__auto__.call(null);
(statearr_28180[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__19686__auto___28185);

return statearr_28180;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__19688__auto__);
});})(c__19686__auto___28185,out))
);


return out;
});

cljs.core.async.partition_by.cljs$lang$maxFixedArity = 3;

//# sourceMappingURL=async.js.map