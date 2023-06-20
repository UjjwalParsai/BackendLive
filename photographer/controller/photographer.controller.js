import { validationResult } from "express-validator";
import Photographer from "../models/photographer.model.js";

export const save = async (request, response, next) => {
    console.log(request.body.Photographer)
    try {
        const errors = await  validationResult(request.body.Photographer);
        console.log(request.body.Photographer)
        if (!errors.isEmpty())
            return response.status(400).json({ error: "bad request", status: true });

        const photo = await Photographer.create(request.body.Photographer);
        return response.status(200).json({ message: "Photographer details saved", status: true });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "internal server error", status: false });
    }


}


// export const save= (request, response, next) => {
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
//         Photographer.create(({ images: images, thumbnail: thumbnail, price: price, title: title, description: description, address: address, rating: rating, longitude: longitude, latitude: latitude, service: service, experience: experience, contactNumber: contactNumber }))
//         return response.status(200).json({ message: "saved...", status: true });

//     }
//     catch (err) {
//         console.log(err);
//         return response.status(500).json({ error: "Internal server error", status: false });
//     }
// }

export const viewAll = (request, response, next) => {
    Photographer.find()
        .then(result => {
           
            return response.status(200).json({ photographers: result, status: true });
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ Message: "Internal Server error...", status: false });
        });
};


export const viewById = (request, response, next) => {
    const id = request.params.id; 

Photographer.findById(id)
        .then(result => {
            if (result) {
                return response.status(200).json({ photographerDetails: result, status: true });
            } else {
              
                return response.status(404).json({ Message: "photographer not found", status: false });
            }
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ Message: "Internal Server error...", status: false });
        });
}

export const search = (request, response, next) => {
    Photographer.find({
        $or: [
            { address: { $regex: request.params.keyword, $options: 'i' } },
            { title: { $regex: request.params.keyword, $options: 'i' } },
            { description: { $regex: request.params.keyword, $options: 'i' } }
        ]
    }).then(result => {
        return response.status(200).json({ photographerList: result, message: "Search photographer", status: true });
    }).catch((err) => {
        return response.status(500).json({ error: "Internal Server Error", status: false });
    })
}

export const activatePhotographer=async(request,response,next)=>{
    try{
        let photographer=await  Photographer.updateOne({_id:request.body.photographerId},{status:"true"})
        if(photographer.modifiedCount)
        return response.status(200).json({message:"photographer activate succesfully", status:true});
        return response.status(400).json({error:"request not found", status:false});
    }
    catch(err)
    {
        return response.status(500).json({error:"internal server error",status:false});
    }
}

export const activePhotographerList=async(request,response,next)=>{
    try{
        let photographer=await Photographer.find({status:"true"})
        return response.status(200).json({photographerList:photographer,status:true})
    }
    catch(err)
    {
        return response.status(500).json({error:"internal server error",status:false});
    }
}

export const saveImages=async(request,response,next)=>{
     try{
        let photographer=await Photographer.find({_id:request.params.id})
        if(!photographer)
         return response.status(404).json({error:"request resorses not found",status:false})
         
       await (request.body.image).map((img,index)=>{
            photographer.images.push(img)
        })
        venue.save();
        return response.json({message:"images save",status:true})
         
     }
     catch(err)
     {
       console.log(err);
       return response.json({error:"internal server error",status:false})
     }
}

export const removeById=async(request,response,next)=>{
    try{
        let photographer=await Photographer.updateOne({_id:request.body.photographerId},{status:"false"})
        if(photographer.modifiedCount)
        return response.status(200).json({message:"deleted succesfully",status:true});
        return response.status(400).json({error:"request not found",status:false});
    }
    catch(err)
    {
        return response.status(500).json({error:"internal server error",status:false});
    }
}

export const byPrice = async (request, response, next) => {

    try {
        let photographers = await Photographer.find();
      let photographer=photographers.filter((photographer,index)=>{ 
         return (photographer.services[0].price>=request.body.firstPrice&& photographer.services[0].price<=request.body.secondPrice)
     });
         return response.status(200).json({photogrpherList: photographer, status: true })
    }
    catch (err) {

        return response.status(500).json({ error: "internal server error", status: false });
    }
}

export const byService = async (request, response, next) => {
   
    try {
        let photographers = await Photographer.find();
        let select = [];
    
      let photographer=photographers.map((photographer,index)=>{ 
        photographer.services.map((service)=>{
            if(service.service.toLowerCase()==request.body.serviceName.toLowerCase())
                select.push(photographer)
            
        })
        
     });
                 return response.status(200).json({ photographerList: select, status: true })
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "internal server error", status: false });
    }
}
