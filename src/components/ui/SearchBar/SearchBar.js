//CSS
import "../SearchBar/SearchBar.css";

function SearchBar(props){
    return(
        <input className={`${props.className ? props.className : ''}`} type="text" placeholder="Search Books" value={props.searchValue} onClick={props.onClick}></input>
    )
}
export default SearchBar;