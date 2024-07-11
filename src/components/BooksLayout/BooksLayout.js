// CSS
import "../BooksLayout/BooksLayout.css";
import BooksWidget from "../widget/BooksWidget/BooksWidget";
import Button from "../ui/Button/Button";
import SearchBar from "../ui/SearchBar/SearchBar";
import SortBar from "../ui/SortBar/SortBar";
import booksJson from "../../books.json";
import Papa from "papaparse";
import { useEffect, useState } from "react";
import PaginationWidget from "../widget/PaginationWidget/PaginationWidget";

function BooksLayout() {
    const [booksCsvData, setBooksCsvData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [mergedBooks, setMergedBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [sortClickOption, setSortClickOption] = useState("author");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(7);

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
        setCurrentPage(1);
    };

    const handleSortChange = (e) => {
        setSortClickOption(e.target.value);
        const selectedOption = sortDataByOption(filteredBooks, e.target.value);
        setFilteredBooks(selectedOption);
        setCurrentPage(1);
    }

    const sortDataByOption = (books, option) => {
        return books.sort((a, b) => {
            const optionA = a[option] ? a[option].toLowerCase() : "";
            const optionB = b[option] ? b[option].toLowerCase() : "";
            return optionA.localeCompare(optionB);
        })
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => {
        if (currentPage < Math.ceil(filteredBooks.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="booksLayoutContainer">
            <div className="searchBarDiv">
                <SearchBar className="searchBar" value={searchQuery} onChange={handleChangeSearchBook} />
                <Button className="buttonSearch" content={"Search"} modifier="primary" onClick={handleClickSearch} />
                <SortBar className="sortBar" value={sortClickOption} onChange={handleSortChange}/>
            </div>
            <div className="title">
                <h1>Welcome</h1>
                <h3>Which book are you looking for?</h3>
            </div>
            <BooksWidget books={currentBooks} />
            <PaginationWidget next={nextPage} previous={prevPage} page={`${currentPage} / ${Math.ceil(filteredBooks.length / itemsPerPage)}`}
                disabled1={currentPage === 1}
                disabled2={currentPage === Math.ceil(filteredBooks.length / itemsPerPage)}/>
        </div>
    )
}

export default BooksLayout;
