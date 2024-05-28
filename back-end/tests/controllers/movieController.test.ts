import mongoose from 'mongoose';
import Movie from '../../models/movies';
import * as movieController from '../../controllers/movieController';
import { movieById } from '../../middleware/apiPuller';

//moving controller tests using mocking for all external apicalls
//and database calls
jest.mock('../../middleware/apiPuller');

//empty test to check if jest is working
test('empty test', () => {
  expect(1).toBe(1);
});