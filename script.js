let myLibrary = [];

function Book(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
}

Book.prototype.getInfo = function() {
    if (this.read == false) {
        return `${this.title} by ${this.author}, ${this.pages}, not read`;
    } else {
        return `${this.title} by ${this.author}, ${this.pages}, read`;
    }
}

Book.prototype.changeReadStatus = function() {
    this.read == true ? this.read = false : this.read = true; 
}


function addBookToLibrary(book) {
    myLibrary.push(book)
    populateStorage()
}

function removeBookLibrary(index) {
    myLibrary.splice(index, 1)
    populateStorage()
}

let libraryDiv = document.querySelector(".library")
libraryDiv.addEventListener('click', deleteBookDisplay)

function deleteBookDisplay(e) {
    if(e.target && e.target.matches("i.fas")) {

        let libraryIndex = e.path[2].dataset.index
        let bookDiv = e.path[2]
        removeBookLibrary(libraryIndex)
        while(bookDiv.hasChildNodes()) {
            bookDiv.removeChild(bookDiv.firstChild)
        }
        createTable()
    }
    
}

libraryDiv.addEventListener('click', toggleReadStatus)

function toggleReadStatus(e) {
    if(e.target && e.target.matches("#read")) {
        let index = e.path[2].dataset.index
        let book = myLibrary[index]
        book.changeReadStatus()
        populateStorage()
    }
}

// Storage

if(!localStorage.getItem('library')) {
    populateStorage();   
  } else {
    getStorage()
    createTable()
  }

function populateStorage() {
    let myLibrarySerialized = JSON.stringify(myLibrary)
    localStorage.setItem('library', myLibrarySerialized)
}

function getStorage() {
    let myLibrary_Deserialized = JSON.parse(localStorage.getItem('library'))
    let i = 0
    while (i < myLibrary_Deserialized.length) {
        let libBook = new Book(myLibrary_Deserialized[i].title, myLibrary_Deserialized[i].author, myLibrary_Deserialized[i].pages, myLibrary_Deserialized[i].read)
        addBookToLibrary(libBook)
        i++
    }       
}

// Submit new book modal

let bookModal = document.querySelector(".addBookModal")
const newBook = document.querySelector("#newBook")
const closeBtn = document.querySelector(".close-button")

closeBtn.addEventListener('click', function() {
    console.log('hey')
})

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
    createTable()
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
        html+=`<tr data-index="${i}" >`
        html+="<td>" + rows[i].title+"</td>"
        html+="<td>" + rows[i].author+"</td>"
        html+="<td>" + rows[i].pages+"</td>"
        if(rows[i].read == true) {
            html+="<td>" + `<input type="checkbox" name="read" id="read" checked>` + "</td>"
        } else {
            html+="<td>" + `<input type="checkbox" name="read" id="read">` + "</td>"
        }
        html+="<td>" + `<i class="fas fa-trash-alt"></i>` + "</td>"

        html+="</tr>"
    }
    html+="</table>"
    document.querySelector(".library").innerHTML = html;
}


if(checkBox.checked == true) {
    bRead = true
} else {
    bRead = false
}

// Convert this so it renders the entire library not just one book -- alternate display mode
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