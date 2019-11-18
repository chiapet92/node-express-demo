import uuidv4 from "uuid/v4";
import { Router } from "express";

const router = Router();

// get all
router.get('/', async (req, res) => {
  const messages = await req.context.models.Message.findAll();
  return res.send(messages);
});

// GET : retrieve single
router.get('/:messageId', async (req, res) => {
  const message = await req.context.models.Message.findByPk(
    req.params.messageId,
  );
  return res.send(message);
});

// POST things
router.post('/', async (req, res) => {
  const message = await req.context.models.Message.create({
    text: req.body.text,
    userId: req.context.me.id,
  });

  return res.send(message);
});

// DELETE
router.delete('/:messageId', async (req, res) => {
  const result = await req.context.models.Message.destroy({
    where: { id: req.params.messageId },
  });

  return res.send(true);
});

export default router;
