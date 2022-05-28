import express from "express";
import { createPost,getPost,getPosts,deletePost,updatePost, createAppliedTender,getAppliedTenders } from "../controllers/posts.js";
const router = express.Router()
router.get('/all', getPosts);
router.post('/', createPost);
router.get('/:id', getPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.post('/applied-tenders',createAppliedTender)
router.get('/',getAppliedTenders)
export default router
