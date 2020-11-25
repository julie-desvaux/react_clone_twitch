import { useState, useEffect } from 'react';
import api from '../../api';
import { Link, useParams } from 'react-router-dom';

export default function Results() {

    let { slug } = useParams();
    let cleanSearch = slug.replace(/ /g,'');
    const [result, setResult] = useState(true);
    const [streamerInfo, setStreamerInfo] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get(`https://api.twitch.tv/helix/users?login=${cleanSearch}`);
            setStreamerInfo(result.data.data);
        }
        fetchData()
    }, [cleanSearch])

    return (
            <div className="containerDecaleResult">
                <h3>Résultats de la recherche</h3>
                {streamerInfo.map((stream, index) => (
                    <div className="cardResult" key={index}>
                        <img src={stream.profile_image_url} alt={stream.display_name} className="imgCard"/>
                        <div className="cardBodyResult">
                            <h5 className="titleCardResult">{stream.display_name}</h5>
                            <div className="txtResult">
                                {stream.description}
                            </div>
                            <Link
                                className="link"
                                to={{
                                    pathname: `/live/${stream.login}`
                                }}
                            >
                                <div className="btnCard">Regarder {stream.display_name}</div>
                            </Link>
                        </div>
                    </div>

                ))}
            </div>
    )
}
