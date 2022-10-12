import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/TeamModel';
import { mockTeams, mockTeamsId } from './mocks/teamMocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('get /Teams', () => {

  describe('Verifica se os times estão sendo respondidos', () => {
    before(async () => {
      sinon
        .stub(Team, "findAll")
        .resolves(
          mockTeams as Team[]
        );
    });
  
    after(()=>{
      (Team.findAll as sinon.SinonStub).restore();
    })
  
    it('Retorna um time com status 200', async () => {
      const chaiHttpResponse = await chai
         .request(app)
         .get('/teams');

         expect(chaiHttpResponse.body).to.be.an('array');
         expect(chaiHttpResponse.status).to.be.equal(200);
    });
  });
});
  describe('get /Teams/id:', () => {

    describe('Verifica se os times estão sendo encontrados pelo Id', () => {
      before(async () => {
        sinon
          .stub(Team, "findByPk")
          .resolves(
            mockTeamsId as Team
          );
      });
    
      after(()=>{
        (Team.findByPk as sinon.SinonStub).restore();
      })
    
      it('Retorna um time com status 200', async () => {
        const teamId = 2;
        const chaiHttpResponse = await chai
           .request(app)
           .get('/teams/${teamId}');
  
           expect(chaiHttpResponse.body).to.be.deep.equal({ id: teamId, teamName: "Bahia" });
           expect(chaiHttpResponse.status).to.be.equal(200);
      });
    })
  });

  // describe('Verifica um email é válido', () => {
  //   before(async () => {
  //     sinon
  //       .stub(User, "findOne")
  //       .resolves(
  //         null as unknown as User
  //       );
  //   });
  
  //   after(()=>{
  //     (User.findOne as sinon.SinonStub).restore();
  //   })
  
  //   it('Retorna um erro 401, email', async () => {
  //     chaiHttpResponse = await chai
  //        .request(app)
  //        .post('/login')
  //        .send(mockEmailInvalid);

  //     expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Incorrect email or password' });
  //     expect(chaiHttpResponse.status).to.be.equal(401);
  //   });
  // });

  // describe('Verifica um password válido', () => {
  //   before(async () => {
  //     sinon
  //       .stub(User, "findOne")
  //       .resolves(
  //         mockEmailInvalid as User
  //       );
  //   });
  
  //   after(()=>{
  //     (User.findOne as sinon.SinonStub).restore();
  //   })
  
  //   it('Retorna um erro 401, password', async () => {
  //     chaiHttpResponse = await chai
  //        .request(app)
  //        .post('/login')
  //        .send(mockPasswordInvalid);

  //     expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Incorrect email or password' });
  //     expect(chaiHttpResponse.status).to.be.equal(401);
  //   });
  // });

  // describe('Verifica se email está vazio', () => {
  //       it('Retorna um erro 400, email', async () => {
  //     chaiHttpResponse = await chai
  //        .request(app)
  //        .post('/login')
  //        .send(emptyEmail);

  //     expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
  //     expect(chaiHttpResponse.status).to.be.equal(400);
  //   });
  // });

  // describe('Verifica se password está vazio', () => {
  //       it('Retorna um erro 400, password', async () => {
  //     chaiHttpResponse = await chai
  //       .request(app)
  //       .post('/login')
  //       .send(emptyPassword);

  //     expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
  //     expect(chaiHttpResponse.status).to.be.equal(400);
  //   });
  // });
