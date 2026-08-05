let myLibrary = [
  { title: "The Hobbit", author: "J.R.R. Tolkien", pages: 600, year: 1937, read: "Yes", id: "ab122" },
  { title: "1984", author: "George Orwell", pages: 450, year: 1949, read: "No", id: "bc453" },
  { title: "To Kill a Mockingbird", author: "Harper Lee", pages: 510, year: 1960, read: "Yes", id: "ie335" }
];

const modal = document.getElementById('form-modal');
const openFormBtn = document.getElementById('open-form-btn');
const closeFormBtn = document.getElementById('close-form-btn');
const bookForm = document.getElementById('add-book-form');

openFormBtn.addEventListener('click', () => {
  modal.classList.remove('hidden');
});

closeFormBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
  bookForm.reset();
});

bookForm.addEventListener('submit', (event) => {
  event.preventDefault();

  addBookToLibrary(
    document.getElementById('author').value,
    document.getElementById('title').value,
    document.getElementById('pages').value,
    document.getElementById('year').value,
    document.getElementById('read').value
  );

  displayBooks(myLibrary);
  modal.classList.add('hidden');
  bookForm.reset();
});

function Book(author, title, pages, year, read, id) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
  this.year = year;
  this.id = id;
}

function addBookToLibrary(author, title, pages, year, read) {
  const id = crypto.randomUUID();
  const newBook = new Book(author, title, pages, year, read, id);
  myLibrary.push(newBook);
}

function displayBooks(bookArray) {
  const container = document.getElementById('book-container');
  container.innerHTML = '';

  bookArray.forEach(book => {
    const card = document.createElement('div');
    card.className = 'book-card';

    const toggleBtnText = book.read === "Yes" ? "Mark Unread" : "Mark Read";
    const toggleBtnClass = book.read === "Yes" ? "btn-unread" : "btn-read";

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p class="author">By: ${book.author}</p>
      <p class="pages">Pages: ${book.pages}</p>
      <p class="year">Published: ${book.year}</p>
      <p class="read">Read: <strong>${book.read}</strong></p>
      <div class="card-actions">
      <button class="btn ${toggleBtnClass} toggle-status-btn" data-id="${book.id}">${toggleBtnText}</button>
      <button class="btn btn-delete delete-btn" data-id="${book.id}">Delete</button>
      </div>
    `;
    container.appendChild(card);
  });

  setupToggleListners();
  setupDeleteListeners();
}

function setupToggleListners() {
  const toggleButtons = document.querySelectorAll('.toggle-status-btn');

  toggleButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const bookId = event.target.getAttribute('data-id');
      const targetBook = myLibrary.find(book => book.id === bookId);

      if (targetBook) {
        targetBook.read = targetBook.read === "Yes" ? "No" : "Yes";

        displayBooks(myLibrary);
      }
    });
  });
}

function setupDeleteListeners() {
  const deleteButtons = document.querySelectorAll('.delete-btn');

  deleteButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const bookId = event.target.getAttribute('data-id');
      const targetBook = myLibrary.find(book => book.id === bookId);
      const bookTitle = targetBook ? `"${targetBook.title}"` : "this book";
      const userConfirmed = window.confirm(`Are you sure you want to permanently delete ${bookTitle}`);

      if (userConfirmed) {
        myLibrary = myLibrary.filter(book => book.id != bookId);
        displayBooks(myLibrary);
      }

    });
  });
}

displayBooks(myLibrary);


