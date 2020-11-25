import { useEffect, useState } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';

export default function Sidebar() {

    const [topStream, setTopStream] = useState([]);

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
            // console.log("gamesNamesArray", gamesNamesArray)
            // console.log("usersNamesArray", usersNamesArray)
            // Tableau final 
            let finalArray = dataArray.map(stream => {
                stream.gameName = "";
                stream.truePic  = "";
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
                return stream;
            })
            setTopStream(finalArray.slice(0,8));
        }
        fetchData()
    }, [])

    return (
        <div className="sidebar">
            <h2 className="titleSidebar">Chaînes recommandées</h2>
            <ul className="listStream">
                {topStream.map((stream, index) => (
                    <Link key={index} className="link" to={{pathname: `/live/${stream.login}`}}>
                        <li key={index} className="containerFlexSidebar">
                            <img src={stream.truePic} alt={`${stream.user_name}`} className="profilPicRounded"/>
                            <div className="streamUs">{stream.user_name}</div>
                            <div className="viewerRight">
                                <div className="redPoint"></div>
                                <div>{stream.viewer_count}</div>
                            </div>
                            <div className="gameNameSidebar">{stream.gameName}</div>
                        </li>
                    </Link>
                ))}
                
            </ul>
        </div>
    )
}
