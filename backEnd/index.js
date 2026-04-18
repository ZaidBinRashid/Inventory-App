import express from "express"
import userRoutes from './routes/userRoutes.js';
import 'dotenv/config'
import cors from 'cors'

const app = express()
const port  = process.env.PORT;

// Global Middleware.
app.use(express.json()) 
app.use(cors())

app.use('/api/user', userRoutes);



app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
    
})