import logo from './IconeTwitch.svg';
import search from './Search.svg';
import menuIco from './MenuIco.svg';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div>
            <nav className="headerTop">
                <ul className="listMenu">
                    <li className="linksNav">
                        <Link className="link" to="/">
                            <img className="logo" src={logo} alt="Logo de Twitch" />
                        </Link>
                    </li>
                    <li className="linksNav">
                        <Link className="link" to="/">
                            Top Games
                        </Link>
                    </li>
                    <li className="linksNav">
                        <Link className="link" to="/top-streams">
                            Top Streams
                        </Link>   
                    </li>
                    <li className="linksNav">
                        <form action="" className="formSubmit">
                            <input type="text" className="inputSearch"/>
                            <button type="submit">
                                <img src={search} alt="icone loupe" className="logoLoupe"/>
                            </button>
                        </form>
                    </li>
                </ul>
            </nav>
            <div className="menuResBtn">
                <img src={menuIco} alt="Menu Icone Responsive" className="menuIco"/>
            </div>
        </div>
    )
}
