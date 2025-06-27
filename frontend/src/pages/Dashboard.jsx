import { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({
    jobTitle: '',
    company: '',
    applicationDate: '',
    status: 'Applied',
    notes: ''
  });
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  const authAxios = axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });

  const fetchJobs = async () => {
    try {
      const res = await authAxios.get('/jobs');
      setJobs(res.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await authAxios.put(`/jobs/${editingId}`, form);
        toast.success('Job updated');
      } else {
        await authAxios.post('/jobs', form);
        toast.success('Job added');
      }
      setForm({ jobTitle: '', company: '', applicationDate: '', status: 'Applied', notes: '' });
      setEditingId(null);
      fetchJobs();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save job');
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (!confirmDelete) return;
    try {
      await authAxios.delete(`/jobs/${id}`);
      toast.success('Job deleted');
      fetchJobs();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const handleEdit = (job) => {
    setForm({
      jobTitle: job.jobTitle,
      company: job.company,
      applicationDate: job.applicationDate.slice(0, 10),
      status: job.status,
      notes: job.notes
    });
    setEditingId(job._id);
  };

  const logout = () => {
    localStorage.removeItem('token');
    toast.success("Logged out");
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Top Bar */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">📋 Job Tracker</h1>
          <button
            onClick={logout}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm shadow"
          >
            Logout
          </button>
        </div>

        {/* Job Form */}
        <div className="bg-gray-100 p-6 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-700">
              {editingId ? '✏️ Edit Job Application' : '➕ Add New Job'}
            </h2>
            {editingId && (
              <button
                onClick={() => {
                  setEditingId(null);
                  setForm({ jobTitle: '', company: '', applicationDate: '', status: 'Applied', notes: '' });
                }}
                className="text-sm text-gray-500 hover:underline"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="jobTitle"
                placeholder="Job Title"
                className="border p-3 rounded-lg"
                value={form.jobTitle}
                onChange={handleChange}
                required
              />
              <input
                name="company"
                placeholder="Company"
                className="border p-3 rounded-lg"
                value={form.company}
                onChange={handleChange}
                required
              />
              <input
                type="date"
                name="applicationDate"
                className="border p-3 rounded-lg"
                value={form.applicationDate}
                onChange={handleChange}
                required
              />
              <select
                name="status"
                className="border p-3 rounded-lg"
                value={form.status}
                onChange={handleChange}
              >
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
              </select>
            </div>

            <textarea
              name="notes"
              placeholder="Notes (Optional)"
              className="w-full border p-3 rounded-lg"
              value={form.notes}
              onChange={handleChange}
              rows="3"
            />

            <button
              type="submit"
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold"
            >
              {editingId ? 'Update Job' : 'Add Job'}
            </button>
          </form>
        </div>

        {/* Job List */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-100">📄 Your Applications</h2>
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {job.jobTitle} <span className="text-sm text-gray-500">@ {job.company}</span>
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Applied on: {new Date(job.applicationDate).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex gap-3 text-sm">
                    <button onClick={() => handleEdit(job)} className="text-blue-600 hover:underline">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(job._id)} className="text-purple-500 hover:underline">
                      Delete
                    </button>
                  </div>
                </div>

                {job.notes && (
                  <p className="text-sm text-gray-700 mt-1">
                    <span className="font-semibold">Notes:</span> {job.notes}
                  </p>
                )}

                {/* Status Badge */}
                <span
                  className={`inline-block mt-2 px-2 py-1 text-xs font-medium rounded-full ${
                    job.status === 'Applied'
                      ? 'bg-blue-100 text-blue-700'
                      : job.status === 'Interview'
                      ? 'bg-yellow-100 text-yellow-700'
                      : job.status === 'Offer'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {job.status}
                </span>
              </div>
            ))}
            {jobs.length === 0 && (
              <p className="text-center text-gray-500">No jobs added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
