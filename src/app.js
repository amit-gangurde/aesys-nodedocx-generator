const docxGenerator = require('./service/docxGenerator');
const PORT = 5000;
var fs = require("fs");
const users = require("./details.json");

module.exports = {
  start: () => {
    const express = require('express');
    const app = express();

    app.get('/docGenerator', (req, res) => {
      
      const userId = '1';
         docxGenerator.generate({"name": "Amit Gangurde" ,"orderid":"ORD-19082022","company":"Enzigma Software Private Limited","product":[
          {"sr":"1", "name":"Laptop","quantity":"1","price":"22"},
          {"sr":"2", "name":"Keyboard","quantity":"10","price":"554"},
          {"sr":"3", "name":"Mouse","quantity":"3","price":"278"},
          {"sr":"4", "name":"Monitor","quantity":"2","price":"921"}]}, userId).then(
            docxResolve => {
              console.log(`[Generated Document][#${userId}]`);
              res.download(
                docxResolve.downloadLink,
                `OrderEmail-${userId}.docx`
              );
            },
            docxErr => {
              console.log('[Document Generated Error]', docxErr);
              res
                .send(
                  'An error occurred while generating the document'
                )
                .status(500);
            }
          );
        queryErr => {
          console.log('[CV ERROR NOT PRESENT]', queryErr);
          res.send("The user has not yet updated the CV").status(500);
        }
    });

    app.listen(PORT, () =>
      console.log(`App running on the PORT number `,PORT)
    );
  }
};
