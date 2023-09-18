const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app'); // Adjust the path as needed
const User = require('../src/models/user');

chai.use(chaiHttp);
const expect = chai.expect;

describe('User Management', () => {
  beforeEach(async () => {
    // Add test data or clear the database before each test
    await User.clearTestData();
  });

  it('should create a new user', (done) => {
    chai
      .request(app)
      .post('/user')
      .send({ first_name: 'John', last_name: 'Doe', birthday: '1990-01-01', location: 'New York', email: 'john@example.com' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('id');
        done();
      });
  });

  it('should update user details', (done) => {
    const user = new User({
      first_name: 'Jane',
      last_name: 'Doe',
      birthday: '1995-05-05',
      location: 'Los Angeles',
      email: 'jane@example.com',
    });
    
    user.save().then(() => {
      chai
        .request(app)
        .put(`/user/${user.id}`)
        .send({ first_name: 'Updated', location: 'San Francisco' })
        .end((err, res) => {
          expect(res).to.have.status(204);
          done();
        });
    });
  });
});
