import { atom } from "recoil";
import {signIn,signOut,useSession} from 'auth'

export const authAtom = atom({
    key: 'authAtom',
    default:{signIn, signOut, useSession}
})

