const myLibrary = [
  { title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937, read: "Yes", id: "ab122" },
  { title: "1984", author: "George Orwell", year: 1949, read: "No", id: "bc453" },
  { title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960, read: "Yes", id: "ie335" }
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
  const Book = new Book(author, title, pages, year, read, id);
  myLibrary.push(Book);
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
      <p class="book-id">Book Id: ${book.id}</p>
      <p class="read">Read: ${book.read}</p>
    `;
    container.appendChild(card);
  });
}

displayBooks(myLibrary);


