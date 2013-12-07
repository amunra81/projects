(ns tutorial.destructuring)

;Destructuring can be used in the parameter list of a function or macro to extract parts of collections into local bindings. It can also be used in bindings created using the let special form and the binding macro.

(defn approach1 [numbers]
  (let [n1 (first numbers)
        n2 (nth numbers 2)]
   (+ n1 n2)))

(approach1 [1 2 9 3])

; Note the underscore used to represent the
; second item in the collection which isn't used.
(defn approach2 [[n1 _ n3]] (+ n1 n3))

(approach2 [1 2 3])
(approach2 [1 2 3 5])
;(approach2 [1 2]) ; nullpointer excheption

;The ampersand character can be used with destructuring to capture the remaining items in a collection. For example:
(defn name-summary [[n1 n2 & others]]
  (str n1 ", " n2 " and " (count others) " others liked you"))

(name-summary [:Bogdan "Irina" :Valerica "Tzutzu"])

;The :as keyword can be used to retain access to the entire collection that is being destructured. Suppose we want a function that takes a list or vector and returns the sum of the first and third items divided by the sum of all the items.
(defn first-and-third-percentage [[n1 _ n3 :as coll]]
  (/ (+ n1 n3) (apply + coll)))

(first-and-third-percentage [4 5 6 7]) ; ratio reduced from 10/22 -> 5/11

;destructuring maps - tare!
(defn summer-sales-percentage
  ; The keywords below indicate the keys whose values
  ; should be extracted by destructuring.
  ; The non-keywords are the local bindings
  ; into which the values are placed.
  [{june :june july :july august :august :as all}]
  (let [summer-sales (+ june july august)
        all-sales (apply + (vals all))]
    (/ summer-sales all-sales)))

(def sales {
  :january   100 :february 200 :march      0 :april    300
  :may       200 :june     100 :july     400 :august   500
  :september 200 :october  300 :november 400 :december 600})

(summer-sales-percentage sales) ; ratio reduced from 1000/3300 -> 10/33
