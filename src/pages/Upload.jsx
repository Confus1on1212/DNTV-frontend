import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AdminHeader from "../components/AdminHeader.jsx";
import { whoami, logout } from "../api/user.js";
import Btn from '../components/Btn.jsx'

export default function Upload() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadType, setUploadType] = useState('movie');

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        studio: '',
        imdb_rating: '',
        pg_rating: '',
        quality: '',
        cover_file: null, 
        video_file: null
    });

    const isAdmin = user?.role === 1;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files.length > 0) {
            setFormData(prev => ({ ...prev, [name]: files[0] }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
    
        try {
            const dataToSend = new FormData();
    
            // COMMON FIELDS (backend expects these exact names)
            dataToSend.append("title", formData.title);
            dataToSend.append("desc", formData.description);
            dataToSend.append("studio", formData.studio);
            dataToSend.append("imdb", formData.imdb_rating);
            dataToSend.append("pg", formData.pg_rating);
            dataToSend.append("quality", formData.quality);
    
            // =========================
            // COVER (BOTH MOVIE + SHOW)
            // =========================
            if (formData.cover_file) {
                dataToSend.append("cover", formData.cover_file);
            }
    
            // =========================
            // SHOW UPLOAD
            // =========================
            if (uploadType === "show") {
                dataToSend.append("season", 1);
    
                console.log("Uploading SHOW...");
    
                if (formData.video_file) {
                    dataToSend.append("episodes", formData.video_file);
                }
    
                const res = await fetch("/videos/postShow", {
                    method: "POST",
                    credentials: "include",
                    body: dataToSend,
                });
    
                const data = await res.json();
    
                if (!res.ok) throw new Error(data?.error || "Show upload failed");
    
                toast.success("Show uploaded successfully!");
            }
    
            // =========================
            // MOVIE UPLOAD
            // =========================
            else {
                console.log("Uploading MOVIE...");
    
                if (formData.video_file) {
                    dataToSend.append("movie", formData.video_file);
                }
    
                const res = await fetch("/videos/postMovie", {
                    method: "POST",
                    credentials: "include",
                    body: dataToSend,
                });
    
                const data = await res.json();
    
                if (!res.ok) throw new Error(data?.error || "Movie upload failed");
    
                toast.success("Movie uploaded successfully!");
            }
    
            // RESET FORM
            setFormData({
                title: "",
                description: "",
                studio: "",
                imdb_rating: "",
                pg_rating: "",
                quality: "",
                cover_file: null,
                video_file: null
            });
    
        } catch (err) {
            console.error(err);
            toast.error(err.message || "Upload failed");
        }
    
        setIsSubmitting(false);
    };

    useEffect(() => {
        async function checkSession() {
            try {
                const data = await whoami();
                if (data && !data.error) {
                    setUser(data);
                    if (data.role !== 1) {
                        toast.error("You do not have permission to view this page.", {
                            onClose: () => navigate('/')
                        });
                    }
                } else {
                    toast.error("You are not logged in.", {
                        onClose: () => navigate('/')
                    });
                }
            } catch (err) {
                console.error("Auth check failed", err);
                toast.error("An error occurred during authentication.", {
                    onClose: () => navigate('/')
                });
            }
        }
        checkSession();
    }, [navigate]);

    async function onLogout() {
        try {
            await logout();
            toast.success("Successfully logged out!");
            setUser(null);
            navigate('/');
        } catch (error) {
            toast.error("Error during logout.");
        }
    }

    if (!user) {
        return (
            <div className="vh-100 d-flex justify-content-center align-items-center bg-dark">
                <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <ToastContainer position="top-center" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick={true} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
            </div>
        );
    }

    return (
        <div className="min-vh-100">
            <AdminHeader user={user} onLogOut={onLogout} />

            {isAdmin &&
                <div className="container py-4">
                    <div className="row justify-content-center">
                        <div className="col-md-8 col-lg-7">
                            <div className="p-4 p-md-4 blurry-light rounded shadow-lg">
                                <h1 className="text-custom-yellow fw-bold text-uppercase text-center mb-4">Upload Content</h1>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label text-custom-yellow fw-bold small text-uppercase">Content Type</label>
                                        <select className="form-select blurry-light border-0 text-dark" value={uploadType} onChange={(e) => setUploadType(e.target.value)}>
                                            <option value="movie">Movie</option>
                                            <option value="show">Show</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label text-custom-yellow fw-bold small text-uppercase">Title</label>
                                        <input type="text" name="title" className="form-control blurry-light border-0 text-dark" placeholder="e.g., The Matrix" value={formData.title} onChange={handleInputChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label text-custom-yellow fw-bold small text-uppercase">Description</label>
                                        <textarea name="description" className="form-control blurry-light border-0 text-dark" rows="4" placeholder="A brief summary of the content..." value={formData.description} onChange={handleInputChange} required></textarea>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label text-custom-yellow fw-bold small text-uppercase">Studio</label>
                                            <input type="text" name="studio" className="form-control blurry-light border-0 text-dark" placeholder="e.g., Warner Bros." value={formData.studio} onChange={handleInputChange} />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label text-custom-yellow fw-bold small text-uppercase">IMDb Rating</label>
                                            <input type="text" name="imdb_rating" className="form-control blurry-light border-0 text-dark" placeholder="e.g., 8.7" value={formData.imdb_rating} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label text-custom-yellow fw-bold small text-uppercase">PG Rating</label>
                                            <input type="text" name="pg_rating" className="form-control blurry-light border-0 text-dark" placeholder="e.g., PG-13" value={formData.pg_rating} onChange={handleInputChange} />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label text-custom-yellow fw-bold small text-uppercase">Quality</label>
                                            <input type="text" name="quality" className="form-control blurry-light border-0 text-dark" placeholder="e.g., 1080p" value={formData.quality} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    
                                    {/* --- Corrected File Inputs --- */}
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label text-custom-yellow fw-bold small text-uppercase">COVER IMAGE</label>
                                            <input type="file" name="cover_file" className="form-control blurry-light border-0 text-dark" onChange={handleFileChange} accept="image/*" />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label text-custom-yellow fw-bold small text-uppercase">VIDEO FILE</label>
                                            <input type="file" name="video_file" className="form-control blurry-light border-0 text-dark" onChange={handleFileChange} accept="video/mp4,video/x-m4v,video/*" />
                                        </div>
                                    </div>

                                    <div className="d-grid mt-4">
                                        <Btn btnClass={'btn btn-custom-yellow py-2 fw-bold'} content={'UPLOAD CONTENT'} type="submit" disabled={isSubmitting} />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <ToastContainer position="bottom-right" autoClose={2500} hideProgressBar={false} newestOnTop={false} closeOnClick={true} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
        </div>
    );
}