import { AccountI } from "../types/tsinterfaces";

export const accountData: AccountI[] = [
        {
            id: 5,
            name: "Osmar Reis",
            initalAmount: 50,
            productsBought: [
                {id: 1, name: "Refri", quantity: 2},
                {id: 3, name: "Bis", quantity: 3}
            ]
    },
        {
            id: 3,
            name: "Amauri",
            initalAmount: 20,
            productsBought: [
                {id: 1, name: "Refri", quantity: 1},
                {id: 3, name: "Bis", quantity: 1},
            ]
    },
        {
            id: 1,
            name: "Davi Vale",
            initalAmount: 50,
            productsBought: [
                {id: 1, name: "Refri", quantity: 1},
                {id: 3, name: "Bis", quantity: 2},
            ]
    },
        {
            id: 2,
            name: "Guilherme Kauan",
            initalAmount: 50,
            productsBought: [
                {id: 1, name: "Refri", quantity: 3},
                {id: 3, name: "Bis", quantity: 2},
            ]
    },
]