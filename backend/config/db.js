import mongoose from 'mongoose';

const connectDB = async ()=>{
    mongoose.connection.on('connected',()=>{
        console.log("Connection Established")
    })
    await mongoose.connect(`${process.env.MONGO_URI}/secure`)
}

export default connectDB;