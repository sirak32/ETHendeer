import mongoose from "mongoose";
const feedbackNotification = mongoose.Schema({
    description: String,
    date: {
        type: Date,
        default: Date.now
    }
})
const feedback = mongoose.model('Feedback', feedbackNotification)
export {
    feedback
}