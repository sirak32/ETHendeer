import express from "express";
import { createPost,getPost,getPosts,deletePost,updatePost, createAppliedTender,getAppliedTenders, getApplyStat } from "../controllers/posts.js";
const router = express.Router()
router.get('/all', getPosts);
router.post('/', createPost);
router.get('/:id', getPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.post('/applied-tenders',createAppliedTender)
router.get('/',getAppliedTenders)
// router.get('/applystat',getApplyStat)
// router.get('/register-stat',getRegisterStat)
export default router
