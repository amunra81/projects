(defproject hello-world "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :min-lein-version "2.0.0"
  :dependencies [[org.clojure/clojure "1.7.0"]
                 [compojure "1.3.4"]
                 [ring/ring-defaults "0.1.2"]
                 [org.clojure/clojurescript "1.7.48"]
                 [jayq "2.5.4"]
                 [hiccup "1.0.5"] 
                 ]
  :jvm-opts ["-Xmx1G"] 
  :plugins [[lein-ring "0.8.13"]
            [lein-cljsbuild "1.0.6"] 
            ]
  ;; figwheel settings
  :figwheel {
    :http-server-root "public"
    :port 3449
    :css-dirs ["resources/public/css"]}

  :ring {:handler hello-world.handler/app}
  
  :cljsbuild {
      :builds  {
          :main {
              :source-paths [ "src/cljss" "src/figwheel" ]
              :compiler {
                        :output-to "resources/public/js/cljs.js"
                        :output-dir "resources/public/out"
                        :optimizations :none
                        :pretty-print true
                        :source-map true
                        }}
          }}

  ;; at compile this will triger clojurescript compicaltion
  :hooks [leiningen.cljsbuild]
  )
