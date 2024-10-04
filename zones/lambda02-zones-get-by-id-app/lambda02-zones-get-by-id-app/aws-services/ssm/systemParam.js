import {
  SSMClient,
  GetParameterCommand,
  GetParametersCommand,
} from "@aws-sdk/client-ssm";

const client = new SSMClient({
  region: "us-east-1",
});

export const getParameters = async (parameterNames) => {
  try {
    const command = new GetParametersCommand({
      Names: parameterNames,
      WithDecryption: true, // Set to true to retrieve secure string values decrypted
    });

    const response = await client.send(command);
    const paramObject = response.Parameters.reduce((acc, param) => {
      acc[param.Name] = param.Value;
      return acc;
    }, {});
    if (response.InvalidParameters.length > 0) {
      console.error("Invalid parameters:", response.InvalidParameters);
    }

    return paramObject;
  } catch (err) {
    console.log("Error retrieving parameters:", err);
  }
};


// Function to fetch DB credentials from AWS SSM
async function getDBCredentials() {
  const params = {
      Names: ['/myapp/db_host', '/myapp/db_user', '/myapp/db_password', '/myapp/db_name'],
      WithDecryption: true
  };
  const { Parameters } = await ssm.getParameters(params).promise();
  const credentials = {};
  Parameters.forEach(param => {
      const name = param.Name.split('/').pop();
      credentials[name] = param.Value;
  });
  return credentials;
}