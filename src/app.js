const db = require('./database/instance').getInstance();
const queries = require('./database/queries')(db);
const docxGenerator = require('./service/docxGenerator');
const PORT = process.env.PORT || 5000;

module.exports = {
  start: () => {
    const express = require('express');
    const app = express();
    db.connect();

    app.get('/curriculum/:idutente', (req, res) => {
      if (isNaN(req.params.idutente)) return;
      queries.selectCvByUserId(req.params.idutente).then(
        queryResolve => {
          docxGenerator.generate(queryResolve.data, req.params.idutente).then(
            docxResolve => {
              res.download(
                docxResolve.downloadLink,
                `dipendente-${req.params.idutente}.docx`
              );
            },
            docxErr => {
              console.log('[ERRORE GENERAZIONE DOCUMENTO]', docxErr);
              res
                .send(
                  'Si è verificato un errore durante la generazione del documento'
                )
                .status(500);
            }
          );
        },
        queryErr => {
          console.log('[ERRORE CV NON PRESENTE]', queryErr);
          res.send("L'utente non ha ancora aggiornato il CV").status(500);
        }
      );
    });

    app.listen(PORT, () =>
      console.log(`App in esecuzione sulla porta ${process.env.APP_PORT}`)
    );
  }
};
