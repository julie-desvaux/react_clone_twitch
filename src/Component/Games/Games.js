import { useState, useEffect } from 'react';
import api from '../../api';

export default function Games() {

    const [games, setGames] = useState([]);
    
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
        }

        fetchData();
    }, [])

    // console.log(games);

    return (
        <div className="games">
            <h1 className="titreGames">Jeux les plus populaires</h1>
            <div className="flexAccueil">
                {games.map((game, index) => (
                    <div key={index} className="carteGames">
                        <img src={game.box_art_url} alt={`Photo du jeu ${game.name}`} className="imgCarte"/>
                        <div className="cardBodyGames">
                            <h5 className="titreCarteGames">{game.name}</h5>
                            <div className="btnCarte"><p>Regarder {game.name}</p></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}