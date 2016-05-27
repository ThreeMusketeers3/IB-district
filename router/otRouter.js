var otRouter = express.Router();

otRouter.get("/",otControl.ot);

module.exports = otRouter;