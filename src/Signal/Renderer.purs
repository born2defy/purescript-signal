module Signal.Renderer
  ( disconnectRenderer
  , connectRenderer
  , RENDERER
  ) where

import Data.Function.Uncurried (runFn2, Fn2)
import Signal (Signal)
import Control.Monad.Eff (Eff)

foreign import data RENDERER :: !

foreign import connectRendererP :: forall s t eff. Fn2 (s -> t) (Signal s) (Eff (renderer :: RENDERER | eff) (Signal s))

-- | Connect a rendering function to a signal
connectRenderer :: forall s t eff.  (s -> t) -> Signal s -> Eff (renderer :: RENDERER | eff) (Signal s)
connectRenderer = runFn2 connectRendererP

-- | Disconnect a rendering function from a signal
foreign import disconnectRenderer :: forall s eff. Signal s -> Eff (renderer :: RENDERER | eff) (Signal s)
