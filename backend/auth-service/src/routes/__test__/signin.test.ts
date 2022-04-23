import request from 'supertest';
import { app } from '../../app';
import { Password } from '../../password-hasher';



it('should not successfully signin when email provided not exist', async () => {
    await request(app)
      .post('/api/user/signin')
      .send({
          email: 'aaa@a.com',
          password: 'aaaaaa'
      })
      .expect(400)
})


it('singing should fail if password is wrong', async () => {
    await request(app)
      .post('/api/user/signup')
      .send({
          email: 'aaa@aaa.com',
          password: 'aaaaaa'
      })
      .expect(201);

    await request(app)
      .post('/api/user/signin')
      .send({
          email: 'aaa@aaa.com',
          password: 'xxxaaaaaa'
      })
      .expect(400);

});



it('singin should pass if password is correct', async () => {
    await request(app)
      .post('/api/user/signup')
      .send({
          email: 'aaa@aaa.com',
          password: 'aaaaaa'
      })
      .expect(201);

    await request(app)
      .post('/api/user/signin')
      .send({
          email: 'aaa@aaa.com',
          password: 'aaaaaa'
      })
      .expect(200);

});



it('sets a cookie after successful signin', async () => {
    await request(app)
      .post('/api/user/signup')
      .send({
          email: 'bbb@bbb.com',
          password: 'bbbbbb'
      })
      .expect(201);

    const response = await request(app)
      .post('/api/user/signin')
      .send({
          email: 'bbb@bbb.com',
          password: 'bbbbbb'
      })
      .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();

});