import { useEffect, useState } from "react";
import BookModel from "../../Models/BookModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { StarsReview } from "../Utils/StarReview";
import { CheckOutAndReviewBook } from "./CheckOutAndReviewBook";
import ReviewModel from "../../Models/ReviewModel";
import { LatesReviews } from "./LatestReviews";
export const BookCheckOutPage = () => {
  const [book, setBook] = useState<BookModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  //Review state

  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [totalStarts, setTotalStars] = useState(0);
  const [isLoadingReview, setIsLoadingReview] = useState(true);

  const bookId = window.location.pathname.split("/")[2];
  useEffect(() => {
    const fetchBooks = async () => {
      const baseUrl: string = `http://localhost:8080/api/books/${bookId}`;

      const response = await fetch(baseUrl);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseJson = await response.json();

      const loadedBook: BookModel = {
        id: responseJson.id,
        title: responseJson.title,
        author: responseJson.author,
        description: responseJson.description,
        copies: responseJson.copies,
        copiesAvailable: responseJson.copiesAvailable,
        category: responseJson.category,
        img: responseJson.img,
      };

      setBook(loadedBook);
      console.log(loadedBook);

      setIsLoading(false);
    };
    fetchBooks().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  useEffect(() => {
    const fetchBookReviews = async () => {
      const reviewUrl: string = `http://localhost:8080/api/reviews/search/findByBookId?bookId${bookId}`;
      const responsReviews = await fetch(reviewUrl);
      if (!responsReviews.ok) {
        throw new Error("Somthings went wrong");
      }
      const responsReviewsJson = await responsReviews.json();
      const reviewsData = responsReviewsJson._embedded.reviews;
      const loadedReviews: ReviewModel[] = [];
      let weightedStarReviews = 0;
      for (const key in reviewsData) {
        loadedReviews.push({
          id: reviewsData[key].id,
          userEmail: reviewsData[key].userEmail,
          date: reviewsData[key].date,
          rating: reviewsData[key].rating,
          book_id: reviewsData[key].bookId,
          reviewDescription: reviewsData[key].reviewDescription,
        });
        weightedStarReviews = weightedStarReviews + reviewsData[key].rating;
      }
      if (loadedReviews) {
        const round = (
          Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2
        ).toFixed(1);
        setTotalStars(Number(round));
      }
      setReviews(loadedReviews);
      setIsLoadingReview(false);
    };
    fetchBookReviews().catch((error: any) => {
      setIsLoadingReview(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading || isLoadingReview) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }
  return (
    <div>
      <div className="container d-none d-lg-block">
        <div className="row mt-5">
          <div className="col-sm-2 col-md-2">
            {book?.img ? (
              <img src={book?.img} width="226" height={348} alt="book" />
            ) : (
              <img
                src={require("../../Images/BooksImages/book-luv2code-1000.png")}
                width="226"
                height={348}
                alt="book"
              />
            )}
          </div>
          <div className="col-4 col-md-4 container">
            <div className="ml-2">
              <h3>{book?.title}</h3>
              <h5 className="text-primary">{book?.author}</h5>
              <p className="lead">{book?.description}</p>
            </div>
          </div>
          <CheckOutAndReviewBook book={book} mobile={false} />
        </div>
        <hr />
        <LatesReviews reviews={reviews} bookId={book?.id} mobile={false} />
      </div>
      <div className="container d-lg-none mt-5">
        <div className="d-flex justify-content-center align-items-centet">
          {book?.img ? (
            <img src={book?.img} width="226" height={348} alt="book" />
          ) : (
            <img
              src={require("../../Images/BooksImages/book-luv2code-1000.png")}
              width="226"
              height={348}
              alt="book"
            />
          )}
        </div>
        <div className="mt-4">
          <div className="ml-2">
            <h2>{book?.title}</h2>
            <h5 className="text-primary">{book?.author}</h5>
            <p className="lead">{book?.description}</p>
          </div>
        </div>
        <CheckOutAndReviewBook book={book} mobile={true} />
        <LatesReviews reviews={reviews} bookId={book?.id} mobile={true} />
        <hr />
      </div>
    </div>
  );
};
