const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app'); // Adjust the path as needed
const User = require('../src/models/user');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Scheduling Birthday Messages', () => {
  beforeEach(async () => {
    // Add test data or clear the database before each test
    await User.clearTestData();
  });

  it('should schedule birthday messages', (done) => {
    const user = new User({
      first_name: 'Alice',
      last_name: 'Smith',
      birthday: '1990-09-18',
      location: 'New York',
      email: 'alice@example.com',
    });
    
    user.save().then(() => {
      chai
        .request(app)
        .post('/birthday/schedule')
        .end(async (err, res) => {
          expect(res).to.have.status(200);

          // Wait for scheduled job to execute (adjust the timing as needed)
          await new Promise(resolve => setTimeout(resolve, 2000));

          // Check if the user received a birthday message
          const userAfter = await User.getById(user.id);
          expect(userAfter).to.have.property('birthday_message_sent', true);
          done();
        });
    });
  });
});
