import { useState } from 'react';
import { Link } from 'react-router';

import { toast } from 'react-toastify';
import Btn from '../components/Btn';

export default function Feedback() {
    const [formData, setFormData] = useState({
        subject: '',
        category: 'General',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Feedback küldése:", formData);
        toast.success("Thank you for your feedback! Our team will review it.");
        setFormData({ subject: '', category: 'General', message: '' });
    };

    return (
        <div className="container py-5 mt-2">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="text-center mb-4">
                        <div className="mb-3 hover">
                            <Link to="/" className="user-select-none text-decoration-none text-custom-yellow fw-bolder text-uppercase fs-4">
                                DNTV
                            </Link>
                        </div>
                        <h1 className="text-dark fw-bold text-uppercase">Send us Feedback</h1>
                        <p className="text-custom-blue">Help us make DNTV even better!</p>
                        <p className='text-custom-blue mt-3'>Please look trough our <Link className='text-decoration-none text-custom-red' to={"/help"}>FAQs</Link> first!</p>
                    </div>

                    <div className="p-4 p-md-5 blurry-dark rounded shadow-lg">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label text-custom-yellow fw-bold small text-uppercase">Subject</label>
                                <input type="text" className="form-control blurry-light border-0 text-dark"  placeholder="What is this about?" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label text-custom-yellow fw-bold small text-uppercase">Category</label>
                                <select className="form-select blurry-light border-0 text-dark" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                                    <option value="General">General Feedback</option>
                                    <option value="Bug">Report a Bug</option>
                                    <option value="Content">Content Request</option>
                                    <option value="UI">User Interface</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="form-label text-custom-yellow fw-bold small text-uppercase">Your Message</label>
                                <textarea className="form-control blurry-light border-0 text-dark" rows="5" placeholder="Tell us what's on your mind..." value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required></textarea>
                            </div>

                            <div className="d-grid">
                                <Btn btnClass={'btn btn-custom-yellow py-2 fw-bold'} content={'SUBMIT FEEDBACK'} type="submit"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}