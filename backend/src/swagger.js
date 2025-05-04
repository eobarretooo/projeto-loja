const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Assistência Técnica API',
      version: '1.0.0',
      description: 'Documentação da API para assistência técnica e vendas de eletrônicos'
    },
    servers: [
      { url: 'http://localhost:5000' }
    ]
  },
  apis: ['./src/routes/*.js'], // Caminho para suas rotas
};

module.exports = swaggerJSDoc(options);
