export const ReturnBook = () => {
  return (
    <div className="col-xs-6 col-sm-6 col-lg-3 mb-3">
      <div className="text-center">
        <img
          src={require("./../../../Images/BooksImages/book-luv2code-1000.png")}
          alt="book"
          height="233"
          width="133"
        />
        <h6 className="mt-2">Book</h6>
        <p className="">luv2code</p>
        <a href="#" className="btn main-color text-white">
          Reservce
        </a>
      </div>
    </div>
  );
};
