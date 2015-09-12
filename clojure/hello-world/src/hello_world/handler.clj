(ns hello-world.handler
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [ring.middleware.defaults :refer [wrap-defaults site-defaults]])
  (:use [hello-world.server])
  )

(defroutes app-routes
  (GET "/" [] "Hello World")


  (GET ["/user/:id", :id #"[0-9]+"] [id]
    {:status 200
     :headers {"Content-Type" "text/html; charset=utf-8"}
     :body (str "<h1>Hello user as " id "</h1>")}) 

  ;HTML with clojure
  (GET "/html" []
      (view-content))
  (route/resources "/")
  ;last line
  (route/not-found {:status 404
     :headers {"Content-Type" "text/html; charset=utf-8"}
     :body (str "<h1>Not found</h1>")}))
  
(def app
  (wrap-defaults app-routes site-defaults))

{:request-method :get 
 :uri "/foobar" 
 :headers {} 
 :params {:x "foo", :y "bar", :z "baz", :w "qux"}}
