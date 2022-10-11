const express = require('express')
const router = express.Router()

const apiController = require('../controllers/apiController')

router.get('/swgoh/roster/:allycode', apiController.swgohRoster)

module.exports = router
