const express = require("express");

const app = express();
const port = 3000;
app.use(express.json()); // allows express to read json from the request body as used on line 23

const fruits = [
    {
        id: 1,
        name: "banana"
    },
    {
        id: 2,
        name: "mango"
    }
]

app.get('/items/:id', (req, res) => {
    res.json(req.params);
});

app.post("/register", (req, res) => {
    res.json(req.body);
});

app.put('/cart', (req, res) => {
    res.send("PUT request at /cart");
});

app.delete('/cart', (req, res) => {
    res.send("DELETE request at /cart");
});

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});

app.get('/fruits', (req, res) => {
    res.json(fruits);
});

app.get('/fruits/:id', (req, res) => {
    for (let fruit of fruits) {
        console.log(req.params.id);
        if (fruit.id == req.params.id) {
            res.status(200);
            return res.send(fruit);
        }
    }
    res.status(404);
    res.send("Fruit not found");
});

app.post('/fruits', (req, res) => {
    if (fruits.length > 0 && fruits.some(f => f.name === req.body.name)) {
        res.status(409);
        return res.send("Fruit already exists");
    }
    let index = fruits[fruits.length-1].id + 1;
    const newFruit = {
        id: index,
        name: req.body.name
    }
    fruits.push(newFruit);
    res.json(newFruit);
});

app.put('/fruits/:id', (req, res) => {
    for (let fruit of fruits) {
        if (fruit.id == req.params.id) {
            fruit.name = req.body.name;
            res.status(200);
            return res.send("Update successful");
        }
    }
    res.status(404);
    res.send("Fruit not found");
});

app.delete('/fruits/:id', (req, res) => {
    let x = 0;
    for (let fruit of fruits) {
        if (req.params.id == fruit.id) {
            fruits.splice(x,1);
        }
        x++;
    }
    res.send('Deleted fruit');
});