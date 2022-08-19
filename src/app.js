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
         docxGenerator.generate({"name": "AjaySingh Chavan" ,"profile":"ORD-19082022","company":"Enzigma Software Private Limited","product":[
          {"sr":"1", "name":"Pro-Fit","quantity":"1","price":"232"},
          {"sr":"2", "name":"Pro-Fit","quantity":"1","price":"554"},
          {"sr":"3", "name":"Pro-Fit","quantity":"1","price":"278"},
          {"sr":"4", "name":"Pro-Fit","quantity":"1","price":"921"}]}, userId).then(
            docxResolve => {
              console.log(`[GENERATED DOCUMENT][#${userId}]`);
              res.download(
                docxResolve.downloadLink,
                `OrderEmail-${userId}.docx`
              );
            },
            docxErr => {
              console.log('[DOCUMENT GENERATION ERROR]', docxErr);
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
