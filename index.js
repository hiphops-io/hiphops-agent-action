const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
  try {
    console.log(`Testing dispatch payload`);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);

    const token = core.getInput("token");
    const octokit = github.getOctokit(token);
    const response = await octokit.rest.repos.createRelease({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      tag_name: "v1.0.0",
      target_commitish: "main",
    });
    console.log(response);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
