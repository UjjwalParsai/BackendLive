import { validationResult } from "express-validator";
import Pandit from "../models/pandit.model.js";
export const savepandit= (request, response, next) => {
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
      Pandit.create(({ images: images, thumbnail: thumbnail, price: price, title: title, description: description, address: address, rating: rating, longitude: longitude, latitude: latitude, service: service, experience: experience, contactNumber: contactNumber }))
        return response.status(200).json({ message: "saved...", status: true });

    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal server error", status: false });
    }
}

export const viewAll = (request, response, next) => {
    Pandit.find()
        .then(result => {
           
            return response.status(200).json({ panditDetails: result, status: true });
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ Message: "Internal Server error...", status: false });
        });
};


export const viewById = (request, response, next) => {
    const id = request.params.id;

    Pandit.findById(id)
        .then(result => {
            if (result) {
                return response.status(200).json({ panditDetails: result, status: true });
            } else {

                return response.status(404).json({ Message: "pandit not found", status: false });
            }
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ Message: "Internal Server error...", status: false });
        });
}

export const search = (request, response, next) => {
    Pandit.find({
        $or: [
            { address: { $regex: request.params.keyword, $options: 'i' } },
            { title: { $regex: request.params.keyword, $options: 'i' } },
            { description: { $regex: request.params.keyword, $options: 'i' } }
        ]
    }).then(result => {
        return response.status(200).json({ panditList: result, message: "Search pandit", status: true });
    }).catch((err) => {
        return response.status(500).json({ error: "Internal Server Error", status: false });
    })
}

export const activatepandit = async (request, response, next) => {
    try {
        let pandit = await Pandit.updateOne({ _id: request.body.panditId }, { status: "true" })
        if (pandit.modifiedCount)
            return response.status(200).json({ message: "pandit activate succesfully", status: true });
        return response.status(400).json({ error: "request not found", status: false });
    }
    catch (err) {
        return response.status(500).json({ error: "internal server error", status: false });
    }
}

export const activepanditList = async (request, response, next) => {
    try {
        let pandit = await Pandit.find({ status: "true" })
        return response.status(200).json({ panditList: pandit, status: true })
    }
    catch (err) {
        return response.status(500).json({ error: "internal server error", status: false });
    }
}

export const saveImages = async (request, response, next) => {
    try {
        let pandit = await Pandit.find({ _id: request.params.id })
        if (!pandit)
            return response.status(404).json({ error: "request resorses not found", status: false })

        await (request.body.image).map((img, index) => {
            pandit.images.push(img)
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
        let pandit = await Pandit.updateOne({ _id: request.body.panditId }, { status: "false" })
        if (pandit.modifiedCount)
            return response.status(200).json({ message: "deleted succesfully", status: true });
        return response.status(400).json({ error: "request not found", status: false });
    }
    catch (err) {
        return response.status(500).json({ error: "internal server error", status: false });
    }
}

export const premiumList = (request, response, next) => {
    Pandit.find().limit(10)
        .then(result => {
            
            return response.status(200).json({ premiumPanditList: result, status: true });
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ Message: "Internal Server error...", status: false });
        });
};


export const byCharges = async (request, response, next) => {
   
    console.log(request.body)
    try {
        let pandits = await Pandit.find();
    
    
      let panditList=pandits.filter((pandit,index)=>{ 
       return (pandit.services[0].price>=request.body.firstPrice&& pandit.services[0].price<=request.body.secondPrice)
     });
    
         return response.status(200).json({ panditList: panditList, status: true })
    }
    catch (err) {
        
        return response.status(500).json({ error: "internal server error", status: false });
    }
}