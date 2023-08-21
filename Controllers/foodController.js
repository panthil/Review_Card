import { Food } from '../Model/foodModel.js'


export const foodReview = async (req,res) =>{
   const {token,foodName,shopName,location,lattitude,longitude,state,city,area,pincode,description,overallReview,testlReview,qualityReview,cleanlinessReview,staffReview} = req.body;
   const files = req.files;
   const shopimage = `${process.cwd()}/assets/food/shopImage/${files.shopImage.filename}`
   const foodImage1 = `${process.cwd()}/assets/food/foodImage/${files.foodImage[0].filename}`
   const foodImage2 = `${process.cwd()}/assets/food/foodImage/${files.foodImage[1].filename}`
   const foodImage3 = `${process.cwd()}/assets/food/foodImage/${files.foodImage[2].filename}`
   const food = new Food({
    foodAssets:{
        shopImage:shopimage,
        foodImage:{
            image1:foodImage1,
            image2:foodImage2,
            image3:foodImage3
        }
    },
    shopName,
    foodName,
    location,
    lattitude,
    longitude,
    state,
    city,
    area,
    pincode,
    description,
    foodReview:{
    overallReview,
    testlReview,
    qualityReview,
    cleanlinessReview,
    staffReview
    },
    token
   })
   const result = await food.save()
   if (result.shopName) {
    res.send({
        message:"Data added Sucessuffully",
        status:"ok",
        statusCode:201,
    })
   }
   else{
    res.send({
        message:"Server Error",
        status:"Bad Error",
        statusCode:400

    })
   }

}

