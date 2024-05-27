import mockingoose from 'mockingoose';
import Movie from '../../models/movies';
import * as movieController from '../../controllers/movieController';
import { movieById } from '../../middleware/apiPuller';
import { types } from 'util';

jest.mock('../../middleware/apiPuller');

describe('movieController.addMovie', () => {
  beforeEach(() => {
    mockingoose.resetAll();
    jest.clearAllMocks();
  });

  it('should add a new movie if it does not exist', async () => {
    // Mocking Movie.findOne to return null, simulating that the movie does not exist
    mockingoose(Movie).toReturn(null, 'findOne');
    // Mocking the external API call to return a fake movie object
    (movieById as jest.Mock).mockResolvedValue({
      id: '1',
      title: 'Test Movie',
      release_date: '2022-01-01',
      overview: 'A test movie',
      poster_path: '/path/to/poster',
      genres: [{ id: '10', name: 'Action' }]
    });

    // Mocking Movie.save using Mockingoose
    mockingoose(Movie).toReturn({
      _id: '1',
      title: 'Test Movie',
      year: '2022-01-01',
      summary: 'A test movie',
      image_path: '/path/to/poster'
    }, 'save');

    // Calling the addMovie function
    const result = await movieController.addMovie('1');

    // Assertions
    expect(result).toHaveProperty('_id', '1');
    expect(result).toHaveProperty('title', 'Test Movie');
    expect(movieById).toHaveBeenCalledWith('1');
    // Verify that Movie.save was called
    const savedMovie = await Movie.findOne({ _id: '1' });
    expect(savedMovie).toEqual({
      _id: '1',
      title: 'Test Movie',
      year: '2022-01-01',
      summary: 'A test movie',
      image_path: '/path/to/poster'
    });
  });
});
    
