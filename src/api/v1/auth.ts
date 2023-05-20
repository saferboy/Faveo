import { Router } from "express";

import register from "@controller/auth/register";
import login from "@controller/auth/login"; 
// import resendCode from "../../controllers/auth/resend-code";
// import status from "../../controllers/auth/status";
// import verify from "../../controllers/auth/verify";

const router = Router()

.post('/register', register)
.post('/login', login)
// .post('/resend', resendCode)
// .post('/status', status)
// .post('/verify', verify)


export default router