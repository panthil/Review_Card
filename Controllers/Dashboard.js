import { Food } from '../Model/foodModel.js'
import { Restorent } from '../Model/restorentModel.js'

async function findMostReviewedFoodWithStats(foodArray) {
  const foodReviewCounts = {};
  const foodReviewScores = {};

  foodArray.forEach(food => {
    const foodName = food.foodName;
    const overallReview = food.foodReview.overallReview;

    if (!foodReviewCounts[foodName]) {
      foodReviewCounts[foodName] = 1;
      foodReviewScores[foodName] = overallReview;
    } else {
      foodReviewCounts[foodName]++;
      foodReviewScores[foodName] += overallReview;
    }
  });

  function sortObjectValuesDescending(obj) {
    const sortedEntries = Object.entries(obj).sort((a, b) => b[1] - a[1]);
    const sortedObject = Object.fromEntries(sortedEntries);
    return sortedObject;
  }
  const sortedData = sortObjectValuesDescending(foodReviewCounts);

  const reviewData = {}

  for (const foodName in sortedData) {
    const totalReview = sortedData[foodName];
    const avgReview = foodReviewScores[foodName] / totalReview;
    const foodData = await Food.findOne({ foodName: foodName })
    if (foodData) {
      reviewData[foodName] = {
        totalReview,
        avgReview,
        data: foodData
      }
    }
  }
  return { reviewData }
}

function sortObjectsByDistance(objects, userLatitude, userLongitude) {
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    return distance;
  }

  objects.sort((a, b) => {
    const distanceA = calculateDistance(
      userLatitude,
      userLongitude,
      a.latitude,
      a.longitude
    );
    const distanceB = calculateDistance(
      userLatitude,
      userLongitude,
      b.latitude,
      b.longitude
    );

    return distanceA - distanceB;
  });

  return objects;
}


export const areaRestorent = async (req, res) => {

}

export const areaFood = async (req, res) => {
  const { area } = req.body
  const data = await Food.find({ area: area })

  const mostReviewedFoodStats = findMostReviewedFoodWithStats(data);
  const { reviewData } = await mostReviewedFoodStats;
  if (reviewData) {
    res.status(200).send({
      status: {
        message: "Data Fatched",
        statusCode: 200
      },
      data: reviewData
    })
  } else {
    res.status(400).send({
      status: {
        message: "Data Not Fatched",
        statusCode: 400
      }
    })
  }
}

export const cityRestorent = async (req, res) => {

}

export const cityFood = async (req, res) => {
  const { city } = req.body
  const data = await Food.find({ city: city })

  const mostReviewedFoodStats = findMostReviewedFoodWithStats(data);
  const { reviewData } = mostReviewedFoodStats;
  if (reviewData) {
    res.send({
      status: {
        message: "Data Fatched",
        statusCode: 200
      },
      data: reviewData
    })
  } else {
    res.status(400).send({
      status: {
        message: "Data Not Fatched",
        statusCode: 400
      },
    })
  }
}

export const nearRestorent = async (req, res) => {

}

export const nearFood = async (req, res) => {
  const {userLatitude,userLongitude} = req.body
  const places = await Food.find({})
  const sortedPlaces = sortObjectsByDistance(places, userLatitude, userLongitude);
  if (sortedPlaces) {
    res.status(200).send({
      message:'data Fatched',
      data:sortedPlaces,
      status:{
        StatusCode:200,
        message:'ok'
      }
    })
  }else{
    res.status(400).send({
      message:'data Not Fatched',
      status:{
        StatusCode:400,
        message:'Bad Req'
      }
    })
  }
  
}

export const foodImage = async (req, res) => {
  const { area } = req.body;
  const data = await Food.find({ area: area })

  const mostReviewedFoodStats = findMostReviewedFoodWithStats(data);
  const { reviewData } =await mostReviewedFoodStats;
  const foodImage = []
  data.forEach(food=>{
      foodImage.push({
          foodImage:food.foodAssets.foodImage,
          shopName:food.shopName,
          foodName:food.foodName,
          area:food.area,
          city:food.city,
          totalReview:reviewData[food.foodName].totalReview,
          avgReview:reviewData[food.foodName].avgReview,
      })
  })
  const randomDataArray = [];
  for (let i = 0; i < foodImage.length; i++) {
    const randomData = foodImage[Math.floor(Math.random() * foodImage.length)];
    randomDataArray.push(randomData);
  }
  if (data && reviewData) {
    res.send({
      status: {
        message: "Data Fatched",
        statusCode: 200
      },
      data: randomDataArray
    })
  }else{
    res.status(400).send({
      status: {
        message: "Data Not Fatched",
        statusCode: 400
      },
    })
  }
}
