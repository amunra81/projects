(def make-adder
    (fn [n] 
      (fn [x] (+ x n))))

(def compose 
  (fn [f,g]
    (fn [n] ( f (g n)))))

(def add1 (make-adder 1) )
(def mul3 (fn [n] 
            ((fn [] (* 3 n)))))

(def mul3add1 (compose mul3 add1))

(mul3add1 10)

(((fn [improver] (improver improver))
    (fn [improver] 
      (fn [n] (if (zero? n) 1 (* n ((improver improver)(dec n))))))) 
    11)

