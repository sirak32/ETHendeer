import mongoose from 'mongoose'
const notificationSchema = mongoose.Schema({
    title: String,
    body: String,
    date: {
        type: Date,
        default: Date.now
    }

})
const notification = mongoose.model('Notification', notificationSchema)
export {
    notification
}