let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        if(this.read == false) {
            return `${this.title} by ${this.author}, ${this.pages}, not read`
        } else {
            return `${this.title} by ${this.author}, ${this.pages}, read`
        }
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book)
}

let bookModal = document.querySelector(".addBookModal")
const newBook = document.querySelector("#newBook")
const closeBtn = document.querySelector(".close-button")

function toggleModal() {
    bookModal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === bookModal) {
        toggleModal();
    }
}

newBook.addEventListener('click', toggleModal)
window.addEventListener('click', windowOnClick)
closeBtn.addEventListener('click', toggleModal)

let title = document.querySelector("#title")
let author = document.querySelector("#author")
let pages = document.querySelector("#pages")
let checkBox = document.querySelector("#read")

let submitBtn = document.querySelector("input[type=submit]")

submitBtn.addEventListener('click', function() {
    let bTitle = title.value
    let bAuthor = author.value
    let bPages = pages.value
    if(checkBox.checked == true) {
        bRead = true
    } else {
        bRead = false
    }
    let entry = new Book(bTitle, bAuthor, bPages, bRead)
    addBookToLibrary(entry)
    toggleModal()
    console.log(myLibrary)
})