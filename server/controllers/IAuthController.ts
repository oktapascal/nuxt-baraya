export interface IAuthController {
    login(): Promise<void>
    save(): Promise<void>

    logout(): Promise<void>
}