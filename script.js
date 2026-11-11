let myLibrary = [
  { title: "The Hobbit", author: "J.R.R. Tolkien", pages: 600, year: 1937, read: "Yes", id: "ab122" },
  { title: "1984", author: "George Orwell", pages: 450, year: 1949, read: "No", id: "bc453" },
  { title: "To Kill a Mockingbird", author: "Harper Lee", pages: 510, year: 1960, read: "Yes", id: "ie335" }
];

const modal = document.getElementById('form-modal');
const openFormBtn = document.getElementById('open-form-btn');
const closeFormBtn = document.getElementById('close-form-btn');
const bookForm = document.getElementById('add-book-form');

const authorInput = document.getElementById('author');
const titleInput = document.getElementById('title');
const pagesInput = document.getElementById('pages');
const yearInput = document.getElementById('year');
const readSelect = document.getElementById('read');

openFormBtn.addEventListener('click', () => {
  modal.classList.remove('hidden');
});

closeFormBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
  bookForm.reset();
});

// Live Inline Validation Listeners
authorInput.addEventListener('input', validateAuthor);
titleInput.addEventListener('input', validateTitle);
pagesInput.addEventListener('input', validatePages);
yearInput.addEventListener('input', validateYear);
readSelect.addEventListener('change', validateRead);

function validateAuthor() {
  const errorEl = document.getElementById('author-error');
  if (authorInput.validity.valueMissing) {
    errorEl.textContent = 'Author name must be filled!';
  } else if (authorInput.validity.tooShort) {
    errorEl.textContent = `Author name must be at least ${authorInput.minLength} characters.`;
  } else {
    errorEl.textContent = '';
    return true;
  }
  return false;
}

function validateTitle() {
  const errorEl = document.getElementById('title-error');
  if (titleInput.validity.valueMissing) {
    errorEl.textContent = 'Book title is required!';
  } else {
    errorEl.textContent = '';
    return true;
  }
  return false;
}

function validatePages() {
  const errorEl = document.getElementById('pages-error');
  if (pagesInput.validity.valueMissing) {
    errorEl.textContent = 'Number of pages is required!';
  } else if (pagesInput.validity.rangeUnderflow) {
    errorEl.textContent = 'Pages must be at least 1.';
  } else {
    errorEl.textContent = '';
    return true;
  }
  return false;
}

function validateYear() {
  const errorEl = document.getElementById('year-error');
  if (yearInput.validity.valueMissing) {
    errorEl.textContent = 'Published year is required!';
  } else if (yearInput.validity.rangeUnderflow || yearInput.validity.rangeOverflow) {
    errorEl.textContent = 'Please enter a valid year between 1000 and 2026.';
  } else {
    errorEl.textContent = '';
    return true;
  }
  return false;
}

function validateRead() {
  const errorEl = document.getElementById('read-error');
  if (readSelect.value === "") {
    errorEl.textContent = 'Please select a read status.';
    readSelect.setCustomValidity('Please select a read status');
  } else {
    errorEl.textContent = '';
    readSelect.setCustomValidity('');
    return true;
  }
  return false;
}

function clearErrors() {
  document.querySelectorAll('.error').forEach(el => el.textContent = '');
}

bookForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const isAuthorValid = validateAuthor();
  const isTitleValid = validateTitle();
  const isPagesValid = validatePages();
  const isYearValid = validateYear();
  const isReadValid = validateRead();

  if (isAuthorValid && isTitleValid && isPagesValid && isYearValid && isReadValid) {
    addBookToLibrary(
      authorInput.value,
      titleInput.value,
      pagesInput.value,
      yearInput.value,
      readSelect.value
    );
  
    displayBooks(myLibrary);
    modal.classList.add('hidden');
    bookForm.reset();
    clearErrors();
    alert('High five! ✋ Book added successfully.');
} else {
  alert('Please correct the validation errors before saving.');
  }
});

class Book {
  constructor(author, title, pages, year, read, id) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.year = year;
    this.read = read;
    this.id = id
  }
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
      <button class="btn btn-delete delete-btn" data-id="${book.id}">Remove</button>
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


