//CSS
import "../SearchBar/SearchBar.css";

function SearchBar(props){
    return(
        <input className={`${props.className ? props.className : ''}`} type="search" placeholder="Search Books" value={props.searchValue} onChange={props.onChange}></input>
    )
}
export default SearchBar;