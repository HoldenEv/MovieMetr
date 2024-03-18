import Movie from "../../models/movies";
import Review from "../../models/reviews";
import { addReview } from "../../controllers/reviewsController";

jest.mock("../../models/movies");
const mockedMovie = Movie as jest.Mocked<typeof Movie>;

jest.mock("../../models/reviews");
const mockedReview = Review as jest.Mocked<typeof Review>;

describe("Review Functions", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls after each test
  });

  describe("addReview", () => {
    it("should add a review and return the new review object", async () => {
      const mockMovieId = "movieId";
      const mockUserId = "userId";
      const mockReviewString = "Great movie!";
      const mockRating = "5";

      const mockMovie = { _id: mockMovieId };
      // Mock Movie.findOne to return a movie (assuming movie exists)
      mockedMovie.findOne = jest.fn().mockResolvedValueOnce(mockMovie);
      // Mock Review.save to return the review object
      const mockReviewObject = {
        movie_id: mockMovieId,
        user_id: mockUserId,
        review: mockReviewString,
        rating: mockRating,
        time: expect.any(Number),
      };

      mockedReview.create.mockResolvedValueOnce(mockReviewObject as any);

      mockedReview.prototype.save = jest
        .fn()
        .mockResolvedValueOnce(mockReviewObject);

      const result = await addReview(
        mockMovieId,
        mockUserId,
        mockReviewString,
        mockRating
      );

      expect(Movie.findOne).toHaveBeenCalledWith({ _id: mockMovieId });
      expect(Review).toHaveBeenCalledWith(mockReviewObject); // Ensure Review constructor was called with the expected object
      expect(Review.prototype.save).toHaveBeenCalled();
      expect(result).toEqual(mockReviewObject);
    });
  });
});
