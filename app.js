import gateway from "fast-gateway";
import express from "express";

const app=express();
app.get("/",(req,res)=>{
    res.setHeader("Access-Control-Allow-Credentials",true);
    res.setHeader("Access-Control-Allow-Origin:*");
    
})
app.use( gateway({
    routes: [{
      prefix: '/venue',
      target: 'http://localhost:6060/',
      
    },
    {
      prefix: '/apperals',
      target: 'http://localhost:6061/',  
    },
    {
      prefix: '/makeup',
      target: 'http://localhost:6062/',  
    },
    {
      prefix: '/mehandi',
      target: 'http://localhost:6063/',  
    },
    {
      prefix: '/photographer',
      target: 'http://localhost:6064/',  
    },
    {
      prefix: '/buggy',
      target: 'http://localhost:6065/',  
    },

    {
      prefix: '/caterers',
      target: 'http://localhost:6066/',  
    },

    {
      prefix: '/pandit',
      target: 'http://localhost:6067/',  
    },
 
    {
      prefix: '/tent',
      target: 'http://localhost:6068/',  
    },

    {
      prefix: '/band',
      target: 'http://localhost:6069/',  
    },

    {
      prefix: '/vender',
      target: 'http://localhost:8082/',  
    },

    {
      prefix: '/customer',
      target: 'http://localhost:8083/',  
    },
],


  })
)
app.listen("8000",()=>{
    console.log("GateWay started");
})

