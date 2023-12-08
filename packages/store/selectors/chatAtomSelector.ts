import { selector } from "recoil";
import { chatAtom } from "../atoms";

export const chatAtomSelector = selector({
    key : 'chatAtomSelector',
    get: ({get}) => {
        const chat = get(chatAtom);
        return chat;
    }
})  