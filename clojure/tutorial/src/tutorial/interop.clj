(ns tutorial.interop)

(import
  '(java.util Calendar GregorianCalendar)
  '(javax.swing JFrame JLabel))

;fields
(. java.util.Calendar APRIL)
(. java.util.Calendar NOVEMBER)
(. Calendar APRIL)

(str Calendar/APRIL) 

(. Math pow 2 3)
(Math/pow 2 3)

;constructor
(def calendar (new GregorianCalendar 2008 Calendar/APRIL 11))
(def calandar (GregorianCalendar. 2007 Calendar/APRIL 11))

; methods
(. calendar add Calendar/MONTH 2)
(. calendar get Calendar/MONTH)
(.add calendar Calendar/MONTH 2)
(.get calendar Calendar/MONTH)

; chained calls
(. (. calendar getTimeZone) getDisplayName)
(.. calendar getTimeZone getDisplayName)

; doto
(doto calendar
  (.set Calendar/YEAR 1981)
  (.set Calendar/MONTH Calendar/AUGUST)
  (.set Calendar/DATE 1))
(def formater (. java.text.DateFormat getDateInstance))
(.format formater (.getTime calendar))
  
;memfn - nu e neaparat de memorat
(println (map #(.substring %1 %2) 
            ["Irina" "Bogdan" "Daniel"] [1 2 3]))
(println (map (memfn substring beginIndex)
            ["Irina" "Bogdan" "Daniel"] [1 2 3]))
