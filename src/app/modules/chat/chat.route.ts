import  express  from "express";
import validateRequest from "../../middlewares/validateRequest";
import { messageValidatio } from "./chat.validation";
import { chatController } from "./chat.controller";
import { USER_ROLE } from "../user/user.constant";
import auth from "../../middlewares/auth";
import fileUploadHandler from "../../middlewares/fileUploadHandler";


const router = express.Router()
   

// Define the upload folder
const UPLOADS_FOLDER_USER_DOCUMENTS = 'uploads/messages_photos';
const upload = fileUploadHandler(UPLOADS_FOLDER_USER_DOCUMENTS)

router.post(
    '/send-message',
    auth( USER_ROLE.admin, USER_ROLE.user, USER_ROLE.super_admin),
    upload.single('messagePhoto'),
    validateRequest(messageValidatio.MessageVallidationmSchema),
    chatController.createMessage
)
router.get(
    '/messages/:userId1/:userId2',
    auth( USER_ROLE.admin, USER_ROLE.user, USER_ROLE.super_admin),
    chatController.getMessage
)

export const messageRoutes = router;