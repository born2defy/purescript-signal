"use strict";

var make = function (initial) {
  var subs = [];
  var val = initial;
  var render = null;
  var sig = {
    subscribe: function(sub) {
      subs.push(sub);
      sub(val);
    },
    get: function() { return val; },
    set: function(newval) {
      val = newval;
      subs.forEach(function(sub) { sub(newval); });
      if (render){ render(newval); };
    },
    render: function(renderF){ render = renderF; render(val); },
    disconnect: function(){ render = null;}
  };
  return sig;
};

var liftA2P = function(f, sig1, sig2) {
    var out = signal(f(sig1.get(),sig2.get()));
    var produce = function() { out.set(f(sig1.get(),sig2.get())); };
    sig1.subscribe(produce);
    sig2.subscribe(produce);
    return out;
  };

var liftA3P = function(f, sig1, sig2, sig3) {
    var out = signal(f(sig1.get(),sig2.get(),sig3.get()));
    var produce = function() { out.set(f(sig1.get(),sig2.get(),sig3.get())); };
    sig1.subscribe(produce);
    sig2.subscribe(produce);
    sig3.subscribe(produce);
    return out;
  };

var liftA4P = function(f, sig1, sig2, sig3, sig4) {
    var out = signal(f(sig1.get(),sig2.get(),sig3.get(),sig4.get()));
    var produce = function() { out.set(f(sig1.get(),sig2.get(),sig3.get(),sig4.get())); };
    sig1.subscribe(produce);
    sig2.subscribe(produce);
    sig3.subscribe(produce);
    sig4.subscribe(produce);
    return out;
  };

var liftA5P = function(f, sig1, sig2, sig3, sig4, sig5) {
    var out = signal(f(sig1.get(),sig2.get(),sig3.get(),sig4.get(), sig5.get()));
    var produce = function() { out.set(f(sig1.get(),sig2.get(),sig3.get(),sig4.get(),sig5.get())); };
    sig1.subscribe(produce);
    sig2.subscribe(produce);
    sig3.subscribe(produce);
    sig4.subscribe(produce);
    sig5.subscribe(produce);
    return out;
  };

var liftA6P = function(f, sig1, sig2, sig3, sig4, sig5, sig6) {
    var out = signal(f(sig1.get(),sig2.get(),sig3.get(),sig4.get(), sig5.get(),sig6.get()));
    var produce = function() { out.set(f(sig1.get(),sig2.get(),sig3.get(),sig4.get(),sig5.get(),sig6.get())); };
    sig1.subscribe(produce);
    sig2.subscribe(produce);
    sig3.subscribe(produce);
    sig4.subscribe(produce);
    sig5.subscribe(produce);
    sig6.subscribe(produce);
    return out;
  };

var liftA7P = function(f, sig1, sig2, sig3, sig4, sig5, sig6, sig7) {
    var out = signal(f(sig1.get(),sig2.get(),sig3.get(),sig4.get(), sig5.get(),sig6.get(),sig7.get()));
    var produce = function() { out.set(f(sig1.get(),sig2.get(),sig3.get(),sig4.get(),sig5.get(),sig6.get(),sig7.get())); };
    sig1.subscribe(produce);
    sig2.subscribe(produce);
    sig3.subscribe(produce);
    sig4.subscribe(produce);
    sig5.subscribe(produce);
    sig6.subscribe(produce);
    sig7.subscribe(produce);
    return out;
  };

var liftA8P = function(f, sig1, sig2, sig3, sig4, sig5, sig6, sig7, sig8) {
    var out = signal(f(sig1.get(),sig2.get(),sig3.get(),sig4.get(), sig5.get(),sig6.get(),sig7.get(),sig8.get()));
    var produce = function() { out.set(f(sig1.get(),sig2.get(),sig3.get(),sig4.get(),sig5.get(),sig6.get(),sig7.get(),sig8.get())); };
    sig1.subscribe(produce);
    sig2.subscribe(produce);
    sig3.subscribe(produce);
    sig4.subscribe(produce);
    sig5.subscribe(produce);
    sig6.subscribe(produce);
    sig7.subscribe(produce);
    sig8.subscribe(produce);
    return out;
  };

var liftA9P = function(f, sig1, sig2, sig3, sig4, sig5, sig6, sig7, sig8, sig9) {
    var out = signal(f(sig1.get(),sig2.get(),sig3.get(),sig4.get(), sig5.get(),sig6.get(),sig7.get(),sig8.get(),sig9.get()));
    var produce = function() { out.set(f(sig1.get(),sig2.get(),sig3.get(),sig4.get(),sig5.get(),sig6.get(),sig7.get(),sig8.get(),sig9.get())); };
    sig1.subscribe(produce);
    sig2.subscribe(produce);
    sig3.subscribe(produce);
    sig4.subscribe(produce);
    sig5.subscribe(produce);
    sig6.subscribe(produce);
    sig7.subscribe(produce);
    sig8.subscribe(produce);
    sig9.subscribe(produce);
    return out;
  };

var liftA10P = function(f, sig1, sig2, sig3, sig4, sig5, sig6, sig7, sig8, sig9, sig10){
    var out = signal(f(sig1.get(),sig2.get(),sig3.get(),sig4.get(), sig5.get(),sig6.get(),sig7.get(),sig8.get(),sig9.get(),sig10.get()));
    var produce = function() { out.set(f(sig1.get(),sig2.get(),sig3.get(),sig4.get(),sig5.get(),sig6.get(),sig7.get(),sig8.get(),sig9.get(),sig10.get())); };
    sig1.subscribe(produce);
    sig2.subscribe(produce);
    sig3.subscribe(produce);
    sig4.subscribe(produce);
    sig5.subscribe(produce);
    sig6.subscribe(produce);
    sig7.subscribe(produce);
    sig8.subscribe(produce);
    sig9.subscribe(produce);
    sig10.subscribe(produce);
    return out;
  };


var testLift2 = function(){
  var f = function(a, b){ return a + b; },
      sig1 = make(1);
      sig2 = make(10);
      out = liftA2P(f, sig1, sig2),
      res1 = out.get() === 11 ? "PASS" : "FAIL";
  sig1.set(2);
  var res2 = out.get() === 12 ? "PASS" : "FAIL";
  sig2.set(20);
  var res3 = out.get() === 22 ? "PASS" : "FAIL";
  console.log("Test1: " + res1 + ", Test2: " + res2 + ", Test3: " + res3);
}

var testLift3 = function(){
  var f = function(a, b, c){ return a + b + c; },
      sig1 = make(1);
      sig2 = make(10);
      sig3 = make(100);
      out = liftA3P(f, sig1, sig2, sig3),
      res1 = out.get() === 111 ? "PASS" : "FAIL";
  sig1.set(2);
  var res2 = out.get() === 112 ? "PASS" : "FAIL";
  sig2.set(20);
  var res3 = out.get() === 122 ? "PASS" : "FAIL";
  sig3.set(200);
  var res4 = out.get() === 222 ? "PASS" : "FAIL";
  console.log("Test1: " + res1 + ", Test2: " + res2 + ", Test3: " + res3 + ", Test4: " + res4);
}

var testLift4 = function(){
  var f = function(a, b, c, d){ return a + b + c + d; },
      sig1 = make(1);
      sig2 = make(10);
      sig3 = make(100);
      sig4 = make(1000);
      out = liftA4P(f, sig1, sig2, sig3, sig4),
      res1 = out.get() === 1111 ? "PASS" : "FAIL";
  sig1.set(2);
  var res2 = out.get() === 1112 ? "PASS" : "FAIL";
  sig2.set(20);
  var res3 = out.get() === 1122 ? "PASS" : "FAIL";
  sig3.set(200);
  var res4 = out.get() === 1222 ? "PASS" : "FAIL";
  sig4.set(2000);
  var res5 = out.get() === 2222 ? "PASS" : "FAIL";
  console.log("Test1: " + res1 + ", Test2: " + res2 + ", Test3: " + res3 + ", Test4: " + res4 + ", Test5: " + res5);
}

var testLift5 = function(){
  var f = function(a, b, c, d, e){ return a + b + c + d + e; },
      sig1 = make(1);
      sig2 = make(10);
      sig3 = make(100);
      sig4 = make(1000);
      sig5 = make(10000);
      out = liftA5P(f, sig1, sig2, sig3, sig4, sig5),
      res1 = out.get() === 11111 ? "PASS" : "FAIL";
  sig1.set(2);
  var res2 = out.get() === 11112 ? "PASS" : "FAIL";
  sig2.set(20);
  var res3 = out.get() === 11122 ? "PASS" : "FAIL";
  sig3.set(200);
  var res4 = out.get() === 11222 ? "PASS" : "FAIL";
  sig4.set(2000);
  var res5 = out.get() === 12222 ? "PASS" : "FAIL";
  sig5.set(20000);
  var res6 = out.get() === 22222 ? "PASS" : "FAIL";
  console.log("Test1: " + res1 + ", Test2: " + res2 + ", Test3: " + res3 + ", Test4: " + res4 + ", Test5: " + res5 + ", Test6: " + res6);
}

var testLift6= function(){
  var f = function(a, b, c, d, e, f){ return a + b + c + d + e + f; },
      sig1 = make(1);
      sig2 = make(10);
      sig3 = make(100);
      sig4 = make(1000);
      sig5 = make(10000);
      sig6 = make(100000);
      out = liftA6P(f, sig1, sig2, sig3, sig4, sig5, sig6),
      res1 = out.get() === 111111 ? "PASS" : "FAIL";
  sig1.set(2);
  var res2 = out.get() === 111112 ? "PASS" : "FAIL";
  sig2.set(20);
  var res3 = out.get() === 111122 ? "PASS" : "FAIL";
  sig3.set(200);
  var res4 = out.get() === 111222 ? "PASS" : "FAIL";
  sig4.set(2000);
  var res5 = out.get() === 112222 ? "PASS" : "FAIL";
  sig5.set(20000);
  var res6 = out.get() === 122222 ? "PASS" : "FAIL";
  sig6.set(200000);
  var res7 = out.get() === 222222 ? "PASS" : "FAIL";
  console.log("Test1: " + res1 + ", Test2: " + res2 + ", Test3: " + res3 + ", Test4: " + res4 + ", Test5: " + res5 + ", Test6: " + res6 + ", Test7: " + res7);
}

var testLift7= function(){
  var f = function(a, b, c, d, e, f, g){ return a + b + c + d + e + f + g; },
      sig1 = make(1);
      sig2 = make(10);
      sig3 = make(100);
      sig4 = make(1000);
      sig5 = make(10000);
      sig6 = make(100000);
      sig7 = make(1000000);
      out = liftA7P(f, sig1, sig2, sig3, sig4, sig5, sig6, sig7),
      res1 = out.get() === 1111111 ? "PASS" : "FAIL";
  sig1.set(2);
  var res2 = out.get() === 1111112 ? "PASS" : "FAIL";
  sig2.set(20);
  var res3 = out.get() === 1111122 ? "PASS" : "FAIL";
  sig3.set(200);
  var res4 = out.get() === 1111222 ? "PASS" : "FAIL";
  sig4.set(2000);
  var res5 = out.get() === 1112222 ? "PASS" : "FAIL";
  sig5.set(20000);
  var res6 = out.get() === 1122222 ? "PASS" : "FAIL";
  sig6.set(200000);
  var res7 = out.get() === 1222222 ? "PASS" : "FAIL";
  sig7.set(2000000);
  var res8 = out.get() === 2222222 ? "PASS" : "FAIL";
  console.log("Test1: " + res1 + ", Test2: " + res2 + ", Test3: " + res3 + ", Test4: " + res4 + ", Test5: " + res5 + ", Test6: " + res6 + ", Test7: " + res7 + ", Test8: " + res8);
}

var testLift8= function(){
  var f = function(a, b, c, d, e, f, g, h){ return a + b + c + d + e + f + g + h; },
      sig1 = make(1);
      sig2 = make(10);
      sig3 = make(100);
      sig4 = make(1000);
      sig5 = make(10000);
      sig6 = make(100000);
      sig7 = make(1000000);
      sig8 = make(10000000);
      out = liftA8P(f, sig1, sig2, sig3, sig4, sig5, sig6, sig7, sig8),
      res1 = out.get() === 11111111 ? "PASS" : "FAIL";
  sig1.set(2);
  var res2 = out.get() === 11111112 ? "PASS" : "FAIL";
  sig2.set(20);
  var res3 = out.get() === 11111122 ? "PASS" : "FAIL";
  sig3.set(200);
  var res4 = out.get() === 11111222 ? "PASS" : "FAIL";
  sig4.set(2000);
  var res5 = out.get() === 11112222 ? "PASS" : "FAIL";
  sig5.set(20000);
  var res6 = out.get() === 11122222 ? "PASS" : "FAIL";
  sig6.set(200000);
  var res7 = out.get() === 11222222 ? "PASS" : "FAIL";
  sig7.set(2000000);
  var res8 = out.get() === 12222222 ? "PASS" : "FAIL";
  sig8.set(20000000);
  var res9 = out.get() === 22222222 ? "PASS" : "FAIL";
  console.log("Test1: " + res1 + ", Test2: " + res2 + ", Test3: " + res3 + ", Test4: " + res4 + ", Test5: " + res5 + ", Test6: " + res6 + ", Test7: " + res7 + ", Test8: " + res8 + ", Test9: " + res9);
}

var testLift9= function(){
  var f = function(a, b, c, d, e, f, g, h, i){ return a + b + c + d + e + f + g + h + i; },
      sig1 = make(1);
      sig2 = make(10);
      sig3 = make(100);
      sig4 = make(1000);
      sig5 = make(10000);
      sig6 = make(100000);
      sig7 = make(1000000);
      sig8 = make(10000000);
      sig9 = make(100000000);
      out = liftA9P(f, sig1, sig2, sig3, sig4, sig5, sig6, sig7, sig8, sig9),
      res1 = out.get() === 111111111 ? "PASS" : "FAIL";
  sig1.set(2);
  var res2 = out.get() === 111111112 ? "PASS" : "FAIL";
  sig2.set(20);
  var res3 = out.get() === 111111122 ? "PASS" : "FAIL";
  sig3.set(200);
  var res4 = out.get() === 111111222 ? "PASS" : "FAIL";
  sig4.set(2000);
  var res5 = out.get() === 111112222 ? "PASS" : "FAIL";
  sig5.set(20000);
  var res6 = out.get() === 111122222 ? "PASS" : "FAIL";
  sig6.set(200000);
  var res7 = out.get() === 111222222 ? "PASS" : "FAIL";
  sig7.set(2000000);
  var res8 = out.get() === 112222222 ? "PASS" : "FAIL";
  sig8.set(20000000);
  var res9 = out.get() === 122222222 ? "PASS" : "FAIL";
  sig9.set(200000000);
  var res10 = out.get() === 222222222 ? "PASS" : "FAIL";
  console.log("Test1: " + res1 + ", Test2: " + res2 + ", Test3: " + res3 + ", Test4: " + res4 + ", Test5: " + res5 + ", Test6: " + res6 + ", Test7: " + res7 + ", Test8: " + res8 + ", Test9: " + res9 + ", Test10: " + res10);
}

var testLift10= function(){
  var f = function(a, b, c, d, e, f, g, h, i, j){ return a + b + c + d + e + f + g + h + i + j; },
      sig1 = make(1);
      sig2 = make(10);
      sig3 = make(100);
      sig4 = make(1000);
      sig5 = make(10000);
      sig6 = make(100000);
      sig7 = make(1000000);
      sig8 = make(10000000);
      sig9 = make(100000000);
      sig10 = make(1000000000);
      out = liftA10P(f, sig1, sig2, sig3, sig4, sig5, sig6, sig7, sig8, sig9, sig10),
      res1 = out.get() === 1111111111 ? "PASS" : "FAIL";
  sig1.set(2);
  var res2 = out.get() === 1111111112 ? "PASS" : "FAIL";
  sig2.set(20);
  var res3 = out.get() === 1111111122 ? "PASS" : "FAIL";
  sig3.set(200);
  var res4 = out.get() === 1111111222 ? "PASS" : "FAIL";
  sig4.set(2000);
  var res5 = out.get() === 1111112222 ? "PASS" : "FAIL";
  sig5.set(20000);
  var res6 = out.get() === 1111122222 ? "PASS" : "FAIL";
  sig6.set(200000);
  var res7 = out.get() === 1111222222 ? "PASS" : "FAIL";
  sig7.set(2000000);
  var res8 = out.get() === 1112222222 ? "PASS" : "FAIL";
  sig8.set(20000000);
  var res9 = out.get() === 1122222222 ? "PASS" : "FAIL";
  sig9.set(200000000);
  var res10 = out.get() === 1222222222 ? "PASS" : "FAIL";
  sig10.set(2000000000);
  var res11 = out.get() === 2222222222 ? "PASS" : "FAIL";
  console.log("Test1: " + res1 + ", Test2: " + res2 + ", Test3: " + res3 + ", Test4: " + res4 + ", Test5: " + res5 + ", Test6: " + res6 + ", Test7: " + res7 + ", Test8: " + res8 + ", Test9: " + res9 + ", Test10: " + res10 + ", Test11: " + res11);
}
