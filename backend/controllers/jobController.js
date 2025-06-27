import Job from '../models/Job.js';

export const createJob = async (req, res) => {
  const { jobTitle, company, applicationDate, status, notes } = req.body;

  if (!jobTitle || !company || !applicationDate) {
    return res.status(400).json({ message: 'Please fill all required fields' });
  }

  try {
    const newJob = await Job.create({
      user: req.user._id,
      jobTitle,
      company,
      applicationDate,
      status,
      notes
    });

    res.status(201).json(newJob);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create job', error: err.message });
  }
};


export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch jobs', error: err.message });
  }
};


export const updateJob = async (req, res) => {
  const { jobTitle, company, applicationDate, status, notes } = req.body;

  try {
    const job = await Job.findOne({ _id: req.params.id, user: req.user._id });

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    job.jobTitle = jobTitle || job.jobTitle;
    job.company = company || job.company;
    job.applicationDate = applicationDate || job.applicationDate;
    job.status = status || job.status;
    job.notes = notes || job.notes;

    const updatedJob = await job.save();
    res.json(updatedJob);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update job', error: err.message });
  }
};


export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!job) {
      return res.status(404).json({ message: 'Job not found or unauthorized' });
    }

    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete job', error: err.message });
  }
};
