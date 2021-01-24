import { uid } from 'uid';
import { db } from '../../config/firebase';
import response from '../../response';

/**
 * find all Orders service
 *
 * @returns {Object} - error objects if fails or orders array if successful
 */
const findAll = async () => {
  try {
    const ordersRef = await db
      .collection('orders')
      .get();

    const orders = ordersRef.docs.map((order) => ({id: order.id, ...order.data()}));

    return response.successResponseObject(orders, 200);
  } catch (error) {
    return response.serverErrorResponseObject();
  }
}

/**
 * find one Order service
 *
 * @returns {Object} - error objects if fails or orders array if successful
 */
const findOne = async (uid) => {
  try {
    const orderRef = await getOrderDoc(uid);
    const order = await orderRef.get();

    if (!order.data()) {
      return response.failureResponseObject(404, `Order with id ${uid} not found`);
    }

    return response.successResponseObject({uid, ...order.data()}, 200);
  } catch (error) {
    return response.serverErrorResponseObject();
  }
}

/**
 * delete one Order service
 *
 * @returns {Object} - error objects if fails or orders array if successful
 */
const destroy = async (uid) => {
  try {
    const orderRef = await getOrderDoc(uid);
    const order = await orderRef.get();

    if (!order.data()) {
      return response.failureResponseObject(404, `Order with id ${uid} not found`);
    }

    await orderRef.delete();

    return response.successResponseObject({uid}, 200);
  } catch (error) {
    return response.serverErrorResponseObject();
  }
}

/**
 * Save Order service
 *
 * @param {object} body user inputted order
 *
 * @returns {Object} - error objects if fails or order object if successful
 */
const saveOrder = async (body) => {
  try {
    const uuid = uid(25);
    const orderRef = await getOrderDoc(uuid);

    await orderRef.set(body);

    return response.successResponseObject({...body, uid: uuid }, 201);
  } catch (error) {
    return response.serverErrorResponseObject();
  }
}


/**
 * Update Order service
 *
 * @param {object} body user inputted order
 * @param {uid} uid of the Order to edit
 *
 * @returns {Object} - error objects if fails or order object if successful
 */
const updateOrder = async (uid, body) => {
  const { title, bookingDate } = body;
  try {
    const orderRef = await getOrderDoc(uid);
    const order = await orderRef.get();

    if (!order.data()) {
      return response.failureResponseObject(404, `Order with id ${uid} not found`);
    }

    await orderRef.update({
      title,
      bookingDate: +bookingDate,
    });

    return response.successResponseObject({
      ...order.data(), title, bookingDate: +bookingDate
    }, 200);

  } catch (error) {
    return response.serverErrorResponseObject();
  }
}

/**
 * gets the Order collection
 *
 * @param {uid} uid of the Order
 *
 * @returns {Object} - Promise<Order>
 */
const getOrderDoc = async (uid) => {
  return db.collection('orders').doc(uid);
}

export default {
  saveOrder,
  updateOrder,
  findAll,
  findOne,
  destroy
}