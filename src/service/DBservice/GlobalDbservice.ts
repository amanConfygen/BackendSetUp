import { FilterQuery, Model } from 'mongoose'
import { dbSuccessResponse } from '../../utils/dbSuccessResponse'
import { dbErrorResponse } from '../../utils/dbErrorResponse'
import { ApiResponse } from '../../types/types'
import responseMessage from '../../constants/responseMessage'

export const findOneQuery = async <T>(
    model: Model<T>,
    query: FilterQuery<T> // More type-safe
): Promise<ApiResponse<T | null>> => {
    try {
        const result = await model.findOne(query)
        if (!result) {
            return dbErrorResponse(responseMessage.NOT_FOUND(String(model)))
        }
        return dbSuccessResponse('Success', result)
    } catch (error) {
        return dbErrorResponse('Error in findOneQuery', error)
    }
}

export const findAllQuery = async <T>(model: Model<T>, query: FilterQuery<T>, limit?: number, skip?: number): Promise<ApiResponse<T[]>> => {
    try {
        const result = await model
            .find(query)
            .limit(limit ?? 0)
            .skip(skip ?? 0)

        if (!result.length) {
          return dbErrorResponse(responseMessage.NOT_FOUND(String(model)))
        }
        return dbSuccessResponse('Success', result)
    } catch (error) {
        return dbErrorResponse('Error in findAllQuery', error)
    }
}

