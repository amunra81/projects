(ns tutorial.validation-refs)
;Validator functions
(def age (ref 0 :validator integer?))

(try
  (dosync 
    (ref-set age 1) ; works
    (ref-set age "asda")) ; this doesn't work properly
  (catch IllegalStateException e (println "S-a bulit la \"asda\"")))

(println "Age: " @age)
