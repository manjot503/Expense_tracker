import {atom} from "recoil"

export const pageState = atom({
    key:"pageState",
    default:"home"
})

export const dateState= atom({
    key:"dateState",
    default:[]
})