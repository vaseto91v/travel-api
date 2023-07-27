import fs from 'fs-extra'
import { IPath, ISpaceDoor } from "./spaceDoor.interfaces"

export const getSpaceDoorData = async (): Promise<Array<ISpaceDoor>> => {
    const file = await fs.readFile('src/data/space-time-continuum.json')
    const data: Array<ISpaceDoor> = JSON.parse(file.toString())
    return data
}

export const getPathWay = async (startDoor: ISpaceDoor, endDoorId: ISpaceDoor['id'], path: Array<ISpaceDoor> = []): Promise<Array<ISpaceDoor> | undefined> => {
    if (!reachedDestination(path, endDoorId)) {
        if (!path.find(p => p.id === startDoor.id)) {
            path.push(startDoor)
        }
        if (canTravel(startDoor, endDoorId)) {
            path.push(await getSpaceDoor(endDoorId))

        } else {
            for (let link of startDoor.links) {
                let door = await getSpaceDoor(link.to)
                if (!path.find(p => p.id === door.id)) {
                    await getPathWay(door, endDoorId, path)
                }
            }
        }
    }

    return path

}

export const getSpaceDoor = async (id: ISpaceDoor['id']): Promise<ISpaceDoor> => {
    const spaceDoors = await getSpaceDoorData()

    const spaceDoor = spaceDoors.find(door => door.id === id)

    if (!spaceDoor) throw Error('Space door not found')

    return spaceDoor
}

export const canTravel = (spaceDoor: ISpaceDoor, destinationId: ISpaceDoor['id']): boolean => {
    return spaceDoor.links.find(link => link.to === destinationId) ? true : false
}

export const calculatePathTotalCost = (path: IPath) => {
   path.pathWay.forEach((door, index, pathWay) => {
        if (index !== pathWay.length - 1) {
            let nextLink = door.links.find(link => link.to === pathWay[index + 1].id)
            path.totalCost = path.totalCost + (nextLink ? nextLink.cost : 0)
        }
    })

    return path
}

export const calculateCheapestPath = (paths: Array<IPath>) => {
    let cheapestPath = paths.reduce((path, nextPath) => path.totalCost < nextPath.totalCost ? path : nextPath)

    return cheapestPath
}

export const reachedDestination = (path: Array<ISpaceDoor>, endDoorId: ISpaceDoor['id']) => {
    return path.find(p => p.id === endDoorId) ? true : false
}