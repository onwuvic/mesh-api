import { uid } from 'uid';
import { db } from '../../config/firebase';
import response from '../../response';

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