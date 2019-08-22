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

function removeBookLibrary(index) {
    myLibrary.splice(index, 1)
}

let libraryDiv = document.querySelector(".library")
libraryDiv.addEventListener('click', deleteBookDisplay)

function deleteBookDisplay(e) {
    if(e.target && e.target.matches("i.fas")) {
        let bookDiv = e.path[2]
        while(bookDiv.hasChildNodes()) {
            bookDiv.removeChild(bookDiv.firstChild)
        }
        libraryDiv.removeChild(bookDiv)
    }
}

function render(newBook) {
    let library = document.querySelector(".library")
    let bookDiv = document.createElement("div")
    let hTag = document.createElement("h1")
    let pAuthor = document.createElement("p")
    let pPages = document.createElement("p")
    let pRead = document.createElement("p")
    let readBox = document.createElement("input")
    let removeBook = document.createElement("p")

    readBox.type = "checkbox"
    if(newBook.read == true) {
        readBox.checked = true
    } else {
        readBox.checked = false
    }

    bookDiv.classList.add("bookDisplay")

    library.appendChild(bookDiv)
    hTag.textContent = newBook.title
    pAuthor.textContent = `By: ${newBook.author}`
    pPages.textContent = `Pages: ${newBook.pages}`
    pRead.textContent = "Read: "
    removeBook.innerHTML = `<i class="fas fa-trash-alt"></i>`

    bookDiv.appendChild(hTag)
    bookDiv.appendChild(pAuthor)
    bookDiv.appendChild(pPages)
    bookDiv.appendChild(pRead)
    pRead.appendChild(readBox)  
    bookDiv.appendChild(removeBook)
}


// Submit new book modal

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

submitBtn.addEventListener('click', submitBook)

function submitBook() {
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
    render(entry)
    toggleModal()
    clearForm()
}

function clearForm() {
    title.value = ""
    author.value = ""
    pages.value = ""
    checkBox.checked = false
}

// Book display

function createTable() {
    let rows = myLibrary

    let html = "<table>";
    html+="<tr>" + "<th>Title</th>" + "<th>Author</th>" + "<th>Pages</th>" + "<th>Read?</th>" + "<th>Delete Book</th>" + "</tr>"

    for(let i = 0; i < rows.length; i++) {
        html+="<tr>"
        html+="<td>" + rows[i].title+"</td>"
        html+="<td>" + rows[i].author+"</td>"
        html+="<td>" + rows[i].pages+"</td>"
        html+="<td>" + `<input type="checkbox" name="read" id="read">` + "</td>"
        html+="<td>" + `<i class="fas fa-trash-alt"></i>` + "</td>"

        html+="</tr>"
    }
    html+="</table>"
    document.querySelector(".library").innerHTML = html;
}