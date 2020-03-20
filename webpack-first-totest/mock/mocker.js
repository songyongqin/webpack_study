module.exports = {
  'GET /api/user': {name: '老大哥'},
  'POST /login/account': (req, res) => {
    const {password, username} = req.body
    console.log(req)
    if (password === '888888' && username === 'admin') {
      return res.send({
          status: 'ok',
          code: 0,
          token: 'sdfsdfsdfdsf',
          data: { id: 1, name: '啊啊' }
      })
    } else {
      return res.send({ status: 'error', code: 403 })
    }
  }
}