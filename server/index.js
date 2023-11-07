const express = require("express");
const app = express();

// const https = require('https');
// const fs = require('fs');
// const http = require('http');


const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const courseRoutes = require("./routes/Course");
const paymentRoutes= require("./routes/Payments");
const contactRoute = require("./routes/Contact")

const dbConnect = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const cloudinaryConnect = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

// connect database
dbConnect();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin : ['http://localhost:3000', 'http://192.168.1.104:3000', 'https://studynotionacademy.netlify.app'],
    credentials : true
}));

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : "/tmp/"
}));

// cloudinary connect 
cloudinaryConnect();

// routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactRoute);

// default route
app.get('/', (req,res) => {
    return res.json({
        success : true,
        message : "Your server is up and running..."
    });
});


// const options = {
//     key: fs.readFileSync('./ssl_keys/key.pem'),
//     cert: fs.readFileSync('./ssl_keys/cert.pem'),
//   };
  
//   app.use((req, res, next) => {
//       if (req.protocol === 'http') {
//         res.redirect(`https://${req.get('host')}${req.url}`);
//       } else {
//         next();
//       }
//     });
  
//   https.createServer(options, app).listen(4000,"192.168.1.104", () => {
//       console.log('HTTPS server is running on port 4000');
//   });
    
// http.createServer(app).listen(80,"192.168.1.104", () => {
//       console.log('HTTP server is running on port 80 (for redirection)');
//   });

app.listen(PORT,  () => {
    console.log(`APP is running at ${PORT}`);
});