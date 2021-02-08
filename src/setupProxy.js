const { createProxyMiddleware } = require('http-proxy-middleware');
 
module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware(
            //{target : 'http://localhost:8080',
            {target : 'https://manage-kamas-api.herokuapp.com',
            changeOrigin: true,
            pathRewrite : {'^/api': ''}}
        )
    );
};
 
// http://localhost:3000/api/ -> http://localhost:8080