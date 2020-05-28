// throw if Repo config is not valid
//   - this will be called only once per skill invocation
function validate (config) {
    console.info("config: ", config);
    // throw "invalid config";
}

// ready to apply a config to a Repo
// callback will apply the change - call if you want to proceed
// otherwise, it's a preview of what would happen
async function applyConfig ({ref, config, topics}, callback) {
    console.info(`apply config to ${ref.owner}/${ref.repo}`);
    await callback();
}

exports.validate = validate
exports.applyConfig = applyConfig
