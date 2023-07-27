import { Response } from 'express'

const commonResponseHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json ',
}

export const createErrorResponse = (
    res: Response,
    ex: Error,
    statusCode: number = 503
) => {
    const body = JSON.stringify(ex, Object.getOwnPropertyNames(ex))
    res.set(commonResponseHeaders).status(statusCode).send(body)
}

export const createSuccessResponse = (
    res: Response,
    body: Object | String,
    statusCode: number = 200
) => {
    body = typeof body === 'object' ? JSON.stringify(body) : body
    res.set(commonResponseHeaders).status(statusCode).send(body)
}