


import { VenueDetails } from "../model/venueDetails.model.js";
import { validationResult } from "express-validator";


export const save = (request, response, next) => {
    console.log("data savesd")
    console.log(request.files);
    try {
        console.log(request.files);
        let thumbnail = null;
        let license = null;
        let images = [];
        request.files.map(file => {
            if (file.fieldname != "file")
                images.push(file.path)
            else {
                thumbnail = file.path
                license = file.path
            }

        });

        VenueDetails.create(({ images: images, license: license, thumbnail: thumbnail, charges: charges,vendorId:vendorId, capacity: capacity, category: category, NonvegPrice: NonvegPrice, vegPrice: vegPrice, title: title, description: description, address: address, rating: rating, longitude: longitude, latitude: latitude, service: service, contactNumber: contactNumber }))
        return response.status(200).json({ message: "saved...", status: true });

    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal server error", status: false });
    }
}

export const removeById = async (request, response, next) => {
    try {
        let venueDetails = await VenueDetails.updateOne({ _id: request.body.venueDetailsId }, { status: "false" })
        if (venueDetails.modifiedCount)
            return response.status(200).json({ message: "deleted succesfully", status: true });
        return response.status(400).json({ error: "request not found", status: false });
    }
    catch (err) {
        return response.status(500).json({ error: "internal server error", status: false });
    }
}

export const allList = async (request, response, next) => {
    try {
        let venueDetails = await VenueDetails.find()
        return response.status(200).json({ venueList: venueDetails, status: true })
    }
    catch (err) {
        return response.status(500).json({ error: "internal server error", status: false });
    }
}

export const fetchById = async (request, response, next) => {
    try {
        let venueDetails = await VenueDetails.findById(request.params.id)
        if (venueDetails)
            return response.status(200).json({ venueList: venueDetails, status: true })
        return response.status(400).json({ error: "request resorses not found", status: false })
    }
    catch (err) {
        return response.status(500).json({ error: "internal server error", status: false });
    }
}

export const activate = async (request, response, next) => {
    try {
        let venueDetails = await VenueDetails.updateOne({ _id: request.body.venueDetailsId }, { status: "true" })
        if (venueDetails.modifiedCount)
            return response.status(200).json({ message: "venue activate succesfully", status: true });
        return response.status(400).json({ error: "request not found", status: false });
    }
    catch (err) {
        return response.status(500).json({ error: "internal server error", status: false });
    }
}

export const activeList = async (request, response, next) => {
    try {
        let venueDetails = await VenueDetails.find({ status: "true" })
        return response.status(200).json({ venueList: venueDetails, status: true })
    }
    catch (err) {
        return response.status(500).json({ error: "internal server error", status: false });
    }
}

export const saveImages = async (request, response, next) => {
    console.log(request.body)
    console.log(request.files);
    try {
        const venueDetails = await VenueDetails.findOne({ venueDetailsId: request.body._id });

        console.log("data transfer")
        if (!venueDetails) {
            return response.status(404).json({ error: "Requested resource not found", status: false });
        }
        console.log("Data passed");
        if (Array.isArray(request.files)) {
            request.files.forEach((file) => {
                if (file.fieldname !== "files") {
                    venueDetails.images.push(file.path);
                }
            });
        }
        await venueDetails.save();
        return response.json({ message: "Images saved", status: true });
    } catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal server error", status: false });
    }
};


export const topList = async (request, response, next) => {
    try {
        let venueDetails = await VenueDetails.find().limit(10)
        return response.status(200).json({ venueList: venueDetails, status: true })
    }
    catch (err) {
        return response.status(500).json({ error: "internal server error", status: false });
    }
}

export const search = (request, response, next) => {
    console.log(request.params.keyword)
    VenueDetails.find({
        $or: [
            { address: { $regex: request.params.keyword, $options: 'i' } },
            { title: { $regex: request.params.keyword, $options: 'i' } },
            { category: { $regex: request.params.keyword, $options: 'i' } },
            { description: { $regex: request.params.keyword, $options: 'i' } }
        ]
    }).then(result => {

        if (result.length)
            return response.status(200).json({ venueList: result, message: "Search venue", status: true });
        return response.status(404).json({ erro: "Not Found", status: false });
    }).catch((err) => {
        return response.status(500).json({ error: "Internal Server Error", status: false });
    })
}


export const byCategory = async (request, response, next) => {
    try {
        let venueDetails = await VenueDetails.find({ categoryId: request.body.categoryId })
        return response.status(200).json({ venueList: venueDetails, status: true })
    }
    catch (err) {
        return response.status(500).json({ error: "internal server error", status: false });
    }
}

export const byCapacity = async (request, response, next) => {
    try {
        let venueDetails = await VenueDetails.find({
            $and: [
                { capacity: { $gt: request.body.first } },
                { capacity: { $lte: request.body.second } }
            ]
        })
        return response.status(200).json({ venueList: venueDetails, status: true })
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "internal server error", status: false });
    }
}


export const byCharges = async (request, response, next) => {
    try {
        let venueDetails = await VenueDetails.find({
            $and: [
                { charges: { $gt: request.body.firstPrice } },
                { charges: { $lte: request.body.secondPrice } }
            ]
        })
        return response.status(200).json({ venueList: venueDetails, status: true })
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "internal server error", status: false });
    }
}