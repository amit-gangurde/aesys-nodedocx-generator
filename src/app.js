const db = require('./database/instance').getInstance();
const queries = require('./database/queries')(db);
const docxGenerator = require('./service/docxGenerator');

module.exports = {
  start: () => {
    const express = require('express');
    const app = express();

    app.get('/:idutente', (req, res) => {
      if (isNaN(req.params.idutente)) return;
      queries.selectCvByUserId(req.params.idutente).then(
        queryResolve => {
          docxGenerator.generate(queryResolve.data, req.params.idutente).then(
            docxResolve => {
              res.send(docxResolve).status(200);
            },
            docxErr => {
              res.send(docxErr).status(500);
            }
          );
        },
        queryErr => res.send(queryErr).status(500)
      );
    });

    app.listen(process.env.APP_PORT, () =>
      console.log(`App in esecuzione sulla porta ${process.env.APP_PORT}`)
    );
  }
};
