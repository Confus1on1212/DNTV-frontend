
import CustomPlayBtn from "../components/CustomPlayBtn.jsx";
import { Link } from 'react-router-dom'

export default function CarouselCard({cover, displayTitle, description, finalUrl, linkState}) {
    return (
        <div className="carousel-card-content" style={{ backgroundImage: `url("http://2.tcp.eu.ngrok.io:11408/uploads/covers/${cover}")` }}>
            <div className="overlay" >
                <div className="container carousel-text-container">
                    <h1 className="carousel-title">{displayTitle}</h1>
                    <p className="carousel-description">{description}</p>
                    <Link to={finalUrl} state={linkState} className="text-decoration-none">
                        <CustomPlayBtn size="large"/>
                    </Link>
                </div>
            </div>
            
        </div>
    )
}