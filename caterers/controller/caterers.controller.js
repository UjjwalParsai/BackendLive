import { validationResult } from "express-validator";
import Caterer from "../models/caterers.model.js";

export const savecaterer = async (request, response, next) => {
    try {
        const errors = await validationResult(request.body.Caterers);
        if (!errors.isEmpty())
            return response.status(400).json({ error: "bad request", status: true });

        const caterer = await Caterer.create(request.body.Caterers);
        return response.status(200).json({ message: "Caterers details saved", status: true });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "internal server error", status: false });
    }


}
// export const savecaterer = (request, response, next) => {
//     console.log("data savesd")
//     try {
//         console.log(request.files);
//         let thumbnail = null;
//         let images = [];
//         request.files.map(file => {
//             if (file.fieldname != "file")
//                 images.push(file.path)
//             else
//                 thumbnail = file.path
//         });

//         let { title, description, price, address, rating, longitude, latitude, service, experience, contactNumber } = request.body
//         Caterer.create(({ images: images, thumbnail: thumbnail, price: price, title: title, description: description, address: address, rating: rating, longitude: longitude, latitude: latitude, service: service, experience: experience, contactNumber: contactNumber }))
//         return response.status(200).json({ message: "saved...", status: true });

//     }
//     catch (err) {
//         console.log(err);
//         return response.status(500).json({ error: "Internal server error", status: false });
//     }
// }

export const viewAll = (request, response, next) => {
    Caterer.find()
        .then(result => {
            return response.status(200).json({ caterersDetails: result, status: true });
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ Message: "Internal Server error...", status: false });
        });
};


export const viewById = (request, response, next) => {
    const id = request.params.id;

    Caterer.findById(id)
        .then(result => {
            if (result) {
                return response.status(200).json({ catererDetails: result, status: true });
            } else {

                return response.status(404).json({ Message: "caterer not found", status: false });
            }
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ Message: "Internal Server error...", status: false });
        });
}

export const search = (request, response, next) => {
    Caterer.find({
        $or: [
            { address: { $regex: request.params.keyword, $options: 'i' } },
            { title: { $regex: request.params.keyword, $options: 'i' } },
            { description: { $regex: request.params.keyword, $options: 'i' } }
        ]
    }).then(result => {
        return response.status(200).json({ caterersList: result, message: "Search caterer", status: true });
    }).catch((err) => {
        return response.status(500).json({ error: "Internal Server Error", status: false });
    })
}

export const activatecaterer = async (request, response, next) => {
    try {
        let caterer = await Caterer.updateOne({ _id: request.body.catererId }, { status: "true" })
        if (caterer.modifiedCount)
            return response.status(200).json({ message: "caterer activate succesfully", status: true });
        return response.status(400).json({ error: "request not found", status: false });
    }
    catch (err) {
        return response.status(500).json({ error: "internal server error", status: false });
    }
}

export const activecatererList = async (request, response, next) => {
    try {
        let caterer = await Caterer.find({ status: "true" })
        return response.status(200).json({ catererList: caterer, status: true })
    }
    catch (err) {
        return response.status(500).json({ error: "internal server error", status: false });
    }
}

export const saveImages = async (request, response, next) => {
    try {
        let caterer = await Caterer.find({ _id: request.params.id })
        if (!caterer)
            return response.status(404).json({ error: "request resorses not found", status: false })

        await (request.body.image).map((img, index) => {
            caterer.images.push(img)
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
        let caterer = await Caterer.updateOne({ _id: request.body.catererId }, { status: "false" })
        if (caterer.modifiedCount)
            return response.status(200).json({ message: "deleted succesfully", status: true });
        return response.status(400).json({ error: "request not found", status: false });
    }
    catch (err) {
        return response.status(500).json({ error: "internal server error", status: false });
    }
}


export const byPrice = async (request, response, next) => {

    try {
        let caterers = await Caterer.find();
      let caterer=caterers.filter((caterer,index)=>{ 
         return (caterer.services[0].price>=request.body.firstPrice&& caterer.services[0].price<=request.body.secondPrice)
     });
         return response.status(200).json({caterersList: caterer, status: true })
    }
    catch (err) {

        return response.status(500).json({ error: "internal server error", status: false });
    }
}

export const byService = async (request, response, next) => {
   
    try {
        let caterers = await Caterer.find();
        let select = [];
    
      let caterer=caterers.map((caterer,index)=>{ 
        caterer.services.map((service)=>{
            if(service.service.toLowerCase()==request.body.serviceName.toLowerCase())
                select.push(caterer)
            
        })
        
     });
                 return response.status(200).json({ caterersList: select, status: true })
    }
    catch (err) {
        
        return response.status(500).json({ error: "internal server error", status: false });
    }
}
