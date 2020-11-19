import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactTwitchEmbedVideo from 'react-twitch-embed-video';
import iconViewer from './viewer.svg';
import iconPartner from './partner.svg';
import api from '../../api';

export default function Live() {

    let { slug } = useParams();
    const [infoStream, setInfoStream] = useState([]);
    const [infoGame, setInfoGame] = useState([]);
    const [infoUser, setInfoUser] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get(`https://api.twitch.tv/helix/streams?user_login=${slug}`);
            let gameId = result.data.data.map(gameid => {
                return gameid.game_id;
            })

            const resultNameGame = await api.get(`https://api.twitch.tv/helix/games?id=${gameId}`);
            let gameName = resultNameGame.data.data.map(game => {
                return game.name
            })

            const resultUser = await api.get(`https://api.twitch.tv/helix/users?id=${result.data.data[0].user_id}`);
            console.log("resultUser : ", resultUser);

            setInfoStream(result.data.data[0]);
            setInfoGame(gameName);
            setInfoUser(resultUser.data.data[0]);

        }

        fetchData()
    }, [])

    return (
        <div className="containerDecale">
            <ReactTwitchEmbedVideo
                width="100%"
                channel={slug}
                theme="dark"
            />
            <div className="containerInfo">
                <div className="profilPicture">
                    <img 
                        src={infoUser.profile_image_url} 
                        alt={`Photo de profil de ${infoUser.user_name}`} 
                        className="profilRounded"
                    />
                </div>
                <div className="infos">
                    <div className="detailsInfos">
                        <div className="infoUser">
                            {infoStream.user_name} 
                            {/* {infoUser.broadcaster_type === "partner" ? 
                                (<img src={iconPartner} alt="Icone partenaire" />) : null
                            } */}
                        </div>
                        <div className="titleStream">{infoStream.title}</div>
                        <div className="nameGame">{infoGame}</div>
                        <div className="infoGame">{infoStream.language}</div>
                    </div>
                    <div className="divViewer">
                        <div className="viewer"> <img src={iconViewer} alt="Icone nombre de viewers"/> {infoStream.viewer_count}</div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}