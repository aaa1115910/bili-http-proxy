const express = require('express');
const timeout = require('connect-timeout');
const {createProxyMiddleware} = require('http-proxy-middleware');
const app = express();

const HOST = 'https://api.bilibili.com'
const PORT = 8080
const TIME_OUT = '30s'

app.use(timeout(TIME_OUT));
app.use((req, res, next) => {
    if (!req.timedout) next();
});

app.use('/', express.static('static'));

app.use(createProxyMiddleware({
    target: HOST,
    changeOrigin: true,
    pathFilter: '**'
}));

app.listen(PORT, () => {
    console.log(`server running`);
});