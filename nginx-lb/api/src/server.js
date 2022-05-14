const express    = require('express');
const bodyParser = require('body-parser');

module.exports = () => {
  const app = express();

  app.set('port', process.env.PORT || 3000);

  app.use(bodyParser.json());

  app.get('/health', (req, res) => {
    console.log('Server health')
    return res.send({status:'UP'});
  });

  app.get('*', (req, res) => {
    console.log('Server running');
    return res.send({message:'Server running'});
  });

  return app;
};