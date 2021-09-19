const Shared = require('../../model/Shared');

class shareController {
  async createImage (req, res) {
    const share = new Shared({
      file: req.file.path
    })

    share.save()
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json({
           error: err
        })
      })
  }
}

module.exports = new shareController()