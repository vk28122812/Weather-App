const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');
const mongoose = require('mongoose');
const path = require("path");
require('dotenv').config();

const app = express();

app.use(express.json());
app.use("/",express.static(path.join(__dirname,"angular")));
app.use(cors());

app.use('/api', routes);

app.use((req,res,next)=>{
  res.sendFile(path.join(__dirname,"angular","index.html")) 
});
// app.get('/', (req, res) => {
//   res.send('Welcome to weather api !');
// });

const port = process.env.PORT || 3000;

const mongoURI = process.env.mongodb_uri;
mongoose.connect(mongoURI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
}).catch(err => console.log(err));