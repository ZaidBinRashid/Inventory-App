import express from "express"
import productRoutes from './routes/productRoutes.js';
import 'dotenv/config'
import cors from 'cors'

const app = express()
const port  = process.env.PORT;

// Global Middleware.
app.use(express.json()) 
app.use(cors())

app.use('/api/product', productRoutes);



app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
    
})