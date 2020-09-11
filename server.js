const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // console.log(req.url, req.method, req.headers);
    // process.exit();
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<head>');
        res.write('<title>Node.JS server</title>');
        res.write('</head>');
        res.write(`<body><form action='/message' method='POST'><input type='text' name='message' /><button type='submit'>Send</button></form></body>`);
        res.write('</html>');
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', chunk => {
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('m')[1];
            fs.writeFileSync('message.txt', message);
        });
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }

    res.setHeader('Content-type', 'text/html');
    res.write('<html>');
    res.write('<head>');
    res.write('<title>Node.JS server</title>');
    res.write('</head>');
    res.write('<body><h1>Hello form Node.js Server</h1></body>');
    res.write('</html>');
    res.end();
});

server.listen(3000)