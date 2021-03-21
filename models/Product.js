const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema

const ProductSchema = new Schema({
    catagory: String,
    product: String,
    destription: String,
    quantity: String,
    product_image: String,
    color: String   
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product
