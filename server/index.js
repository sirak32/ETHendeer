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
import tender from "./models/tender.js";
import dotenv from 'dotenv';
import mg from 'mailgun-js';
dotenv.config();


const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMIAN,
  });
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
  res.json(req.file.filename)
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
    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
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
app.get("/complete",async(req,res)=>{
  const tenderId=req.query.MerchantOrderId.split(',')[0]
  const supplierId=req.query.MerchantOrderId.split(',')[1]
  const tend=await tender.findById(tenderId)
  tend.payers=[...tend.payers,mongoose.Types.ObjectId(supplierId)]
  await tend.save()
  console.log(req.query.Status,'tender',tend)
  res.status(200).send('<h1>Successfull Payment<script>;window.location.replace("http://localhost:3000/supplier")</script></h1>')
})
//// EMAIL
app.post('/api/email', (req, res) => {

  const { email, subject, message } = req.body;
  mailgun()
    .messages()
    .send(
      {
        from: 'Sirak Tesfaye <sirak21tesfaye@gmail.com>',
        to: `${email}`,
        subject: `${subject}`,
        html: `<h1>${message}</h1>
        <img src="" alt="Italian Trulli">`,
      },
      (error, body) => {
        if (error) {
          console.log(error);
          res.status(500).send({ message: 'Error in sending email' });
        } else {
          res.send({ message: 'Email sent successfully' });
        }
      }
    );
});

