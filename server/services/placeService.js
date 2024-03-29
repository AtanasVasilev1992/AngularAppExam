const Place = require('../models/Place');

exports.getAll = ()=> Place.find();

exports.getOne = (placeId)=> Place.findById(placeId);

exports.edit = (placeId, placeData)=> Place.findByIdAndUpdate(placeId, placeData);

exports.delete = (placeId)=> Place.findByIdAndDelete(placeId);

exports.create = (placeData)=> Place.create(placeData);