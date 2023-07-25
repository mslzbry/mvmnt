const router = require('express').Router();
const { Run, User } = require('../../models');
const withAuth = require('../../utils/auth');

// The `/api/runs` endpoint

router.get('/', async (req, res) => {
  try {
    const newRun = await Run.findAll({
      include: [{ model: User }]
    })

    res.status(200).json(newRun)
  } catch (err) {
    res.status(400).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try {
    const newRun = await Run.findByPk(req.params.id, {
      include: [{ model: User }]
    })

    res.status(200).json(newRun)
  } catch (err) {
    res.status(400).json(err)
  }
});

router.post('/', withAuth, async (req, res) => {
  console.log('create a new run api')
  try {
    const newRun = await Run.create({
      ...req.body,
      user_id: req.session.user_id
    })

    res.status(200).json(newRun)
  } catch (err) {
    console.log('error is ', err)
    res.status(400).json(err)
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const runData = await Run.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    })

    if (!runData) {
      res.status(404).json({ message: 'No run found with this id!' })
      return
    }

    res.status(200).json(runData)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
