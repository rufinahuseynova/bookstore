import { useEffect, useState } from "react";
import "../css/books.css";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/books")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const filteredBooks = books.filter((book) =>
    `${book.title} ${book.author}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (book) => {
    setCart((prevCart) => {
      const existingBook = prevCart.find((item) => item.id === book.id);
      if (existingBook) {
        return prevCart.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...book, quantity: 1 }];
    });
    setShowCart(true);
  };

  const removeFromCart = (bookId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== bookId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <div className="flex">
        <span className="logo">
          <img src="https://kitabchi.az/static/image/kitabchi_logo.png" alt="" />
        </span>
        <span className="search-bar">
          <input
            type="text"
            placeholder="Yazar adı və ya kitab adı ilə axtar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </span>
        <div className="cart-icon" onClick={() => setShowCart(!showCart)}>
          🛒 <span>({cart.length})</span>
        </div>
      </div>

      <div className="book-list">
        {filteredBooks.map((book) => (
          <div key={book.id} className="book">
            <img src={book.cover_image} alt={book.title} />
            <h3>{book.title}</h3>
            <p>Yazar: {book.author}</p>
            <p>Qiymət: {book.price} AZN</p>
            <p>Çap ili: {book.year}</p>
            <p>Səhifə sayı: {book.pages}</p>
            <p>Janrı: {book.genre}</p>
            <div
              className="hover-cart-icon"
              onClick={() => addToCart(book)}
              title="Sebete Elave Et"
            >
              🛒
            </div>
          </div>
        ))}
      </div>

     
      {showCart && (
        <div className="cart">
          <button className="close-cart" onClick={() => setShowCart(false)}>
            X
          </button>
          <h2>Sizin Səbətiniz</h2>
          {cart.length === 0 ? (
            <p>Səbət boşdur</p>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <p>
                    {item.title} ({item.quantity} ədəd) - {item.price} AZN
                  </p>
                  <button
                    className="remove-item"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Sil
                  </button>
                </div>
              ))}
              <h3>Ümumi Qiymət: {totalPrice} AZN</h3>
              <button className="confirm-cart" onClick={() => clearCart()}>
                Səbəti Təsdiqlə
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Books;
