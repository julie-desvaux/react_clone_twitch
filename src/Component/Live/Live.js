import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactTwitchEmbedVideo from 'react-twitch-embed-video';
import iconViewer from './viewer.svg';
import Loader from '../Loader/Loader';
// import iconPartner from './partner.svg';
import api from '../../api';

export default function Live() {

    let { slug } = useParams();
    const [infoStream, setInfoStream] = useState([]);
    const [infoGame, setInfoGame] = useState([]);
    const [infoUser, setInfoUser] = useState([]);
    const [tagsUser, setTagsUser] = useState([]);
    const [followers, setFollowers] = useState();
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get(`https://api.twitch.tv/helix/streams?user_login=${slug}`);

            if (result.data.data.length === 0) {
                setInfoStream(false);
            } else {
                let gameId = result.data.data.map(gameid => {
                    return gameid.game_id;
                })

                const resultNameGame = await api.get(`https://api.twitch.tv/helix/games?id=${gameId}`);
                let gameName = resultNameGame.data.data.map(game => {
                    return game.name
                })

                const resultTagsUser = await api.get(`https://api.twitch.tv/helix/streams/tags?broadcaster_id=${result.data.data[0].user_id}`);

                setInfoStream(result.data.data[0]);
                setInfoGame(gameName);
                setTagsUser(resultTagsUser.data.data);
            }

            const resultUser = await api.get(`https://api.twitch.tv/helix/users?login=${slug}`);
            const resultFollowers = await api.get(`https://api.twitch.tv/helix/users/follows?to_id=${resultUser.data.data[0].id}`);
            setInfoUser(resultUser.data.data[0]);
            setFollowers(resultFollowers.data.total);            
            setLoader(false);
        }

        fetchData()
    }, [slug])

    return (
        loader ? (
            <Loader />
        ):(
            infoStream ?
                (
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
                                    alt={`${infoUser.user_name}`} 
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
                                    <div className="infosGame">
                                        {tagsUser ? tagsUser.map((tagUser, index) => {
                                                return(
                                                    <div className="infoGame" key={index}><p>{tagUser.localization_names["fr-fr"]}</p></div>
                                                )
                                            })
                                            : null
                                        }
                                    </div>
                                    
                                </div>
                                <div className="divViewer">
                                    <div className="viewer"> <img src={iconViewer} alt="Icone nombre de viewers"/> {infoStream.viewer_count}</div>
                                </div>
                            </div>                
                        </div>
                        <div className="containerInfosUser">
                            <div className="pictureProfilFollowers">
                                <img 
                                    src={infoUser.profile_image_url} 
                                    alt={`${infoUser.user_name}`} 
                                    className="profilRounded"
                                />
                                <div className="followers">
                                    {followers} followers
                                </div>
                            </div>
                            <div className="user-description">
                                <div className="username">About {infoUser.display_name}</div>
                                <div className="description">{infoUser.description}</div>
                            </div>
                        </div>
                    </div>
                ):(
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
                                    alt={`${infoUser.user_name}`} 
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
                                    <div className="titleStream">Le streamer est offline !</div>
                                </div>
                            </div>                
                        </div>
                        <div className="containerInfosUser">
                            <div className="pictureProfilFollowers">
                                <img 
                                    src={infoUser.profile_image_url} 
                                    alt={`${infoUser.user_name}`} 
                                    className="profilRounded"
                                />
                                <div className="followers">
                                    {followers} followers
                                </div>
                            </div>
                            <div className="user-description">
                                <div className="username">About {infoUser.display_name}</div>
                                <div className="description">{infoUser.description}</div>
                            </div>
                        </div>
                    </div>
                ) 
        )   
    )
}