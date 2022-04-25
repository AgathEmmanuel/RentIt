import request from 'supertest';
import { app } from '../../app';
import { Product } from '../../models/product';


it('route handler post request to /api/product ',async () => {
    const response = await request(app)
      .post('/api/product')
      .send({});
    expect(response.status).not.toEqual(404);
});

it('signed in user should only have access',async () => {
    const response = await request(app)
      .post('/api/product')
      .send({})
      .expect(401);
})

it('if signed in response status != 401',async () => {
    const response = await request(app)
      .post('/api/product')
      .set('Cookie', global.signupToGetCookie())
      .send({});
    console.log(global.signupToGetCookie());
    console.log(response.status);
    expect(response.status).not.toEqual(401);
})

it('invalid title should return a descriptive error ',async () => {
    const productName1 = '';
    const productPrize1 = 20000

    await request(app)
      .post('/api/product')
      .set('Cookie',global.signupToGetCookie())
      .send({
          productName: productName1,
          productPrize: productPrize1,
      })
      .expect(400);

    await request(app)
      .post('/api/product')
      .set('Cookie',global.signupToGetCookie())
      .send({
          productPrize: productPrize1,
      })
      .expect(400);



})


it('invalid rental price should return an  error ',async () => {
    const productName1 = 'aaaaa';
    const productPrize1 = -20000

    await request(app)
      .post('/api/product')
      .set('Cookie',global.signupToGetCookie())
      .send({
          productName: productName1,
          productPrize: productPrize1,
      })
      .expect(400);

    await request(app)
      .post('/api/product')
      .set('Cookie',global.signupToGetCookie())
      .send({
          productName: productName1,
      })
      .expect(400);


})

it('attributes for the product should be valid ',async () => {
    const response = await request(app)
      .post('/api/product')
      .set('Cookie',global.signupToGetCookie())
      .send({
          productName: 'carrrrrr',
          productPrize: 200000000
      })
      .expect(201);
    console.log('testing response of prodcut creation',response.body)
})



it('the product created got saved in database', async () => {
    let productsInDb = await Product.find({});
    const productName1 = 'car bmw';
    const productPrize1 = 20000
    expect(productsInDb.length).toEqual(0);

    await request(app)
      .post('/api/product')
      .set('Cookie',global.signupToGetCookie())
      .send({
          productName: productName1,
          productPrize: productPrize1,
      })
      .expect(201);

    productsInDb = await Product.find({});
    // console.log('productsInDb log is',productsInDb[0]);
    expect(productsInDb.length).toEqual(1);
    expect(productsInDb[0].productName).toEqual(productName1);
    expect(productsInDb[0].productPrize).toEqual(productPrize1);
    

});


