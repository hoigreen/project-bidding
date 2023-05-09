const express = require("express")
const app = express()
const cors = require("cors")
const http = require('http').Server(app);
const PORT = process.env.SERVER_PORT || 4000;
const fs = require("fs")
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "*"
    }
});

const savedData = fs.readFileSync("data.json")
const objectData = JSON.parse(savedData)

app.use(cors())
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});


function findProduct(nameKey, myArray, last_bidder, amount, time, is_bidded) {
    for (let i = 0; i < myArray.length; i++) {
        if (myArray[i].name === nameKey) {
            myArray[i].last_bidder = last_bidder
            myArray[i].price = amount
            myArray[i].time = time
            myArray[i].is_bidded = is_bidded
        }
    }
    const stringData = JSON.stringify(objectData, null, 2)
    fs.writeFile("data.json", stringData, (err) => {
        console.error(err)
    })
}

function findOwnerAfterWin(nameKey, myArray, last_bidder) {
    for (let i = 0; i < myArray.length; i++) {
        if (myArray[i].name === nameKey) {
            myArray[i].owner = last_bidder
        }
    }
    const stringData = JSON.stringify(objectData, null, 2)
    fs.writeFile("data.json", stringData, (err) => {
        console.error(err)
    })
}

function findAccountToFund(usernameKey, myArray, balenceKey) {
    for (let i = 0; i < myArray.length; i++) {
        if (myArray[i].username === usernameKey) {
            myArray[i].balence += balenceKey;
        }
    }
    const stringData = JSON.stringify(objectData, null, 2)
    fs.writeFile("data.json", stringData, (err) => {
        console.error(err)
    })
}

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
    });

    socket.on('register', (data) => {
        objectData["users"].push(data)
        const stringData = JSON.stringify(objectData, null, 2)
        fs.writeFile("data.json", stringData, (err) => {
            console.error(err)
        })
        socket.broadcast.emit("registerResponse", data)
    });

    socket.on('addProduct', (data) => {
        objectData["products"].push(data)
        const stringData = JSON.stringify(objectData, null, 2)
        fs.writeFile("data.json", stringData, (err) => {
            console.error(err)
        })
        socket.broadcast.emit("addProductResponse", data)
    });

    socket.on("bidProduct", data => {
        findProduct(data.name, objectData["products"], data.last_bidder, data.amount, data.time, data.is_bidded)
        socket.broadcast.emit("bidProductResponse", data)
    })

    socket.on("setOwner", data => {
        findOwnerAfterWin(data.name, objectData["products"], data.last_bidder)
        socket.broadcast.emit("setOwnerResponse", data)
    })

    socket.on("fund", data => {
        findAccountToFund(data.username, objectData["users"], data.balence)
        socket.broadcast.emit("findAccountToFundResponse", data)
    })

    socket.on('countdown', data => {
        objectData["products"].replace(data.time)
        const stringData = JSON.stringify(objectData, null, 2)
        fs.writeFile("data.json", stringData, (err) => {
            console.error(err)
        })
        socket.broadcast.emit("countdown", data)
    });
});

app.get("/api", (req, res) => {
    const data = fs.readFileSync("data.json")
    const products = JSON.parse(data)
    res.json(products)
});

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});