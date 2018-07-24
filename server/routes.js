import { Router } from 'express';
import Entry from './entry';

const appRouter = Router();

const entries = [
  new Entry(1, 'My moms 50th birthday', 'Oh! What a lovely day it was to see her so happy'),
  new Entry(2, 'My birthday', 'Happy birthday to meeeee'),
  new Entry(3, 'My last day at school', 'I have waited for this day all my life'),
  new Entry(4, 'My first bicycle', 'Your fave does not have a bike as cool as mine'),
];

appRouter.get('/', (req, res) => res.send('Welcome to MyDiary API End Points!'));

appRouter.get('/api/v1/entries', (req, res) => res.status(200).json({
  success: 'success', message: 'Query successful', entry: entries,
}));

appRouter.get('/api/v1/entries/:id', (req, res) => {
  const entryToGet = entries.find(e => e.id === parseInt(req.params.id, 10));
  if (!entryToGet || entryToGet === undefined) {
    return res.status(404).json({
      error: 'The entry you requested for must have been removed or have not been created',
    });
  }
  res.status(200).json({ success: 'success', entry: entryToGet });
});

appRouter.post('/api/v1/entries', (req, res) => {
  if (!req.body.title) return res.status(400).json({ error: 'title must be present' })
  if (!req.body.body) return res.status(400).json({ error: 'body must be present' })

  const entryToCreate = new Entry(entries.length + 1, req.body.title, req.body.body);
  entries.push(entryToCreate);
  res.status(200).json({ success: 'success', entries });
});

appRouter.put('/api/v1/entries/:id', (req, res) => {
  const entryToUpdate = entries.find(e => e.id === parseInt(req.params.id, 10));
  if (!entryToUpdate || entryToUpdate === undefined) {
    return res.status(404).json({
      error: 'The entry you want to edit does not exit',
    });
  }

  entryToUpdate.title = req.body.title;
  entryToUpdate.body = req.body.body;

  res.status(200).json({ success: 'success', entry: entryToUpdate });
});

appRouter.delete('/api/v1/entries/:id', (req, res) => {
  const entryToDelete = entries.find(e => e.id === parseInt(req.params.id, 10));
  if (!entryToDelete || entryToDelete === undefined) {
    return res.status(404).json({
      error: 'The entry you want to delete does not exit',
    });
  }

  entries.pop(entryToDelete);
  res.status(200).json({
    success: 'successfully deleted', entries,
  });
});

export default appRouter;
