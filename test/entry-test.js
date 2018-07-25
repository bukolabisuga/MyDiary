import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import EntryController from '../server/routes';
import Entry from '../server/entry';

chai.use(chaiHttp);
const should = chai.should();
const { expect } = chai;

describe('Entries', () => {
  /* Test the /api/v1/entries route */
  describe('get all entries', () => {
    it('it should GET all the entries', (done) => {
      chai.request(app)
        .get('/api/v1/entries')
        .end((error, response) => {
          response.should.have.status(200);
          expect(response.body).to.be.a('object');
          expect(response.body).to.have.property('success').to.equal('success');
          expect(response.body).to.have.property('message').to.equal('Query successful');
          expect(response.body.entry[0]).to.have.property('title');
          expect(response.body.entry[1]).to.have.property('body');
          expect(response.body.entry[2]).to.have.property('id');
          expect(response.body.entry[0].title).to.be.a('string');
          expect(response.body.entry[1].body).to.be.a('string');
          expect(response.body.entry[2].id).to.be.a('number');
          expect(response.body.entry).to.have.lengthOf(4);
          done();
        });
    });
  });

  /* Test the /api/v1/entries/:id route */
  describe('get a single entry', () => {
    it('it should GET one entry', (done) => {
      chai.request(app)
        .get('/api/v1/entries/3')
        .end((error, response) => {
          response.should.have.status(200);
          expect(response.body.entry).to.be.a('object');
          expect(response.body).to.have.property('success').to.equal('success');
          expect(response.body).to.have.property('message').to.equal('Query successful');
          expect(response.body.entry).have.property('title');
          expect(response.body.entry).to.have.property('body');
          expect(response.body.entry).have.property('id');
          expect(response.body.entry.title).to.be.a('string');
          expect(response.body.entry.body).to.be.a('string');
          expect(response.body.entry.id).to.be.a('number');
          expect(response.body.entry.id).to.equal(3);
          done();
        });
    });
  });

  /* Test the /api/v1/entries/:id route for non-existent entries */
  describe('test for single entry existence', () => {
    it('it should expect status 404 for non-existing entry', (done) => {
      chai.request(app)
        .get('/api/v1/entries/8')
        .end((error, response) => {
          if (error) return done(error);
          response.should.have.status(404);
          expect(response.body).to.not.have.property('body');
          expect(response.body).have.property('error');
          done();
        });
    });
  });

  /* Test the /api/v1/entries post route */
  describe('post a single entry', () => {
    it('it should POST an entry', (done) => {
      const entry = {
        title: 'My dogs gave birth',
        body: 'To more than 20 lil pups',
        id: 5,
      }
      chai.request(app)
        .post('/api/v1/entries')
        .send(entry)
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.a('object');
          expect(response.body).to.have.property('success').to.equal('success');
          expect(response.body).to.have.property('message').to.equal('Query successful');
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

  /* Test the /api/v1/entries/ post route for incomplete entries */
  describe('test for creating a single entry with absent fields', () => {
    it('it should expect status 400 for not allowing the post request', (done) => {
      const entry = {
        title: '',
        body: '',
        id: 5,
      }
      chai.request(app)
        .post('/api/v1/entries')
        .send(entry)
        .end((error, response) => {
          if (error) return done(error);
          response.should.have.status(400);
          expect(response.body).to.not.have.property('id');
          expect(response.body).have.property('error').to.equal('title and/or body must be present');
          done();
        });
    });
  });

  /* Test the /api/v1/entries/:id put route */
  describe('update a single entry', () => {
    it('it should UPDATE an entry', (done) => {
      const entry = {
        title: 'My cats gave birth',
        body: 'To more than 20 cute kittens',
        id: 5,
      }
      chai.request(app)
        .put('/api/v1/entries/5')
        .send(entry)
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.a('object');
          expect(response.body).to.have.property('success').to.equal('success');
          expect(response.body).to.have.property('message').to.equal('Query successful');
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

  /* Test the /api/v1/entries/:id put route for non-existent entries */
  describe('test for updating a non-existent single entry', () => {
    it('it should expect status 404 for no such entry', (done) => {
      const entry = {
        title: 'My cats gave birth',
        body: 'To more than 20 cute kittens',
        id: 9,
      }
      chai.request(app)
        .put('/api/v1/entries/9')
        .send(entry)
        .end((error, response) => {
          if (error) return done(error);
          response.should.have.status(404);
          expect(response.body).to.not.have.property('body');
          expect(response.body).have.property('error').to.equal('The entry you want to edit does not exit');
          done();
        });
    });
  });

  /* Test the /api/v1/entries/:id delete route */
  describe('delete a single entry', () => {
    it('it should DELETE an entry', (done) => {
      const entry = {
        title: 'My cats gave birth',
        body: 'To more than 20 cute kittens',
        id: 5,
      }
      chai.request(app)
        .delete('/api/v1/entries/5')
        .send(entry)
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.a('object');
          expect(response.body).to.have.property('success').to.equal('success');
          expect(response.body).to.have.property('message').to.equal('Query successful');
          done();
        });
    });
  });

  /* Test the /api/v1/entries/:id delete route for non-existent entries */
  describe('test for deleting a non-existent single entry', () => {
    it('it should expect status 404 for no such entry', (done) => {
      const entry = {
        title: 'My cats gave birth',
        body: 'To more than 20 cute kittens',
        id: 9,
      }
      chai.request(app)
        .delete('/api/v1/entries/9')
        .send(entry)
        .end((error, response) => {
          if (error) return done(error);
          response.should.have.status(404);
          expect(response.body).to.not.have.property('body');
          expect(response.body).have.property('error').to.equal('The entry you want to delete does not exit');
          done();
        });
    });
  });
});
