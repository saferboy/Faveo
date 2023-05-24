import { Router } from "express";

import allUsers from "@controller/manage-users/all-users";
import deleteUsers from "@controller/manage-users/deleteUser";
import updateDetails from "@controller/manage-users/update-detail";
import updateAccess from "@controller/manage-users/update-access";
import permission from "@middleware/permission";

const router = Router()

    // .use(permission('user'))

    .get('/', permission('admin'), allUsers)
    .delete('/:id', permission('user'), deleteUsers)
    .put('/:id/details', permission('user'), updateDetails)
    .put('/:id/access',permission('admin'), updateAccess)
    .put('/:id/access',permission('admin'), updateAccess)

export default router


// false == user
// true  == admin