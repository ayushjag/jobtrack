import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  jobTitle: {
    type: String,
    required: [true, 'Job title is required']
  },
  company: {
    type: String,
    required: [true, 'Company name is required']
  },
  applicationDate: {
    type: Date,
    required: [true, 'Application date is required']
  },
  status: {
    type: String,
    enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
    default: 'Applied'
  },
  notes: {
    type: String,
    default: ''
  }
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);
export default Job;
