module Signal.Lift
  ( liftA2
  , liftA3
  , liftA4
  , liftA5
  , liftA6
  , liftA7
  , liftA8
  , liftA9
  , liftA10
  ) where

import Data.Function.Uncurried (Fn3, Fn4, Fn5, Fn6, Fn7, Fn8, Fn9, Fn10, runFn3, runFn4, runFn5, runFn6, runFn7, runFn8, runFn9, runFn10)
import Signal (Signal)

-- | A function of ten arguments
foreign import data Fn11 :: * -> * -> * -> * -> * -> * -> * -> * -> * -> * -> * -> * -> *

-- | Apply a function of ten arguments
foreign import runFn11 :: forall a b c d e f g h i j k l. Fn11 a b c d e f g h i j k l -> a -> b -> c -> d -> e -> f -> g -> h -> i -> j -> k -> l

foreign import liftA2P :: forall a b c. Fn3 (a -> b -> c) (Signal a) (Signal b) (Signal c)
foreign import liftA3P :: forall a b c d. Fn4 (a -> b -> c -> d) (Signal a) (Signal b) (Signal c) (Signal d)
foreign import liftA4P :: forall a b c d e. Fn5 (a -> b -> c -> d -> e) (Signal a) (Signal b) (Signal c) (Signal d) (Signal e)
foreign import liftA5P :: forall a b c d e f. Fn6 (a -> b -> c -> d -> e -> f) (Signal a) (Signal b) (Signal c) (Signal d) (Signal e) (Signal f)
foreign import liftA6P :: forall a b c d e f g. Fn7 (a -> b -> c -> d -> e -> f -> g) (Signal a) (Signal b) (Signal c) (Signal d) (Signal e) (Signal f) (Signal g)
foreign import liftA7P :: forall a b c d e f g h. Fn8 (a -> b -> c -> d -> e -> f -> g -> h) (Signal a) (Signal b) (Signal c) (Signal d) (Signal e) (Signal f) (Signal g) (Signal h)
foreign import liftA8P :: forall a b c d e f g h i. Fn9 (a -> b -> c -> d -> e -> f -> g -> h -> i) (Signal a) (Signal b) (Signal c) (Signal d) (Signal e) (Signal f) (Signal g) (Signal h) (Signal i)
foreign import liftA9P :: forall a b c d e f g h i j. Fn10 (a -> b -> c -> d -> e -> f -> g -> h -> i -> j) (Signal a) (Signal b) (Signal c) (Signal d) (Signal e) (Signal f) (Signal g) (Signal h) (Signal i) (Signal j)
foreign import liftA10P :: forall a b c d e f g h i j k. Fn11 (a -> b -> c -> d -> e -> f -> g -> h -> i -> j -> k) (Signal a) (Signal b) (Signal c) (Signal d) (Signal e) (Signal f) (Signal g) (Signal h) (Signal i) (Signal j) (Signal k)

liftA2 :: forall a b c. (a -> b -> c) -> Signal a -> Signal b -> Signal c
liftA2 = runFn3 liftA2P

liftA3 :: forall a b c d. (a -> b -> c -> d) -> Signal a -> Signal b -> Signal c -> Signal d
liftA3 = runFn4 liftA3P

liftA4 :: forall a b c d e. (a -> b -> c -> d -> e) -> Signal a -> Signal b -> Signal c -> Signal d -> Signal e
liftA4 = runFn5 liftA4P

liftA5 :: forall a b c d e f. (a -> b -> c -> d -> e -> f) -> Signal a -> Signal b -> Signal c -> Signal d -> Signal e -> Signal f
liftA5 = runFn6 liftA5P

liftA6 :: forall a b c d e f g. (a -> b -> c -> d -> e -> f -> g) -> Signal a -> Signal b -> Signal c -> Signal d -> Signal e -> Signal f -> Signal g
liftA6 = runFn7 liftA6P

liftA7 :: forall a b c d e f g h. (a -> b -> c -> d -> e -> f -> g -> h) -> Signal a -> Signal b -> Signal c -> Signal d -> Signal e -> Signal f -> Signal g -> Signal h
liftA7 = runFn8 liftA7P

liftA8 :: forall a b c d e f g h i. (a -> b -> c -> d -> e -> f -> g -> h -> i) -> Signal a -> Signal b -> Signal c -> Signal d -> Signal e -> Signal f -> Signal g -> Signal h -> Signal i
liftA8 = runFn9 liftA8P

liftA9 :: forall a b c d e f g h i j. (a -> b -> c -> d -> e -> f -> g -> h -> i -> j) -> Signal a -> Signal b -> Signal c -> Signal d -> Signal e -> Signal f -> Signal g -> Signal h -> Signal i -> Signal j
liftA9 = runFn10 liftA9P

liftA10 :: forall a b c d e f g h i j k. (a -> b -> c -> d -> e -> f -> g -> h -> i -> j -> k) -> Signal a -> Signal b -> Signal c -> Signal d -> Signal e -> Signal f -> Signal g -> Signal h -> Signal i -> Signal j -> Signal k
liftA10 = runFn11 liftA10P
