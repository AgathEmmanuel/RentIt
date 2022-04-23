import request from "supertest";
import { app } from '../../app';


// writing a test statement  
it('return a 201 on signingup succesfully',async () => {
    return request(app)
      .post('/api/user/signup') 
      .send({
          email: 'aaaaaa@aaaaaa.com',
          password: 'aaaaaa'
      })
      .expect(201);
});


// writing a test statement  
it('return a 400 on signingup succesfully',async () => {
    return request(app)
      .post('/api/user/signup') 
      .send({
          email: 'aaaaaa1aaaaaa.com',
          password: 'aaaaaa'
      })
      .expect(400);
});

// writing a test statement  
it('return a 400 on signingup succesfully',async () => {
    return request(app)
      .post('/api/user/signup') 
      .send({
          email: 'aaaaaa1aaaaaa.com',
          password: 'a'
      })
      .expect(400);
});



// writing a test statement  
it('return a 400 on signingup succesfully',async () => {
    return request(app)
      .post('/api/user/signup') 
      .send({
          email: '',
          password: ''
      })
      .expect(400);
});



// writing a test statement  
// to add in multiple tests inside one handler
it('return a 400 on signingup succesfully',async () => {
    await request(app)
      .post('/api/user/signup') 
      .send({
          email: 'aaa@aa.com',
      })
      .expect(400);

    await request(app)
      .post('/api/user/signup') 
      .send({
          password: 'aaaaaaaaaaaa',
      })
      .expect(400);


});



it('duplicate email blocked sucessfully', async () => {
    await request(app)
      .post('/api/user/signup')
      .send({
          email: 'aaa@aaa.com',
          password: 'aaaaaa'
      })
      .expect(201);
    await request(app)
      .post('/api/user/signup')
      .send({
          email: 'aaa@aaa.com',
          password: 'aaaaaa'
      })
      .expect(400);

});



it('sets a cookie after successful signup', async () => {
    const response = await request(app)
      .post('/api/user/signup')
      .send({
          email: 'aaa@aaa.com',
          password: 'aaaaaa'
      })
      .expect(201);
      // to check if a specific header is there
      // in this case its Set-Cookie
      // if cookieSession({secure: true}) is enable while setting up cookie
      // the cookie will be shared only on https connection
      // so we set up a cookie to be false in test environment
      // that is when secure: process.env.NODE_ENV !== 'test' 
      expect(response.get('Set-Cookie')).toBeDefined();

});