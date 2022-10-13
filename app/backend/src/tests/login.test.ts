import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import User from '../database/models/UserModel';
import { emptyEmail, emptyPassword, mockEmailInvalid, mockLogin, mockPasswordInvalid, mockUserValid } from './mocks';

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
         .send(mockEmailInvalid);

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

  describe('Verifica se email está vazio', () => {
        it('Retorna um erro 400, email', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .post('/login')
         .send(emptyEmail);

      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
      expect(chaiHttpResponse.status).to.be.equal(400);
    });
  });

  describe('Verifica se password está vazio', () => {
        it('Retorna um erro 400, password', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(emptyPassword);

      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
      expect(chaiHttpResponse.status).to.be.equal(400);
    });
  });
});

describe('Quando ocorre um erro interno', () => {
  before(async () => {
    sinon.stub(User, 'findOne').rejects();
  })

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Retorna "Something went wrong" com status 500', async () => {
    const response = await chai.request(app)
      .post('/login')
      .send(mockUserValid);

    expect(response.body).to.be.deep.equal({ message: 'Something went wrong' });
    expect(response.status).to.be.equal(500);
  });
});