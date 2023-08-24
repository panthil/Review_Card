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

  const reviewData = []
  const reviewDataCopy ={}

  for (const foodName in sortedData) {
    const totalReview = sortedData[foodName];
    const avgReview = foodReviewScores[foodName] / totalReview;
    const foodData = await Food.findOne({ foodName: foodName })
    if (foodData) {
      reviewData.push({
        totalReview,
        avgReview,
        data: foodData
      })
      reviewDataCopy[foodName] = {
        totalReview,
        avgReview,
        data: foodData
      }
    }
  }
  return { reviewData,reviewDataCopy }
}
async function findMostReviewedRestorentWithStats(restorentArray) {
  const restorentReviewCounts = {};
  const restorentReviewScores = {};

  restorentArray.forEach(restorent => {
    const restorentsName = restorent.restorentsName;
    const overallReview = restorent.overallReview;

    if (!restorentReviewCounts[restorentsName]) {
      restorentReviewCounts[restorentsName] = 1;
      restorentReviewScores[restorentsName] = overallReview;
    } else {
      restorentReviewCounts[restorentsName]++;
      restorentReviewScores[restorentsName] += overallReview;
    }
  });

  function sortObjectValuesDescending(obj) {
    const sortedEntries = Object.entries(obj).sort((a, b) => b[1] - a[1]);
    const sortedObject = Object.fromEntries(sortedEntries);
    return sortedObject;
  }
  const sortedData = sortObjectValuesDescending(restorentReviewCounts);

  const reviewData = []

  for (const restorentsName in sortedData) {
    const totalReview = sortedData[restorentsName];
    const avgReview = restorentReviewScores[restorentsName] / totalReview;
    const restorentData = await Restorent.findOne({ restorentsName: restorentsName })
    if (restorentData) {
      reviewData.push({
        totalReview,
        avgReview,
        data: restorentData
      })
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
  const { area,page,pageData } = req.body
  const data = await Restorent.find({area})

  const mostReviewedRestorentStats = findMostReviewedRestorentWithStats(data);
  const { reviewData } = await mostReviewedRestorentStats;
  const startIdx = (page - 1) * pageData;
  const endIdx = startIdx + pageData;

  if (reviewData) {
   if (page,pageData) {
    res.status(200).send({
      status: {
        message: "Data Fatched",
        statusCode: 200
      },
      data:reviewData.slice(startIdx,endIdx)
    })
   }else{
    res.status(200).send({
      status: {
        message: "Data Fatched",
        statusCode: 200
      },
      data:reviewData.slice(0,9)
    })
   }
  } else {
    res.status(400).send({
      status: {
        message: "Data Not Fatched",
        statusCode: 400
      }
    })
  }
}

export const areaFood = async (req, res) => {
  const { area,page,pageData } = req.body
  const data = await Food.find({ area: area })

  const mostReviewedFoodStats = findMostReviewedFoodWithStats(data);
  const { reviewData } = await mostReviewedFoodStats;
  const startIdx = (page - 1) * pageData;
  const endIdx = startIdx + pageData;
  if (reviewData) {
    if (page,pageData) {
     res.status(200).send({
       status: {
         message: "Data Fatched",
         statusCode: 200
       },
       data:reviewData.slice(startIdx,endIdx)
     })
    }else{
     res.status(200).send({
       status: {
         message: "Data Fatched",
         statusCode: 200
       },
       data:reviewData.slice(0,9)
     })
    }
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
  const { city,page,pageData } = req.body
  const data = await Restorent.find({city})

  const mostReviewedRestorentStats = findMostReviewedRestorentWithStats(data);
  const { reviewData } = await mostReviewedRestorentStats;
  const startIdx = (page - 1) * pageData;
  const endIdx = startIdx + pageData;

  if (reviewData) {
   if (page,pageData) {
    res.status(200).send({
      status: {
        message: "Data Fatched",
        statusCode: 200
      },
      data:reviewData.slice(startIdx,endIdx)
    })
   }else{
    res.status(200).send({
      status: {
        message: "Data Fatched",
        statusCode: 200
      },
      data:reviewData.slice(0,9)
    })
   }
  } else {
    res.status(400).send({
      status: {
        message: "Data Not Fatched",
        statusCode: 400
      }
    })
  }
}

export const cityFood = async (req, res) => {
  const { city,page,pageData } = req.body
  const data = await Food.find({ city: city })

  const mostReviewedFoodStats = findMostReviewedFoodWithStats(data);
  const { reviewData } = await mostReviewedFoodStats;
  const startIdx = (page - 1) * pageData;
  const endIdx = startIdx + pageData;

  if (reviewData) {
   if (page,pageData) {
    res.status(200).send({
      status: {
        message: "Data Fatched",
        statusCode: 200
      },
      data:reviewData.slice(startIdx,endIdx)
    })
   }else{
    res.status(200).send({
      status: {
        message: "Data Fatched",
        statusCode: 200
      },
      data:reviewData.slice(0,9)
    })
   }
  } else {
    res.status(400).send({
      status: {
        message: "Data Not Fatched",
        statusCode: 400
      }
    })
  }
  
}

export const nearRestorent = async (req, res) => {
  const { userLatitude, userLongitude,page,pageData } = req.body
  const places = await Restorent.find({})
  const sortedPlaces = sortObjectsByDistance(places, userLatitude, userLongitude);
  let data = []
  for (var key in sortedPlaces){
    data.push(sortedPlaces[key])
  }

  const startIdx = (page - 1) * pageData;
  const endIdx = startIdx + pageData;
  if (sortedPlaces) {
    if (page,pageData) {
      res.status(200).send({
        status: {
          message: "Data Fatched",
          statusCode: 200
        },
        data:data.slice(startIdx,endIdx)
      })
     }else{
      res.status(200).send({
        status: {
          message: "Data Fatched",
          statusCode: 200
        },
        data:data.slice(0,9)
      })
     }
  } else {
    res.status(400).send({
      message: 'data Not Fatched',
      status: {
        StatusCode: 400,
        message: 'Bad Req'
      }
    })
  }
}

export const nearFood = async (req, res) => {
  const { userLatitude, userLongitude,page,pageData } = req.body
  const places = await Food.find({})
  const sortedPlaces = sortObjectsByDistance(places, userLatitude, userLongitude);
  let data = []
  for (var key in sortedPlaces){
    data.push(sortedPlaces[key])
  }

  const startIdx = (page - 1) * pageData;
  const endIdx = startIdx + pageData;
  if (sortedPlaces) {
    if (page,pageData) {
      res.status(200).send({
        status: {
          message: "Data Fatched",
          statusCode: 200
        },
        data:data.slice(startIdx,endIdx)
      })
     }else{
      res.status(200).send({
        status: {
          message: "Data Fatched",
          statusCode: 200
        },
        data:data.slice(0,9)
      })
     }
  } else {
    res.status(400).send({
      message: 'data Not Fatched',
      status: {
        StatusCode: 400,
        message: 'Bad Req'
      }
    })
  }

}

let cachedData = {};

export const foodImage = async (req, res) => {
  const { area, page, pageData } = req.body;
  if (area) {
    const data = await Food.find({ area: area });
    const mostReviewedFoodStats = findMostReviewedFoodWithStats(data);
    const { reviewDataCopy } = await mostReviewedFoodStats;
    const foodImage = [];
    data.forEach((food) => {
      foodImage.push({
        foodImage: food.foodAssets.foodImage,
        shopName: food.shopName,
        foodName: food.foodName,
        area: food.area,
        city: food.city,
        totalReview: reviewDataCopy[food.foodName].totalReview,
        avgReview: reviewDataCopy[food.foodName].avgReview,
      });     
    });
    const randomDataArray = [];
    for (let i = 0; i < foodImage.length; i++) {
      const randomData = foodImage[Math.floor(Math.random() * foodImage.length)];
      randomDataArray.push(randomData);
    }

    cachedData["randomData"] = randomDataArray;
  }
  const startIdx = (page - 1) * pageData;
  const endIdx = startIdx + pageData;

  const pageDataToSend = cachedData["randomData"].slice(startIdx, endIdx);

  if (pageDataToSend.length > 0) {
    res.send({
      status: {
        message: "Data Fetched",
        statusCode: 200,
      },
      data: pageDataToSend,
    });
  } else {
    res.status(400).send({
      status: {
        message: "Data Not Fetched",
        statusCode: 400,
      },
    });
  }
};


export const serchFoodRestorent = async (req, res) => {
  const {value,page,pageData,viewAll} = req.body;
  const data1 =await Restorent.find({restorentsName:value})
  const data2 =await Food.find({shopName:value})
  const data3 =await Restorent.find({foodName:value})
  const startIdx = (page - 1) * pageData;
  const endIdx = startIdx + pageData;
  if (data1.length || data2.length || data3.length) {
   if (viewAll) {
   let allData = []
   const showData1 = data1.slice(Math.floor(startIdx/3),Math.floor(endIdx/3))
   const showData2 = data2.slice(Math.floor(startIdx/3),Math.floor(endIdx/3))
   const showData3 = data3.slice(Math.floor(startIdx/3),Math.floor(endIdx/3))
   allData = allData.concat(showData1,showData2,showData3)
   res.send({
    message:"Data Fetched",
    Data:allData,
    status:{
      message:"ok",
      statusCode:200
    }
   })
   }else{
    const showData1 = data1.length<=3?data1:data1.slice(0,3)
    const showData2 = data2.length<=3?data2:data2.slice(0,3)
    const showData3 = data3.length<=3?data3:data3.slice(0,3)
    let showData = []
    showData = showData.concat(showData1,showData2,showData3)
    
    res.send({
     message:"Data Fetched",
     Data:showData,
     status:{
       message:"ok",
       statusCode:200
     }
    })
   }
  }else{
    res.send({
      message:"Data Not Found",
      serchData:value
    })
  }

}
