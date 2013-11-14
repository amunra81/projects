(ns tutorial.bulk)

; threads
(defn delayed-thread [ms text]
  (Thread/sleep ms)
  (println text))
(delayed-thread 1000 "Haileluia")

