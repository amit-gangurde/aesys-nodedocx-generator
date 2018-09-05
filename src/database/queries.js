module.exports = db => {
  selectCvByUserId = userid => {
    let promise = new Promise(function(resolve, reject) {
      // do a thing, possibly async, then…

      //'215'req.params.idutente
      db.query(
        `SELECT * FROM cv_dipendenti WHERE fk_idaccount=${userid};`,
        function(error, results, fields) {
          if (error) throw error;
          
          try {
            let cv = JSON.parse(results[0].curriculum);
            resolve({ status: 'success', data: cv });
          } catch (err) {
            reject({ status: 'error', message: err });
          }
        }
      );
    });

    return promise;
  };

  return {
    selectCvByUserId
  };
};
