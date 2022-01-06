// DEFAULT VARIABLES


// VARIABLES
let myLibrary = [];

// SELECTORS
const overlay = document.getElementById('overlay');
const newBookBtn = document.getElementById('newBookBtn');
const btnSummit = document.getElementById('btnSummit');
const displayBook = document.getElementById('displayBook');

// EVENTS
newBookBtn.addEventListener('click', showOverlay);
btnSummit.addEventListener('click', addNewBook);

function showOverlay() {
    overlay.classList.add('active');
}
function DontShowOverlay() {
    overlay.classList.remove('active');
}

//when a user clicks the summit button.
function addNewBook(){
    // get book info from input tags.
    let Book = createBookFromInput();
    // create book object
    let newBook = createNewBook(Book);
    // add mylibrary
    addBookToLibrary(newBook);
    // console.log(myLibrary);

    // non-display popup
    DontShowOverlay();

    // display the book on the screen.
    displayBookOnScreen(newBook);

}
class createNewBook {
    construct(book){
        this.title = book.title;
        this.author = book.author;
        this.pages = book.pages;
        this.isRead = book.isRead;
    }

    get info() {
        return this.title+', '+this.author+', '+this.pages+', '+this.isRead;
    }
}

function createBookFromInput() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const isRead = document.getElementById('isRead').checked;

    return {title, author, pages, isRead}
}

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
}

function displayBookOnScreen(newBook){
    // for(const book in myLibrary){
    //     showBookOnHTML(myLibrary[book])
    // }
    showBookOnHTML(newBook);
    
}

function showBookOnHTML(book){
    let newDivRow = document.createElement("div");
    newDivRow.classList.add("displayBookRow");
    for (const item in book) {
        let newDiv = document.createElement("div");
        if (!book[item]) {
            newDiv.innerHTML = "-"
        } else {
            newDiv.innerHTML = book[item];
        }
        newDiv.classList.add("BookRowitem")
        newDivRow.appendChild(newDiv);
    }

    displayBook.appendChild(newDivRow);
}
