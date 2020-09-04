var api = require('@atomist/api-cljs/atomist.middleware');

var handleRepo = async function(repo, config, topic) {
  if (repo.topics.includes(topic)) {
    console.info(`repo ${repo.owner}/${repo.repo} will converge ${config}`);
    await repo.patchRepo(config);
  }
  return true;
}

exports.handler = api.handler(
 {
    sync: async (request) => {
      console.info(`target config: ${request.config}`);
      await request.withRepoIterator(async repo => {
        return await handleRepo(repo, request.repoConfig, request.topic);
      });
    },
    OnSchedule: async (request) => {
      await request.withRepoIterator(async repo => {
        return await handleRepo(repo, request.repoConfig, request.topic);
      });
    },
    OnNewRepo: async (request) => {
      await request.withRepo(async repo => {
        return await handleRepo(repo, request.repoConfig, request.topic);
      });
    }
 }
);
