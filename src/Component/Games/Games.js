import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import Loader from '../Loader/Loader';

export default function Games() {

    const [games, setGames] = useState([]);
    const [loader, setLoader] = useState(true);
    
    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get('https://api.twitch.tv/helix/games/top')
            // console.log(result);
            let dataArray = result.data.data;
            let finalArray = dataArray.map(game => {
                let newUrl = game.box_art_url.replace("{width}", "250").replace("{height}", "300");
                game.box_art_url = newUrl;
                return game;
            });
            setGames(finalArray);
            setLoader(false);
        }

        fetchData();
    }, [])

    return (
        loader ? (
            <Loader />
        ):(
            <div className="games">
                <h1 className="titleGames">Jeux les plus populaires</h1>
                <div className="flexAccueil">
                    {games.map((game, index) => (
                        <div key={index} className="cardGames">
                            <img src={game.box_art_url} alt={`Photo du jeu ${game.name}`} className="imgCard"/>
                            <div className="cardBodyGames">
                                <h5 className="titleCardGames">{game.name}</h5>
                                <Link
                                    className="link"
                                    to={{
                                        pathname: "game/" + game.name,
                                        state: { gameID: game.id }
                                    }}
                                >
                                    <div className="btnCard"><p>Regarder {game.name}</p></div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    )
}
