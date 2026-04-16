import express from "express"
import userRoutes from './Routes/userRoutes.js';

const app = express()
const port  = 4001;

// Global Middleware.
app.use(express.json()) 

app.use('/api/user', userRoutes);



app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
    
})