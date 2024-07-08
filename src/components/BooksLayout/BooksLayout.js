//CSS
import "../BooksLayout/BooksLayout.css";
import Button from "../ui/Button/Button";
import SearchBar from "../ui/SearchBar/SearchBar";

function BooksLayout() {
    return (
        <div className="booksLayoutContainer">
            <div className="searchBarDiv">
                <SearchBar className="searchBar" />
                <Button className="buttonSearch" content={"Search"}/>
            </div>

        </div>
    )
}
export default BooksLayout;