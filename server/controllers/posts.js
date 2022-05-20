import tender from "../models/tender.js";
import mongoose from 'mongoose'
const getPosts = async (req, res) => {
    try {
        const postTenders = await tender.find()
      let date= new Date( postTenders[9].bidOpenOn)
      date=`${date.getDate}/${date.getMonth}/${date.getFullYear}`
        const minimalData = {
            tenderNo: postTenders[9].number,
            tenderTitel:postTenders[9].title,
            openAt:postTenders[9].bidOpenOn,
            closeAt:postTenders[9].closingDate,
            status:false
        }
        console.log(minimalData)
        res.status(200).json(postTenders)
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}


const createPost = async (req, res) => {
    const body = req.body
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
    const {
        title,
        description,
        number,
        type,
        catagory,
        lotNo,
        minPrice,
        creator,
        publishedDate,
        closingDateate,
        bidOpenOnate,
        participationFee,
        bidSecurityAmount,
        termsAndConditions,
        applicants
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = {
        title,
        description,
        number,
        type,
        catagory,
        lotNo,
        minPrice,
        creator,
        publishedDate,
        closingDateate,
        bidOpenOnate,
        participationFee,
        bidSecurityAmount,
        termsAndConditions,
    };

    await tender.findByIdAndUpdate(id, updatedPost, {
        new: true
    });


    res.json(updatedPost);
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



export {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
}