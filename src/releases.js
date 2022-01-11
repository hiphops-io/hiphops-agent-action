const core = require("@actions/core");
const github = require("@actions/github");

exports.createRelease = async (payload) => {
  const token = core.getInput("token");
  const octokit = github.getOctokit(token);

  const tagName = "v1.0.0";

  // Try to create the release, capture the error if not.
  const response = await octokit.rest.repos
    .createRelease({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      tag_name: tagName,
      target_commitish: "main",
    })
    .catch((err) => {
      // GitHub API throws 422 if a release with this tag already exists.
      if (err.status !== 422) {
        throw err;
      }
      core.warning(
        `A release with the tag '${tagName}' already exists. Skipping creation.`
      );
    });

  if (response?.status === 201) {
    core.notice(`Created release '${tagName}'`);
  }
};
