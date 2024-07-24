
// projectAssignmentModel.js
const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    studentId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Student', 
        required: true 
    },
    projectId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Project', 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['Pending', 'Approved', 'Rejected'], 
        default: 'Pending' 
    },
    appliedAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('studentapplication', applicationSchema);
