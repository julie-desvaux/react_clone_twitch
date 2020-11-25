import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import Loader from '../Loader/Loader';

export default function TopStreams() {

    const [channels, setChannels] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            // Récupération TopStream
            const result = await api.get("https://api.twitch.tv/helix/streams");
            let dataArray = result.data.data;
            // Récupération IDs des jeux et streameurs
            let gameIDs = dataArray.map(stream => {
                return stream.game_id;
            })
            let userIDs = dataArray.map(stream => {
                return stream.user_id;
            })
            // Adresse de base pour l'appel à l'API
            let baseUrlGames = "https://api.twitch.tv/helix/games?";
            let baseUrlUsers = "https://api.twitch.tv/helix/users?";
            // Ajout des queries (id des jeux et des streameurs)
            let queryParamsGames = "";
            let queryParamsUsers = "";
            gameIDs.map(id => {
                return (queryParamsGames += `id=${id}&`)
            })
            userIDs.map(id => {
                return (queryParamsUsers += `id=${id}&`)
            })
            let urlFinalGames = baseUrlGames + queryParamsGames;
            let urlFinalUsers = baseUrlUsers + queryParamsUsers;
            // Récupération des noms des jeux streamés et noms des streameurs
            let gamesNames = await api.get(urlFinalGames);
            let usersNames = await api.get(urlFinalUsers)
            let gamesNamesArray = gamesNames.data.data;
            let usersNamesArray = usersNames.data.data;
            // Tableau final 
            let finalArray = dataArray.map(stream => {
                stream.gameName = "";
                stream.login    = "";

                gamesNamesArray.forEach(name => {
                    usersNamesArray.forEach(user => {
                        if (stream.user_id === user.id && stream.game_id === name.id) {
                            stream.gameName = name.name
                            stream.truePic  = user.profile_image_url;
                            stream.login    = user.login;
                        }
                    })
                    
                });
                // Format de l'image du stream
                let newUrl = stream.thumbnail_url.replace('{width}', "320").replace('{height}', "180");
                stream.thumbnail_url = newUrl

                return stream;
            })
            setChannels(finalArray);
            setLoader(false);
        }
        fetchData()
    }, [])

    return (
        loader ? (
            <Loader />
        ):(
            <div className="top-streams">
                <h1 className="titleGames">Stream les plus populaires</h1>
                <div className="flexAccueil">
                    {channels.map((channel, index) => (
                        <div key={index} className="cardStream">
                            <img className="imgCard" src={channel.thumbnail_url} alt={`Stream du jeu ${channel.gameName}`}/>
                            <div className="cardBodyStream">
                                <h5 className="titleCardStream">{channel.user_name}</h5>
                                <p className="txtStream">Jeu : {channel.gameName}</p>
                                <p className="txtStream viewers">Viewers : {channel.viewer_count}</p>
                                <Link
                                    className="link"
                                    to={{pathname: `live/${channel.login}`}}
                                >
                                    <div className="btnCard">Regarder {channel.user_name}</div>
                                </Link>                            
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    )
}
