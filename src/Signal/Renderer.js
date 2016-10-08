/* global exports */
"use strict";

// module Signal.Renderer

exports.connectRendererP = function(render, sig){
   sig.render(render);
   return sig;
}

exports.disconnectRenderer = function(sig){
  sig.disconnect();
  return sig;
}
