import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 7777;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Bukola is one step closer!'));

app.listen(port, () => console.log(`Server started on port ${port}`));