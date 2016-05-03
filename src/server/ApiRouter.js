import request from 'request'
import Cookies from 'cookies'

// TODO: Disable this once proper MWS server certificates are in place
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

class ApiRouter {
  static login(req, res) {
    request.post({
      url: 'https://localhost:4443/users/authenticate',
      form: {
        grantType: 'password',
        email: req.body.email,
        password: req.body.password
      },
      headers: { 'Content-Type': 'application/json; charset=UTF-8', Authorization: req.headers.authorization },
    }, (err, httpResponse, body) => {
      if (!err && httpResponse.statusCode === 200) {
        const jsonBody = JSON.parse(body)
        // const maxAge = jsonBody.expires_in * 1000
        const cookies = new Cookies(req, res)
        cookies.set('token', jsonBody.token, { httpOnly: false, overwrite: true })
        /* eslint no-param-reassign: [0] */
        // req.session.cookie.maxAge = maxAge
        req.session.user = body

        res.status(httpResponse.statusCode).setHeader('Content-Type', 'application/json; charset=UTF-8')
        return res.send(body)
        /* eslint no-else-return: [0]*/
      } else {
        const jsonBody = JSON.parse(body)
        const temp = {
          data: {
            success: false,
            message: 'Authentication failed. Wrong Credentials.'
          }
        }
        if (httpResponse.statusCode === 403) {
          return res.status(httpResponse.statusCode).send(temp)
        } else {
          return res.status(httpResponse.statusCode).send(body)
        }
      }
    })
  }
}

export default ApiRouter
