import { Link } from 'react-router';

export default function Help() {
    const helpCategories = [
        { title: "Setting Up DNTV", content: "To get started, create an account and log in. You can access your profile settings to manage your viewing preferences." },
        { title: "Ads in DNTV", content: "As this is a student project, we do not run real commercial ads. Any advertisements seen are for UI demonstration only." },
        { title: "Restrictions & Parental Controls", content: "Content ratings are displayed on movie cards. You can set age restrictions in your account settings." },
        { title: "Playback Issues & Troubleshooting", content: "If a video doesn't load, try refreshing your browser or checking your internet connection." },
        { title: "Legal Policies, Notices and Reports", content: "Please refer to our Terms and Policies page for full legal information regarding this project." }
    ];

    return (
        <div className="container py-5 mt-2">
            <div className="text-center mb-5">
                <div className="mb-3 hover d-inline-block">
                    <Link to="/" className="user-select-none text-decoration-none text-custom-yellow fw-bolder text-uppercase fs-4">
                        DNTV
                    </Link>
                </div>
                <h1 className="text-dark fw-bold text-uppercase">Help Center</h1>
                <p className="text-custom-blue">Find answers to your questions</p>
            </div>

            <div className="row justify-content-center">
                <div className="col-lg-10 col-xl-9">
                    <div className="help-accordion">
                        {helpCategories.map((item, index) => (
                            <details key={index} className="mb-2 shadow-sm">
                                <summary className="p-3 blurry-dark text-white fw-bold d-flex justify-content-between align-items-center rounded user-select-none">
                                    {item.title}
                                    <span className="text-custom-yellow">▼</span>
                                </summary>
                                <div className="p-4 blurry-light text-dark rounded-bottom mt-1 border-start border-custom-yellow border-4">
                                    {item.content}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </div>

            <div className="text-center mt-5">
                <p className="text-muted small">Didn't find what you were looking for?</p>
                <Link to="/feedback" className="btn btn-outline-custom-yellow    fw-bold px-4">
                    CONTACT SUPPORT
                </Link>
            </div>
        </div>
    );
}