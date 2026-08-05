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


const myLibrary = [
  { title: "The Hobbit", author: "J.R.R. Tolkien", pages: 600, year: 1937, read: "Yes", id: "ab122" },
  { title: "1984", author: "George Orwell", pages: 450, year: 1949, read: "No", id: "bc453" },
  { title: "To Kill a Mockingbird", author: "Harper Lee", pages: 510, year: 1960, read: "Yes", id: "ie335" }
];

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
    card.innerHTML = `
      <h3>${book.title}</h3>
      <p class="author">By: ${book.author}</p>
      <p class="pages">Pages: ${book.pages}</p>
      <p class="year">Published: ${book.year}</p>
      <p class="read">Read: ${book.read}</p>
    `;
    container.appendChild(card);
  });
}

displayBooks(myLibrary);


