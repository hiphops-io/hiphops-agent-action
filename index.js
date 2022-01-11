const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
  try {
    console.log(`Testing dispatch payload`);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);

    console.log("Testing release creation");
    const token = core.getInput("token");
    const octokit = github.getOctokit(token);

    // Try to create the release, capture the error if not.
    console.log("Creating release with error callback");
    const response = await octokit.rest.repos.createRelease(
      {
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        tag_name: "v1.0.0",
        target_commitish: "main",
      },
      function (err, res) {
        if (err) {
          console.log("Got an error!");
          console.log(err);
        } else {
          console.log("Didn't get an error!");
          console.log(JSON.stringify(res));
        }
      }
    );
    console.log(response);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
