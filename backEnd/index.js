import express from "express"
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRouter.js'
import 'dotenv/config'


const app = express()
const port  = process.env.PORT;

// Global Middleware.
app.use(express.json()) 


app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);




app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
    
})