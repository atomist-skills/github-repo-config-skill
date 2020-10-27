/*
 * Copyright © 2020 Atomist, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var lr = require('@atomist/api-cljs/atomist.local_runner');
var main = require('./index.js');
var fs = require("fs");

//lr.setEnv("prod");
lr.setEnv("prod-github-auth");
var fakeCommandHandler = lr.addConfiguration(
  lr.fakeCommandHandler("T095SFFBK", "sync", "raw message", "D0HMP77EZ", "U09MZ63EW"),
  {name: "default", parameters: [{name: "config", 
                                  value: "{\"has_wiki\": false}"}, 
                                 {name: "topic", 
                                  value: "atomist-skill"}]});

var fakePushEvent = lr.addConfiguration(
  lr.fakePushEvent("AEIB5886C", "slimslender", {name: "clj1", id: "AEIB5886C_AEIB5886C_slimslender_132627478"}, "slimtest1"),
  {name: "default", parameters: [{name: "repoConfig", 
                                  value: "{\"has_wiki\": false}"},
                                 {name: "topic", 
                                  value: "clojure"},
                                 {name: "branchPattern",
                                  value: "slimtest1"},
                                 {name: "branchProtectionRule",
                                  value: fs.readFileSync("rule.json").toString()}]}
);

lr.callEventHandler( 
  fakePushEvent,
  main.handler);
