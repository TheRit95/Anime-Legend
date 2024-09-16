import { Router } from "express"; 
import adminRequired from "../middlewares/adminRequired.js"; 
import { getAll, add, getOneById, update, remove } from "../controllers/animes.js"; 


const router = Router();

router.get("/", getAll); 
router.get("/:id", getOneById); 
router.post("/", adminRequired, add); 
router.patch("/:id", adminRequired, update);
router.delete("/:id", adminRequired, remove);

export default router;
