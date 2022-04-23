import request from 'supertest';
import { app } from '../../app';


it('should get the details of the current user', async () =>{
    const signupResponse = await request(app)
      .post('/api/user/signup')
      .send({
          email: 'aaa@aaa.com',
          password: 'aaaaaa'
      })
      .expect(201);
    // need to store the cookie to be passed in further
    // request that we send to authencate current user details
    const cookieData = signupResponse.get('Set-Cookie');

    const response = await request(app)
      .get('/api/user/currentuser')
      .set('Cookie',cookieData)
      .send()
      .expect(200);

    console.log(response.body);
    expect(response.body.currentUser.email).toEqual('aaa@aaa.com')

});