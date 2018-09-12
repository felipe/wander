import { MapOct } from './mapOct'
import { MapSquare } from './mapSquare'

export interface Oct {
    readonly topLeft: Oct | MapSquare | MapOct | null
    readonly top: Oct | MapSquare | MapOct | null
    readonly topRight: Oct | MapSquare | MapOct | null

    readonly left: Oct | MapSquare | MapOct | null
    readonly right: Oct | MapSquare | MapOct | null

    readonly bottomLeft: Oct | MapSquare | MapOct | null
    readonly bottom: Oct | MapSquare | MapOct | null
    readonly bottomRight: Oct | MapSquare | MapOct | null
}
