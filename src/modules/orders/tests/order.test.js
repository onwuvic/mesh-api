import supertest from 'supertest';
import http from 'http';
import app from '../../../app';
import { mockOrder, wrongOrderData, authToken } from '../../../tests/mockData/order';
import ordersService from '../ordersService';
import httpResponses from '../../../response';

describe(' ', () => {
  let server;
  let request;
  let orderId;
  const baseUrl = '/api/v1';
  const token = process.env.AUTH_TOKEN || authToken;

  beforeAll((done) => {
    server = http.createServer(app);
    server.listen(done);
    request = supertest(server);
  });

  afterAll((done) => {
    server.close(done);
  });

  describe('Orders Endpoints', () => {
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
      });

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
            .set('authorization', 'Bearer 88383ndhhddjsjjsjs')
            .send(mockOrder);

          expect(response.status).toBe(401);
          expect(response.body.message).toBe('Error authenticating, please login again');
        });

        it('should return a bad request error if any of the required field is missing',
          async () => {
          // customer email is missing here
            const response = await request
              .post(`${baseUrl}/orders`)
              .set('authorization', `Bearer ${token}`)
              .send(wrongOrderData);

            expect(response.status).toBe(400);
          });

        it('should return 500 error if server fails to create', async () => {
          jest.spyOn(ordersService, 'saveOrder')
            .mockResolvedValue(httpResponses.serverErrorResponseObject());
          const response = await request
            .post(`${baseUrl}/orders`)
            .set('authorization', `Bearer ${token}`)
            .send(mockOrder);

          expect(response.status).toBe(500);
          expect(response.body.message)
            .toBe('Unable to perform this action at this time. Try again later.');
        });
      });
    });

    describe('Updating Order Test', () => {
      describe('Successfully Updating Order', () => {
        // user can update
        it('should update and return the order object if user is authenticated', async () => {
          const response = await request
            .put(`${baseUrl}/orders/${orderId}`)
            .set('authorization', `Bearer ${token}`)
            .send({ title: 'new title', bookingDate: 1607904000002 });

          expect(response.status).toBe(200);
          expect(response.body.data.bookingDate).toBe(1607904000002);
          expect(response.body.data.title).toBe('new title');
        });
      });

      describe('Failed Updating Order', () => {
        it('should return a bad request error if title or bookingDate field is missing',
          async () => {
            const response = await request
              .put(`${baseUrl}/orders/${orderId}`)
              .set('authorization', `Bearer ${token}`)
              .send({ title: 'new title' });

            expect(response.status).toBe(400);
          });

        it('should return 401 error if no token is provided', async () => {
          const response = await request
            .put(`${baseUrl}/orders/${orderId}`)
            .send({ title: 'new title', bookingDate: 1607904000002 });

          expect(response.status).toBe(401);
          expect(response.body.message).toBe('No token provided');
        });

        it('should return 401 error if wrong token is provided', async () => {
          const response = await request
            .put(`${baseUrl}/orders/${orderId}`)
            .set('authorization', 'Bearer 88383ndhhddjsjjsjs')
            .send({ title: 'new title', bookingDate: 1607904000002 });

          expect(response.status).toBe(401);
          expect(response.body.message).toBe('Error authenticating, please login again');
        });

        it('should return 404 error if order does not exist', async () => {
          const response = await request
            .put(`${baseUrl}/orders/99ow`)
            .set('authorization', `Bearer ${token}`)
            .send({ title: 'new title', bookingDate: 1607904000002 });

          expect(response.status).toBe(404);
          expect(response.body.message).toBe('Order with id 99ow not found');
        });

        it('should return 500 error if server fails to update', async () => {
          jest.spyOn(ordersService, 'updateOrder')
            .mockResolvedValue(httpResponses.serverErrorResponseObject());
          const response = await request
            .put(`${baseUrl}/orders/${orderId}`)
            .set('authorization', `Bearer ${token}`)
            .send({ title: 'new title', bookingDate: 1607904000002 });

          expect(response.status).toBe(500);
          expect(response.body.message)
            .toBe('Unable to perform this action at this time. Try again later.');
        });
      });
    });

    describe('Gell All Orders Test', () => {
      describe('Success Getting all Orders', () => {
        it('should get all Orders', async () => {
          const response = await request
            .get(`${baseUrl}/orders`)
            .set('authorization', `Bearer ${token}`);

          expect(response.status).toBe(200);
          expect(response.body.data[0]).toHaveProperty('title');
          expect(response.body.data[0]).toHaveProperty('bookingDate');
        });
      });

      describe('Failed getting all Orders ', () => {
        it('should return 401 error if no token is provided', async () => {
          const response = await request
            .get(`${baseUrl}/orders`);

          expect(response.status).toBe(401);
          expect(response.body.message).toBe('No token provided');
        });

        it('should return 401 error if wrong token is provided', async () => {
          const response = await request
            .get(`${baseUrl}/orders`)
            .set('authorization', 'Bearer 88383ndhhddjsjjsjs');

          expect(response.status).toBe(401);
          expect(response.body.message).toBe('Error authenticating, please login again');
        });

        it('should return 500 error if server fails to update', async () => {
          jest.spyOn(ordersService, 'findAll')
            .mockResolvedValue(httpResponses.serverErrorResponseObject());
          const response = await request
            .get(`${baseUrl}/orders`)
            .set('authorization', `Bearer ${token}`);

          expect(response.status).toBe(500);
          expect(response.body.message)
            .toBe('Unable to perform this action at this time. Try again later.');
        });
      });
    });

    describe('Gell One Order Test', () => {
      describe('Successfully get an Order', () => {
        it('should get all Orders', async () => {
          const response = await request
            .get(`${baseUrl}/orders/${orderId}`)
            .set('authorization', `Bearer ${token}`);

          expect(response.status).toBe(200);
          expect(response.body.data.title).toBe('new title');
          expect(response.body.data.bookingDate).toBe(1607904000002);
        });
      });

      describe('Failed getting one Order ', () => {
        it('should return 401 error if no token is provided', async () => {
          const response = await request
            .get(`${baseUrl}/orders/${orderId}`);

          expect(response.status).toBe(401);
          expect(response.body.message).toBe('No token provided');
        });

        it('should return 401 error if wrong token is provided', async () => {
          const response = await request
            .get(`${baseUrl}/orders/${orderId}`)
            .set('authorization', 'Bearer 88383ndhhddjsjjsjs');

          expect(response.status).toBe(401);
          expect(response.body.message).toBe('Error authenticating, please login again');
        });

        it('should return 404 error if order does not exist', async () => {
          const response = await request
            .get(`${baseUrl}/orders/99ow`)
            .set('authorization', `Bearer ${token}`);

          expect(response.status).toBe(404);
          expect(response.body.message).toBe('Order with id 99ow not found');
        });

        it('should return 500 error if server fails to update', async () => {
          jest.spyOn(ordersService, 'findOne')
            .mockResolvedValue(httpResponses.serverErrorResponseObject());
          const response = await request
            .get(`${baseUrl}/orders/${orderId}`)
            .set('authorization', `Bearer ${token}`);

          expect(response.status).toBe(500);
          expect(response.body.message)
            .toBe('Unable to perform this action at this time. Try again later.');
        });
      });
    });

    describe('Delete Order Test', () => {
      describe('Successfully delete Order', () => {
        it('should get all Orders', async () => {
          const response = await request
            .delete(`${baseUrl}/orders/${orderId}`)
            .set('authorization', `Bearer ${token}`);

          expect(response.status).toBe(200);
          expect(response.body.data.uid).toBe(orderId);
        });
      });

      describe('Failed deleting Order', () => {
        it('should return 401 error if no token is provided', async () => {
          const response = await request
            .delete(`${baseUrl}/orders/${orderId}`);

          expect(response.status).toBe(401);
          expect(response.body.message).toBe('No token provided');
        });

        it('should return 401 error if wrong token is provided', async () => {
          const response = await request
            .delete(`${baseUrl}/orders/${orderId}`)
            .set('authorization', 'Bearer 88383ndhhddjsjjsjs');

          expect(response.status).toBe(401);
          expect(response.body.message).toBe('Error authenticating, please login again');
        });

        it('should return 404 error if order does not exist', async () => {
          const response = await request
            .delete(`${baseUrl}/orders/99ow`)
            .set('authorization', `Bearer ${token}`);

          expect(response.status).toBe(404);
          expect(response.body.message).toBe('Order with id 99ow not found');
        });

        it('should return 500 error if server fails to update', async () => {
          jest.spyOn(ordersService, 'destroy')
            .mockResolvedValue(httpResponses.serverErrorResponseObject());
          const response = await request
            .delete(`${baseUrl}/orders/${orderId}`)
            .set('authorization', `Bearer ${token}`);

          expect(response.status).toBe(500);
          expect(response.body.message)
            .toBe('Unable to perform this action at this time. Try again later.');
        });
      });
    });
  });
});
