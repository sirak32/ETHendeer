import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import route from "./routes/posts.js";
import userRoute from "./routes/users.js";
import passport from "passport";
import middlewaree from "./middleware/passport.js";
import "dotenv/config";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import Grid from "gridfs-stream";
import path from "path";
import crypto from "crypto";
import methodOverride from "method-override";

// const fs=require('fs')
const app = express();
app.use(cors());
app.use(methodOverride("_method"));
middlewaree(passport);
app.use(passport.initialize());
app.use(
  bodyParser.json({
    limit: "30mb",
    extended: "true",
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "30mb",
    extended: "true",
  })
);

const CONNECTIONI_URL = process.env.DB;
const port = process.env.PORT || 5001;
const conn = mongoose
  .connect(CONNECTIONI_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(port, () =>
      console.log(`MongoDb conncted and listening successfully at port ${port}`)
    )
  )
  .catch((error) => console.log(error.message));
let gfs,gridfsBucket;
const db = mongoose.connection;
db.once("open", () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(db.db, {
        bucketName: 'uploads'
      });
  gfs = Grid(db.db, mongoose.mongo);
  gfs.collection("uploads");
});

////engines

const storage = new GridFsStorage({
  url: CONNECTIONI_URL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });
app.post("/upload", upload.single("doc"), (req, res) => {
//   res.redirect("/");
  res.json(req.file.filename)
  console.log("here from upload");
  //  res.json({file:req.file}).redirect('/')
//   res.json({"name":req.file.filename})
  console.log("here after upload");
});
// @route GET /
// @desc Loads form
app.get("/files", (req, res) => {
    
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      res.render("index", { files: false });
    } else {
      files.map((file) => {
        if (
          file.contentType === "image/jpeg" ||
          file.contentType === "image/png"
        ) {
          file.isImage = true;
        } else {
          file.isImage = false;
        }
      });
      res.json(files);
    }
  });
});
app.get("/files/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists",
      });
    }
    // File exists
    return res.json(file);
  });
});

app.get("/image/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists",
      });
    }

    // Check if image
    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
      // Read output to browser
    } 
    
    else {
        // res.status(404).json({
        //     err: "Not an image",
        // });
    }
    const readStream = gridfsBucket.openDownloadStream(file._id);
    readStream.pipe(res);
  });
});
app.use("/tenders", route);
app.use("/", userRoute);
app.get("/complete",(req,res)=>{
  console.log(req.query.Status,req.query.MerchantOrderId)
  res.status(200).send('<h1>Successfull Payment<script>;window.location.replace("http://localhost:3000")</script></h1>')
})
// app.use('/applied')

// let buff = new Buffer.from(data, 'base64');
// // fs.writeFileSync('print.pdf', buff);
// console.log('Base64 image data converted to file: stack-abuse-logo-out.png');
