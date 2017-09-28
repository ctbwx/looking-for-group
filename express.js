const express = require('express');
const browserify = require('browserify-middleware');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '/client')));

app.get('/bundle.js', browserify(path.join(__dirname, '/client/index.js'), {
transform: [ [ require('babelify'), { presets: ['es2015', 'react'] } ] ]
}));

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});
