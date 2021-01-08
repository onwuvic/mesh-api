import db from '../../firebase';

const saveOrder = async (body) => {
  const { title, bookingDate, email, name, phone, city, country, street, zip } = body;

  const { _path: { segments: [, id] } } = await db.collection('orders')
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

  const orders = await findOrderById(id);
  return orders;
}

const findOrderById = async (id) => {
  const doc = await db.collection('orders').doc(id).get();
  return { ...doc.data() };
}

export default {
  saveOrder
}