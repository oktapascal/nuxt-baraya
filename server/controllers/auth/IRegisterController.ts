import { H3Event } from 'h3'
export interface IRegisterController {
    save(event: H3Event): Promise<void>
}