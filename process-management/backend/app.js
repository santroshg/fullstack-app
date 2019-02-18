const express = require('express');


const app = express();
const port = process.env.PORT || 3000;

// CORS issue, allowed methods
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    res.status(200).json({});
  }
  next();
});

app.get('/api/test', (req, res) => {
  res.status(200).json({
    message: 'Application health is fine',
  });
});

const server = app.listen(port, () => {
  console.log('Server started at port- ', port);
});
