import { atom } from "jotai";

export const transactionAtom = atom({
    tShirt: 0,
    pants: 0,
    jeans: 0,
    shorts: 0,
    shirt: 0,
    price: '',
    startDate: '',
    duration: 0,
    endDate: '',
    type: '',
    user: ''
});