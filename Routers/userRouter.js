import express from 'express';
import { signUp,verifyOtp,updateProfile,getFavoriteFood,postFavoriteFood } from '../Controllers/userController.js'
import multer  from 'multer'
import Path  from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + Path.extname(file.originalname))
    }
  })
  
  const upload = multer({ storage: storage })

const router = express.Router();

router.route('/favorite-food').get(getFavoriteFood)
router.route('/favorite-food').post(postFavoriteFood)
router.route('/signup').post(signUp);
router.route('/signup/verify').post(verifyOtp);
router.route('/profile/update').post(upload.single('avatar'),updateProfile);


export default router;