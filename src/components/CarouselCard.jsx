import Btn from './Btn'
import { Link } from 'react-router-dom'

export default function CarouselCard({cover, displayTitle, description, finalUrl, linkState}) {
    return (
        <div className="carousel-card-content" style={{ backgroundImage: `url("http://192.168.9.105:4000/uploads/covers/${cover}")` }}>
            <div className="overlay">
                <div className="container text-start">
                    <h1 className="display-4 fw-bold mb-3">{displayTitle}</h1>
                    <p className="lead mb-4">{description}</p>
                    <Link to={finalUrl} state={linkState}>
                        <Btn btnClass={"btn btn-custom-yellow"} content={"Play"} />
                    </Link>
                </div>
            </div>
        </div>
    )
}