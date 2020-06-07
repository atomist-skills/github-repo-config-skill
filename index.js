var api = require('@atomist/api-cljs/atomist.middleware');

var hasTopic = async function({config, topics}) {
    console.info(`config ${config} and topics (${topics})`);
    return true;
}

var setPolicy = async function({ref, config}, callback) {
    console.info(`apply config to ${ref.owner}/${ref.repo}`);
    // make this call if you want to apply the policy
    // await callback(config);
    return "skipping";
}

exports.handler = function(data,cb) {
    api.dispatch({
        sync: api.withRepoIteratorAndFilter( hasTopic, setPolicy),
        OnSchedule: api.withRepoIteratorAndFilter( hasTopic, setPolicy),
        OnNewRepo: api.withSlackMessage(async (request, slack) => {
            await slack.simpleMessage( "#git-repo-config-skill", `detected a new Repo`);
        })
    })(data,cb);
}
