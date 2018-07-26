import { Router } from 'express';
import EntryController from './controllers/EntryController';

const appRouter = Router();

appRouter.get('/', (request, response) => response.send('Welcome to MyDiary API End Points!'));

appRouter.get('/api/v1/entries', EntryController.getAllEntries);

appRouter.get('/api/v1/entries/:id', EntryController.getSingleEntry);

appRouter.post('/api/v1/entries', EntryController.postEntry);

appRouter.put('/api/v1/entries/:id', EntryController.updateEntry);

appRouter.delete('/api/v1/entries/:id', EntryController.deleteEntry);

export default appRouter;
