window.onload = () => {
  renderBooks();
  renderBooksLevel2();
};

let books = [
  {
    isbn: "1600506460320",
    title: "Great book",
  },
  {
    isbn: "1600506460373",
    title: "Ok book",
  },
  {
    isbn: "1600506460521",
    title: "Bad book",
  },
  {
    isbn: "1600506460456",
    title: "Terrible book",
  },
];

function renderBooks() {
  const bookContainer = document.getElementById("books");
  if (books.length == 0) {
    bookContainer.innerHTML = "There are no books in the list 1";
  }
  books.forEach((book) => {
    bookContainer.innerHTML += `
            <div> 
            ${book.isbn}            
            </div>

            <div> 
            ${book.title}              
            </div>

           <span onclick="removeBook(${book.isbn})"> Remove <i class="fas fa-times"></i> </span>

        `;
  });
}

function renderBooksLevel2() {
  const bookContainer = document.getElementById("books-level-2");
  const booksInLocalStorage = getExistingBooks();
  if (booksInLocalStorage.length == 0) {
    bookContainer.innerHTML = "There are no books in the list 2";
  }
  booksInLocalStorage.forEach((book) => {
    bookContainer.innerHTML += `
              <div> 
              ${book.isbn}            
              </div>
  
              <div> 
              ${book.title}              
              </div>
  
             <span onclick="removeBookFromLocalStorage(${book.isbn})"> Remove <i class="fas fa-times"></i> </span>
  
          `;
  });
}

function addBook() {
  const title = document.getElementById("title").value;
  const isbn = document.getElementById("isbn").value;

  const currentBooks = getExistingBooks();

  const bookExists = currentBooks.find(function (book) {
    return book.isbn === isbn;
  });

  if (bookExists === undefined) {
    const book = { isbn: isbn, title: title };
    currentBooks.push(book);
    saveBooks(currentBooks);
  }
  document.getElementById("books-level-2").innerHTML = "";

  renderBooksLevel2();
}

function removeBook(isbn) {
  books = books.filter((book) => {
    return book.isbn != isbn;
  });
  console.log(books);
  document.getElementById("books").innerHTML = "";
  renderBooks();
}

function removeBookFromLocalStorage(isbn) {
  const currentBooks = getExistingBooks();
  const newBooks = currentBooks.filter((book) => book.isbn != isbn);
  saveBooks(newBooks);
  console.log(newBooks);
  document.getElementById("books-level-2").innerHTML = "";
  renderBooksLevel2();
}

function getExistingBooks() {
  const books = localStorage.getItem("books");

  if (books === null) {
    return [];
  } else {
    return JSON.parse(books);
  }
}

function saveBooks(books) {
  localStorage.setItem("books", JSON.stringify(books));
}
