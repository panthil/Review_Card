import multer  from 'multer'
import Path  from 'path';


const avatarStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './assets/avatar')
    },
    filename: function (req, file, cb) {
      cb(null, 'avatar_' + Date.now() + Path.extname(file.originalname))
    }
  })

  const foodStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (file.fieldname === 'shopImage') {
        cb(null, './assets/food/shopImage')
      }else{
        cb(null, './assets/food/foodImage')
      }
      
    },
    filename: function (req, file, cb) {
      if (file.fieldname === 'shopImage') {
        cb(null, 'shopImage_'+Date.now() + Path.extname(file.originalname))
      }else{
        cb(null, 'foodImage_'+Date.now() + Path.extname(file.originalname))
      }
    }
  })


export const food = multer({storage:foodStorage}).fields([{name:'shopImage',maxCount: 1 },{name:'foodImage',maxCount: 3}])
export const avatar = multer({ storage: avatarStorage })