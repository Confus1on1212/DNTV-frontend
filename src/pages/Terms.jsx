import { Link } from 'react-router';

export default function Terms() {
    const currentYear = new Date().getFullYear();

    return (
        <div className="container py-5 mt-2">
            <div className="row mb-5">
                <div className="col-12 text-center">
                    <div className="mb-3 hover">
                        <Link to="/" className="user-select-none text-decoration-none text-custom-yellow fw-bolder text-uppercase fs-4">
                            DNTV
                        </Link>
                    </div>
                    <h1 className="text-dark fw-bold text-uppercase">Terms and Policies</h1>
                    <p className="text-custom-blue small">Last Updated: March 17, 2026</p>
                    <hr className="border-dark opacity-25 w-25 mx-auto" />
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-lg-10 col-xl-8">
                    <section className="mb-5 p-4 rounded blurry-dark shadow-sm">
                        <h3 className="h4 text-custom-red mb-3">1. Educational Disclaimer</h3>
                        <p className="text-white">
                            This website, <span className='text-custom-red fw-bold'>DNTV</span>, is an <span className='text-custom-red fw-bold'>educational project</span> created for academic purposes. 
                            It is not a commercial service. All trademarks and video content appearing on the site 
                            are the property of their respective owners.
                        </p>
                    </section>

                    <section className="mb-5">
                        <h3 className="h4 text-dark mb-3 fw-bold">2. Terms of Use</h3>
                        <p className="text-muted">
                            By accessing or using DNTV, you agree to be bound by these terms:
                        </p>
                        <div className="list-group list-group-flush rounded blurry-light shadow-sm">
                            <div className="list-group-item bg-transparent text-dark border-secondary border-opacity-25">
                                <strong>Account Responsibility:</strong> You are responsible for maintaining the confidentiality of your credentials.
                            </div>
                            <div className="list-group-item bg-transparent text-dark border-secondary border-opacity-25">
                                <strong>Prohibited Conduct:</strong> Users may not attempt to scrape data or bypass security features.
                            </div>
                            <div className="list-group-item bg-transparent text-dark border-0">
                                <strong>Service Availability:</strong> We reserve the right to modify the platform at any time.
                            </div>
                        </div>
                    </section>

                    <section className="mb-5">
                        <h3 className="h4 text-dark mb-3 fw-bold">3. Privacy Policy</h3>
                        <div className="row g-4 mt-1">
                            <div className="col-md-6">
                                <div className="p-4 blurry-dark rounded h-100 text-white shadow-sm">
                                    <h5 className="h6 text-custom-red fw-bold">Data Collection</h5>
                                    <p className="small mb-0 opacity-75">
                                        We only store essential data like your username and an encrypted version of your password.
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="p-4 blurry-light rounded h-100 border-0 shadow-sm">
                                    <h5 className="h6 text-dark fw-bold">Cookies</h5>
                                    <p className="small text-muted mb-0">
                                        We use essential session cookies to keep you logged in. No third-party tracking is used.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="text-center mt-5 py-4 border-top border-dark border-opacity-10">
                        <h3 className="h5 text-dark mb-3">Questions?</h3>
                        <p className="text-custom-blue">
                            Contact us through the 
                            <Link to="/help" className="text-custom-yellow ms-1 text-decoration-none fw-bold">
                                Help Center
                            </Link>.
                        </p>
                        <p className="small text-custom-blue mt-4">
                            © {currentYear} DNTV - Student Project.
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
}