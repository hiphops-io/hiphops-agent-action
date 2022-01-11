const github = require("@actions/github");

const routePayload = async () => {
  const { perform_action, ...payload } = JSON.parse(
    github.context.inputs.payload
  );

  switch (perform_action) {
    case "create_release":
      return await createRelease(payload);
    default:
      throw new Error(
        `Unknown action: ${perform_action}. Perhaps you need to update your action version?`
      );
  }
};

module.exports = routePayload;
