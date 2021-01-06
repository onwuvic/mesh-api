import response from '../../response';
import db from '../../firebase';

const saveOrder = async (body) => {
  const orders = [];
  try {
    orders.push(body);
    return response.successResponseObject(body, 201);
  } catch (error) {
    return response.serverErrorResponseObject()
  }
}

// const findOrder = async (id) => {
//   try {
//     const doc = await db.doc(`orders/${id}`).get();
//     if (doc.exists) {
//         return response.successResponseObject({...doc.data()});
//     } else {
//       return response.failureResponseObject(404, 'Order document doesn\'t exist');
//     }
//   } catch (error) {
//     return response.serverErrorResponseObject()
//   }
// }

export default {
  saveOrder
}