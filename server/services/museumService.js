const Museum = require('../models/Museum');

exports.getAll = ()=> Museum.find();

exports.getOne = (museumId)=> Museum.findById(museumId);

exports.edit = (museumId, museumData)=> Museum.findByIdAndUpdate(museumId, museumData);

exports.delete = (museumId)=> Museum.findByIdAndDelete(museumId);

exports.create = (museumData)=> Museum.create(museumData);