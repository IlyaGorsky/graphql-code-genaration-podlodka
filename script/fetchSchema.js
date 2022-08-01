const path = require('path');
const fs = require('fs');
const axios = require('axios').default;
const { getIntrospectionQuery, buildClientSchema, printSchema } = require('graphql/utilities');

async function fetchSchema() {
  try {
    // eslint-disable-next-line no-console
    console.log('fetchSchema', 'start', 'https://rickandmortyapi.com/graphql');
    const {
      data: { data: introspection },
    } = await axios({
      url: 'https://rickandmortyapi.com/graphql',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({ query: getIntrospectionQuery(), operationName: 'IntrospectionQuery' }),
    });
    // eslint-disable-next-line no-console
    console.log('fetchSchema', 'ok');
    return buildClientSchema(introspection);
  } catch (e) {
    console.error(`fetchSchema ${e.message}`);
  }
}

function printToFile(dist, schema) {
  try {
    const output = path.resolve(process.cwd(), dist);
    fs.writeFileSync(output, schema);
    // eslint-disable-next-line no-console
    console.log('printToFile', output);
  } catch (e) {
    console.error(`printToFile ${e.message}`);
  }
}

function printClientSchema(rawSchema) {
  try {
    const schema = printSchema(rawSchema);
    // eslint-disable-next-line no-console
    console.log('printClientSchema', 'ok');
    return schema;
  } catch (e) {
    console.error(`printClientSchema ${e.message}`);
  }
}

function printFile(schema) {
  printToFile('./_generated_/schema.graphql', printClientSchema(schema));
}

fetchSchema().then(printFile);
