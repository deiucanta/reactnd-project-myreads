import React from 'react'
import PropTypes from 'prop-types'

import Book from './Book'

const Bookshelf = ({ title, books, onUpdateBook }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books.map(book => (
          <li key={book.id}>
            <Book book={book} shelf={book.shelf} onChangeShelf={shelf => onUpdateBook(book, shelf)} />
          </li>
        ))}
      </ol>
    </div>
  </div>
)

Bookshelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onUpdateBook: PropTypes.func,
}

export default Bookshelf