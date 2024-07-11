import React from "react";
import "../BooksWidget/BooksWidget.css";
import Table from "react-bootstrap/Table";

function BooksWidget({books, searchBookQuery}) {
    const highlightMatch = (text, query) => {
        if(!query || !text){
            return text;
        }

        const regex = new RegExp(`(${query})`, `gi`);
        const parts = text.split(regex);

        return parts.map((part, index) =>
            regex.test(part) ? <span key={index} style={{ fontWeight: 'bold', color: 'red' }}>{part}</span> : part
        );
    }
    return (
        <div className="booksWidgetContainer">
            {books == 0 ? (
                <h1 className="noFound">No results found</h1>
            ) : (
                <Table bordered >
                <thead>
                    <tr>
                        <th scope="col">Author</th>
                        <th scope="col">Title</th>
                        <th scope="col">Genre</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, index) => (
                         <tr key={index}>
                         <td>{highlightMatch(book.author, searchBookQuery)}</td>
                         <td>{highlightMatch(book.title, searchBookQuery)}</td>
                         <td>{highlightMatch(book.genre, searchBookQuery)}</td>
                     </tr>
                    ))}
                </tbody>
            </Table>
            )}
        </div>
    )
}
export default BooksWidget;