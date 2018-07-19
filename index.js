import express from 'express';
import bodyParser from 'body-parser';
import appRouter from './server/routes';

const app = express();
const port = 9999;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Bukola is one step closer!'));

app.use('/', appRouter);

app.listen(port, () => console.log(`Server started on port ${port}`));

export default app;