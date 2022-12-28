import {ZodError} from "zod";

export default function isErrorFromZod(object: unknown): object is ZodError {
    if (object !== null && typeof object === "object") {
        return "errors" in object;
    }

    return false;
}