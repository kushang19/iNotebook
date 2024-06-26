const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "Kushangisagoodb$oy";
const User = require('../models/User');
const fetchuser = require('../middleware/fetchuser')


// ROUTE 1 : POST '/api/auth/createuser' . No Login required
router.post('/createuser',[
    body('email','Invalid email sent').isEmail(),
    body('name','Invalid name sent').isLength({ min: 3 }),
    body('password','Password must be atleast 5 char').isLength({ min: 5 }),
    ],
   async (req,res) => {
    let success = false;
    // If there are errors, return Bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

    // Check whether the user with this email exists already
    try {        
     let user = await User.findOne({email: req.body.email});

     if(user){
        return res.status(400).json({success, error: "Sorry a user with this email already exists"})
     }

     const salt = await bcrypt.genSaltSync(10);
     const secPass = await bcrypt.hash(req.body.password, salt);

     user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        const data = {
            user:{
                id: user.id
            }
        }

    const authtoken = jwt.sign(data, JWT_SECRET)
        console.log(authtoken);

    // res.json(user)
    res.json({success:true ,authtoken})
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error") 
    }
})


// ------------------------------------------------------------------------------------------------------

// ROUTE 2: POST '/api/auth/login' . No Login required
router.post('/login',[
    body('email','Invalid email sent').isEmail(),
    body('password','Password cannot be blank').exists(),
    ],
   async (req,res) => {
    let success = false

    // If there are errors, return Bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const {email,password} = req.body;
        
        try {
            let user = await User.findOne({email});
            if(!user){
                return res.status(400).json({success: false, errors: "Please enter correct credentialsss" });
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if(!passwordCompare){
                return res.status(400).json({success: false,errors: "Please enter correct credentialss" });
            }

            const data = {
                user:{
                    id: user.id
                }
            }
    
        const authtoken = jwt.sign(data, JWT_SECRET)
        res.json({success: true,authtoken})
        } 

        catch (error){
            console.error(error.message);
            res.status(500).send("Internal Server Error"); 
        }
    })

// ------------------------------------------------------------------------------------------------------

// ROUTE 3: POST '/api/auth/getuser' .Login required

router.post('/getuser', fetchuser ,async (req,res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")

        res.send(user)
    } 
    catch (error){
        console.error(error.message);
        res.status(500).send("Internal Server Error"); 
    }
   })

module.exports = router 