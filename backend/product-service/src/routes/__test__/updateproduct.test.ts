import { response } from "express";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";



// only a person who owns his product post should be able to update it

// 404 if the product id not exist  
it('404 if the product id not exist',async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
      .put(`/api/product/${id}`)
      .set('Cookie', global.signupToGetCookie())
      .send({
          productName: 'aaaaa',
          productPrize: 1111
      })
      .expect(404);

});


// 401 if request to update when not logged in (forbidden)
it('401 if request to update when not logged in (forbidden)', async() => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
      .put(`/api/product/${id}`)
      .send({
          productName: 'aaaaa',
          productPrize: 1111
      })
      .expect(401);


});


// 401 if request to update not owned by user (forbidden)
it('401 if request to update a product post not owned by user (forbidden)', async() => {
    // for testing this scenario we need multiple user to access this
    // but in our case we have a single cookie thata is being used
    // so create new user make use of random users in setup.ts file
    const response = await request(app)
      .post('/api/product')
      .set('Cookie', global.signupToGetCookie())
      .send({
          productName: 'zzzzz',
          productPrize: 88888,
      })

    await request(app)
      .put(`/api/product/${response.body.id}`)
      .set('Cookie', global.signupToGetCookieDummyUser())
      .send({
          productName: 'eeeeee',
          productPrize: 2222222,
      })
      .expect(401);
});


// 400 if produc name or prize invalid request 
it('400 if produc name or prize invalid request', async() => {
    const response = await request(app)
      .post('/api/product')
      .set('Cookie', global.signupToGetCookie())
      .send({
          productName: 'zzzzz',
          productPrize: 88888,
      })

    await request(app)
      .put(`/api/product/${response.body.id}`)
      .set('Cookie', global.signupToGetCookie())
      .send({
          productName: '',
          productPrize: 88888,
      })
      .expect(400);

    await request(app)
      .put(`/api/product/${response.body.id}`)
      .set('Cookie', global.signupToGetCookie())
      .send({
          productName: 'aaaaaaaaaaaa',
          productPrize: -88888,
      })
      .expect(400);

});


// make sure actual ticket got updated if everything goes fine
it('make sure actual ticket got updated if everything goes fine', async() => {
    const response = await request(app)
      .post('/api/product')
      .set('Cookie', global.signupToGetCookie())
      .send({
          productName: 'zzzzz',
          productPrize: 88888,
      });

    await request(app)
      .put(`/api/product/${response.body.id}`)
      .set('Cookie', global.signupToGetCookie())
      .send({
          productName: 'aaaaaaaaaaaa',
          productPrize: 88888,
      })
      .expect(200);
    
    const fetchResponse = await request(app)
      .get(`/api/product/${response.body.id}`)
      .send();

    expect(fetchResponse.body.productName).toEqual('aaaaaaaaaaaa');
    expect(fetchResponse.body.productPrize).toEqual(88888);


});