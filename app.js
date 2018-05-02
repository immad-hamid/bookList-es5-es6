// book constructor class
function Book (title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI constructor class
function Ui () { }

// ui constructor to add book to the list
Ui.prototype.addBookToList = function(book) {
    // creating a table row
    const row = document.createElement('tr');
    // creating table row columns
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="" class="delete">X</a></td>
    `;

    // append the row to table body
    document.getElementById('book-list').appendChild(row);
}

// ui constructor to clear form fields
Ui.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// ui constructor to create alert
Ui.prototype.showAlert = function (msgText, className) {
    // creating a div
    const div = document.createElement('div');
    // adding alert class
    div.classList = `alert ${className}`;
    // div text
    div.textContent = msgText;

    // inserting alert in dom
    const constainer = document.querySelector('.container'); // parent node
    const form = document.querySelector('#book-form');       // node before we would like to add our div
    constainer.insertBefore(div, form);

    setTimeout(function() {
        div.remove();
    }, 3000);
}

// ui constructor to delte a book
Ui.prototype.deleteBook = function(target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

//  class store for making data persistent
function Store() { }

Store.prototype.getBooks = function() {
    let books;
    if (localStorage.getItem('books') === null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
}

Store.prototype.displayBooks = function() {
    // instantiating store class
    const store = new Store();
    // getting items already stored
    const books = store.getBooks();
    
    books.forEach(book => {
        // instantiating ui class
        const ui = new Ui();
        // adding the books from LS
        ui.addBookToList(book);
    });
}

Store.prototype.addBook = function(book) {
    // instantiating store class
    const store = new Store();
    // getting items already stored
    const books = store.getBooks();

    // pushing the item in our main array
    books.push(book);
    // now setting the array again in our LS
    localStorage.setItem('books', JSON.stringify(books));
}

Store.prototype.removeBook = function(target) {
    // instantiating store class
    const store = new Store();
    // getting items already stored
    const books = store.getBooks();

    books.forEach((book, index) => {
        if (book.isbn === target) {
            books.splice(index, 1);
        }
    });
    // now setting the LS again
    localStorage.setItem('books', JSON.stringify(books));
}

// DOM loadEvent
document.addEventListener('DOMContentLoaded', function() {
    // instantiating store class
    const store = new Store();
    // showing data sets if exist
    store.displayBooks();
});

// event listner for submit
document.getElementById('book-form').addEventListener('submit', function(e) {
    // values from ui fields
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;

    // instantiating Book class
    const book = new Book(title, author, isbn);

    // instantiating the ui class
    const ui = new Ui;

    // instantiating store class
    const store = new Store();

    if (title === '' || author === '' || isbn === '') { // if any of the form field is empty

        // creating alert
        ui.showAlert('You have to fill in all the info.', 'error');
    
    } else { // if the fields are not empty    

        // sending the book info to ui constructor to append the info to the list
        ui.addBookToList(book);

        // adding book to our LS
        store.addBook(book);

        // clear fields
        ui.clearFields();

        // showing alert on success
        ui.showAlert('Book successfully added', 'success');
    }

    e.preventDefault();
});

// event listner for delete
document.getElementById('book-list').addEventListener('click', function(e) {

    // instantiating the ui class
    const ui = new Ui;

    // delete method
    ui.deleteBook(e.target);

    // instantiating store class
    store = new Store();

    // delete book from LS
    store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // alert on delete
    ui.showAlert('The selected book has been deleted', 'error');

    e.preventDefault();
});