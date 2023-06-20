import { validationResult } from "express-validator";
import Tent from "../models/tent.model.js";

// export const savetent= (request, response, next) => {
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
//         Tent.create(({ images: images, thumbnail: thumbnail, price: price, title: title, description: description, address: address, rating: rating, longitude: longitude, latitude: latitude, service: service, experience: experience, contactNumber: contactNumber }))
//         return response.status(200).json({ message: "saved...", status: true });

//     }
//     catch (err) {
//         console.log(err);
//         return response.status(500).json({ error: "Internal server error", status: false });
//     }
// }
export const savetent = async (request, response, next) => {
    console.log(request.body.tent)
    try {
        const errors = await validationResult(request.body.tent);
        console.log(request.body.tent)
        if (!errors.isEmpty())
            return response.status(400).json({ error: "bad request", status: true });

        const tent = await Tent.create(request.body.tent);
        return response.status(200).json({ message: "Tent details saved", status: true });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "internal server error", status: false });
    }


}

export const viewAll = (request, response, next) => {
    Tent.find()
        .then(result => {
            return response.status(200).json({ tentList: result, status: true });
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ Message: "Internal Server error...", status: false });
        });
};


export const viewById = (request, response, next) => {
    const id = request.params.id;

    Tent.findById(id)
        .then(result => {
            if (result) {
                return response.status(200).json({ tentDetails: result, status: true });
            } else {

                return response.status(404).json({ Message: "tent not found", status: false });
            }
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ Message: "Internal Server error...", status: false });
        });
}

export const search = (request, response, next) => {
    Tent.find({
        $or: [
            { address: { $regex: request.params.keyword, $options: 'i' } },
            { title: { $regex: request.params.keyword, $options: 'i' } },
            { description: { $regex: request.params.keyword, $options: 'i' } }
        ]
    }).then(result => {
        return response.status(200).json({ tentList: result, message: "Search tent", status: true });
    }).catch((err) => {
        return response.status(500).json({ error: "Internal Server Error", status: false });
    })
}

export const activatetent = async (request, response, next) => {
    try {
        let tent = await tent.updateOne({ _id: request.body.tentId }, { status: "true" })
        if (tent.modifiedCount)
            return response.status(200).json({ message: "tent activate succesfully", status: true });
        return response.status(400).json({ error: "request not found", status: false });
    }
    catch (err) {
        return response.status(500).json({ error: "internal server error", status: false });
    }
}

export const activetentList = async (request, response, next) => {
    try {
        let tent = await Tent.find({ status: "true" })
        return response.status(200).json({ tentList: tent, status: true })
    }
    catch (err) {
        return response.status(500).json({ error: "internal server error", status: false });
    }
}

export const saveImages = async (request, response, next) => {
    try {
        let tent = await Tent.find({ _id: request.params.id })
        if (!tent)
            return response.status(404).json({ error: "request resorses not found", status: false })

        await (request.body.image).map((img, index) => {
            tent.images.push(img)
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
        let tent = await Tent.updateOne({ _id: request.body.tentId }, { status: "false" })
        if (tent.modifiedCount)
            return response.status(200).json({ message: "deleted succesfully", status: true });
        return response.status(400).json({ error: "request not found", status: false });
    }
    catch (err) {
        return response.status(500).json({ error: "internal server error", status: false });
    }
}

export const byPrice = async (request, response, next) => {

    try {
        let tents = await Tent.find();
      let tent=tents.filter((tent,index)=>{ 
         return (tent.services[0].price>=request.body.firstPrice&& tent.services[0].price<=request.body.secondPrice)
     });
         return response.status(200).json({tentList: tent, status: true })
    }
    catch (err) {

        return response.status(500).json({ error: "internal server error", status: false });
    }
}

export const byService = async (request, response, next) => {
   
    try {
        let tents = await Tent.find();
        let select = [];
    
      let tent=tents.map((tent,index)=>{ 
        tent.services.map((service)=>{
            if(service.service.toLowerCase()==request.body.serviceName.toLowerCase())
                select.push(photographer)
            
        })
        
     });
                 return response.status(200).json({ tentList: select, status: true })
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "internal server error", status: false });
    }
}

