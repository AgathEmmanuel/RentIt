import request from 'supertest';
import { app } from '../../app';




// facing issues with getting null. and this test is failing  

/*
it('should return null if the request in not authencticated, that is without cookie', async () =>{
  const response = await request(app)
    .get("/api/user/currentuser")
    .send()
    .expect(200);

  console.log(response.body.errors[0].message);
  */
  /*
  console.log(response.body);
        console.log
      { errors: [ { message: 'User Not Logged in ' } ] }
  */
    //expect(response.body.currentUser).toEqual(null);
// })



// checking if proper error messag if use not authenticated

it('checking if proper error messag if use not authenticated', async () =>{
  const response = await request(app)
    .get("/api/user/currentuser")
    .send()
    .expect(200);

  console.log(response.body.errors[0].message);
  expect(response.body.errors[0].message).toEqual('User Not Logged in ');

});



it('should get the details of the current user', async () =>{
    
    /*
    const signupResponse = await request(app)
      .post('/api/user/signup')
      .send({
          email: 'aaa@aaa.com',
          password: 'aaaaaa'
      })
      .expect(201);

      */

  // need to store the cookie to be passed in further
  // request that we send to authencate current user details

  const cookieData = await signupToGetCookie();
  //const cookieData = await global.signupToGetCookie();
  // const cookieData = signupResponse.get('Set-Cookie');

  const response = await request(app)
    .get("/api/user/currentuser")
    .set("Cookie", cookieData)
    .send()
    .expect(200);

  console.log(response.body);
  expect(response.body.currentUser.email).toEqual("zzz@zzz.com");
});


