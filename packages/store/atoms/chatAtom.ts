import { atom } from "recoil";

type ChatAtomType = {
    chatId: string,
    chatTitle: string,
    convos: {role:"user"|"assistant"|"system", content:string}[],
    isLoading?: boolean,
}

export const chatAtom  = atom<ChatAtomType>({
    key:'chatAtom',
    default: {
        chatId : "",
        chatTitle: "",
        convos: [{content:"",role:'user'}],
        isLoading: true,
    } 
})