import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import User from '../database/models/UserModel';
import { mockEmailInvalid, mockLogin, mockPasswordInvalid, mockUserValid } from './mocks';
import { response } from 'express';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', () => {
  let chaiHttpResponse: Response;

  describe('Verifica um usuário é válido', () => {
    before(async () => {
      sinon
        .stub(User, "findOne")
        .resolves(
          mockLogin as User
        );
    });
  
    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    })
  
    it('Retorna um token com status 200', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .post('/login')
         .send(mockUserValid);

         expect(chaiHttpResponse.body).to.have.property('token');
         expect(chaiHttpResponse.status).to.be.equal(200);
    });
  });

  describe('Verifica um email é válido', () => {
    before(async () => {
      sinon
        .stub(User, "findOne")
        .resolves(
          null as unknown as User
        );
    });
  
    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    })
  
    it('Retorna um erro 401, email', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .post('/login')
         .send(mockUserValid);

      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Incorrect email or password' });
      expect(chaiHttpResponse.status).to.be.equal(401);
    });
  });

  describe('Verifica um password válido', () => {
    before(async () => {
      sinon
        .stub(User, "findOne")
        .resolves(
          mockEmailInvalid as User
        );
    });
  
    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    })
  
    it('Retorna um erro 401, password', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .post('/login')
         .send(mockPasswordInvalid);

      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Incorrect email or password' });
      expect(chaiHttpResponse.status).to.be.equal(401);
    });
  });
});
