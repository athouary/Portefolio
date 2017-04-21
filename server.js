import chalk from 'chalk'
import app from './config/server'

// Listen on port 90000 for Express
app.listen(app.get('port'), function() {
  console.log( chalk.green('\n' + '✔ Express Server listening on port'), chalk.cyan(app.get('port')) + '\n')
});
