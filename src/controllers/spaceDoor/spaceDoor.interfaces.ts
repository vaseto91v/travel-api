export interface ISpaceDoor {
    id: number
    name: string
    links: Array<ILink>
    coordinates: ICoordinates
}

declare interface ICoordinates {
    x: number,
    y: number
}

export interface ILink {
    to: ISpaceDoor['id'],
    cost: number
}

export interface IPath {
    pathWay: Array<ISpaceDoor>,
    totalCost: number,
}