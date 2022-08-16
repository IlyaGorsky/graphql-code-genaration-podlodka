const fs = require('fs');

const dir = './log/';

function clean() {
  fs.readdirSync(dir).forEach((f) => {
    if (f === '.gitignore') {
      return;
    }
    fs.rmSync(`${dir}/${f}`);
  });
}

function logDebugger(loggerName = 'debugger', rawData) {
  const timestamp = new Date().getTime();
  const data = JSON.stringify(rawData, null, 2);
  const fileName = `${dir}${timestamp}-${loggerName}.json`;

  // clean();

  fs.writeFile(fileName, data, { encoding: 'utf8' }, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Successfully written ${fileName}`);
    }
  });
}

module.exports = {
  logDebugger,
};
