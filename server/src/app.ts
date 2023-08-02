import express from 'express';

const { PORT = 4000 } = process.env;

const app = express(); 

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
}) 