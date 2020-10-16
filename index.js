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
