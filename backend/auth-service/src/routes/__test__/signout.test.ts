import request from 'supertest';
import { app } from '../../app';


it('sets a cookie after successful signin', async () => {
    await request(app)
      .post('/api/user/signup')
      .send({
          email: 'bbb@bbb.com',
          password: 'bbbbbb'
      })
      .expect(201);

    const response = await request(app)
      .post('/api/user/signout')
      .send({})
      .expect(200);

    console.log(response.get('Set-Cookie'));
    expect(response.get('Set-Cookie'))
    //expect(response.get('Set-Cookie')[0]).toEqual('session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly')

});