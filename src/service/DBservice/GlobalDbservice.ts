import { FilterQuery, Model } from 'mongoose';
import { dbSuccessResponse } from '../../utils/dbSuccessResponse';
import { dbErrorResponse } from '../../utils/dbErrorResponse';
import { ApiResponse } from '../../types/types';

export const findOneQuery = async <T>(
  model: Model<T>,
  query: FilterQuery<T>  // More type-safe
): Promise<ApiResponse<T | null>> => {
  try {
 const result = await model.findOne(query);
    if (!result) {
      return dbErrorResponse('No record found');
    }
    return dbSuccessResponse('Success', result);
  } catch (error) {
    return dbErrorResponse('Error in findOneQuery', error);
  }
};







