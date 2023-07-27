import express, { Router, Request, Response } from 'express'
import { getAccessibleDoors as getAccessibleDoors, getAll, getCheapestPath } from './controllers/spaceDoor/sapceDoor.controller'
import { createErrorResponse, createSuccessResponse } from './helpers'

const router: Router = express.Router()

router.get('/space-doors', async (
    req: Request,
    res: Response,
) => {
    try {
        let spaceDoors = await getAll()
        createSuccessResponse(res, spaceDoors , 200)
    } catch (ex) {
        createErrorResponse(res, ex as Error)
    }
})

router.get('/space-doors/:id/access', async (
    req: Request,
    res: Response
) => {
    try {
        let spaceDoorId = parseInt(req.params.id)
        let availableCurrency = req.query.availableCurrency ? req.query.availableCurrency : 0
        
        if(!spaceDoorId) throw Error('Missing space door id')

        let accessibleSpaceDoors = await getAccessibleDoors(spaceDoorId, availableCurrency as number)
        createSuccessResponse(res, accessibleSpaceDoors, 200)
    } catch (ex) {
        createErrorResponse(res, ex as Error)
    }
})

router.get('/space-doors/:startId/path/:endId', async(
    req: Request,
    res: Response
) => {
    try { 
        let startDoorId = parseInt(req.params.startId)
        let endDoorId = parseInt(req.params.endId)

        if(!startDoorId && !endDoorId) throw Error('Missing door ids')

        let path = await getCheapestPath(startDoorId, endDoorId)

        createSuccessResponse(res, path, 200)

    } catch (ex) {
        createErrorResponse(res, ex as Error)
    }
})

export default router