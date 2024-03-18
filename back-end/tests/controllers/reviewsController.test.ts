import Movie from "../../models/movies";
import Review from "../../models/reviews";
import reviewController from "../../controllers/reviewsController";
import addReview from "../../controllers/reviewsController";

jest.mock("../../models/movies");
const mockMovie = Movie as jest.Mocked<typeof Movie>;

jest.mock("../../models/reviews");
const mockReviews = Review as jest.Mocked<typeof Review>;

jest.mock("../../controllers/reviewsController");

describe('Review Functions', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls after each test
  });

  describe('addReview', () => {
    it('should add a review', async () => {
      const mockSave = jest.fn(); // Mock save function
      const MockReview = jest.fn().mockImplementation(() => ({
        save: mockSave,
      }));
      const reviewString = 'Great movie!';
      const rating = '5';

      const originalAddReview = reviewController.addReview;
  
      // Mock finding the movie
      mockMovie.findOne.mockResolvedValueOnce(true);
  
      // Call the function
      const result = await reviewController.addReview('movieId', 'userId', reviewString, rating);
      // Check if new Review() is called with the correct arguments
      expect(MockReview).toHaveBeenCalledWith({
        movie_id: 'movieId',
        user_id: 'userId',
        review: reviewString,
        rating: rating,
        time: expect.any(Number),
      });
  
      // Check if save() is called on the MockReview instance
      expect(mockSave).toHaveBeenCalled();
      
      // Ensure that the result is truthy
      expect(result).toBeTruthy();
    });
  
    // Add more test cases for error scenarios if needed
  });
});
