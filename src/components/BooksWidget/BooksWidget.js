import React from "react";
import "../BooksWidget/BooksWidget.css";
import Table from "react-bootstrap/Table";

function BooksWidget({books}) {
    return (
        <div className="booksWidgetContainer">
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
                         <td>{book.author}</td>
                         <td>{book.title}</td>
                         <td>{book.genre}</td>
                     </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}
export default BooksWidget;