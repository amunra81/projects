(ns hello-world.handler.core)

(.log js/console "Hello world 2!")

;; Our new function
(defn add [a b]
  (+ a b))
