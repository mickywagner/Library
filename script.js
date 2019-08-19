let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        if(this.read == false) {
            return `${this.title} by ${this.author}, ${this.pages}, read`
        } else {
            return `${this.title} by ${this.author}, ${this.pages}, not read`
        }
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book)
}