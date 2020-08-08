var lr = require('@atomist/api-cljs/atomist.local_runner');
var main = require('index.js');

lr.setEnv("prod");
var fakeCommandHandler = lr.addConfiguration(
  lr.fakeCommandHandler("T095SFFBK", "sync", "raw message", "D0HMP77EZ", "U09MZ63EW"),
  {name: "default", parameters: [{name: "config", 
                                  value: "{\"has_wiki\": false}"}, 
                                 {name: "topic", 
                                  value: "atomist-skill"}]});

lr.callEventHandler( 
  fakeCommandHandler,
  main.handler);
