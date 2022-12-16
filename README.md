## Trybe Futebol Clube

Este é um projeto que pude colocar em prática os conhecimentos, adquiridos durante o módulo de Backend na [Trybe](https://www.betrybe.com/?utm_source=trybe.com.br).

### Descrição do projeto
O projeto Trybe Futebol Clube foi nosso maior desafio de backend da Trybe, se trata de um site em que o front-end já estava pronto e tivemos que desenvolver o back-end (criação da API), assim como, acessar e manipular o de banco de dados.

Consiste em um site que gerencia informações de futebol. Você será capaz de acessar a tabela de classificação geral e também filtrar para ver os times com melhores campanhas dentro e fora de casa. Também será possível acompanhar as partidas finalizadas e em andamento naquele momento.

#### As principais Tecnologias utilizadas:

* TypeScript (POO e SOLID)
* Node.js
* Express
* JSON Web Token (JWT)
* Sequelize
* MySQL
* Mocha, Chai e Sinon (testes)

### Instruções para utilização do projeto:
Como a aplicação já está configurada com [docker](https://www.docker.com/) para facilitar para você, será necessário sua instalação.
Clone o projeto, em sua pasta principal, rode o comando `npm install`, para instalar as bibliotecas necessárias já configuradas no JSON. Após, use o comando `docker compose up -d` que irá criar os containers docker.

Agora, acesse a pasta backend, e utilize o comando `npm run dev` que irá criar o banco de dados da aplicação. Agora vamos em outro terminal, acessar a pasta frontend e utilize o comando `npm start`, o acesso ao site está configurado pela **porta 3000**.

Para verificar os testes criados para a aplicação, utilize o comando `npm run test: coverage` dento do diretório backend.

Agora, na web você poderá interagir com a aplicação e testar sua funcionalidades.

Os Endpoints criados foram:
<details>
  <summary>Endpoint para <i>Login</i></summary>
  <ul>
  <li>post('/');</li>
  <li>post('/validate');</li>
  </ul>
</details>

<details>
  <summary>Endpoints para <i>Teams</i></summary>
  <ul>
  <li>get('/');</li>
  <li>get('/:id');</li>
  </ul>
</details>

<details>
  <summary>Endpoints para <i>Matches</i></summary>
  <ul>
  <li>post('/');</li>
  <li>get('/');</li>
  <li>get('/:id');</li>
  <li>get('/:id/finish');</li>
  </ul>
</details>

<details>
  <summary>Endpoints para <i>Leaderboards</i></summary>
  <ul>
  <li>get('/');</li>
  <li>get('/home');</li>
  <li>get('/away');</li>
  </ul>
</details>

<br>

### Contatos
Você pode entrar em contato comigo pelo e-mail: gabrielcfranca@hotmail.com ou [LinkedIn](https://www.linkedin.com/in/gabrielcfranca/)
