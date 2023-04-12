const express=require('express');
const User = require('../models/User');


const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const router=express.Router();

router.post('/add', (req, res) => {
    data = req.body
    usr = new User(data)
    console.log(data);
    usr.save()
        .then(
            (savedUser) => {
                res.send(savedUser)
            }
        )
        .catch(
            (err) => {
                res.send(err)
            }
        )

})


//second methode of add request ( it should wait thant the creation of usr build then it continue reading code)
router.post('/create', async (req, res) => {
    try {
        data = req.body
        usr = new User(data)
        console.log(data);
        savedUser = await usr.save()
        res.send(savedUser)

    } catch (error) {
        res.send(error)
    }
})

router.post('/createUserCrypted', async (req, res) => {
    try {
        data = req.body
        usr = new User(data)

        salt=bcrypt.genSaltSync(10);
        cryptedPass= await bcrypt.hashSync(data.pwd,salt)
        usr.pwd=cryptedPass
        console.log(usr );
        savedUser = await usr.save()
        res.send(savedUser)

    } catch (error) {
        res.send(error)
    }
})

router.post('/login',async(req,res)=>{
    data=req.body;
    user=await User.findOne({email:data.email});
    if(!user){
        res.status(404).send("invalid email or password")
    }else{
        validPass= bcrypt.compareSync(data.pwd,user.pwd)
        if(!validPass){
            res.status(401).send("invalid email or password")
        }else{
            payload={
                _id:user._id,
                email:user.email,
                fName:user.fName,
            }
            token=jwt.sign(payload,'1234567')

            res.status(200).send({mytoken:token})
        }
    }
})





router.get('/getAll', (req, res) => {
    console.log('here into router.get');
    User.find()
        .then(
            (users) => {
                res.send(users)
            }
        )
        .catch(
            (err) => {
                res.send(err)
            }
        )
})

//second methode of getAll request ( it should wait thant the creation of usr build then it continue reading code)
router.get('/getAllAsync', async (req, res) => {
    try {
        users = await User.find({ age: 22 })
        res.send(users)
    } catch (error) {
        res.send(error)
    }
})

//get by id
router.get('/getById/:id', async (req, res) => {
    myid = req.params.id
    try {
        user = await User.findOne({ _id: myid })
        res.send(user)
    } catch (error) {
        res.send(error)

    }
})


router.put('/update/:id', async (req, res) => {

    try {
        id = req.params.id
        updatedUser = req.body
        usr = await User.findByIdAndUpdate({ _id: id}, updatedUser )
        res.send(usr)
        console.log('user updated succefully');

    } catch (error) {
        res.send(error)
    }
})


router.delete('/deleteById/:id', async (req, res) => {
    id = req.params.id
    try {
        usr = await User.findByIdAndDelete({ _id: id })
        res.send(usr)
    } catch (error) {
        res.send(error)
    }
})

module.exports=router