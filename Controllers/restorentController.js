import { Restorent } from '../Model/restorentModel.js'

export const restorentReview = async (req,res)=>{ 
    const {token,restorentsName,location,lattitude,longitude,state,city,area,pincode,overallReview,waitingTime,restorentFoodReview,restorentExperienceReview,foodReview} = req.body;
    const waitingTimeData = JSON.parse(waitingTime)
    const restorentFoodReviewData = JSON.parse(restorentFoodReview)
    const restorentExperienceReviewData = JSON.parse(restorentExperienceReview)
    const files = req.files;
    const restorentsImage = `${process.cwd()}/assets/restorent/restorentImage/${files.restorentImage.filename}`
    const restorentFoodImage = `${process.cwd()}/assets/restorent/restorentImage/${files.restorentFoodImage.filename}`
    const interiorImage = `${process.cwd()}/assets/restorent/restorentImage/${files.interiorImage.filename}`
    const FoodReviewData = []
    for (var key in foodReview) {
        if (foodReview.hasOwnProperty(key)) {
        const food = JSON.parse(foodReview[key]);
        const originalname = food.fileName
       const orignalFile= files.foodImage.find(image => image.originalname === originalname)
       FoodReviewData.push({
        foodName:food.foodName,
        foodImage:`${process.cwd()}/assets/restorent/foodImage/${orignalFile.filename}`,
        overallReview:food.overallReview,
        testlReview:food.testlReview,
        qualityReview:food.qualityReview,
        quantityReview:food.quantityReview,
        presentationReview:food.presentationReview
       })
        }
    }
    const restaurant = new Restorent({
        restorentsImage,
        restorentsName,
        location,
        lattitude,
        longitude,
        state,
        city,
        area,
        pincode,
        overallReview,
        waitingTime:waitingTimeData,
        restorentFoodReview:{
            restorentFoodImage,
            testReview:restorentFoodReviewData.testReview,
            qualityReview:restorentFoodReviewData.qualityReview,
            quantityReview:restorentFoodReviewData.quantityReview,
            presentationReview:restorentFoodReviewData.presentationReview,
        },
        restorentExperienceReview:{
            interiorImage,
            vibeReview:restorentExperienceReviewData.vibeReview,
            locationReview:restorentExperienceReviewData.locationReview,
            serviceReview:restorentExperienceReviewData.serviceReview,
            orderWaitingTime:restorentExperienceReviewData.orderWaitingTime,
            foodWaitingTime:restorentExperienceReviewData.foodWaitingTime,
            cleannessReview:restorentExperienceReviewData.cleannessReview,
            staffBehaviorReview:restorentExperienceReviewData.staffBehaviorReview,
            managerBehaviorReview:restorentExperienceReviewData.managerBehaviorReview,
            description:restorentExperienceReviewData.description,
        },        
        FoodReviewData,
        token
       })
       const result = await restaurant.save()
       if (result.restorentsName) {
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
