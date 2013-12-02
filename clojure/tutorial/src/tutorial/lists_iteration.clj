(ns tutorial.lists-iteration)

(def cols "ABCD")
(def rows (range 1 4))

(println rows)
(println cols)

(println "for demo")

(for [col cols :when (not= col \B)
        row rows :while (< row 3)]
    (str col row))

(dorun
  (for [col cols :when (not= col \B)
        row rows :while (< row 3)]
    (println (str col row))))

(println "\ndoseq demo")

(doseq [col cols :when (not= col \B)
        row rows :while (< row 3)]
  (println (str col row)))
