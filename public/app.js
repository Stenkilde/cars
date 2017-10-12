const socket = io.connect('http://localhost:8080');
let cars = [];
let car = document.createElement('div');
car.className = 'car';
Object.assign(car.style, {
    position: 'absolute', 
    left: 0 + 'px',
    top: 0 + 'px'
});
document.body.appendChild(car)
let baseCar = {
    posX: 0,
    posY: 0
}

socket.emit('New car added', baseCar);

socket.on('cars', function (data) {
    let oldCar = [];
    oldCar = document.querySelectorAll('.car');
    [...oldCar].map((obj) => {
        if (obj !== car ) {
            document.body.removeChild(obj);
        }
    })
    cars = data.cars;
    cars.map((data) => {
        if (data.id !== socket.id) {
            let car = document.createElement('div');
            car.className = 'car';
            Object.assign(car.style, {
                position: 'absolute',
                left: data.posX + 'px',
                top: data.posY + 'px'
            });

            document.body.appendChild(car)
        }
    })
});

function updateCar(event) {

    Object.assign(car.style, {
        position: 'absolute', 
        left: event.clientX + 'px',
        top: event.clientY + 'px'
    });

    baseCar = {
        posX: event.clientX,
        posY: event.clientY
    }

    document.body.appendChild(car)
    socket.emit('Car Updated', baseCar);
}