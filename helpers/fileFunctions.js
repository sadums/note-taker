const fs = require('fs');
const util = require('util');


const readFromFile = util.promisify(fs.readFile);

const writeToFile = (fileName, data) => {
    fs.writeFile(fileName, JSON.stringify(data), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${fileName}`));
}

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(content);
        writeToFile(file, parsedData);
      }
    });
};
module.exports = {readFromFile, writeToFile, readAndAppend}