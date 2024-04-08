const router = require("express").Router();
const placeService = require("../services/PlaceService");

const { isAuth } = require("../middlewares/authMiddleware");
const { getErrorMessage } = require("../utils/errorUtils");

router.get("/", async (req, res) => {
  const places = await placeService.getAll().lean();
  res.json(places);
});

router.post("/create", isAuth, async (req, res) => {
  const placeData = req.body;

  try {
    await placeService.create(req.user._id, placeData);
  } catch (err) {
    res.render({ ...placeData, error: getErrorMessage(err) });
  }
});

router.get("/:placeId", async (req, res) => {
  const place = await placeService.getOneDetailed(req.params.placeId).lean();
  const isOwner = place.owner && place.owner._id == req.user?._id;

  res.json({ ...place, isOwner });
});

router.get("/:placeId/delete", isPlaceOwner, async (req, res) => {
  await placeService.delete(req.params.placeId);
});

router.get("/:placeId/edit", isPlaceOwner, async (req, res) => {
  res.json(...req.place);
});

router.post("/:placeId/edit", isPlaceOwner, async (req, res) => {
  const placeData = req.body;

  try {
    await placeData.edit(req.params.placeId, placeData);
  } catch (err) {
    res.json({ ...placeData, error: getErrorMessage(err) });
  }
});

async function isPlaceOwner(req, res, next) {
  const place = await placeService.getOne(req.params.placeId).lean();

  if (place.owner != req.user?._id) {
    return;
  }

  req.place = place;

  next();
}

module.exports = router;
