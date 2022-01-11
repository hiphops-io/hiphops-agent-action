const github = require("@actions/github");

const createRelease = require("./releases");

const routeInstruction = async () => {
  // For debugging
  console.log(JSON.stringify(github.context.payload, null, 2));

  const { name, ...body } = JSON.parse(
    github.context.payload.inputs.instruction
  );

  switch (name) {
    case "create_release":
      return await createRelease(body);
    default:
      throw new Error(`Unknown instruction: ${name}.`);
  }
};

module.exports = routeInstruction;
