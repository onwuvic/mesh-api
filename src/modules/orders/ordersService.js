import db from '../../firebase';

const saveOrder = async (body) => {
  const { title, bookingDate, email, name, phone, city, country, street, zip } = body;

  const { _path: { segments: [, uid] } } = await db.collection('orders')
    .add({
      title,
      bookingDate: +bookingDate,
      customer: {
        email,
        name,
        phone
      },
      address: {
        city,
        country,
        street,
        zip
      }
    });

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