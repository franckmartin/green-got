import chai from 'chai'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)
let should = chai.should()

const server = 'http://localhost:3000'

describe("/api/create_user", () => {
  it("Accepts only POST method", (done) => {
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

  it('Create an user', (done) => {
    let user = {
        firstName: "Franck",
        lastName: "Martin"
    }
    chai.request(server)
      .post('/api/create_user')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.an('object')
        res.body.should.have.property('payload')
        res.body.payload.should.have.property('firstName').eql(user.firstName.toUpperCase())
        res.body.payload.should.have.property('lastName').eql(user.lastName.toUpperCase())
        done()
    })
  })

  it("Don't create an user without lastname", (done) => {
    let user = {
        firstName: "Franck"
    }
    chai.request(server)
      .post('/api/create_user')
      .send(user)
      .end((err, res) => {
        res.should.have.status(422)
        res.body.should.be.an('object').that.has.all.keys('status', 'message')
        done()
    })
  })

  it("Don't create an user without firstname", (done) => {
    let user = {
        lastName: "Martin"
    }
    chai.request(server)
      .post('/api/create_user')
      .send(user)
      .end((err, res) => {
        res.should.have.status(422)
        res.body.should.be.an('object').that.has.all.keys('status', 'message')
        done()
    })
  })

  it("Don't create an user with non alphanumeric attributes", (done) => {
    let user = {
        firstName: "Franck",
        lastName: 1234
    }
    chai.request(server)
      .post('/api/create_user')
      .send(user)
      .end((err, res) => {
        res.should.have.status(422)
        res.body.should.be.an('object').that.has.all.keys('status', 'message')
        done()
    })
  })
})
