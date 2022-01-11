const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
  try {
    console.log(`Testing dispatch payload`);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2);

    const token = core.getInput("token");
    const octokit = github.getOctokit(token);

    console.log("--- 001");
    // Try to create the release, capture the error if not.
    const response = await octokit.rest.repos
      .createRelease({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        tag_name: "v1.0.0",
        target_commitish: "main",
      })
      .catch((err) => {
        console.log("Error thrown.");
        console.log(err);
      });

    console.log(response);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
