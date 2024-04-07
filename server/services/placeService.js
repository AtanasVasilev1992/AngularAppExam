const Place = require('../models/Place');

exports.getAll = () => Place.find();

exports.create = async (userId, placeData) => {
    const createdPlace = await Place.create({
        owner: userId,
        ...placeData
    });
    return createdPlace;
};

exports.getOne = (placeId) => Place.findById(placeId);

exports.getOneDetailed = (placeId) =>this.getOne(placeId).populate('owner');

exports.delete = (placeId) => Place.findByIdAndDelete(placeId);

exports.edit = (placeId, placeData) => Place.findByIdAndUpdate(placeId, placeData, {runValidators: true});

exports.search = (name, type) => {
    let query = {};

    if (name) {
        query.name = new RegExp(name, 'i');
    };

    return Place.find(query);
};
