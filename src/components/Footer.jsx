import { Link } from "react-router";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer mt-auto py-5 bg-black">
            <div className="container-fluid d-flex flex-column align-items-center">
                <div className="mb-3 hover">
                    <Link to="/" className="user-select-none text-decoration-none text-custom-yellow fw-bolder text-uppercase fs-4">
                        DNTV
                    </Link>
                </div>

                <div className="d-flex flex-wrap justify-content-center align-items-center gap-3">
                    <Link to="/termsandpolicies" className="text-custom-blue text-decoration-none small hover-underline">
                        Terms and Privacy Notice
                    </Link>
                    <Link to="/feedback" className="text-custom-blue text-decoration-none small hover-underline">
                        Send us feedback
                    </Link>
                    <Link to="/help" className="text-custom-blue text-decoration-none small hover-underline">
                        Help
                    </Link>
                    
                    <span className="text-secondary small ms-2 user-select-none">
                        © {currentYear}, DNTV.com, Inc.
                    </span>
                </div>

            </div>
        </footer>
    );
}