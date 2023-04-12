const express = require('express');

const productRoute=require('./Routes/product')
const userRoute = require('./Routes/user')

const app = express();
//allow node to read JSON format 
app.use(express.json())
//initialisation of DB
require('./configDB/connect.js')


//http://127.0.0.1:3000/product/....
app.use('/product',productRoute)
app.use('/user',userRoute)



app.use('/getImg', express.static("./uploads"))











app.listen(3000, () => {

    console.log('hello from server');

})