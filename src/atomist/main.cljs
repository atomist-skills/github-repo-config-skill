(ns atomist.main
  (:require [atomist.api :as api]
            [cljs.pprint :refer [pprint]]
            [cljs.core.async :refer [<!]]
            [goog.string.format]
            [clojure.data]
            [atomist.cljs-log :as log]
            [atomist.github]
            [atomist.github :as github]
            [atomist.json :as json]
            [atomist.promise :as promise]
            ["../main.js" :as main])
  (:require-macros [cljs.core.async.macros :refer [go]]))

(defn set-policy [handler]
  (fn [request]
    (go
      (<! (promise/from-promise
           ((.-applyConfig main)
            (clj->js (select-keys request [:ref :config]))
            (fn [] (promise/chan->promise
                    (go (log/infof "%s/%s -> %s"
                                   (-> request :ref :owner)
                                   (-> request :ref :repo)
                                   (:status (<! (github/patch-repo request (:repo-config request)))))))))))
      (<! (handler request)))))

(defn validate-config [handler]
  (fn [request]
    (go
      (let [validate-or-throw (fn [x] ((.-validate main) (clj->js x)) x)]
        (try
          (<! (handler (assoc request :config (-> request :config (json/->obj) (validate-or-throw)))))
          (catch :default ex
            (log/error "error " ex)
            (<! (api/finish request :failure "invalid repo config"))))))))

(defn sync-command [request]
  ((-> (api/finished)
       (api/repo-iterator
        (fn [r _] (go (some #{(:topic r)} (<! (github/repo-topics r)))))
        (-> (api/finished) (set-policy)))
       (validate-config)
       (api/add-skill-config :config :topic)
       (api/set-message-id)
       (api/status)) request))

(defn ^:export handler
  [data sendreponse]
  (api/make-request
   data
   sendreponse
   (fn [request]
     (cond
       (= "sync" (:command request)) (sync-command request)
       (-> request :data :OnSchedule) (sync-command request)
       :else
       ((-> (api/finished) (api/status :success "skipped" :visibility :hidden)) request)))))
