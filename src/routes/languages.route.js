const express = require('express')
const router = express.Router()

const languagesController = require('../controllers/languages.controller')
const languageController = require('../controllers/language.controller')

// GET all languages
router.get('/', languagesController.get)

// GET language by id
router.get('/:id', languageController.get)

module.exports = router