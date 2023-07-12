const router = require('express').Router()
const { Run } = require('../../models')

router.post('/', async (req, res) => {
  try {
    const newRun = await Run.create({
      ...req.body,
      user_id: req.session.user_id
    })

    res.status(200).json(newRun)
  } catch (err) {
    res.status(400).json(err)
  }
})

router.delete('/:id', async (req, res) => {
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
})

module.exports = router
