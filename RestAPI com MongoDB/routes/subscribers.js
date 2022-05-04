const express = require("express");
const subscriber = require("../model/subscriber");
const router = express.Router();
const Subscriber = require("../model/subscriber");

router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ menssage: error.menssage });
  }
});

router.get("/:id", getSubscriber, (req, res) => {
  res.json(res.subscriber);
});

router.post("/", async (req, res) => {
  const subscriber = new Subscriber({
    userName: req.body.userName,
    userChannel: req.body.userChannel,
  });
  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (err) {
    res.status(400).json({ menssage: error.menssage });
  }
});

router.put("/:id", getSubscriber, async (req, res) => {
  if (req.body.userName != null) {
    res.subscriber.userName = req.body.userName;
  }
  if (req.body.userChannel != null) {
    res.subscriber.userChannel = req.body.userChannel;
  }
  console.log(req.body.userName);
  console.log(req.body.userChannel);

  try {
    const updateSubscriber = await res.subscribers.save();
    res.json(updateSubscriber);
  } catch (error) {
    res.json({ menssage: "Item não alterado" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const subscribers = await Subscriber.findById(req.params.id);
    subscribers.remove();

    res.json({ menssage: "removido" });
  } catch (error) {
    res.json({ menssage: "Item não encontrado" });
  }
});

async function getSubscriber(req, res, next) {
  try {
    const subscribers = await Subscriber.findById(req.params.id);
    res.json(subscribers);
  } catch (error) {
    res.json({ menssage: "Item não encontrado" });
  }

  res.subscriber = subscriber;

  next();
}

module.exports = router;
