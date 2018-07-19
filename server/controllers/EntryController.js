import Entry from '../entry';

const entries = [
    new Entry(1, 'My moms 50th birthday', 'Oh! What a lovely day it was to see her so happy'),
    new Entry(2, 'My birthday', 'Happy birthday to meeeee'),
    new Entry(3, 'My last day at school', 'I have waited for this day all my life'),
    new Entry(4, 'My first bicycle', 'Your fave does not have a bike as cool as mine')
];

class EntryController {
    static getEntries(req, res) {
        return res.status(200).json(entries);
    }

    static getEntry(req, res) {
        const entryToModify = entries.find(e => e.id === parseInt(req.params.id, 10));
        console.log(req.params);
        if (!entryToModify || entryToModify === undefined) return res.status(404).json({ error: 'The entry you requested for must have been removed or have not been created' });
        res.status(200).json({ success: 'success', entry: entryToModify });
    }

    static addEntry(req, res) {
        if (!req.body.title) return res.status(400).json({ error: 'title must be present' })
        if (!req.body.body) return res.status(400).json({ error: 'body must be present' })

        const entryToCreate = new Entry(entries.length + 1, req.body.title, req.body.body);
        entries.push(entryToCreate);
        res.status(200).json({ success: 'success', entries: entries });
    }

    static editEntry(req, res) {
        const entryToUpdate = entries.find(e => e.id === parseInt(req.params.id, 10));
        if (!entryToUpdate || entryToUpdate === undefined) return res.status(404).json({ error: 'The entry you want to edit does not exit' });

        entryToUpdate.title = req.body.title;
        entryToUpdate.body = req.body.body;

        res.status(200).json({ success: 'success', entry: entryToUpdate });
    }

    static deleteEntry(req, res) {
        const entryToDelete = entries.find(e => e.id === parseInt(req.params.id, 10));
        if (!entryToDelete || entryToDelete === undefined) return res.status(404).json({ error: 'The entry you want to delete does not exit' });

        entries.pop(entryToDelete);
        res.status(200).json({ success: 'success', entries: entries });
    }
}

export default EntryController;
