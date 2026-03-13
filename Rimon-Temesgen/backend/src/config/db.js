import mongoose from 'mongoose'

// This file is only for connecting the backend to MongoDB.
const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('MongoDB connected')
  } catch (error) {
    console.error('Database connection failed:', error.message)
    process.exit(1)
  }
}

export default connectDatabase
