const Mail = require('../services/Mail')

class PurchaseMail {
  get key () {
    return 'PurchaseMail'
  }

  async handle (job, done) {
    const { ad, user, content } = job.data

    await Mail.sendMail({
      from: '"Andrius Cunha Castro" <andrius.castro@gpssa.com.br>',
      to: ad.author.email,
      subject: `${ad.title} purchase order`,
      template: 'purchase',
      context: { user, content, ad }
    })
    return done()
  }

  // async accept (job, done) {
  //   const { ad } = job.data

  //   return done()
  // }
}

module.exports = new PurchaseMail()
