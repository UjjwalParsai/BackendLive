import { validationResult } from "express-validator";
import Makeup from "../models/makeup.model.js";


export const savemakeup= (request, response, next) => {
    console.log("data savesd")
    try {
        console.log(request.files);
        let thumbnail = null;
        let images = [];
        request.files.map(file => {
            if (file.fieldname != "file")
                images.push(file.path)
            else
                thumbnail = file.path
        });
              
        let { title, description, price, address, rating, longitude, latitude, service, experience, contactNumber } = request.body
      Makeup.create(({ images: images, thumbnail: thumbnail, price: price, title: title, description: description, address: address, rating: rating, longitude: longitude, latitude: latitude, service: service, experience: experience, contactNumber: contactNumber }))
        return response.status(200).json({ message: "saved...", status: true });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal server error", status: false });
    }
}

export const viewAll = (request, response, next) => {
    Makeup.find()
        .then(result => {
            
            return response.status(200).json({ makeupDetails: result, status: true });
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ Message: "Internal Server error...", status: false });
        });
};


export const topList = (request, response, next) => {
    Makeup.find().limit(10)
        .then(result => {
            
            return response.status(200).json({ makeupDetails: result, status: true });
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ Message: "Internal Server error...", status: false });
        });
};



export const viewById = (request, response, next) => {
    const id = request.params.id;

    Makeup.findById(id)
        .then(result => {
            if (result) {
                return response.status(200).json({ makeupDetails: result, status: true });
            } else {

                return response.status(404).json({ Message: "makeup not found", status: false });
            }
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ Message: "Internal Server error...", status: false });
        });
}

export const search = (request, response, next) => {
    Makeup.find({
        $or: [
            { address: { $regex: request.params.keyword, $options: 'i' } },
            { companyName: { $regex: request.params.keyword, $options: 'i' } },
            { description: { $regex: request.params.keyword, $options: 'i' } }
        ]
    }).then(result => {
        return response.status(200).json({ makeupList: result, message: "Search makeup", status: true });
    }).catch((err) => {
        return response.status(500).json({ error: "Internal Server Error", status: false });
    })
}

export const activatemakeup = async (request, response, next) => {
    try {
        let makeup = await Makeup.updateOne({ _id: request.body.makeupId }, { status: "true" })
        if (makeup.modifiedCount)
            return response.status(200).json({ message: "makeup activate succesfully", status: true });
        return response.status(400).json({ error: "request not found", status: false });
    }
    catch (err) {
        return response.status(500).json({ error: "internal server error", status: false });
    }
}

export const activemakeupList = async (request, response, next) => {
    try {
        let makeup = await Makeup.find({ status: "true" })
        return response.status(200).json({ makeupList: makeup, status: true })
    }
    catch (err) {
        return response.status(500).json({ error: "internal server error", status: false });
    }
}

export const saveImages = async (request, response, next) => {
    try {
        let makeup = await Makeup.find({ _id: request.params.id })
        if (!makeup)
            return response.status(404).json({ error: "request resorses not found", status: false })

        await (request.body.image).map((img, index) => {
            makeup.images.push(img)
        })
        venue.save();
        return response.json({ message: "images save", status: true })

    }
    catch (err) {
        console.log(err);
        return response.json({ error: "internal server error", status: false })
    }
}

export const removeById = async (request, response, next) => {
    try {
        let makeup = await Makeup.updateOne({ _id: request.body.makeupId }, { status: "false" })
        if (makeup.modifiedCount)
            return response.status(200).json({ message: "deleted succesfully", status: true });
        return response.status(400).json({ error: "request not found", status: false });
    }
    catch (err) {
        return response.status(500).json({ error: "internal server error", status: false });
    }
}


export const byPrice = async (request, response, next) => {
    console.log(request.body)
    try {
        let makeups = await Makeup.find();
      let make=makeups.filter((makeup,index)=>{ 
         return (makeup.services[0].price>=request.body.firstPrice&& makeup.services[0].price<=request.body.secondPrice)
     });
         return response.status(200).json({ makeupList: make, status: true })
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "internal server error", status: false });
    }
}

