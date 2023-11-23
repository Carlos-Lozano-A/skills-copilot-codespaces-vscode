// Create web server
// 1. create a web server
// 2. listen to request
// 3. parse the request
// 4. return a response

// 1. create a web server
var http = require('http');
var fs = require('fs');

// 2. listen to request
var server = http.createServer(function(req, res) {
    // 3. parse the request
    if (req.method === 'GET') {
        // 4. return a response
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream('./public/form.html', 'UTF-8').pipe(res);
    } else if (req.method === 'POST') {
        var body = '';

        req.on('data', function(chunk) {
            body += chunk;
        });

        req.on('end', function() {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(`
                <!DOCTYPE html>
                <html>
                    <head>
                        <title>Form Results</title>
                    </head>
                    <body>
                        <h1>Your Form Results</h1>
                        <p>${body}</p>
                    </body>
                </html>
            `);
        });
    }
});

server.listen(3000);
console.log('Form server listening on port 3000');
