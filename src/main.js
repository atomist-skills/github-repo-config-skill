// throw if Repo config is invalid
//   - this will be called only once per skill invocation
function validate (config) {
    console.info("config has ", config);
}

// callback will apply the change to GitHub using Atomist GitHub Application creds
async function applyConfig ({ref, config, topics}, callback) {
    console.info(`apply config to ${ref.owner}/${ref.repo}`);
    //await callback();
}

exports.validate = validate
exports.applyConfig = applyConfig