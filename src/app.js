const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const { productsRouter, salesRouter } = require('./routers');

const app = express();
app.use(express.json());

app.get('/', (_req, res) => res.json({ ok: true }));
app.use(productsRouter);
app.use(salesRouter);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;