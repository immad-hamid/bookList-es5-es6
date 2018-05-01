// book class
function Book (title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI class
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

// eventlistner on submit
document.getElementById('book-form').addEventListener('submit', function(e) {
    // values from ui fields
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;

    if (title === '' || author === '' || isbn === '') { // if any of the form field is empty
        alert('Nothing');
    } else { // if the fields are not empty
        // instantiating Book class
        const book = new Book(title, author, isbn);

        // instantiating the ui class
        const ui = new Ui;

        // sending the book info to ui constructor to append the info to the list
        ui.addBookToList(book);

        // clear fields
        ui.clearFields();
    }

    e.preventDefault();
});