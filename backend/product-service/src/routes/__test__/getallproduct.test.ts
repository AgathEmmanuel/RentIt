import request from 'supertest';
import { app } from '../../app';



const createProduct = () => {
    return request(app)
      .post('/api/product')
      .set('Cookie',global.signupToGetCookie())
      .send({
          productName: 'ddddd',
          productPrize: 11111111
      });

}

it('if products present return all products', async () => {
    /*
    await request(app)
      .post('/api/product')
      .set('Cookie',global.signupToGetCookie())
      .send({
          productName: 'ddddd',
          productPrize: 11111111
      });
    await request(app)
      .post('/api/product')
      .set('Cookie',global.signupToGetCookie())
      .send({
          productName: 'cccccc',
          productPrize: 999999
      })

      */

    // creating a list of products for testing
    await createProduct();
    await createProduct();
    await createProduct();

    const response = await request(app) 
      .get('/api/product')
      .send()
      .expect(200)

    expect(response.body.length).toEqual(3);

});



it('if products not present return 404', async () => {

})