import { Product } from "../model/product.model.js"

export const getProductByCategory = (request,response,next)=>{
    Product.find({category:request.body.categoryId}).
    then(result=>{
        return response.status(200).json({products: result, status: true});
    }).catch(err=>{
        return response.status(500).json({error:"Internal Server Error", status: false});
    })
}
export const getProduct = (request,response,next)=>{
    Product.findById(request.body._id).
    then(result=>{
        return response.status(200).json({product: result, status: true});
    }).catch(err=>{
        return response.status(500).json({error:"Internal Server Error", status: false});
    })
}
export const list = async (request,response,next)=>{
    try{
      let product= Product.find()
        return response.status(200).json({products: product, status: true});
    }
    catch(err)
    {  
        return response.status(500).json({error:"Internal Server Error", status: false});
    }
    
}

