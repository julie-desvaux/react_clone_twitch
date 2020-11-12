import logo from './IconeTwitch.svg';
import search from './Search.svg';
import menuIco from './MenuIco.svg';

export default function Header() {
    return (
        <div>
            <nav className="headerTop">
                <ul className="listeMenu">
                    <li className="liensNav">
                        <img className="logo" src={logo} alt="Logo de Twitch" />
                    </li>
                    <li className="liensNav">
                        Top Games
                    </li>
                    <li className="liensNav">
                        Top Streams
                    </li>
                    <li className="liensNav">
                        <form action="" className="formSubmit">
                            <input type="text" className="inputRecherche"/>
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
