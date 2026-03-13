import cors from 'cors'
import express from 'express'
import beneficiaryRoutes from './routes/beneficiaryRoutes.js'

const app = express()

// These middlewares allow the frontend to send JSON to the backend.
app.use(cors())
app.use(express.json())

app.get('/', (_req, res) => {
  res.json({ message: 'Backend is running' })
})

app.use('/api/beneficiaries', beneficiaryRoutes)

export default app
