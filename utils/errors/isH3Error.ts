import {H3Error} from "h3";

export default function isH3Error(object: unknown): object is H3Error {
    if (object !== null && typeof object === "object") {
        return "data" in object;
    }

    return false;
}