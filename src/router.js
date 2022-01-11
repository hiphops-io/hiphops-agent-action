const github = require("@actions/github");

const createRelease = require("./releases");

const routeInstruction = async () => {
  const { instruction_name, ...body } = JSON.parse(
    github.context.inputs.instruction
  );

  switch (instruction_name) {
    case "create_release":
      return await createRelease(body);
    default:
      throw new Error(`Unknown instruction: ${instruction_name}.`);
  }
};

module.exports = routeInstruction;
