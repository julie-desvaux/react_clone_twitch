import { useState, useEffect } from 'react';
import api from '../../api';
import { Link, useParams } from 'react-router-dom';

export default function Results() {

    let { slug } = useParams();
    let cleanSearch = slug.replace(/ /g,'');
    const [streamerInfo, setStreamerInfo] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get(`https://api.twitch.tv/helix/users?login=${cleanSearch}`);

            setStreamerInfo(result.data.data);
        }
        fetchData()
    }, [slug, cleanSearch])

    return (
            <div className="containerDecaleResult">
                {streamerInfo.length !== 0 ? 
                    (
                        <>
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
                        </>
                    ):(
                        <>
                            <h3>Résultats de recherche : <br /> Pas de résultats, ce streamer n'existe pas ou est mal orthographié</h3>
                        </>
                    )
                }
            </div>
    )
}
