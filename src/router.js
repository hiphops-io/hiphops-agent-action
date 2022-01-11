const github = require("@actions/github");

const createRelease = require("./releases");

const routeInstruction = async () => {
  const { name, ...body } = JSON.parse(github.context.inputs.instruction);

  switch (name) {
    case "create_release":
      return await createRelease(body);
    default:
      throw new Error(`Unknown instruction: ${name}.`);
  }
};

module.exports = routeInstruction;
