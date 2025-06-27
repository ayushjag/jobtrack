import express from 'express';
import { createJob,getJobs,updateJob,deleteJob} from '../controllers/jobController.js';

const jobrouter = express.Router();

jobrouter.post('/', createJob);
jobrouter.get('/', getJobs);
jobrouter.put('/:id', updateJob);
jobrouter.delete('/:id', deleteJob);

export default jobrouter;
