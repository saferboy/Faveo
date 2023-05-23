import { Router } from "express";

import allUsers from "@controller/manage-users/all-users";
import deleteUsers from "@controller/manage-users/deleteUser";
// import updateUserDetails from "../../controllers/manageUser/updateDetails";
// import updateAccess from "../../controllers/manageUser/updateAccess";
import { permission } from "@middleware/permission";

const router = Router()

    // .use(permission('user'))

    .get('/', permission(true), allUsers)
    .delete('/:id', deleteUsers)
// .put('/:id/details', updateUserDetails)
// .put('/:id/access', updateAccess)

export default router


// false == user
// true  == admin