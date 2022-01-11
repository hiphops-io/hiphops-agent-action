const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
  try {
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2);

    const token = core.getInput("token");
    const octokit = github.getOctokit(token);

    // Try to create the release, capture the error if not.
    const response = await octokit.rest.repos
      .createRelease({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        tag_name: "v1.0.0",
        target_commitish: "main",
      })
      .catch((err) => {
        // GitHub API throws 422 if a release with this tag already exists.
        if (err.status !== 422) {
          throw err;
        }
        core.warning(
          `A release with the tag '${tag_name}' already exists. Skipping creation.`
        );
      });

    console.log("Release created successfully.", response);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
