//default.json file has all the default values which can be reusable

const mongoose= require('mongoose');

//Fetching the config json file
const config= require('config');

//Fetching Object uri from the config file
const db = config.get('mongoURI');

const connectDB = async () => {
    //if we cant connect we need an error so used try block
    try{
        await mongoose.connect(db, {
            //deprectaed warning messages
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('MongoDB connected...');
    } catch(err){
        console.error(err.message);
        //Exit process with failure
        process.exit(1);

    }
}

module.exports = connectDB;