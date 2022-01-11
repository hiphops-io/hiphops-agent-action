const core = require("@actions/core");

const routePayload = require("./router");

async function run() {
  try {
    return await routePayload();
  } catch (error) {
    core.setFailed(
      `hiphops-io/hiphops-agent-action failed with: ${error.message}`
    );
  }
}

run();
