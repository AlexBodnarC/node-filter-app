import { Router } from "express"
import { formDataController } from "../controllers"

const formDataRouter = Router()

formDataRouter.get("/:formId/filteredResponses", formDataController.getFormData)

export default formDataRouter
