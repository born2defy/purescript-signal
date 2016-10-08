/* global exports */
"use strict";

// module Signal.Lift

exports.liftA2P = function(f, sig1, sig2) {
    var out = signal(f(sig1.get(),sig2.get()));
    var produce = function() { out.set(f(sig1.get(),sig2.get())); };
    sig1.subscribe(produce);
    sig2.subscribe(produce);
    return out;
  };

exports.liftA3P = function(f, sig1, sig2, sig3) {
    var out = signal(f(sig1.get(),sig2.get(),sig3.get()));
    var produce = function() { out.set(f(sig1.get(),sig2.get(),sig3.get())); };
    sig1.subscribe(produce);
    sig2.subscribe(produce);
    sig3.subscribe(produce);
    return out;
  };

exports.liftA4P = function(f, sig1, sig2, sig3, sig4) {
    var out = signal(f(sig1.get(),sig2.get(),sig3.get(),sig4.get()));
    var produce = function() { out.set(f(sig1.get(),sig2.get(),sig3.get(),sig4.get())); };
    sig1.subscribe(produce);
    sig2.subscribe(produce);
    sig3.subscribe(produce);
    sig4.subscribe(produce);
    return out;
  };

exports.liftA5P = function(f, sig1, sig2, sig3, sig4, sig5) {
    var out = signal(f(sig1.get(),sig2.get(),sig3.get(),sig4.get(), sig5.get()));
    var produce = function() { out.set(f(sig1.get(),sig2.get(),sig3.get(),sig4.get(),sig5.get())); };
    sig1.subscribe(produce);
    sig2.subscribe(produce);
    sig3.subscribe(produce);
    sig4.subscribe(produce);
    sig5.subscribe(produce);
    return out;
  };

exports.liftA6P = function(f, sig1, sig2, sig3, sig4, sig5, sig6) {
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

exports.liftA7P = function(f, sig1, sig2, sig3, sig4, sig5, sig6, sig7) {
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

exports.liftA8P = function(f, sig1, sig2, sig3, sig4, sig5, sig6, sig7, sig8) {
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

exports.liftA9P = function(f, sig1, sig2, sig3, sig4, sig5, sig6, sig7, sig8, sig9) {
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

exports.liftA10P = function(f, sig1, sig2, sig3, sig4, sig5, sig6, sig7, sig8, sig9, sig10){
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

exports.runFn11 = function (fn) {
  return function (a) {
    return function (b) {
      return function (c) {
        return function (d) {
          return function (e) {
            return function (f) {
              return function (g) {
                return function (h) {
                  return function (i) {
                    return function (j) {
                      return function (k) {
                        return fn(a, b, c, d, e, f, g, h, i, j, k);
                      };
                    };
                  };
                };
              };
            };
          };
        };
      };
    };
  };
};
