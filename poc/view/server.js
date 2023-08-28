// 1. http module

const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    console.log('request has been made from browser to server')

    res.setHeader('Content-Type', 'text/html');
    // res.write('<h2>hello</h2>')
    // res.end();
    let path = './view';
    switch (req.url) {
        case '/':
            path += '/index.html'
            res.statusCode = 200
            break;
        case '/about':
            path += '/about.html'
            res.statusCode = 201
            break;
            // redirect
        case '/about-me':
            res.statusCode = 301
            res.setHeader('Location','/about')
            res.end()
            break;
        default:
            path += '/404.html'
            res.statusCode = 404
            break;
    };

    fs.readFile(path, (err, fileData) => {

        if (err) {
            console.log(err)
        }
        else {
            res.write(fileData)
            res.end();
        }
    });
});

//port number host callback func
server.listen(3000, 'localhost', () => {
    console.log('server listening on port 8000')
})