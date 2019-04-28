const Ad = require('../models/Ad')
const User = require('../models/User')
const Purchase = require('../models/Purchase')
const PurchaseMail = require('../jobs/PurchaseMail')
const Queue = require('../services/Queue')

class PurchaseController {
  async store (req, res) {
    const { ad, content } = req.body

    const purchaseAd = await Ad.findById(ad).populate('author')
    const user = await User.findById(req.userId)

    Queue.create(PurchaseMail.key, {
      ad: purchaseAd,
      user,
      content
    }).save()

    await Purchase.create({ ...req.body, user: req.userId })
    res.status(200).send()
  }

  async accept (req, res) {
    const purchase = await Purchase.findById(req.params.id)
    await Ad.findOneAndUpdate(
      { _id: purchase.ad },
      { purchasedBy: purchase._id },
      {
        new: true
      }
    )
    res.status(200).send()
  }
}

module.exports = new PurchaseController()
