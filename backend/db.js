
const mongoose = require('mongoose')

const connectDB = async () => {
    // try{
    const connection = await mongoose.connect(process.env.Mongodb, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.log(`MongoDB Connected: ${connection.connection.host}`)
}
// catch(e){
//     console.log(e);
// }
// }

module.exports = connectDB