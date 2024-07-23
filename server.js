const express = require('express');
const cors = require('cors');
const cookiesSession = require('cookie-session');

const app =  express();

var corsOptions = {
    origin:true,
    Credential:true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(
    cookiesSession({
        name:'e-com',
        keys:['COOKIES_SECRET'],
        httpOnly:true
    })
);

const db = require("./app/models");
const dbConfig = require('./app/config/db.config')


db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    //initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


  const routes = require('./app/routes/index')
  app.use('/api',routes)

app.get('/',(req,res)=>{
    res.json({message:'Welcome'})
});

const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})