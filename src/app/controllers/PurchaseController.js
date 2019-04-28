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

    const ad = await Ad.findById(purchase.ad).populate('author')

    if (!ad.author._id.equals(req.userId)) {
      return res.status(401).json({ error: "You're not the Ad author" })
    }

    if (ad.purchasedBy) {
      return res
        .status(400)
        .json({ error: 'This Ad already has an approved purchase request' })
    }

    ad.purchasedBy = purchase._id
    ad.save()

    res.status(200).json(ad)
  }
}

module.exports = new PurchaseController()
