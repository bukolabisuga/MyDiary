import expresponses from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import appRouter from './server/routes';

const app = expresponses();
const port = process.env.PORT || 9999;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (request, response) => response.send('MyDiary endpoints are hosted here!'));

app.use('/', appRouter);

app.listen(port, () => console.log(`Server started on port ${port}`));

export default app;
