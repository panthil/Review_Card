import otpGenerator from 'otp-generator';
import Jwt from "jsonwebtoken";
import { User } from '../Model/userModel.js';
import { Otp } from '../Model/otpModel.js';




export const signUp = async (req, res) => {
    const OTP = otpGenerator.generate(6, {
        digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false
    })

    const phone = req.body.phone
    console.log(OTP)
    const otp = new Otp({ phone: phone, otp: OTP })
    const result = await otp.save();
    return res.send('Otp send Successfully')
}




export const verifyOtp = async (req, res) => {
    const { otp, phone } = req.body
    Otp.findOne({ otp: otp, phone: phone }).then((user) => {
        if (user) {
            const { phone } = user
            const token = Jwt.sign({
                _id: user._id,
                phone: user.phone
            }, process.env.SECRET_KEY);
            User.findOne({ "userData.phone": phone }).then((user1) => {

                if (user1) {
                    return res.send({
                        message: "User already Exist",
                        data: user1.userData,
                        token: user1.token
                    })

                }
                if (!user1) {
                    const userData = new User({
                        userData: {
                            phone: phone
                        },
                        token: token
                    })
                    userData.save().then(() => {
                        res.send({
                            message: "User Created Successfully",
                            data: userData.userData,
                            token: token

                        })
                    })
                }
            })
        }
    })

}

export const updateProfile = async (req, res) => {
    const { firstName, lastName, gender, phone, dob, area, city, state, country, pincode } = req.body;
    const fileName =`${process.cwd()}/assets/avatar/${req.file.filename}`;
    const result = await User.updateMany({ "userData.phone": phone }, {
        $set: {
            userData:{
            image:fileName,
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            DOB: dob,
            phone:phone,
            area: area,
            city: city,
            state: state,
            country: country,
            pincode: pincode
            }
        }
    });

    if (result) {
        res.send({
            message: "Data Updated Sucessuffully",
            Data: result,
            meta: {
                status: 201,
                message: "ok"
            }
        })
    }else{
        res.send("Data Not Aded")
    }
}

export const getFavoriteFood =async (req,res)=>{
    res.send({
        data:{
            type:["veg","non-veg","both"],
            cuisine:[
                "indian Cuisine",
                "Chainese Cuisine",
                "japanese Cuisine",
                "maxican cuisin",
                "panjabi cuisine",
                "gujrati cuisine",
                "north indian cuisine",
                "south indian cuisine",

            ],
            fastFood:["yes","no"],
            favoriteFood:"",
            famousFoodArea:"",
            famousFoodCity:""
        },
        message:{
            status:"ok",
            statusCode:200
        }
    })
}

export const postFavoriteFood = async (req,res)=>{
    const {phone,type,cuisine,fastFood,favoriteFood,famousFoodArea,famousFoodCity} = req.body;
    const foodData = await User.findOne({"userData.phone": phone })

    const result = await User.updateMany({ "userData.phone": phone }, {
        $set: {
            favoriteFood:{
            type,cuisine,fastFood,favoriteFood,famousFoodArea,famousFoodCity
            }
        }
    });

    if (result) {
        res.send({
            message: "Data Updated Sucessuffully",
            Data: result,
            meta: {
                status: 201,
                message: "ok"
            }
        })
    }else{
        res.send("Data Not Aded")
    }
}


