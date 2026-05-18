const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const HOST = 'localhost';

const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

    // Обработка маршрутов
    let filePath = req.url === '/' ? '/index.html' : req.url;
    
    // Убираем параметры запроса
    filePath = filePath.split('?')[0];
    
    const fullPath = path.join(__dirname, filePath);
    const ext = path.extname(fullPath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(fullPath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Файл не найден, пробуем вернуть index.html для SPA
                if (!ext) {
                    fs.readFile(path.join(__dirname, 'index.html'), (err2, content2) => {
                        if (err2) {
                            res.writeHead(404, { 'Content-Type': 'text/plain' });
                            res.end('404 Not Found');
                        } else {
                            res.writeHead(200, { 'Content-Type': 'text/html' });
                            res.end(content2, 'utf-8');
                        }
                    });
                } else {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('404 Not Found');
                }
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, HOST, () => {
    console.log(`\n🎉 Свадебный сайт запущен!`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`📍 Локальный адрес: http://${HOST}:${PORT}`);
    console.log(`📱 Для доступа с телефона в той же WiFi сети:`);
    console.log(`   http://<ваш-IP-адрес>:${PORT}`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`\n💡 Чтобы узнать ваш IP-адрес:`);
    console.log(`   • Windows: ipconfig`);
    console.log(`   • macOS/Linux: ifconfig или ip addr`);
    console.log(`\n⏹️  Для остановки сервера нажмите Ctrl+C\n`);
});

// Обработка завершения работы
process.on('SIGINT', () => {
    console.log('\n\n👋 Сервер остановлен. До встречи на свадьбе! 💕\n');
    process.exit(0);
});
