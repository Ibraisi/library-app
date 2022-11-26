import BookModel from "../../../Models/BookModel";
export const ReturnBook: React.FC<{ book: BookModel }> = (props) => {
  return (
    <div className="col-xs-6 col-sm-6 col-lg-3 mb-3">
      <div className="text-center">
        {props.book.img ? (
          <img src={props.book.img} alt="book" height="233" width="133" />
        ) : (
          <img
            src={require("./../../../Images/BooksImages/book-luv2code-1000.png")}
            alt="book"
            height="233"
            width="133"
          />
        )}
        <h6 className="mt-2">{props.book.title}</h6>
        <p className="">{props.book.author}</p>
        <a href="#" className="btn main-color text-white">
          Reservce
        </a>
      </div>
    </div>
  );
};
