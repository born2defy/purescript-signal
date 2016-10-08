"use strict";

var connectRendererP = function(render, sig){
   sig.render(render);
   return sig;
}

var disconnectRenderer = function(sig){
  sig.disconnect();
  return sig;
}

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

var int$ = make(10);

var render = function (int){ var i = int; console.log("Here be a " + i.toString());};

var render$ = connectRendererP(render, int$);
