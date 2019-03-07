/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

const should = chai.should();

chai.use(chaiHttp);

describe('Testing app...', () => {
  it('should login at /login POST', (done) => {
    chai.request(server)
      .get('/users/api/current_user')
      .set({ 'Content-type': 'application/json' })
      .send({ username: 'aaa', password: '111' })
      .end((err, res) => {
        done();
      });
  });
});
