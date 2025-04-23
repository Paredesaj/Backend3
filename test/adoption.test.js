// test/adoption.test.js
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app.js'; // Asegurate que tu app se pueda importar

const expect = chai.expect;
chai.use(chaiHttp);

describe('Adoption Router', () => {
  it('GET /api/adoptions should return status 200', done => {
    chai.request(app)
      .get('/api/adoptions')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
