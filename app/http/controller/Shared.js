const Shared = require('../../model/Shared');

class shareController {
  async createImage (req, res) {
    console.log(req.file)
    const share = new Shared({
      file: req.file.path.slice(8)
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