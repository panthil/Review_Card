import { Food } from '../Model/foodModel.js'

export const yourReview = async (req, res) => {
    const{token} = req.body
    const data =await Food.find({token:token})
    if (data) {
        res.send({
            message:'data Fetched',
            data:data,
            status:{
                statusCode:200,
                message:'ok'
            }
        })
    }else{
        res.send({
            message:'data Not Fetched',
            status:{
                statusCode:400,
                message:'Bad reqrest'
            }
        })
    }
}

export const lastMonthReview = async (req, res) => {
    const { token } = req.body;
    const currentDate = new Date();
    const lastMonthDate = new Date(currentDate);
    lastMonthDate.setMonth(currentDate.getMonth() - 1);
  
    try {
      const userReviews = await Food.find({ token });
        
      const lastMonthUserReviews = userReviews.filter(review =>
        review.createdAt.getMonth() <= lastMonthDate.getMonth()
      );
      res.send(lastMonthUserReviews)
  
      
    } catch (error) {
      console.error('Error retrieving last month user reviews:', error);
      res.status(500).json({ error: 'An error occurred' });
    }      
  }
  
  export const lastYearReview = async (req, res) => {
    const { token } = req.body;
    const currentDate = new Date();
    const lastMonthDate = new Date(currentDate);
    lastMonthDate.setFullYear(currentDate.getFullYear() - 1);
  
    try {
      const userReviews = await Food.find({ token });
        
      const lastMonthUserReviews = userReviews.filter(review =>
        review.createdAt.getFullYear() <= lastMonthDate.getFullYear()
      );
      res.send(lastMonthUserReviews)
  
      
    } catch (error) {
      console.error('Error retrieving last month user reviews:', error);
      res.status(500).json({ error: 'An error occurred' });
    }      
  }