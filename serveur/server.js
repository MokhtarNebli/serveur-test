const express = require('express'); 
const app = express();
require('dotenv').config();
app.use(express.json());

//Routes
app.use('/api/person', require('./routes/personRouters'));

//connection to database
const connectDB = require('./config/connectDB');
connectDB();
//SERVER CREATion

const port = process.env.PORT || 5000;
app.listen(port, (err) => 
  err ? console.error(err) : console.log(`server is ruunig on port ${port}`)
 );