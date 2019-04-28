const User = require('../models/User')

class SessionController {
  async store (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    if (!(await user.compareHash(password))) {
      return res.json({ error: 'User not found' })
    }

    return res.status(200).json({ user, token: User.generateToken(user) })
  }
}

module.exports = new SessionController()
