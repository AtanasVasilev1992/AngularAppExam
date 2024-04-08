const router = require("express").Router();
const museumService = require("../services/MuseumService");

const { isAuth } = require("../middlewares/authMiddleware");
const { getErrorMessage } = require("../utils/errorUtils");

router.get("/", async (req, res) => {
  const museums = await museumService.getAll().lean();
  res.json(museums);
});

router.post("/create", isAuth, async (req, res) => {
  const museumData = req.body;

  try {
    await museumService.create(req.user._id, museumData);
  } catch (err) {
    res.render({ ...museumData, error: getErrorMessage(err) });
  }
});

router.get("/:museumId", async (req, res) => {
  const museum = await museumService.getOneDetailed(req.params.museumId).lean();
  const isOwner = museum.owner && museum.owner._id == req.user?._id;

  res.json({ ...museum, isOwner });
});

router.get("/:museumId/delete", isMuseumOwner, async (req, res) => {
  await museumService.delete(req.params.museumId);
});

router.get("/:placeId/edit", isMuseumOwner, async (req, res) => {
  res.json(...req.museum);
});

router.post("/:placeId/edit", isMuseumOwner, async (req, res) => {
  const museumData = req.body;

  try {
    await museumData.edit(req.params.museumId, museumData);
  } catch (err) {
    res.json({ ...museumData, error: getErrorMessage(err) });
  }
});

async function isMuseumOwner(req, res, next) {
  const museum = await museumService.getOne(req.params.museumId).lean();

  if (museum.owner != req.user?._id) {
    return;
  }

  req.museum = museum;

  next();
}

module.exports = router;
