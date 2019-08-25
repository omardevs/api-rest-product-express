const express = require('express');
const app = express();
const route = express.Router();
const mongoose = require('mongoose');

//Connnection MongoDB
mongoose.connect('mongodb://localhost:27017/api_crud_product', { useNewUrlParser: true }, function(err){
    if(err){
        console.log(err);
    }else{
        console.log('DB is connected!');
    }
})

//Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Modelo Mongoose
const Schema = mongoose.Schema;
const ProductSchema = Schema({
    name: String,
    description: String,
    price: Number,
    image_url: String
},{ versionKey: false });
const Product = mongoose.model('Product', ProductSchema);

route.route('/')
    .get( async (req, res) => {
        const result = await Product.find();
        res.json({ status: 'success', message: 'Query successfully', data: result, code: '200' })
    })
    .post( async (req, res) => {
        const product = new Product(req.body);
        const result = await product.save();
        res.json({ status: 'success', message: 'Product save', data: result, code: '200' })
    });

route.route('/:id')
    .get(async (req, res) => {
        const result = await Product.findById(req.params.id);
        res.json({ status: 'success', message: 'Query successfully', data: result, code: '200' })
    })
    .put(async (req, res) => {
        const result = await Product.findByIdAndUpdate(req.params.id, req.body);
        res.json({ status: 'success', message: 'Product update', data: result, code: '200' })
    })
    .delete(async (req, res) => {
        const result = await Product.findByIdAndRemove(req.params.id);
        res.json({ status: 'success', message: 'Product remove', data: result, code: '200' })
    })

app.use('/api/product', route);

//Listen Server
app.listen(4000, () => {
    console.log('Server on port 4000');
});