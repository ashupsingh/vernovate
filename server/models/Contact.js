import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
    },
    subject: {
        type: String,
        trim: true,
        default: '',
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
    },
    type: {
        type: String,
        enum: ['contact', 'application', 'project'],
        default: 'contact',
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    replies: [{
        message: { type: String, required: true },
        repliedBy: { type: String, default: 'Admin' },
        repliedAt: { type: Date, default: Date.now },
    }],
}, {
    timestamps: true,
});

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;
