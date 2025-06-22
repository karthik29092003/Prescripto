import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

//app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

//middlewares
app.use(express.json())

// CORS configuration:
// Set these in Render (or your host) environment:
//   FRONTEND_URL=https://your-frontend.onrender.com
//   ADMIN_URL=https://your-admin.onrender.com
//   DOCTOR_URL=https://your-doctor-ui.onrender.com  (if separate)
// Or list them directly here if you know them:
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL,
  process.env.DOCTOR_URL
].filter(Boolean)

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (e.g., curl, Postman)
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    }
    return callback(new Error('CORS policy does not allow access from this origin'), false)
  },
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  credentials: true,
}))

//api endpoints
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)

app.get('/', (req, res) => {
  res.send('API WORKING')
})

app.listen(port, () => console.log("Server Started", port))
