import { useState, useEffect } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import api from '../../api';
import Loader from '../Loader/Loader';

export default function GameStreams() {

    let location = useLocation();
    let { slug } = useParams();
    const [streamData, setStreamData] = useState([]);
    const [viewers, setViewers] = useState(0);
    const [loader, setLoader] = useState(true);

    useEffect(() => {

        const fetchData = async () => {
            const result = await api.get(`https://api.twitch.tv/helix/streams?game_id=${location.state.gameID}`);
            let dataArray = result.data.data;
            let finalArray = dataArray.map(stream => {
                let newUrl = stream.thumbnail_url.replace('{width}', "320").replace('{height}', "180");
                stream.thumbnail_url = newUrl;
                return stream;
            })

            // calcul du total des viewers
            let totalViewers = finalArray.reduce((acc, val) => {
                return acc + val.viewer_count;
            }, 0);

            let userIDs = dataArray.map(stream => {
                return stream.user_id;
            });
            let baseUrl = "https://api.twitch.tv/helix/users?";
            let queryParamsUsers = "";
            userIDs.map(id => {
                return (queryParamsUsers += `id=${id}&`)
            });
            let urlFinalUsers = baseUrl + queryParamsUsers;
            let getUsersLogin = await api.get(urlFinalUsers);
            let usersLoginArray = getUsersLogin.data.data;
            finalArray = dataArray.map(stream => {
                stream.login = "";
                usersLoginArray.forEach(login => {
                    if (stream.user_id === login.id) {
                        stream.login = login.login;
                    }
                });
                return stream;
            })
            setViewers(totalViewers);
            setStreamData(finalArray);
            setLoader(false);
        }
        fetchData();
    }, [location])

    return (
        loader ? (
            <Loader />
        ):(
            <div>
                <h1 className="titleGames">Streams : {slug}</h1>
                <h3 className="subtitleGameStreams">
                    <strong className="textColored">{viewers}</strong> personnes regardent {slug}
                </h3>
                <div className="flexAccueil">
                    {streamData.map((stream, index) => (
                        <div key={index} className="cardStream">
                            <img src={stream.thumbnail_url} alt={`jeu ${slug}`} className="imgCard"/>
                            <div className="cardBodyStream">
                                <h5 className="titleCardStream">{stream.user_name}</h5>
                                <p className="txtStream">Nombre de viewers : {stream.viewer_count}</p>
                                <Link
                                    className="link"
                                    to={{
                                        pathname: `/live/${stream.login}`
                                    }}
                                >
                                    <div className="btnCard">Regarder {stream.user_name}</div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    )
}
