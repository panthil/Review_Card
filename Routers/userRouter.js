import express from 'express';
import { signUp,verifyOtp,updateProfile,getFavoriteFood,postFavoriteFood } from '../Controllers/userController.js'
import {foodReview} from '../Controllers/foodController.js'
import {yourReview,lastMonthReview,lastYearReview} from '../Controllers/yourReview.js'
import {restorentReview} from '../Controllers/restorentController.js'
import { areaRestorent,areaFood,cityRestorent,cityFood,nearRestorent,nearFood,foodImage } from '../Controllers/Dashboard.js';
import {avatar,food} from '../configuration/multer.js'


const router = express.Router();

router.route('/favorite-food').get(getFavoriteFood)
router.route('/favorite-food').post(postFavoriteFood)
router.route('/signup').post(signUp);
router.route('/signup/verify').post(verifyOtp);
router.route('/profile/update').post(avatar.single('avatar'),updateProfile);
router.route('/foodReview').post(food,foodReview)
router.route('/restorentReview').post(restorentReview)
router.route('/dashboard/areaRestorent').post(areaRestorent)
router.route('/dashboard/areaFood').post(areaFood)
router.route('/dashboard/cityRestorent').post(cityRestorent)
router.route('/dashboard/cityFood').post(cityFood)
router.route('/dashboard/nearRestorent').post(nearRestorent)
router.route('/dashboard/nearFood').post(nearFood)
router.route('/dashboard/foodImage').post(foodImage)
router.route('/review/yourReview').post(yourReview)
router.route('/review/lastMonthReview').post(lastMonthReview)
router.route('/review/lastYearReview').post(lastYearReview)


export default router;