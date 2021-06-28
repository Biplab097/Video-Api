const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// create storage engine
const storage = new GridFsStorage({
  url: process.env.ATLAS_URI,
  file: (req, file) => {
      return new Promise((resolve, reject) => {
          crypto.randomBytes(16, (err, buf) => {
              if (err) {
                  return reject(err);
              }
              const filename = buf.toString('hex') + path.extname(file.originalname);
              const fileInfo = {
                  filename: filename,
                  bucketName: 'uploads'
              };
              resolve(fileInfo);
          });
      });
  }
});

// create video storage engine


// var bodyParser = require('body-parser');            
// app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true,parameterLimit:50000}));
// app.use(express.json());

const imageRouter = require('./routes/images');
const videoRouter = require('./routes/videos');
const upload = multer({ storage });
app.use('/', imageRouter(upload));
// app.use('/videos',videoRouter());
app.use("/videos",require('./routes/videos'))


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});