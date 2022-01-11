const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
  try {
    console.log(`Testing dispatch payload`);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2);

    const token = core.getInput("token");
    const octokit = github.getOctokit(token);

    console.log("--- 003");
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
        if (err.status === 422) {
          // Try updating instead
          console.log("422 received, trying to update");
          return "Foo";
        } else {
          throw err;
        }
      });

    console.log(`Response was: ${response}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
