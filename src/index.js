import express from 'express';

const PORT = 3001;

const app = express();

app.get('/', (req, res) => {
  res.json({
    message: 'Hello world!',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
