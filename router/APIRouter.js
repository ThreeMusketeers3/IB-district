var adminRouter = express.Router();
APIRouter.get("/news",newsControl.newslist);
module.exports = APIRouter;