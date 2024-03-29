import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

const bookData = [
  {
    id: "2352",
    title: "The Old Man and The Sea",
    rating: 4.6,
    imgURL:
      "https://miro.medium.com/v2/resize:fit:1400/1*qBhLNuSbkPRhPqYkssMp0g.jpeg",
    description:
      "A down-on-his-luck fisherman named Santiago battles a massive marlin in a grueling test of endurance. Despite returning empty-handed, his perseverance in the face of defeat defines him.",
  },
  {
    id: "332",
    title: "Pride and Prejudice",
    rating: 4.2,
    imgURL:
      "https://static.faber.co.uk/wp-content/uploads/2022/09/Pride-and-Prejudice.jpg",
    description:
      "A witty and independent young woman, as she navigates social pressures and romantic entanglements in 19th-century England. Love and social status clash as Elizabeth seeks a marriage based on true respect and connection.",
  },
  {
    id: "343",
    title: "Crime and Punishment",
    rating: 4.3,
    imgURL:
      "https://upload.wikimedia.org/wikipedia/en/4/4b/Crimeandpunishmentcover.png",
    description:
      "The psychological torment of Raskolnikov, a murderer wrestling with guilt and societal expectations in 19th-century Russia. The dark exploration of morality and redemption keeps readers questioning right and wrong.",
  },
];

function App() {
  const [bookList, setBookList] = useState(bookData);
  const [selectedBook, setSelectedBook] = useState("");

  function handleAddBook(book) {
    setBookList((curr) => [...curr, book]);
  }

  function handleSelectBook(book) {
    setSelectedBook("");
    setTimeout(() => setSelectedBook(book), 600);
  }

  function handleDeSelect() {
    setSelectedBook("");
  }

  function handleDeleteBook(id) {
    setBookList((currList) => currList.filter((book) => book.id !== id));
    setSelectedBook("");
  }

  function handleUpdateBook(updatedBook) {
    setBookList((currList) =>
      currList.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
  }

  return (
    <>
      <Header />
      <main>
        <div className="container">
          <BookList books={bookList} selectBook={handleSelectBook} />
          {!selectedBook && <AddBooks addBook={handleAddBook} />}

          {selectedBook && (
            <EditBook
              updateBook={handleUpdateBook}
              currBook={selectedBook}
              closeBook={handleDeSelect}
              deletebook={handleDeleteBook}
            />
          )}
          <div className="clear"></div>
        </div>
      </main>
    </>
  );
}

function Header() {
  return (
    <header>
      <h1>My Book Library</h1>
      <p>The mind is everything. What you think you become.</p>
    </header>
  );
}

function BookList({ books, selectBook }) {
  return (
    <div className="book-list">
      {books.map((book) => (
        <BookItem book={book} key={book.id} selectBook={selectBook} />
      ))}
    </div>
  );
}

function BookItem({ book, selectBook }) {
  return (
    <div
      className="book-item"
      onClick={() => {
        selectBook(book);
      }}
    >
      <div className="img-box">
        <img src={book.imgURL} alt={book.title} />
      </div>
      <div className="title">
        <p>{book.title}</p>
      </div>
      <div className="rating">
        <p>{book.rating}/5</p>
      </div>
      <div className="book-desc">
        <p>{book.description}</p>
      </div>
    </div>
  );
}

function AddBooks({ addBook }) {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");
  const [url, setURL] = useState("");
  const [desc, setDesc] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!title || !rating || !url || !desc) return;
    const id = crypto.randomUUID();
    const newBook = {
      title,
      rating,
      imgURL: url,
      description: desc,
      id,
    };
    addBook(newBook);

    setTitle("");
    setRating("");
    setURL("");
    setDesc("");
  }

  return (
    <div className="side-menu">
      <div className="add-new-book">
        <div className="head-line">
          <h2>Add New Book</h2>
        </div>
        <form className="book-form" onSubmit={handleSubmit}>
          <label>Title: </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />{" "}
          <br /> <br />
          <label>Rating: </label>
          <input
            type="number"
            className="rating"
            value={rating}
            onChange={(e) =>
              setRating(
                Number(e.target.value) < 5 ? Number(e.target.value) : rating
              )
            }
          />{" "}
          <span>/5.0</span>
          <br /> <br />
          <label>Image URL: </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setURL(e.target.value)}
          />{" "}
          <br />
          <br />
          <label>Description: </label>
          <br />
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>{" "}
          <br /> <br />
          <button className="submit">Add</button>
        </form>
      </div>
    </div>
  );
}

function EditBook({ updateBook, currBook, closeBook, deletebook }) {
  const [title, setTitle] = useState(currBook.title);
  const [rating, setRating] = useState(currBook.rating);
  const [url, setURL] = useState(currBook.imgURL);
  const [desc, setDesc] = useState(currBook.description);

  function handleSubmit(e) {
    e.preventDefault();

    if (!title || !rating || !url || !desc) return;
    const newBook = {
      title,
      rating,
      imgURL: url,
      description: desc,
      id: currBook.id,
    };
    updateBook(newBook);
  }

  return (
    <div className="side-menu">
      <div className="add-new-book">
        <div className="head-line">
          <h2>{currBook ? "Book Info" : "Add New Book"}</h2>
        </div>
        <form className="book-form" onSubmit={handleSubmit}>
          <label>Title: </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />{" "}
          <br /> <br />
          <label>Rating: </label>
          <input
            type="number"
            className="rating"
            value={rating}
            onChange={(e) =>
              setRating(
                Number(e.target.value) < 5 ? Number(e.target.value) : rating
              )
            }
          />{" "}
          <span>/5.0</span>
          <br /> <br />
          <label>Image URL: </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setURL(e.target.value)}
          />{" "}
          <br />
          <br />
          <label>Description: </label>
          <br />
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>{" "}
          <br /> <br />
          <button className="submit">Update Info</button>
        </form>
        <button className="close" onClick={closeBook}>
          Close
        </button>
        <button className="delete" onClick={() => deletebook(currBook.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default App;
