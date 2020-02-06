// registration route
// this file handles user registrations
const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../sequelize');

const bodyParser = require("body-parser")

router.use(bodyParser.json())
// router.use(bodyParser.urlencoded({extended:false}))

//@route                POST api/users
// @description         Register a user
// @access              public
router.post('/', [
    
    check('name',
    'name is required').not().isEmpty(),

    check('surname',
    'surname is required').not().isEmpty(),

    check('email', 
    'Please type a valid email'
    ).isEmail(),

    check('password',
    'Please enter a password with 6 or more characters'
    ).isLength({min: 6})

], 

async (req,res) => {
    const errors = validationResult(req);
    //checking to see if errors are empty
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    
    const {name, surname, email, password} = req.body;

    try {
        //MYSQL method findOne. looks for whatever specified params
        let user = await User.findOne({ 
            where:{
                email
            }
         });

        if(user){
            return res.status(400).json({msg: 'user exists'});
        }

        user = new User({
            name,
            surname,
            email,
            password
        });

        //using bcryp to hash
        //it returns promise 
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();
        // res.send('user saved');

        // jwt section 
        const payload = {
            user: {
                id: user.id
            }
        }

        // jwt secret needs to be hidden
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 3600
        }, (err, token) => {
            if(err) throw err;
            res.json({ token });
        })
          
        

    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
        
    }
    res.send('success')
})

module.exports = router;