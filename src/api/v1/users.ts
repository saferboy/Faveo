import { Router } from "express";

import allUsers from "@controller/manage-users/all-users";
import deleteUsers from "@controller/manage-users/deleteUser";
import updateUserDetails from "@controller/manage-users/update-detail";
// import updateAccess from "../../controllers/manageUser/updateAccess";
import permission from "@middleware/permission";

const router = Router()

    // .use(permission('user'))

    .get('/', permission('admin'), allUsers)
    .delete('/:id', permission('user'), deleteUsers)
    .put('/:id/details',permission('user'), updateUserDetails)
// .put('/:id/access', updateAccess)

export default router


// false == user
// true  == admin