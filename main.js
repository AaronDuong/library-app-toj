let myLibrary = []

function Book(title, author, pages, read) {
	this.title = title
	this.author = author
	this.pages = pages
	this.read = read
	this.bookId = myLibrary.length
}

function addBookToLibrary(title, author, pages, read) {
	myLibrary.push(new Book(title, author, pages, read))
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true)
addBookToLibrary("The Lord of the Rings", "J.R.R. Tolkien", 456, false)
addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 234, true)

const parent = document.querySelector("[data-display]")

function createBookElement(book) {
	const bookElement = document.createElement("div")
	bookElement.classList.add("card")
	bookElement.innerHTML = `
        <h2>${book.title}</h2>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>Read? ${book.read}</p>
		<label for="book-${book.bookId}">Have you read it?</label>
		<input class="checkbox" id="book-${book.bookId}" type="checkbox" ${
		book.read ? "checked" : ""
	}/>
        <button data-key="${book.bookId}">Delete</button>
    `
	return bookElement
}

function displayBooks() {
	parent.innerHTML = ""
	myLibrary.forEach((book) => {
		parent.appendChild(createBookElement(book))
	})
}

document.addEventListener("DOMContentLoaded", displayBooks)

// addnewbook.addEventListener("click", () => {
// 	const title = prompt("Title")
// 	const author = prompt("Author")
// 	const pages = prompt("Pages")
// 	const read = prompt("Read")
// 	addBookToLibrary(title, author, pages, read)
// 	displayBooks()
// })

// Check the for delete button return the index of the book to delete
document.addEventListener("click", (event) => {
	if (event.target.attributes["data-key"]) {
		let index = event.target.attributes["data-key"].value
		myLibrary.splice(index, 1)
		displayBooks()
	}
})

// Get the modal
const modal = document.getElementById("myModal")

// Get the button that opens the modal
const addnbookModal = document.querySelector("[data-addbook]")
// get the addbutton on the modal to sumbit the form
const addbook = document.querySelector("#addbook")

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0]

// When the user clicks on the button, open the modal
addnbookModal.onclick = function () {
	modal.style.display = "block"
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
	modal.style.display = "none"
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none"
	}
}

addbook.addEventListener("click", () => {
	const title = document.querySelector("#title").value
	const author = document.querySelector("#author").value
	const pages = document.querySelector("#pages").value
	const read = document.querySelector("#isRead").value
	addBookToLibrary(title, author, pages, read)
	displayBooks()
	modal.style.display = "none"
})
