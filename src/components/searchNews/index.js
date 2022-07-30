import './Search.modules.css';

const SearchNews = ({open, view, setQuery, setOpen, setSelectedFilter}) => {
    return (
        <div className={`dropdown-menu ${(open && view === "all") ? 'active' : 'inactive'}`}>
            <ul className="filter-items">
                <li className="dropdown-item" onClick={e => {setQuery("angular"); setOpen(!open); setSelectedFilter("Angular")}}>
                    <img src="angular.png"></img>
                    <p>Angular</p>
                </li>
                <li className="dropdown-item" onClick={e => {setQuery("reactjs"); setOpen(!open); setSelectedFilter("Reactjs")}}>
                    <img src="react.png"></img>
                    <p>Reacts</p>
                </li>
                <li className="dropdown-item" onClick={e => {setQuery("vuejs"); setOpen(!open); setSelectedFilter("Vuejs")}}>
                    <img src="vue.png"></img>
                    <p>Vuejs</p>
                </li>
            </ul>
        </div>
    );
}

export default SearchNews;