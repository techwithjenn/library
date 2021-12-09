let bookForm = document.querySelector('#book-form')
const modal = document.querySelector('.modal');


function closeForm() {
    bookForm.classList.toggle('active')
    bookForm.style.display = 'none';
    modal.classList.toggle('active')
}

function openForm() {
    bookForm.classList.toggle('active');
    bookForm.style.display = '';
    modal.classList.toggle('active');
}

window.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.classList.toggle('active')
    }
})

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function clearFields() {
    const fields = document.querySelectorAll('input')
    console.log(fields);
    fields.forEach(element => {
        element.value = ''
    })
}

function addBook(book) {
    let title = document.querySelector('#title').value
    let author = document.querySelector('#author').value
    let pages = document.querySelector('#pages').value
    let read = document.querySelector('#read').checked
    let newBook = new Book(title, author, pages, read)
    // if (!title || !author || !pages) {
    //     alert('You must fill in all fields!')
    //     return;
    // }
    myLibrary.push(newBook)
    displayCard(newBook)
    clearFields()
    console.log(myLibrary)
}


function displayCard(book) {
    const cards = document.querySelector('#cards')

    let card = document.createElement('div')
    card.classList.add('card')
    card.setAttribute('data-index', `${myLibrary.indexOf(book)}`)
    



    let text = ''
    let checkStatus = ''

    if (book.read) {
        text = 'Read';
        checkStatus = "<input type='checkbox' name='readCheck' id='readCheck' checked='checked'></input>"
    }
    else {
        text = 'Not Read'
        checkStatus = "<input type='checkbox' name='readCheck' id='readCheck'></input>"
    }

    card.innerHTML = `
    <button type="button" class="close-button">X</button>

    <p class='cardTitle' style='font-size: 150%'>${book.title}</p>
    <p>Author: ${book.author}</p>
    <p>Pages: ${book.pages}</p>
    <p id='readUpdate'>Read Status: ${text}</p>
    <label for='readCheck'>Mark as read</label>
    ${checkStatus}


    `
    // <p><button class='removeButton'>Remove this book</button></p>
    

    let removeButton = card.querySelector('button.close-button');
    removeButton.addEventListener('click', function() {
        card.remove();
        myLibrary.splice(myLibrary.indexOf(book), 1)
    })

    let readButton = card.querySelector('input#readCheck');
    readButton.addEventListener('click', function() {
        let readStatus = card.querySelector('#readUpdate')
        
        this.read = !this.read;
        myLibrary[myLibrary.indexOf(book)].read = !myLibrary[myLibrary.indexOf(book)].read

        console.log(this)
        if (book.read) {
            readStatus.textContent = 'Read Status: Read';
        } else if (!book.read) {
            readStatus.textContent = 'Read Status: Not Read';
        }
        console.log(this.read)
    })
    cards.appendChild(card)
}


window.addEventListener('click', function() {
    let totalBooks = document.getElementById('total')
    let readBooks = document.getElementById('read-books')
    let unreadBooks = document.getElementById('unread-books')

    let libraryTotal = myLibrary.length;
    let libraryRead = 0;
    for (let count=0; count<myLibrary.length; count++) {
        if (myLibrary[count].read) {
            libraryRead += 1;
        }
    }
    let libraryUnread = libraryTotal - libraryRead

    console.log(libraryTotal)
    console.log(libraryRead)
    console.log(myLibrary)

    totalBooks.innerHTML =
    `
    <p>Total Books: ${libraryTotal}</p>
    `
    readBooks.innerHTML =
    `
    <p>Read: ${libraryRead}</p>
    `
    unreadBooks.innerHTML =
    `
    <p>Unread: ${libraryUnread}</p>
    `
})

// let userBook1 = new Book('To Kill A Mockingbird', 'RL Stine', 300, true);
// let userBook2 = new Book('Anxiety Tips', 'Wayne Dwyer', 200, true);
// let userBook3 = new Book('Dog Training', 'Cesar Milan', 100, true);
// let userBook4 = new Book('Relaxation Guidance', 'Joe Smith', 100, true);

// myLibrary.push(userBook1);
// myLibrary.push(userBook2);
// myLibrary.push(userBook3);
// myLibrary.push(userBook4);

// displayCard(userBook1);
// displayCard(userBook2);
// displayCard(userBook3);
// displayCard(userBook4);