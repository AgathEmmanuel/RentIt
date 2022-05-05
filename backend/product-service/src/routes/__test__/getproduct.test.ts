import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";

it("if product not present return 404", async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    const response = await request(app)
      .get(`/api/product/${id}`)
      //.get('/api/product/aaaaaa')
      .send()
      .expect(404);

    console.log(response.body);

});


it("if product present return that product ", async () => {
    // there are 2 ways to make sure there is product in database
    // 1. attempt the product model directly from the test 
    // Product.build({}aaaaaa)
    // product.save()
    // 2. make a request to build the product on the fly
    // request(app)
    const productName1 = 'house';
    const productPrize1 = 22222220;
    const productCreateResponse = await request(app)
      .post('/api/product')
      .set('Cookie', global.signupToGetCookie())
      .send({
          productName1,
          productPrize1
      })
      .expect(201);

    //const productsInDb = await Product.find({});
    //console.log('test productsInDb log is',productsInDb[0]);
    //console.log('test _id productsInDb log is',productsInDb[0]._id);

    //console.log('productCreateResponse',productCreateResponse)
    console.log('productCreateResponse body',productCreateResponse.body)
    //console.log(`/api/product/${productCreateResponse.body.id}`)
    //const tid = productsInDb[0]._id


    const productGetResponse = await request(app)
      .get(`/api/product/${productCreateResponse.body.id}`)
      //.get(`/api/product/${tid}`)
      .send()
      .expect(200);

    expect(productGetResponse.body.productName).toEqual(productName1);
    expect(productGetResponse.body.productPrize).toEqual(productPrize1);

});
