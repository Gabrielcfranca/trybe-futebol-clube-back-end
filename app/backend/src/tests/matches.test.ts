import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/MatchModel';
import { mockMatches } from './mocks/matches';

chai.use(chaiHttp);

const { expect } = chai;

describe('get /matches', () => {

  describe('Verifica se todas partidas são enviadas.', () => {
    before(async () => {
      sinon
        .stub(Match, "findAll")
        .resolves(
          mockMatches as unknown as Match[]
        );
    });
  
    after(()=>{
      (Match.findAll as sinon.SinonStub).restore();
    })
  
    it('testa apenas /maches', async () => {
      const chaiHttpResponse = await chai
         .request(app)
         .get('/matches');

         expect(chaiHttpResponse.body).to.be.an('array');
         expect(chaiHttpResponse.status).to.be.equal(200);
    });
  });
});

describe('get /matches?inProgress=true', () => {

  describe('Verifica se as partidas em andamentos estão sendo enviadas', () => {
    before(async () => {
      sinon
        .stub(Match, "findAll")
        .resolves(
          [mockMatches[1]] as unknown as Match[]
        );
    });
  
    after(()=>{
      (Match.findAll as sinon.SinonStub).restore();
    })
  
    it('Retorna uma partida em andamento', async () => {
      const chaiHttpResponse = await chai
          .request(app)
          .get('/matches?inProgress=true');
      console.log(chaiHttpResponse);
      
      const matchesTrue = chaiHttpResponse.body.every((match: { inProgress: boolean }) => match.inProgress === true)
      console.log(matchesTrue);
          expect(chaiHttpResponse.body).to.be.an('array');
          expect(matchesTrue).to.be.equal(true);
          expect(chaiHttpResponse.status).to.be.equal(200);
    });
  })
});

describe('get /matches?inProgress=false', () => {

  describe('Verifica se as partidas em andamentos estão sendo enviadas', () => {
    before(async () => {
      sinon
        .stub(Match, "findAll")
        .resolves(
          [mockMatches[0]] as unknown as Match[]
        );
    });
  
    after(()=>{
      (Match.findAll as sinon.SinonStub).restore();
    })
  
    it('Retorna uma partida em andamento', async () => {
      const chaiHttpResponse = await chai
          .request(app)
          .get('/matches?inProgress=false');
      
      const matchesFalse = chaiHttpResponse.body.every((match: { inProgress: boolean }) => match.inProgress === false)

          expect(chaiHttpResponse.body).to.be.an('array');
          expect(matchesFalse).to.be.equal(true);
          expect(chaiHttpResponse.status).to.be.equal(200);
    });
  })
});
//   describe ('Quando o id: é inválido', async () => {
//     before(async () => {
//       sinon
//       .stub(Team, "findByPk")
//       .resolves(
//         null as unknown as Team
//       );
//   });

//   after(()=>{
//     (Team.findByPk as sinon.SinonStub).restore();
//   })

//   it('Informa que o team no foi encontrado e retorna o erro 404', async () => {
//     const teamId = 50;
//     const chaiHttpResponse = await chai
//       .request(app)
//       .get('/teams/${teamId}');

//       expect(chaiHttpResponse.body).to.be.deep.equal({ message: "Team not found" })
//       expect(chaiHttpResponse.status).to.be.equal(404);
//   })
//   })
//   describe ('Quando ocorre um erro interno', async () => {
//     before(async () => {
//       sinon
//       .stub(Team, "findAll")
//       .rejects();
//   });

//   after(()=>{
//     (Team.findAll as sinon.SinonStub).restore();
//   })

//   it('Informa o erro 500 com a error.message', async () => {
//     const teamId = 50;
//     const chaiHttpResponse = await chai
//       .request(app)
//       .get('/teams');

//       // expect(chaiHttpResponse.body).to.be.deep.equal({ message: error.message })
//       expect(chaiHttpResponse.status).to.be.equal(500);
//   })
//   })
// });
