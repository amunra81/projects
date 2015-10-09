(ns tutorial.functions)

(defn parting
  "define a string parting"
  [name]
  (str "Goodbye , " name))

(println (parting "Manole"))

;optional parameters
(defn power [base & exponents]
   (reduce #(Math/pow %1 %2) base exponents))

(power 2 3 4)

;multiple parameter list
(defn parting
  ([] (parting "World"))
  ([name] (parting name "en"))
  ([name language] 
    (condp = language 
       "en" (str "Googbye " name)
       "es" (str "Adios " name)
       "ro" (IllegalArgumentException. 
            (str "No suported language" language)))))

(println (parting))
(println (parting "Mark"))
(println (parting "Mark" "es"))
(println (parting "Mark" "ro"))

;anonymoys functions
(def years [1940 1944 1961 1985 1987])
(filter (fn [year] (even? year)) years)
(filter #(even? %) years)

;partial
(def times2 (partial * 2))
(times2 3)


(defn s
  [spec]
  [(if (:isX? spec) (:x spec) (:y spec))])

(s {:isX false,:x "asd",:y "basd"})

(def d (fn  [[x y]] print y))
(d "a")
