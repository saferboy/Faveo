import { Router } from "express";

import register from "@controller/auth/register";
import login from "@controller/auth/login";
import resendCode from "@controller/auth/resend-code";
import status from "@controller/auth/status";
import verify from "@controller/auth/verify";

const router = Router()

    .post('/register', register)
    .post('/login', login)
    .post('/resend', resendCode)
    .get('/status?id', status)
    .post('/verify', verify)


export default router