import { atom } from "recoil";

type ChatsHistoryType = {
    allChats: {id:string,title:string}[];
    isLoading?: boolean;
    
}

export const chatsHistoryAtom = atom<ChatsHistoryType>({
    key:'allChatsAtom',
    default:{
        allChats:[],
        isLoading:true,
    }
})