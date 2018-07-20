import chai from "chai";
import chaiHttp from "chai-http";
import app from '../index';
import EntryController from '../server/controllers/EntryController';
import Entry from '../server/entry';

chai.use(chaiHttp);
let should = chai.should();
let expect = chai.expect;

describe('Entries', () => {

    /* Test the /api/v1/entries route */
    describe('get all entries', () => {
        it('it should GET all the entries', (done) => {
            chai.request(app)
                .get('/api/v1/entries')
                .end((err, res) => {
                    res.should.be.json;
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body[0].should.have.property('title');
                    res.body[0].should.have.property('body');
                    res.body[0].should.have.property('id');
                    res.body[0].title.should.be.a('string');
                    res.body[0].body.should.be.a('string');
                    res.body[0].id.should.be.a('number');
                    res.body.length.should.be.eql(4);
                    done();
                });
        });
    });

    /* Test the /api/v1/entries/:id route */
    describe('get a single entry', () => {
        it('it should GET one entry', (done) => {
            chai.request(app)
                .get('/api/v1/entries/3')
                .end((err, res) => {
                    res.should.be.json;
                    res.should.have.status(200);
                    expect(res.body.entry).to.be.a('object');
                    expect(res.body.entry).have.property('title');
                    expect(res.body.entry).to.have.property('body');
                    expect(res.body.entry).have.property('id');
                    expect(res.body.entry.title).to.be.a('string');
                    expect(res.body.entry.body).to.be.a('string');
                    expect(res.body.entry.id).to.be.a('number');
                    expect(res.body.entry.id).to.equal(3);
                    done();
                });
        });
    });

    /* Test the /api/v1/entries post route */
    describe('post a single entry', () => {
        it('it should POST an entry', (done) => {
            let entry = {
                title: "My dogs gave birth",
                body: "To more than 20 lil pups",
                id: 5
            }
            chai.request(app)
                .post('/api/v1/entries')
                .send(entry)
                .end((err, res) => {
                    res.should.be.json;
                    res.should.have.status(200);
                    res.should.be.a('object');
                    expect(entry).to.have.property('title');
                    expect(entry).to.have.property('body');
                    expect(entry).to.have.property('id');
                    expect(entry.title).to.be.a('string');
                    expect(entry.body).to.be.a('string');
                    expect(entry.id).to.be.a('number');
                    expect(entry.title).to.equal('My dogs gave birth');
                    expect(entry.id).to.equal(5);
                    done();
                });
        });
    });

    /* Test the /api/v1/entries/:id put route */
    describe('update a single entry', () => {
        it('it should UPDATE an entry', (done) => {
            let entry = {
                title: "My cats gave birth",
                body: "To more than 20 cute kittens",
                id: 5
            }
            chai.request(app)
                .put('/api/v1/entries/5')
                .send(entry)
                .end((err, res) => {
                    res.should.be.json;
                    res.should.have.status(200);
                    res.should.be.a('object');
                    expect(entry).to.have.property('title');
                    expect(entry).to.have.property('body');
                    expect(entry).to.have.property('id');
                    expect(entry.title).to.be.a('string');
                    expect(entry.body).to.be.a('string');
                    expect(entry.id).to.be.a('number');
                    expect(entry.title).to.equal('My cats gave birth');
                    expect(entry.id).to.equal(5);
                    done();
                });
        });
    });

    /* Test the /api/v1/entries/:id delete route */
    describe('delete a single entry', () => {
        it('it should DELETE an entry', (done) => {
            let entry = {
                title: "My cats gave birth",
                body: "To more than 20 cute kittens",
                id: 5
            }
            chai.request(app)
                .delete('/api/v1/entries/5')
                .send(entry)
                .end((err, res) => {
                    res.should.be.json;
                    res.should.have.status(200);
                    res.should.be.a('object');
                    res.body.should.have.property('success').equal('successfully deleted')
                    done();
                });
        });
    });
});

