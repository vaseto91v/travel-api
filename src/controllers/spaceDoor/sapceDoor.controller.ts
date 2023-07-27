import {
    calculateCheapestPath,
    calculatePathTotalCost,
    getPathWay,
    getSpaceDoor,
    getSpaceDoorData,
    reachedDestination
} from "./spaceDoor.helpers"
import { ISpaceDoor, IPath } from "./spaceDoor.interfaces"

export const getAll = async (): Promise<Array<ISpaceDoor>> => {
    let spaceDoors = await getSpaceDoorData()

    return spaceDoors
}

export const getAccessibleDoors = async (id: ISpaceDoor['id'], availableCurrency: number): Promise<Array<ISpaceDoor>> => {

    const spaceDoor = await getSpaceDoor(id)
    const affordableDestinations = spaceDoor.links.filter(link => link.cost <= availableCurrency)
    let accessibleDoors: Array<ISpaceDoor> = []

    for (let affordableDestination of affordableDestinations) {
        let accessibleSpaceDoor = await getSpaceDoor(affordableDestination.to)
        accessibleDoors.push(accessibleSpaceDoor)
    }

    return accessibleDoors
}

export const getCheapestPath = async (
    startDoorId: ISpaceDoor['id'],
    endDoorId: ISpaceDoor['id']
) => {

    let paths: Array<IPath> = []

    let startDoor = await getSpaceDoor(startDoorId)
    for (let link of startDoor.links) {
        let door = await getSpaceDoor(link.to)
        let pathWay = await getPathWay(door, endDoorId)
        if (pathWay) {
            pathWay.splice(0, 0, startDoor)
            let path = calculatePathTotalCost({ pathWay, totalCost: 0 })
            paths.push(path)
        }
    }
    let cheapestPath = calculateCheapestPath(paths)
    if (!reachedDestination(cheapestPath.pathWay, endDoorId)) {
        throw Error('No available path')
    }

    return cheapestPath
}

