const JSZip = require('jszip');
const Docxtemplater = require('docxtemplater');
const fs = require('fs');
const path = require('path');

module.exports = {
  generate: (data, id) => {
    let promise = new Promise((resolve, reject) => {
      const inputPath = path.resolve(__dirname, '../doc/template/template.docx');
      const outputPath = path.resolve(__dirname, `../doc/output-${id}.docx`);
      
      //Load the docx file as a binary
      const content = fs.readFileSync(
        inputPath,
        'binary'
      );

      var zip = new JSZip(content);

      var doc = new Docxtemplater();
      doc.loadZip(zip);
      data.id = id;
      //set the templateVariables
      doc.setData(data);

      try {
        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
        doc.render();

        var buf = doc.getZip().generate({ type: 'nodebuffer' });

        // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
        fs.writeFileSync(outputPath, buf);

        resolve({ done: true, error: null, downloadLink: outputPath });
      } catch (error) {
        reject({ done: false, error: error });
        var e = {
          message: error.message,
          name: error.name,
          stack: error.stack,
          properties: error.properties
        };
        console.log(JSON.stringify({ error: e }));
        // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
        throw error;
      }
    });

    return promise;
  }
};
