import { Router } from 'express';
import Entry from './entry';

const appRouter = Router();

const entries = [
  new Entry(1, 'My moms 50th birthday', 'Oh! What a lovely day it was to see her so happy'),
  new Entry(2, 'My birthday', 'Happy birthday to meeeee'),
  new Entry(3, 'My last day at school', 'I have waited for this day all my life'),
  new Entry(4, 'My first bicycle', 'Your fave does not have a bike as cool as mine'),
];

appRouter.get('/', (request, response) => response.send('Welcome to MyDiary API End Points!'));

appRouter.get('/api/v1/entries', (request, response) => response.status(200).json({
  success: 'success', message: 'Query successful', entry: entries,
}));

appRouter.get('/api/v1/entries/:id', (request, response) => {
  const entryToGet = entries.find(e => e.id === parseInt(request.params.id, 10));
  if (!entryToGet || entryToGet === undefined) {
    return response.status(404).json({
      error: 'The entry you requested for must have been removed or has not been created',
    });
  }
  response.status(200).json({ success: 'success', message: 'Query successful', entry: entryToGet });
});

appRouter.post('/api/v1/entries', (request, response) => {
  if (!request.body.title || !request.body.body) {
    return response.status(400).json({ error: 'title and/or body must be present' })
  }

  const entryToCreate = new Entry(entries.length + 1, request.body.title, request.body.body);
  entries.push(entryToCreate);
  response.status(200).json({ success: 'success', message: 'Query successful', entry: entries });
});

appRouter.put('/api/v1/entries/:id', (request, response) => {
  const entryToUpdate = entries.find(e => e.id === parseInt(request.params.id, 10));
  if (!entryToUpdate || entryToUpdate === undefined) {
    return response.status(404).json({
      error: 'The entry you want to edit does not exit',
    });
  }

  entryToUpdate.title = request.body.title;
  entryToUpdate.body = request.body.body;

  response.status(200).json({ success: 'success', message: 'Query successful', entry: entryToUpdate });
});

appRouter.delete('/api/v1/entries/:id', (request, response) => {
  const entryToDelete = entries.find(e => e.id === parseInt(request.params.id, 10));
  if (!entryToDelete || entryToDelete === undefined) {
    return response.status(404).json({
      error: 'The entry you want to delete does not exit',
    });
  }

  entries.pop(entryToDelete);
  response.status(200).json({
    success: 'success', message: 'Query successful', entry: entries,
  });
});

export default appRouter;
