//CSS
import "../BooksLayout/BooksLayout.css";
import BooksWidget from "../BooksWidget/BooksWidget";
import Button from "../ui/Button/Button";
import SearchBar from "../ui/SearchBar/SearchBar";

function BooksLayout() {
    return (
        <div className="booksLayoutContainer">
            <div className="searchBarDiv">
                <SearchBar className="searchBar" />
                <Button className="buttonSearch" content={"Search"} modifier="primary" onClick={() => console.log('Primary Button Clicked')}/>
            </div>
            <BooksWidget/>
        </div>
    )
}
export default BooksLayout;