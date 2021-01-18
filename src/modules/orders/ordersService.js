import { db } from '../../firebase';

const saveOrder = async (body) => {
  const { _path: { segments: [, uid] } } = await db.collection('orders')
    .add(body);

  const orders = await findOrderById(uid);
  return orders;
}

const findOrderById = async (uid) => {
  const doc = await db.collection('orders').doc(uid).get();
  return { uid, ...doc.data() };
}

const updateOrder = async (uid, body) => {
  const { title, bookingDate } = body;
  await db.collection('orders')
    .doc(uid)
    .update({
      title,
      bookingDate: +bookingDate,
    });

  const orders = await findOrderById(uid);
  return orders;
}

export default {
  saveOrder,
  updateOrder
}