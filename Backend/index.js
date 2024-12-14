import express from 'express'; 
import { connectToMongoDb } from './src/config/connectToMongoDB.js';
import userRouter from './src/feature/User/user.Routes.js';
import bodyParser from 'body-parser';
import cors from 'cors'; // Import cors
import taskRouter from './src/feature/Task/task.Routes.js';

const port = 3100;
const server = express();

// Enable CORS
server.use(cors({
    origin: 'http://localhost:3000', // Allow requests only from this frontend origin
    methods: ['GET', 'POST'], // Allow only specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
}));

server.use(bodyParser.json());

// Routers
server.use('/api/user/', userRouter);
server.use('/api/task/', taskRouter)

server.get("/", (req, res) => {
    res.send("Hello World");
});

server.listen(port, () => {
    console.log("The server is running on " + port);
    connectToMongoDb();
});
