import { generateToken } from "../lib/utils.js"
import { User } from "../models/user.js"


// signup a new user
export const signup = async (req, res) => {
    const {fullName, email, password, bio} = req.body

    try {
        if (!fullName || !email || !password || !bio) {
            return res.json({success:false, message: "Missing Details"})
        }

        const user = await User.findOne({email})
         if (user) {
           return res.json({success:false, message: "User already exists"}) 
         }

         const salt = await bcrypt.genSalt(10)
         const handlePassword = await bcrypt.hash(password, salt)

         const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword    ,
            bio
         })

         const token = generateToken(newUser._id)
         return res.json({success:true,userData: newUser, token ,message: "Account created Successfully"}) 

    } catch (error) {
        console.log(error.message);
        
        return res.json({success:false, message: error.message}) 
    }
}


// User Login
export const Login = async (req, res) => {
    const {email, password} = req.body

    try {
        if (!email || !password) {
            return res.json({success:false, message: "Email & Password is required"})
        }

        const userData = await User.findOne({email})

         const isPasswordCorrect = await bcrypt.compare(password, userData.password)
         if (!isPasswordCorrect) {
            return res.json({success:false, message: " Password is incorrect"})
         }

         const token = generateToken(userData._id)
         return res.json({success:true,userData: userData, token ,message: "Logged In Successfully"}) 


    } catch (error) {
        console.log(error.message);
        
        return res.json({success:false, message: error.message}) 
    }
}


// Controller to check if user is Authenticated 
export const checkAuth = (req, res) =>{
    res.json({success:true, user: req.user  }) 

}