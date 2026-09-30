const express = require('express')
const User = require('../models/user')

const router = express.Router()

// 1- POST: Add user
router.post('/users', async (req, res) => {
  try {
    const user = new User(req.body)

    await user.save()

    res.status(201).send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})


// 2- GET: Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find()

    res.status(200).send(users)
  } catch (e) {
    res.status(500).send(e)
  }
})


// 3- GET by ID: Get one user
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).send({
        message: 'User not found'
      })
    }

    res.status(200).send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})


// 4- PATCH: Update user
router.patch('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )

    if (!user) {
      return res.status(404).send({
        message: 'User not found'
      })
    }

    res.status(200).send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})


// 5- DELETE by ID: Delete user
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
      return res.status(404).send({
        message: 'User not found'
      })
    }

    res.status(200).send({
      message: 'User deleted successfully',
      user: user
    })
  } catch (e) {
    res.status(400).send(e)
  }
})


module.exports = router