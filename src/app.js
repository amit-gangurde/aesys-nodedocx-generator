const db = require('./database/instance').getInstance();
const docxGenerator = require('./service/docxGenerator');

module.exports = {
  start: () => {
    const express = require('express');
    const app = express();

    app.get('/:idutente', (req, res) => {
      db.connect();
      //'215'req.params.idutente
      db.query(
        `SELECT * FROM gestionale.cv_dipendenti WHERE fk_idaccount=${
          req.params.idutente
        };`,
        function(error, results, fields) {
          if (error) throw error;
          console.log(error);
          try {
            docxGenerator.generate(
              JSON.parse(results[0].curriculum),
              req.params.idutente
            );
            // res.status(200);
          } catch (err) {
            // res.send(err);
          }
        }
      );

      db.end();
    });

    app.listen(process.env.APP_PORT, () =>
      console.log(`App in esecuzione sulla porta ${process.env.APP_PORT}`)
    );
  }
};
