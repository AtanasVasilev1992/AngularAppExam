const Museum = require('../models/Museum');

exports.getAll = () => Museum.find();

exports.create = async (userId, museumData) => {
    const createdMuseum = await Museum.create({
        owner: userId,
        ...museumData
    });
    return createdMuseum;
};

exports.getOne = (museumId) => Museum.findById(museumId);

exports.getOneDetailed = (museumId) =>this.getOne(museumId).populate('owner');

exports.delete = (museumId) => Museum.findByIdAndDelete(museumId);

exports.edit = (museumId, museumData) => Museum.findByIdAndUpdate(museumId, museumData, {runValidators: true});

exports.search = (name) => {
    let query = {};

    if (name) {
        query.name = new RegExp(name, 'i');
    };

    return Museum.find(query);
};
