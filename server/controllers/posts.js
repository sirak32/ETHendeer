import tender from "../models/tender.js";
import appliedtenders from "../models/appliedTenders.js";

import mongoose from 'mongoose'
import { apply } from "../models/stat.js";
const getPosts = async (req, res) => {
    try {
        const postTenders = await tender.find()
    //   let date= new Date( postTenders[9].bidOpenOn)
    //   date=`${date.getDate}/${date.getMonth}/${date.getFullYear}`
    //     const minimalData = {
    //         tenderNo: postTenders[9].number,
    //         tenderTitel:postTenders[9].title,
    //         openAt:postTenders[9].bidOpenOn,
    //         closeAt:postTenders[9].closingDate,
    //         status:false
    //     }
        // console.log(minimalData)
        res.status(200).json(postTenders)
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}
const getAppliedTenders=async (req,res) =>{
    try {
        const applied=await appliedtenders.find().populate('tender')
        res.status(200).json(applied)
    } catch (error) {
        res.status(404).json({message:error})
    }

}
const createAppliedTender=async (req,res)=>{
    const body = req.body
    const t=body.tender
    let repeat=false
    const tend=await tender.findById(t)
    tend.applicants.map((app)=>{
        console.log(app)
        console.log(body.applier)
        if(app.equals(new mongoose.Types.ObjectId(body.applier)))
        {
            repeat=true
        return;}
        
    })
    if(!repeat){

        tend.applicants=[...tend.applicants,mongoose.Types.ObjectId(body.applier) ]
        await tend.save()
        const applica=tend.applicants
    
        tend.appllicants=[...applica,t.applier]
        tend.save()
        const newApplied=new appliedtenders(body)
        const apl=new apply({})
        try {
           await newApplied.save()
           await apl.save()
            res.status(201).json(tend)

        } catch (error) {
            res.json(error)
        }
    }
    else{
        res.status(404).json({message:"Re-Apply is not allowed"})
    }
    // res.json({message:tend})
}

const createPost = async (req, res) => {
    const body = req.body
    console.log(body)
    // return;
    const newPost = new tender(body)
    try {
        await newPost.save()
        res.status(201).json(newPost)

    } catch (error) {
        res.status(409).json({
            message: error.message
        })

    }
}
const getPost = async (req, res) => {
    const {
        id
    } = req.params;

    try {
        const post = await tender.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}
/*
 const createPost = async (req, res) => {
    const { title,description,number,type,catagory,lotNo,creator,publishedDate,closingDateate,bidOpenOnate,participationFee,bidSecurityAmount,termsAndConditions, } = req.body;

    // const newPostTender = new tender({ title,description,number,type,catagory,lotNo,creator,publishedDate,closingDateate,bidOpenOnate,participationFee,bidSecurityAmount,termsAndConditions, })
    const newPostTender = new tender({ title,description,number,type,catagory,lotNo,creator,publishedDate,closingDateate,bidOpenOnate,participationFee,bidSecurityAmount,termsAndConditions, })

    try {
        await newPostTender.save();

        res.status(201).json(newPostTender );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}*/

const updatePost = async (req, res) => {
    const {
        id
    } = req.params;
    // title: String,
    // description: String,
    // number: String,
    // type: String,
    // creator: String,
    // publishedDate:Date,
    // closingDate: Date,
    // bidOpenOn: Date,
    // termsAndConditions: String,
    // document:String,
    // const {
    //     title,
    //     description,
    //     number,
    //     type,
    //     creator,
    //     closingDate,
    //     bidOpenOnate,
    //     termsAndConditions,
    // } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    // const updatedPost = {
    //     title,
    //     description,
    //     number,
    //     type,
    //     catagory,
    //     lotNo,
    //     minPrice,
    //     creator,
    //     publishedDate,
    //     closingDateate,
    //     bidOpenOnate,
    //     participationFee,
    //     bidSecurityAmount,
    //     termsAndConditions,
    // };

    await tender.findByIdAndUpdate(id, req.body, {
        new: true
    });


    res.send("updated Post");
}

const deletePost = async (req, res) => {
    const {
        id
    } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await tender.findByIdAndRemove(id);

    res.json({
        message: "Tender Post deleted successfully."
    });
}
///// Statistics Data Manipulation
const getApplyStat=async (req,res)=>{
    try {
        
        const applyStat=await apply.find({})
        let logMonthly={
            Sep:0,
            Oct:0,
            Nov:0,
            Dec:0,
            Jan:0,
            Feb:0,
            Mar:0,
            Apr:0,
            May:0,
            Jun:0,
            Jul:0,
            Aug:0,
        }
        let Mon
        applyStat.map((s)=>{
            Mon=new Date(s.date).getMonth()
            switch (Mon) {
              case 0:
                    console.log('inside switch')
                logMonthly = { ...logMonthly, Jan: ++logMonthly.Jan };
                break;
              case 1:
                logMonthly = { ...logMonthly, Feb: ++logMonthly.Feb };

                break;
              case 2:
                logMonthly = { ...logMonthly, Mar: ++logMonthly.Mar };

                break;
              case 3:
                logMonthly = { ...logMonthly, Apr: ++logMonthly.Apr };

                break;
              case 4:
                logMonthly = { ...logMonthly, May: ++logMonthly.May };

                break;
              case 5:
                logMonthly = { ...logMonthly, Jun: ++logMonthly.Jun };

                break;
              case 6:
                logMonthly = { ...logMonthly, Jul: ++logMonthly.Jul };

                break;
              case 7:
                logMonthly = { ...logMonthly, Aug: ++logMonthly.Aug };

                break;
              case 8:
                logMonthly = { ...logMonthly, Sep: ++logMonthly.Sep };

                break;
              case 9:
                logMonthly = { ...logMonthly, Oct: ++logMonthly.Oct };

                break;
              case 10:
                logMonthly = { ...logMonthly, Nov: ++logMonthly.Nov };

                break;
              case 11:
                logMonthly = { ...logMonthly, Dec: ++logMonthly.Dec };
                break;

              default:
                break;
            }
        })
        res.status(200).json(logMonthly)
    } catch (error) {
        res.status(404).json(error)
    }
    
}



export {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    createAppliedTender,
    getAppliedTenders,
    getApplyStat
}