// USER INTERFACE
const bookcardPanel = document.getElementById('bookcardPanel')


// STORE
class Book {
    constructor(
        title = "None",
        author = "None",
        pages = '0',
        isRead = false
        ) 
        {
            this.title = title;
            this.author = author;
            this.pages = pages;
            this.isRead = isRead;
        }
    }
    
class Library {
    constructor(){
        this.books = []
    }
    
    addBook(newBook) {
        if(!this.isInUserLirary(newBook)){
            this.books.push(newBook)
        }
    } 
    
    removeBook(title) {
        this.books = this.books.filter((book) => book.title!=title);
    }

    isInUserLirary(newBook){
        return this.books.some((book) => book.title === newBook.title);
    }

    findBook(title) {
        return this.books.find((book) => book.title === title);
    }
}
    
const userLibrary = new Library();
 
// BASIC FUNCTION FOR INTERACTION
function refreshBookScreen() {
    resetBookScreen();
    for (let book of userLibrary.books){
        createBookCard(book);
    }
}

function resetBookScreen() {
    bookcardPanel.innerHTML = '';
}

function createBookCard(book) {
    const bookcard = document.createElement('div');;
    const title = document.createElement('h3');
    const author = document.createElement('h4');
    const pages = document.createElement('h4');
    const isRead = document.createElement('button');
    const remove = document.createElement('button');

    bookcard.classList.add("bookcard");
    title.classList.add("BookRowitem");
    author.classList.add("BookRowitem");
    pages.classList.add("BookRowitem");
    if (book.isRead) {
        isRead.classList.add("isRead-true");
        isRead.textContent = `Read`;
    } else {
        isRead.classList.add("isRead-false");
        isRead.textContent = `Not read`;
    }
    remove.classList.add("remove")
    isRead.onclick = changeisRead //change isread by clicking the button
    remove.onclick = removeBookfromBtn

    title.textContent = `${book.title}`
    author.textContent = `${book.author}`
    pages.textContent = `${book.pages}`
    remove.textContent = `Remove`

    bookcard.appendChild(title);
    bookcard.appendChild(author);
    bookcard.appendChild(pages);
    bookcard.appendChild(isRead);
    bookcard.appendChild(remove);
    bookcardPanel.appendChild(bookcard);
}

const changeisRead = (e) => {
    const title = e.target.parentNode.childNodes[0].innerHTML
    const book  = userLibrary.findBook(title);
    book.isRead = !book.isRead;

    refreshBookScreen();
}

const removeBookfromBtn = (e) => {
    const title = e.target.parentNode.childNodes[0].innerHTML
    userLibrary.removeBook(title);    

    refreshBookScreen();
}

// INTERACTION WITH THE USER
function createBookFromInputs() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const isRead = document.getElementById('isRead').checked;

    return new Book(title, author, pages, isRead)
}


function addBookCard() {
    // GET INFO FROM INPUT
    // CREATE BOOK
    let newBook = createBookFromInputs();

    // ADD NEW BOOK TO LIBRARY
    userLibrary.addBook(newBook);
    console.log(userLibrary);

    // DISPLAY LIBRARY
    refreshBookScreen();

}

// ELEMENT
const btnSummit = document.getElementById('btnSummit')

// EVENT LISTENER
btnSummit.addEventListener("click", addBookCard);

window.onload = () => {
    let sample = new Book("Sample","j.k. Rolling", "200", false);
    userLibrary.addBook(sample);
    refreshBookScreen();
}