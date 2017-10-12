const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

let cars = [];

server.listen(8080);
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/public/index.html');
});

io.on('connection', function (socket) {
    socket.emit('cars', { message: 'Welcome to car world', cars: cars });
    
    socket.on('disconnect', function () {
        cars = cars.filter((car) => {
            return car.id !== socket.id
        });

        socket.broadcast.emit('cars', { message: 'Car Updated', cars: cars });
    });

    socket.on('New car added', function (data) {
        data.id = socket.id;
        cars.push(data);
    });
    
    socket.on('Car Updated', function (data) {
        const currentCar = cars.find((data) => {
            return data.id === socket.id
        })

        currentCar.posX = data.posX;
        currentCar.posY = data.posY;

        socket.broadcast.emit('cars', { message: 'Car Updated', cars: cars });
    });
});