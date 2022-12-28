import {parseBodyAs, z} from "@sidebase/nuxt-parse";
import {H3Event} from "h3";

const bodySchema = z.object({
    username: z.string().min(1, "Wajib diisi"),
    password: z.string().min(1, "Wajib diisi"),
    kode_lokasi: z.string().min(1, "Wajib diisi"),
    role: z.string().min(1, "Wajib diisi"),
});

export default async function registerRequest(event: H3Event) {
    return await parseBodyAs(event, bodySchema);
}
