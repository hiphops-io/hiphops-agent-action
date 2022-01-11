const core = require("@actions/core");

const routeInstruction = require("./router");

async function run() {
  try {
    return await routeInstruction();
  } catch (error) {
    core.setFailed(
      `hiphops-io/hiphops-agent-action failed with: ${error.message} ` +
        "Perhaps you need to update your action version?"
    );
  }
}

run();
