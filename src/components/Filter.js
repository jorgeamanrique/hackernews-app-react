import '../App.css';

const Filter = ({open}) => {
    return (
        <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
            <ul className="filter-items">
                <li className="dropdownitem">
                    <img src="angular.png"></img>
                    <p>Angular</p>
                </li>
                <li className="dropdownitem">
                    <img src="react.png"></img>
                    <p>Reacts</p>
                </li>
                <li className="dropdownitem">
                    <img src="vue.png"></img>
                    <p>Vuejs</p>
                </li>
            </ul>
        </div>
    );
}

export default Filter; 