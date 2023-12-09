import { selector } from "recoil";
import { chatsHistoryAtom } from "../atoms/chatsHistoryAtom";


export const chatsHistorySelector = selector({
    key:'chatsHistorySelector',
    get: ({get})=>{
        const allChats = get(chatsHistoryAtom);
        return allChats;
    }
})