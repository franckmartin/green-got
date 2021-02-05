
//import chai from 'chai'
//import chaiHttp from 'chai-http'
let chai = require('chai');
let chaiHttp = require('chai-http')

chai.use(chaiHttp)
let should = chai.should()

const server = 'http://localhost:3000'

describe("/api/create_user", () => {
  it("Accepts only POST method. Otherwise returns 405 status + error message.", (done) => {
    chai
      .request(server)
      .get('/api/create_user')
      .end((err, res) => {
        res.should.have.status(405)
        res.should.have.header('Allow', 'POST')
        res.body.should.be.an('object').that.has.all.keys('status', 'message')
        done()
      })
  })
})

describe("/api/greetings/[first_name]", () => {
  it("Accepts only GET method. Otherwise returns 405 status + error message.", (done) => {
    chai
      .request(server)
      .post('/api/greetings/franck')
      .end((err, res) => {
        res.should.have.status(405)
        res.should.have.header('Allow', 'GET')
        res.body.should.be.an('object').that.has.all.keys('status', 'message')
        done()
      })
  })
})

//export {}