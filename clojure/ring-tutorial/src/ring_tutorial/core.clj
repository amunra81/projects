(ns ring-tutorial.core
 (:use ring.adapter.jetty)
 (:use ring.util.response))

 ;(:require [compojure.core :refer :all]
            ;[compojure.route :as route]))

;(defn handler [req]
  ;{:status  200
   ;:headers {"Content-Type" "text/html"}
   ;:body    "Hello World asda from Ring"})

(defn handler [request]
  {:status 200
   :headers {"Content-Type" "text/plain"}
   :body (:remote-addr request)})

;(what-is-my-ip "www.google.com")

(defn boot []
  (run-jetty handler {:port 8080}))

(response "asdad")
;(defn wrap-content-type [handler content-type]
  ;(fn [request]
    ;(let [response (handler request)]
      ;(assoc-in response [:headers "Content-Type"] content-type))))
;(def app
  ;(wrap-content-type handler "text/html"))

(response "Hello World")
(redirect "http://example.com")
(file-response "readme.html" {:root "public"})

