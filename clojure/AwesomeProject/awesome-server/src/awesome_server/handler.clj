(ns awesome-server.handler
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [ring.middleware.defaults :refer [wrap-defaults site-defaults]]))

(defroutes app-routes
  (GET "/" [] "Hello World 2")
  (GET "/calc2.js" [] "1+1")
  (GET "/render.js" [] "
   function(movie) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>
      </View>
    );
  }
  ")
  (GET "/calc.js" [] 
       "var PI = Math.PI;

        exports.area = function (r) {
          return PI * r * r;
        };

        exports.circumference = function (r) {
          return 2 * PI * r;
        };"
       )
  (route/not-found "Not Found"))

(def app
  (wrap-defaults app-routes site-defaults))
