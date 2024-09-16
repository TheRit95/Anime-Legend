import { Router } from "express"; 
import { getAll, add, getOneById, update, remove } from "../controllers/animes.js"; 
import adminRequired from "../middlewares/adminRequired.js"; 

const router = Router();

router.get("/", getAll); 
router.get("/:id", getOneById); 
router.post("/", adminRequired, add); 
router.patch("/:id", adminRequired, update);
router.delete("/:id", adminRequired, remove);

export default router;
