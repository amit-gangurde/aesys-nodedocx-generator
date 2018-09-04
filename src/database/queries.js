module.exports = db => {
  selectCvByUserId = userid => {
    let promise = new Promise(function(resolve, reject) {
      // do a thing, possibly async, then…

      db.connect();

      //'215'req.params.idutente
      db.query(
        `SELECT * FROM aesysffs.cv_dipendenti WHERE fk_idaccount=${userid};`,
        function(error, results, fields) {
          if (error) throw error;
          
          let cv = JSON.parse(results[0].curriculum);

          try {
            resolve({ status: 'success', data: cv });
          } catch (err) {
            reject({ status: 'error', message: err });
          }

          db.end();
        }
      );
    });

    return promise;
  };

  return {
    selectCvByUserId
  };
};
