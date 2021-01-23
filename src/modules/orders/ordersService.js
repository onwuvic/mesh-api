import { db } from '../../config/firebase';
import response from '../../response';

const saveOrder = async (body) => {
  try {
    const { _path: { segments: [, uid] } } = await db
      .collection('orders')
      .add(body);

    const orders = await findOrderById(uid);
    return response.successResponseObject(orders, 201);
  } catch (error) {
    return response.serverErrorResponseObject();
  }
}

const findOrderById = async (uid) => {
  const doc = await db.collection('orders').doc(uid).get();
  return { uid, ...doc.data() };
}

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

const getOrderDoc = async (uid) => {
  return db.collection('orders').doc(uid);
}

export default {
  saveOrder,
  updateOrder
}