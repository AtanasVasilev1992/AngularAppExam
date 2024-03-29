const router = require("express").Router();
const userService = require("../services/userService");

router.post("/register", async (req, res) => {
  const userData = req.body;
  const result = await userService.register(userData);

  res.json(result);
});

router.post("/login", async (req, res) => {
  const userData = req.body;
  const result = await userService.login(userData);

  res.json(result);
});

router.get("/logout", async (req, res) => {
  //!!!
  res.json({ok: true});
});


//!Just to show me users!
router.get('/', async (req, res)=> {
  const users = await userService.getAll();
  res.json(users);
})

module.exports = router;
