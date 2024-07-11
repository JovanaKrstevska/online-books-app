// CSS
import "../BooksLayout/BooksLayout.css";
import BooksWidget from "../BooksWidget/BooksWidget";
import Button from "../ui/Button/Button";
import SearchBar from "../ui/SearchBar/SearchBar";
import SortBar from "../ui/SortBar/SortBar";
import booksJson from "../../books.json";
import Papa from "papaparse";
import { useEffect, useState } from "react";

function BooksLayout() {
    const [booksCsvData, setBooksCsvData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [mergedBooks, setMergedBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [sortClickOption, setSortClickOption] = useState("author");

    useEffect(() => {
        fetch('/books.csv')
            .then(response => response.text())
            .then(csvText => {
                const csvParsed = Papa.parse(csvText, { header: true }).data;
                setBooksCsvData(csvParsed);
            });
    }, []);

    useEffect(() => {
        if (booksCsvData.length > 0) {
            const merged = mergeData();
            setMergedBooks(merged);
            setFilteredBooks(merged);
        }
    }, [booksCsvData]);

    const mergeData = () => {
        const merged = [];
        booksJson.forEach(jsonItem => {
            const matchingCsvItem = booksCsvData.find(csvItem => csvItem.id === jsonItem.id);
            if (matchingCsvItem) {
                merged.push({ ...jsonItem, ...matchingCsvItem });
            } else {
                merged.push(jsonItem);
            }
        });

        booksCsvData.forEach(csvItem => {
            const matchingJsonItem = booksJson.find(jsonItem => jsonItem.id === csvItem.id);
            if (!matchingJsonItem) {
                merged.push(csvItem);
            }
        });

        return merged.sort((a, b) => {
            const authorA = a.author ? a.author.toLowerCase() : '';
            const authorB = b.author ? b.author.toLowerCase() : '';
            return authorA.localeCompare(authorB);
        });
    };

    const handleChangeSearchBook = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleClickSearch = () => {
        const filtered = [];

        mergedBooks.forEach(book => {
            if ((book.author && book.author.toLowerCase().includes(searchQuery.toLowerCase())) || 
                (book.title && book.title.toLowerCase().includes(searchQuery.toLowerCase())) || 
                (book.genre && book.genre.toLowerCase().includes(searchQuery.toLowerCase()))){
                filtered.push(book);
            }
        });
        setFilteredBooks(filtered);
    };

    const handleSortChange = (e) => {
        setSortClickOption(e.target.value);
        const selectedOption = sortDataByOption(filteredBooks, e.target.value);
        setFilteredBooks(selectedOption);
    }

    const sortDataByOption = (books, option) => {
        return books.sort((a, b) => {
            const optionA = a[option] ? a[option].toLowerCase() : "";
            const optionB = b[option] ? b[option].toLowerCase() : "";
            return optionA.localeCompare(optionB);
        })
    }

    return (
        <div className="booksLayoutContainer">
            <div className="searchBarDiv">
                <SearchBar className="searchBar" value={searchQuery} onChange={handleChangeSearchBook} />
                <Button className="buttonSearch" content={"Search"} modifier="primary" onClick={handleClickSearch} />
                <SortBar className="sortBar" value={sortClickOption} onChange={handleSortChange}/>
            </div>
            <BooksWidget books={filteredBooks} />
        </div>
    )
}

export default BooksLayout;
