import app from './config/server'

// Listen on port 90000 for Express
app.listen(app.get('port'), function() {
  console.log( '\n' + '✔ Express Server listening on port'.green, String(app.get('port')).cyan + '\n')
});
