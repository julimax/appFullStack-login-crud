import mongoose from 'mongoose';

mongoose.set('strictQuery', true); // modo estricto (campos solo pre configurados)
export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost/appfullstack')
        console.log('db connected')
    } catch (err) {
        console.log(err)
    }

}