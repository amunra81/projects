(ns tutorial.collections)
(count [1 "asda" true]) ; 3
(reverse [1 "asda" true]) 

; sequences
(#(+ % 3) 2 )
(map #(+ % 3) [1 2 3])
(map + [1 2 4] [4 2] [1 2 4])

(apply + [1 2 3])

(def stages [ "Marry" "Bog" "Pula" "Cumsecade"])
(first stages)
(second stages)
(last stages)
(nth stages 2)

(next stages)
(butlast stages)
(filter #(> (count %) 3) stages)
(drop-last 2 stages)

; lists
(def stooges (list "Moe" "Larry" "Curly"))
(def stooges (quote ("Moe" "Larry" "Curly")))
(def stooges '("Moe" "Larry" "Curly"))

(println stooges)
(some #(= % "Moe") stooges)
(some #(= % "Mark") stooges)

(contains? (set stooges) "Moe")
(contains? (set stooges) "Mark")

; sets
(def stooges (hash-set "Moe" "Larry" "Curly")) ; not sorted
(def stooges #{"Moe" "Larry" "Curly"}) ; same as previous
(def stooges (sorted-set "Moe" "Larry" "Curly"))

(println stooges)

; maps
(def popsicle-map (hash-map :red :cherry,:green :apple,:purple :grape))
(def popsicle-map {:red :cherry,:green :apple,:purple :grape})

(println popsicle-map)
(get popsicle-map :green)
(popsicle-map :green)
(:green popsicle-map)

(contains? popsicle-map :green)
(keys popsicle-map)
(vals popsicle-map)

(assoc popsicle-map :green :lime :blue :blueberry)
(dissoc popsicle-map :green :blue)

(doseq [[color flavor] popsicle-map] 
  (println (str "Gustul lui " (name color) 
                " este " (name flavor))))

(select-keys popsicle-map [:green :red])

(def person {
  :name "Mark Volkmann"
  :address {
    :street "644 Glen Summit"
    :city "St. Charles"
    :state "Missouri"
    :zip 63304}
  :employer {
    :name "Object Computing, Inc."
    :address {
      :street "12140 Woodcrest Executive Drive, Suite 250"
      :city "Creve Coeur"
      :state "Missouri"
      :zip 63141}}})

(get-in person [:employer :address :city])
(-> person :employer :address :city)  
(:city (:address (:employer person))) ; este echivalent cu ->
(reduce get person [:employer :address :city])

(assoc-in person [:employer :address :city] "XXXXX")

(update-in person [:employer :address :zip] str "-1234")
