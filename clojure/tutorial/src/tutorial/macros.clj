(ns tutorial.macros)

(defmacro around-zero [number negative-expr zero-expr positive-expr]
  `(let [number# ~number] ; so number is only evaluated once
    (cond
      (< (Math/abs number#) 1e-15) ~zero-expr 
      (pos? number#) ~positive-expr
      true ~negative-expr)))

; let's play
(around-zero 0.00000000000000000000009 "negative" 0 "positive")
(around-zero 4 "negative" 0 "positive")
(around-zero -4 "negative" 0 "positive")

; the same effect of printing
(around-zero 0.1 (println "-") (println "0") (println "+"))
(println (around-zero 0.1 "-" "0" "+")) ; same thing

; putting more expressions on one branch
(around-zero -0.1
  (do (println "really cold!") (println "-"))
  (println "0")
  (println "+"))

(macroexpand-1
  '(around-zero 0.1 (println "-") (println "0") (println "+")))
