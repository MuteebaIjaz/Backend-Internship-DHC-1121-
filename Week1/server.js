const express = require('express')
const path = require('path')
const productsRouter = require('./routes/products.routes.js')

const app = express();
const port = process.env.PORT || 3000;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.use('/products', productsRouter);



app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});



app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});