import chai from 'chai'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)
let should = chai.should()

const server = 'http://localhost:3000'

describe("/api/greetings/[first_name]", () => {
  it("Accepts only GET method", (done) => {
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

  it('Greets an user', (done) => {
    chai.request(server)
      .get('/api/greetings/franck')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.an('object')
        res.body.should.have.property('payload').eql('Hello franck!')
        done()
    })
  })

  it('Requires an "user_name" parameter', (done) => {
    chai.request(server)
      .get('/api/greetings')
      .end((err, res) => {
        res.should.have.status(422)
        res.body.should.be.an('object').that.has.all.keys('status', 'message')
        done()
    })
  })

  it('Accepts only one parameter', (done) => {
    chai.request(server)
      .get('/api/greetings/franck/martin')
      .end((err, res) => {
        res.should.have.status(422)
        res.body.should.be.an('object').that.has.all.keys('status', 'message')
        done()
    })
  })
})

