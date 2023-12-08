import { selector } from "recoil";
import { authAtom } from "../atoms";

export const authAtomSelector = selector({
    key : 'authAtomSelector',
    get : ({get}) => {
        const authOpts = get(authAtom);
        return authOpts;
    }
})