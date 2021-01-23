import supertest from 'supertest';
import http from 'http';
import app from '../../../app';
import { mockOrder, wrongOrderData } from '../../../tests/mockData/order';
import { getIdTokenFromCustomToken } from '../../../tests/utils/testHelper';
import ordersService from '../ordersService';
import httpResponses from '../../../response';

describe(' ', () => {
  let server;
  let request;
  let token;
  let orderId;
  const baseUrl = '/api/v1';

  beforeAll((done) => {
    server = http.createServer(app);
    server.listen(done);
    request = supertest(server);
  });

  afterAll((done) => {
    server.close(done);
  });

  describe('Orders Endpoints', () => {

    beforeAll(async () => {
      token = await getIdTokenFromCustomToken();
    });

    describe('Creating Order Test', () => {
      describe('Successfully creating an Order', () => {
        it('should create and return an order object if user is authenticated', async () => {
          const response = await request
            .post(`${baseUrl}/orders`)
            .set('authorization', `Bearer ${token}`)
            .send(mockOrder);

          // set order id
          orderId = response.body.data.uid;

          expect(response.status).toBe(201);
          expect(response.body.data.bookingDate).toBe(mockOrder.bookingDate);
          expect(response.body.data.title).toBe(mockOrder.title);
          expect(response.body.data.customer.email).toBe(mockOrder.customer.email);
          expect(response.body.data.address.street).toBe(mockOrder.address.street);
        });
      })

      describe('Failed creating an Order', () => {
        it('should return 401 error if no token is provided', async () => {
          const response = await request
            .post(`${baseUrl}/orders`)
            .send(mockOrder);

          expect(response.status).toBe(401);
          expect(response.body.message).toBe('No token provided');
        });

        it('should return 401 error if wrong token is provided', async () => {
          const response = await request
            .post(`${baseUrl}/orders`)
            .set('authorization', `Bearer 88383ndhhddjsjjsjs`)
            .send(mockOrder);

          expect(response.status).toBe(401);
          expect(response.body.message).toBe('Error authenticating, please login again');
        });

        it('should return a bad request error if any of the required field is missing', async () => {
          // customer email is missing here
          const response = await request
            .post(`${baseUrl}/orders`)
            .set('authorization', `Bearer ${token}`)
            .send(wrongOrderData);

          expect(response.status).toBe(400);
        });

        it('should return 500 error if server fails to create', async () => {
          jest.spyOn(ordersService, 'saveOrder').mockResolvedValue(httpResponses.serverErrorResponseObject());
          const response = await request
            .post(`${baseUrl}/orders`)
            .set('authorization', `Bearer ${token}`)
            .send(mockOrder);

          expect(response.status).toBe(500);
          expect(response.body.message).toBe('Unable to perform this action at this time. Try again later.');
        });
      })
    })

    describe('Updating Order Test', () => {
      describe('Successfully Updating Order', () => {
        // user can update
        it('should update and return the order object if user is authenticated', async () => {
          const response = await request
            .put(`${baseUrl}/orders/${orderId}`)
            .set('authorization', `Bearer ${token}`)
            .send({ title: 'new title', bookingDate: 1607904000002});

          expect(response.status).toBe(200);
          expect(response.body.data.bookingDate).toBe(1607904000002);
          expect(response.body.data.title).toBe('new title');
        });
      })

      describe('Failed Updating Order', () => {
        it('should return a bad request error if title or bookingDate field is missing', async () => {
          const response = await request
            .put(`${baseUrl}/orders/${orderId}`)
            .set('authorization', `Bearer ${token}`)
            .send({title: 'new title'});

          expect(response.status).toBe(400);
        });

        it('should return 401 error if no token is provided', async () => {
          const response = await request
            .put(`${baseUrl}/orders/${orderId}`)
            .send({ title: 'new title', bookingDate: 1607904000002});

          expect(response.status).toBe(401);
          expect(response.body.message).toBe('No token provided');
        });

        it('should return 401 error if wrong token is provided', async () => {
          const response = await request
            .put(`${baseUrl}/orders/${orderId}`)
            .set('authorization', `Bearer 88383ndhhddjsjjsjs`)
            .send({ title: 'new title', bookingDate: 1607904000002});

          expect(response.status).toBe(401);
          expect(response.body.message).toBe('Error authenticating, please login again');
        });

        it('should return 404 error if order does not exist', async () => {
          const response = await request
            .put(`${baseUrl}/orders/99ow`)
            .set('authorization', `Bearer ${token}`)
            .send({ title: 'new title', bookingDate: 1607904000002});

          expect(response.status).toBe(404);
          expect(response.body.message).toBe('Order with id 99ow not found');
        });

        it('should return 500 error if server fails to update', async () => {
          jest.spyOn(ordersService, 'updateOrder').mockResolvedValue(httpResponses.serverErrorResponseObject());
          const response = await request
            .put(`${baseUrl}/orders/${orderId}`)
            .set('authorization', `Bearer ${token}`)
            .send({ title: 'new title', bookingDate: 1607904000002});

          expect(response.status).toBe(500);
          expect(response.body.message).toBe('Unable to perform this action at this time. Try again later.');
        });
      })
    })

  });
});
