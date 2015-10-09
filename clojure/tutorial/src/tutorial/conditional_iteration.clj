(ns tutorial.conditional-iteration)

;if
(import '(java.util Calendar GregorianCalendar))
(let [gc (GregorianCalendar.)
      day-of-week (.get gc Calendar/DAY_OF_WEEK)
      is-weekend (or (= day-of-week Calendar/SATURDAY) (= day-of-week Calendar/SUNDAY))]
  (if is-weekend
    (println "play")
    (do (println "work")
        (println "sleep")))
  
  (when is-weekend (println "play"))
  (when-not is-weekend (println "work") (println "sleep")))

;if-let
(defn process-next [waiting-line]
  (if-let [nameT (first waiting-line)]
    (println nameT "is next")
    (println "no waiting")))

(process-next '("Jeremy" "Amanda" "Tami")) ; -> Jeremy is next
(process-next '()) ; -> no waiting
