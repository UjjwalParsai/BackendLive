import { validationResult } from "express-validator";
import Band from "../models/band.model.js";



// export const saveBand = async (request, response, next) => {
//     console.log(request.body.band)
//     try {
//         const errors = await validationResult(request.body.band);
//         console.log(request.body.band)
//         if (!errors.isEmpty())
//             return response.status(400).json({ error: "bad request", status: true });

//         const band = await Band.create(request.body.band);
//         return response.status(200).json({ message: "Band details saved", status: true });
//     }
//     catch (err) {
//         console.log(err);
//         return response.status(500).json({ error: "internal server error", status: false });
//     }


// }


export const saveBand= (request, response, next) => {
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
        Band.create(({ images: images, thumbnail: thumbnail, price: price, title: title, description: description, address: address, rating: rating, longitude: longitude, latitude: latitude, service: service, experience: experience, contactNumber: contactNumber }))
        return response.status(200).json({ message: "saved...", status: true });

    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal server error", status: false });
    }
}



export const viewById = (request, response, next) => {
    const id = request.params.id;

    Band.findById(id)
        .then(result => {
            if (result) {
                return response.status(200).json({ BandDetails: result, status: true });
            } else {

                return response.status(404).json({ Message: "Band not found", status: false });
            }
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ Message: "Internal Server error...", status: false });
        });
}

export const search = (request, response, next) => {
    Band.find({
        $or: [
            { address: { $regex: request.params.keyword, $options: 'i' } },
            { title: { $regex: request.params.keyword, $options: 'i' } },
            { description: { $regex: request.params.keyword, $options: 'i' } }
        ]
    }).then(result => {
        return response.status(200).json({ bandList: result, message: "Search Band", status: true });
    }).catch((err) => {
        return response.status(500).json({ error: "Internal Server Error", status: false });
    })
}

export const activateBand = async (request, response, next) => {
    try {
        let band = await Band.updateOne({ _id: request.body.bandId }, { status: "true" })
        if (band.modifiedCount)
            return response.status(200).json({ message: "band activate succesfully", status: true });
        return response.status(400).json({ error: "request not found", status: false });
    }
    catch (err) {
        return response.status(500).json({ error: "internal server error", status: false });
    }
}

export const activeBandList = async (request, response, next) => {
    try {
        let band = await Band.find({ status: "true" })
        return response.status(200).json({ bandList: band, status: true })
    }
    catch (err) {
        return response.status(500).json({ error: "internal server error", status: false });
    }
}

export const saveImages = async (request, response, next) => {
    try {
        let band = await Band.find({ _id: request.params.id })
        if (!band)
            return response.status(404).json({ error: "request resorses not found", status: false })

        await (request.body.image).map((img, index) => {
            band.images.push(img)
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
        let band = await Band.updateOne({ _id: request.body.bandId }, { status: "false" })
        if (band.modifiedCount)
            return response.status(200).json({ message: "deleted succesfully", status: true });
        return response.status(400).json({ error: "request not found", status: false });
    }
    catch (err) {
        return response.status(500).json({ error: "internal server error", status: false });
    }
}

export const viewAll = async (request, response, next) => {
    try {
        let band = await Band.find()
        return response.status(200).json({ bandList: band, status: true })
    }
    catch (err) {
        return response.status(500).json({ error: "internal server error", status: false });
    }
}


export const byPrice = async (request, response, next) => {

    try {
        let bands = await Band.find();
      let band=bands.filter((band,index)=>{ 
         return (band.services[0].price>=request.body.firstPrice&& band.services[0].price<=request.body.secondPrice)
     });
         return response.status(200).json({bandList: band, status: true })
    }
    catch (err) {

        return response.status(500).json({ error: "internal server error", status: false });
    }
}

export const byService = async (request, response, next) => {
   
    try {
        let bands = await Band.find();
        let select = [];
    
      let band=bands.map((band,index)=>{ 
        band.services.map((service)=>{
            if(service.service.toLowerCase()==request.body.serviceName.toLowerCase())
                select.push(band)
            
        })
        
     });
                 return response.status(200).json({ bandList: select, status: true })
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "internal server error", status: false });
    }
}
