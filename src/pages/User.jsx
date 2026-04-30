import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from "../components/Header.jsx"; // Vagy a megfelelő Header komponens
import { whoami, logout, updateUser } from "../api/user.js"; // Feltételezzük, hogy az updateUser létezik az api-ban
import Btn from '../components/Btn.jsx';

export default function User() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [initialUserData, setInitialUserData] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        email: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDirty, setIsDirty] = useState(false);

    // Adatok betöltése
    useEffect(() => {
        async function checkSession() {
            try {
                setIsLoading(true);
                const data = await whoami();
                if (data && !data.error) {
                    setUser(data);
                    setFormData({ username: data.username, email: data.email });
                    setInitialUserData({ username: data.username, email: data.email }); // Eredeti adatok mentése
                } else {
                    toast.error("You are not logged in.", {
                        onClose: () => navigate('/login')
                    });
                }
            } catch (err) {
                console.error("Auth check failed", err);
                toast.error("An error occurred during authentication.", {
                    onClose: () => navigate('/')
                });
            } finally {
                setIsLoading(false);
            }
        }
        checkSession();
    }, [navigate]);

    useEffect(() => {
        if (!initialUserData) return;
        const hasChanged = formData.username !== initialUserData.username || formData.email !== initialUserData.email;
        setIsDirty(hasChanged);
    }, [formData, initialUserData]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isDirty) {
            toast.info("No changes to save.");
            return;
        }

        setIsSubmitting(true);
        try {
            const updatedData = await updateUser(formData); // API hívás a frissítésre
            
            // Frissítjük a helyi állapotot a szerverről visszakapott adatokkal
            setUser(updatedData);
            setFormData({ username: updatedData.username, email: updatedData.email });
            setInitialUserData({ username: updatedData.username, email: updatedData.email });

            toast.success("Your settings have been updated successfully!");
        } catch (err) {
            console.error(err);
            toast.error(err.message || "Failed to update settings.");
        } finally {
            setIsSubmitting(false);
        }
    };
    
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

    if (isLoading) {
        return (
            <div className="vh-100 d-flex justify-content-center align-items-center bg-dark">
                <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-vh-100">
            <Header user={user} onLogOut={onLogout} />

            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="p-4 p-md-5 blurry-light rounded shadow-lg">
                            <h1 className="text-custom-yellow fw-bold text-uppercase text-center mb-4">User Settings</h1>
                            <form onSubmit={handleSubmit}>
                                
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label text-custom-yellow fw-bold small text-uppercase">Username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        className="form-control blurry-light border-0 text-dark"
                                        placeholder="e.g., JohnDoe"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                
                                <div className="mb-4">
                                    <label htmlFor="email" className="form-label text-custom-yellow fw-bold small text-uppercase">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control blurry-light border-0 text-dark"
                                        placeholder="e.g., john.doe@example.com"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                               
                                <div className="d-grid mt-4">
                                    <Btn 
                                        btnClass={'btn btn-custom-yellow py-2 fw-bold'} 
                                        content={isSubmitting ? 'SAVING...' : 'SAVE CHANGES'} 
                                        type="submit" 
                                        disabled={isSubmitting || !isDirty} 
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
            <ToastContainer position="bottom-right" autoClose={2500} hideProgressBar={false} newestOnTop={false} closeOnClick={true} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
        </div>
    );
}
