import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import User from '../database/models/UserModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('/login', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */
  let chaiHttpResponse: Response;
  describe('Verifica um usuário é válido', () => {
    before(async () => {
      sinon
        .stub(User, "findOne")
        .resolves({
          ...mockLogin
        } as User);
    });
  
    after(()=>{
      (User.findOne as sinon.SinonStub).restore();
    })
  
    it('Deve verificar um usuário', async () => {
      chaiHttpResponse = await chai
         .request(app)
         ...
  
      expect(...)
    });

  })

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});
