const JSZip = require('jszip');
const Docxtemplater = require('docxtemplater');
const fs = require('fs');
const path = require('path');

module.exports = {
  generate: (data, id) => {
    let promise = new Promise((resolve, reject) => {
      const inputPath = path.resolve(__dirname, '../doc/template/template.docx');
      const outputPath = path.resolve(__dirname, `../doc/output-${id}.docx`);
      const content = fs.readFileSync(
        inputPath,
        'binary'
      );

      var zip = new JSZip(content);
      var doc = new Docxtemplater();
      doc.loadZip(zip);
      data.id = id;
      doc.setData(data);

      try {
        doc.render();
        var buf = doc.getZip().generate({ type: 'nodebuffer' });
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
        throw error;
      }
    });

    return promise;
  }
};
