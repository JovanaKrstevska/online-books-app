import "../BooksWidget/BooksWidget.css";
import booksJson from "../../books.json";
import booksCsv from "../../books.csv";
import Papa from "papaparse";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

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
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th scope="col">Author</th>
                        <th scope="col">Title</th>
                        <th scope="col">Genre</th>
                    </tr>
                </thead>
                <tbody>
                    {mergedBooks.map((book, index) => (
                        <tr key={index}>
                         {book.title}, {book.author}, {book.genre}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}
export default BooksWidget;