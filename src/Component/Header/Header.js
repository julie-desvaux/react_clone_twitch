import { useState, useEffect } from 'react';
import logo from './IconeTwitch.svg';
import search from './Search.svg';
import menuIco from './MenuIco.svg';
import cross from './Cross.svg';
import { Link } from 'react-router-dom';

export default function Header() {

    const [menu, showMenu] = useState(false);
    const [smallScreen, setSmallScreen] = useState(false);
    const [searchBar, setSearchBar] = useState("");

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 900px");
        mediaQuery.addListener(handleMediaQueryChange);
        handleMediaQueryChange(mediaQuery);
    })

    const handleMediaQueryChange = mediaQuery => {
        if(mediaQuery.matches) {
            setSmallScreen(true);
        } else {
            setSmallScreen(false);
        }
    }

    const hideMenu = () => {
        showMenu(!menu);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const toggleNavRes = () => {
        showMenu(!menu);
    }

    return (
        <div>
            <nav className="headerTop">
                {(menu || !smallScreen) && (
                    <ul className="listMenu">
                        <li onClick={hideMenu} className="linksNav">
                            <Link className="link" to="/">
                                <img className="logo" src={logo} alt="Logo de Twitch" />
                            </Link>
                        </li>
                        <li onClick={hideMenu} className="linksNav">
                            <Link className="link" to="/">
                                Top Games
                            </Link>
                        </li>
                        <li onClick={hideMenu} className="linksNav">
                            <Link className="link" to="/top-streams">
                                Top Streams
                            </Link>   
                        </li>
                        <li className="linksNav">
                            <form action="" className="formSubmit" onSubmit={handleSubmit}>
                                <input value={searchBar} onChange={(e) => setSearchBar(e.target.value)} type="text" className="inputSearch"/>
                                <Link className="link" to={{pathname: `/results/${searchBar}`}}>
                                    <button type="submit">
                                        <img src={search} alt="icone loupe" className="logoLoupe"/>
                                    </button>
                                </Link>
                            </form>
                        </li>
                    </ul>
                )}
            </nav>
            <div className="menuResBtn">
                <img onClick={toggleNavRes} src={!menu ? menuIco : cross} alt="Menu Icone Responsive" className="menuIco"/>
            </div>
        </div>
    )
}
