const router = require('express').Router()
const { Run, User } = require('../models')
const withAuth = require('../utils/auth')

router.get('/', async (req, res) => {
  try {
    const runData = await Run.findAll({
      include: [
        {
          model: User,
          attributes: ['name']
        }
      ]
    })

    // Serialize data so the template can read it
    const allRuns = runData.map(run => run.get({ plain: true }))

    // Get current date - we only care about the month, day, and year to show today's activity
    // so set the hours, mins, seconds to 0 to compare
    const now = new Date().setHours(0, 0, 0, 0)
    const todaysDate = new Date().toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"}) 

    let todaysRuns = []
    for (let i = 0; i < allRuns.length; i++) {
      // if the date returned from the DB of the run matches today's date
      // add it to the todaysRuns array
      if (new Date(allRuns[i].date_created).setHours(0, 0, 0, 0) == now)
        todaysRuns.push(allRuns[i])
    }
    // Pass serialized data and session flag into template
    res.render('homepage', {
      todaysDate,
      todaysRuns,
      allRuns,
      logged_in: req.session.logged_in
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/run/:id', async (req, res) => {
  try {
    const runData = await Run.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name']
        }
      ]
    })

    const run = runData.get({ plain: true })

    res.render('run', {
      ...run,
      logged_in: req.session.logged_in
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

// Use withAuth middleware to prevent access to route
router.get('/run', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Run }]
    })

    const user = userData.get({ plain: true })

    res.render('run', {
      ...user,
      logged_in: true
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/run')
    return
  }

  res.render('login')
})

module.exports = router
