const express = require('express');
const Product = require('../models/product');

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products)
    } catch (err) {
        res.status(500).json(err)
    }
}
exports.getProduct = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
    } catch (err) {
        res.status(500).json(err)
    }
}
exports.createProduct = async (req, res) => {
    const {
        product_name,
        product_type,
        price,
        unit
    } = req.body;
    const product = new Product({
        product_name,
        product_type,
        price,
        unit
    });
    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};
exports.updateProduct = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const product = await Product.findById(id);
        const data = {
            $set: req.body
        }
        const updated = await Product.findByIdAndUpdate(id, data);
        res.json(updated);
        res.status(200).json(product)
    } catch (err) {
        res.status(500).json(err)
    }
}
exports.deleteProduct = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({
            message: "product not found"
        })
        const deldated = await Product.findByIdAndDelete(id);
        res.json(deldated);
    } catch (err) {
        res.status(500).json(err)
    }
}