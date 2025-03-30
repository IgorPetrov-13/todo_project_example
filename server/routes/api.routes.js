const apiRoutes = require('express').Router();
const todosRoute = require('./api/todos.routes.js');
const authRoute = require('./api/auth.routes.js');
const tokensRouter = require('./api/token.routes');

apiRoutes.use('/todos', todosRoute);
apiRoutes.use('/auth', authRoute);
apiRoutes.use('/tokens', tokensRouter);

module.exports = apiRoutes;
