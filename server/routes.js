import { Router } from 'express';
import Entry from './entry';
import EntryController from './controllers/EntryController';

const appRouter = Router();

appRouter.get('/api/v1/entries', EntryController.getEntries);

appRouter.get('/api/v1/entries/:id', EntryController.getEntry);

appRouter.post('/api/v1/entries', EntryController.addEntry);

appRouter.put('/api/v1/entries/:id', EntryController.editEntry);

appRouter.delete('/api/v1/entries/:id', EntryController.deleteEntry);

export default appRouter;