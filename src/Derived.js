// module Derived

function make(initial) {
  var subs = [];
  var val = initial;
  var sig = {
    subscribe: function(sub) {
      subs.push(sub);
      sub(val);
    },
    get: function() { return val; },
    set: function(newval) {
      val = newval;
      subs.forEach(function(sub) { sub(newval); console.log("Calling sub with " + val.toString()) });
    }
  };
  return sig;
};
// modified to use drop equals as default behavior for set
function makeAsSrc(eq) {
    return function(initial){
      var subs = [];
      var val = initial;
      var sig = {
        subscribe: function(sub) {
          subs.push(sub);
          sub(val);
        },
        get: function() { return val; },
        set: function(newval) {
            if (!eq["eq"](val)(newval)) {
                 val = newval;
                subs.forEach(function(sub) { sub(newval); console.log("Calling sub with " + val.toString()) });
            };
        }
    };
      return sig;
  };
};



// tests
var state1 = { a: 10, b: 100.1, c: "Poop" };
var state2 = { a: 20, b: 100.1, c: "Poop" };
var state3 = { a: 20, b: 112.1, c: "Poop" };
var state4 = { a: 20, b: 112.1, c: "Farts" };
var state5 = { a: 20, b: 112.1, c: "Crap" };
var state6 = { a: 25, b: 250.1, c: "Doodoo" };
var selectorA = function(state){ return state.a };
var selectorB = function(state){ return state.b };
var selectorC = function(state){ return state.c };
var eqDict = { eq: function(x){ return function(y){ return x === y; }; }};

var SelectorA = mkSrc(eqDict)(selectorA)(state1);;
var SelectorB = mkSrc(eqDict)(selectorB)(state1);
var SelectorC = mkSrc(eqDict)(selectorC)(state1);

var Plus10A = mapDerive(function(x){ return x + 10; })(SelectorA);
var Plus205B = mapDerive(function(x){ return x + 205; })(SelectorB);
var PlusRuleC = mapDerive(function(x){ return x + " RULE"; })(SelectorC);
var ApplyAll = function(a, b, c, fa, fb, fc){ return { selectA: a, selectB: b, selectC: c, plus10A: fa, plus205B: fb, plusRuleC: fc }; };
var Result = liftD6(ApplyAll, SelectorA, SelectorB, SelectorC, Plus10A, Plus205B, PlusRuleC);

var log1 = console.log("Result 1");
var result1 = console.log(Result.derive(state1));
var log2 = console.log("Result 2");
var result2 = console.log(Result.derive(state2));
var log3 = console.log("Result 3");
var result3 = console.log(Result.derive(state3));
var log4 = console.log("Result 4");
var result4 = console.log(Result.derive(state4));
var log5 = console.log("Result 5");
var result5 = console.log(Result.derive(state5));
var log6 = console.log("Result 6");
var result6 = console.log(Result.derive(state6));



// Modified version with reference creation
// (s -> a) -> Derived a
function mkSrc(eqSelector) {
      return function(selector){
           return function(initialState){
                var srcSignal = makeAsSrc(eqSelector)(selector(initialState));
                var srcs = [];
                var result =  {
                  getSrcs: function(){ return srcs; },
                  derive: function(newState){ srcSignal.set(selector(newState)); return srcSignal.get(); },
                  getSignal: function(){ return srcSignal; }
                };
              srcs.push(result);
              return result;
      };
    };
};

// (a -> b) -> Derived s a -> Derived s b
function mapDerive(fun) {
  return function(derived) {
          var srcs = derived.getSrcs();
          var resultSignal = mapSig(fun)(derived.getSignal());
          var result = {
            getSrcs: function(){ return srcs; },
            derive: function(newState){
                srcs.forEach(function(src){ src.derive(newState); }); // drive the source signals
                return resultSignal.get();  // read the result signal
                  },
            getSignal: function(){ return resultSignal; }
            };
          return result;
    };
  };

// a -> Derive s a
function pureDerive(value){
      var srcs = [];
      var resultSignal = make(value);
      var result =  {
        getSrcs: function(){ return srcs; },
        derive: function(newState){ return resultSignal.get(); },
        getSignal: function(){ return resultSignal; }
        };
      return result;
  };


// Derive s (a -> b) -> Derive s a -> Derive s b
function applyDerive(deriveFun){
  return function(deriveVal){
        var combinedSrcs = deriveFun.getSrcs().concat( deriveVal.getSrcs() );  // merge the sources
        var srcs = combinedSrcs.reduce(function(acc, src){
            if (acc.includes(src)){ return acc; }
            else{ acc.push(src); return acc; };
            }, []);

        var resultSignal = applySig(deriveFun.getSignal())(deriveVal.getSignal());
        var result = {
          getSrcs: function(){ return srcs; },
          derive: function(newState){
              srcs.forEach(function(src){ src.derive(newState); }); // drive the source signals
              return resultSignal.get();  // read the result signal
                },
          getSignal: function(){ return resultSignal; }
        };
        return result;
    };
  };

  // Derive s (a -> b) -> Derive s a -> Derive s b
function liftD6(fun, d1, d2, d3, d4, d5, d6){
        var combinedSrcs = d1.getSrcs().concat(d2.getSrcs()).concat(d3.getSrcs())
                           .concat(d4.getSrcs()).concat(d5.getSrcs()).concat(d6.getSrcs());  // merge the sources
        var srcs = combinedSrcs.reduce(function(acc, src){
            if (acc.includes(src)){ return acc; }
            else{ acc.push(src); return acc; };
            }, []);

        var resultSignal = liftA6P(fun, d1.getSignal(), d2.getSignal(), d3.getSignal(), d4.getSignal()
                                    , d5.getSignal(), d6.getSignal());
        var result = {
          getSrcs: function(){ return srcs; },
          derive: function(newState){
              srcs.forEach(function(src){ src.derive(newState); }); // drive the source signals
              return resultSignal.get();  // read the result signal
                },
          getSignal: function(){ return resultSignal; }
        };
        return result;
    };

function mapSig(fun) {
  return function(sig) {
    var out = make(fun(sig.get()));
    sig.subscribe(function(val) { out.set(fun(val)); });
    return out;
  };
};

function applySig(fun) {
  return function(sig) {
    var out = make(fun.get()(sig.get()));
    var produce = function() { out.set(fun.get()(sig.get())); };
    fun.subscribe(produce);
    sig.subscribe(produce);
    return out;
  };
};



function dropRepeats(eq) {
  return function(sig) {
    var val = sig.get();
    var out = make(val);
    sig.subscribe(function(newval) {
      if (!eq["eq"](val)(newval)) {
        val = newval;
        out.set(val);
      }
    });
    return out;
  };
};


function liftA6P(f, sig1, sig2, sig3, sig4, sig5, sig6) {
    var out = make(f(sig1.get(),sig2.get(),sig3.get(),sig4.get(), sig5.get(),sig6.get()));
    var produce = function() { out.set(f(sig1.get(),sig2.get(),sig3.get(),sig4.get(),sig5.get(),sig6.get())); };
    sig1.subscribe(produce);
    sig2.subscribe(produce);
    sig3.subscribe(produce);
    sig4.subscribe(produce);
    sig5.subscribe(produce);
    sig6.subscribe(produce);
    return out;
  };
