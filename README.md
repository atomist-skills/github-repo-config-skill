# `@atomist/github-repo-config`

<!---atomist-skill-readme:start--->

# What it's useful for

Choose a standard GitHub Repo configuration and apply it consistently across all 
your repositories.

The per Repo config options supported by GitHub are [documented here](https://developer.github.com/v3/repos/#update-a-repository
).  However, a good summary of the config options you can standardize is:

| Name |	Type | 	Description |
| :--  | :------ | :----------  |
| has_issues |	boolean |	Either true to enable issues for this repository or false to disable them. Default: true. |
| has_projects |	boolean |	Either true to enable projects for this repository or false to disable them. Default: true. Note: If you're creating a repository in an organization that has disabled repository projects, the default is false, and if you pass true, the API returns an error. |
| has_wiki |	boolean |	Either true to enable the wiki for this repository or false to disable it. Default: true. |
| default_branch |	string |	Updates the default branch for this repository. |
| allow_squash_merge |	boolean |	Either true to allow squash-merging pull requests, or false to prevent squash-merging. Default: true |
| allow_merge_commit |	boolean |	Either true to allow merging pull requests with a merge commit, or false to prevent merging pull requests with  merge commits. Default: true |
| allow_rebase_merge |	boolean |	Either true to allow rebase-merging pull requests, or false to prevent rebase-merging. Default: true. |
| delete_branch_on_merge |	boolean |	Either true to allow automatically deleting head branches when pull requests are merged, or false to prevent automatic deletion. Default: false |

Each configuration of this skill can select a set of options above and apply to them to a set of repositories selected by Topic.  This will automation of statements like:

> all Repos with the topic `TopicName` should have wikis disabled, issues enabled, and only allow rebase merges.

# Before you get started

Connect and configure these integrations:

1. **GitHub**
2. **Slack** (optional)

The **GitHub** integration must be configured in order to use this skill.

When the optional Slack integration is enabled, users can interact with this skill directly from Slack.

# How to configure

1. **Configure Topic Selection**

    Choose a Repo Topic. This will be used to select the set of Repositories to configure.

    ![screenshot1](docs/images/screenshot1.png)

2. **Configure your Desired Repository Configuration**

    Please see [GitHub documentation for supported options](https://developer.github.com/v3/repos/#update-a-repository)

    ![screenshot2](docs/images/screenshot2.png)

3. **Optionally create a cron schedule**

    Re-apply this configuration periodically to ensure it stays in sync.

    ![screenshot3](docs/images/screenshot3.png)

## How to use Git Repo Config

*   **Using a Cron schedule**

    This skill can iterate over all of your Repos on a Schedule.  
    For Repos marked with the appropriate Topic, the configuration will be applied.

*   **Run a sync from Slack**

    Interactively kick off the Skill to synchronize your Repositories.

    ```
    @atomist sync repo config
    ```

<!---atomist-skill-readme:end--->

---

Created by [Atomist][atomist].
Need Help? [Join our Slack workspace][slack].

[atomist]: https://atomist.com/ "Atomist - How Teams Deliver Software"
[slack]: https://join.atomist.com/ "Atomist Community Slack"
