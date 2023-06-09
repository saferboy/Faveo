export const VERIFICATION_TIMEOUT: number = +process.env.VERIFICATION_TIMEOUT!
export const SECRET_KEY: string = process.env.SECRET_KEY!
export const EMAIL: string = process.env.EMAIL!
export const EMAIL_PASSWORD: string = process.env.EMAIL_PASSWORD!

export default {
    VERIFICATION_TIMEOUT,
    SECRET_KEY,
    EMAIL,
    EMAIL_PASSWORD
}