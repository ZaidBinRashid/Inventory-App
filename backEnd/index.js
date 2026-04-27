import express from "express"
import productRoutes from './routes/productRoutes.js';
import 'dotenv/config'


const app = express()
const port  = process.env.PORT;

// Global Middleware.
app.use(express.json()) 


app.use('/api/products', productRoutes);



app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
    
})