const { createProxyMiddleware } = require('http-proxy-middleware');
 
module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware(
            {target : 'https://manage-kamas-api.herokuapp.com',
            pathRewrite : {'/api/': '/app'}}
        )
    );
};
 
// http://localhost:3000/api/ -> http://localhost:8080