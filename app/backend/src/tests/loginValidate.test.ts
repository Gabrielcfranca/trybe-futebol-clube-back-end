import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/UserModel';
import { mockToken, mockUser } from './mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('get /login/validate', () => { 
  describe ('verifica se a rota recebe um token válido', () => {
    before(async () => {
      sinon
      .stub(User, 'findOne')
      .resolves(
        mockUser as User
      );
    });
    after(() => {
      (User.findOne as sinon.SinonStub).restore();
    })

    it('Retorna a role com status 200', async () => {
      const result = await chai
        .request(app)
        .get('/login/validate')
        .set('authorization', mockToken);

      expect(result.body).to.be.deep.equal({ role: mockUser.role})
      expect(result.status).to.be.equal(200);
    });
  });

  describe('Quando recebe um token invalido', () => {
    it('Retorna "Invalid token" com status 401', async () => {
      const response = await chai.request(app)
        .get('/login/validate')
        .set('authorization', 'mockToken');

      expect(response.body).to.be.deep.equal({ message: 'Token must be a valid token'});
      expect(response.status).to.be.equal(401);
    });
  })

  describe('quando nao recebe um token', () => { 
    it('Retorna "Token not found" da rota com status 401', async () => {
      const result = await chai
        .request(app)
        .get('/login/validate')

      expect(result.body).to.be.deep.equal({ message: 'Token not Found' });
      expect(result.status).to.be.equal(401);
    })
   })
});
