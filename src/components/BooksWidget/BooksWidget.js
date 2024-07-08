import "../BooksWidget/BooksWidget.css";
import booksJson from "../../books.json";
import booksCsv from "../../books.csv";
import Papa from "papaparse";
import { useEffect, useState } from "react";

function BooksWidget() {
    const [booksCsvData, setBooksCsvData] = useState([]);

    useEffect(() => {
        const csvParsed = Papa.parse(booksCsv, { header: true }).data;
        setBooksCsvData(csvParsed);
    }, []);

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

        return merged;
    };

    const mergedBooks = mergeData();
    return (
        <div className="booksWidgetContainer">
            <h2>Merged Books</h2>
      <ul>
        {mergedBooks.map((book, index) => (
          <li key={index}>
            {book.id}, {book.title}, {book.author}
          </li>
        ))}
      </ul>
        </div>
    )
}
export default BooksWidget;