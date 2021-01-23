import { uid } from 'uid';
import axios from 'axios';
import { firebase } from "../../config/firebase"

export const getIdTokenFromCustomToken = async () => {
  try {
    const uuid = uid(25);
    const token = await firebase.auth().createCustomToken(uuid);
    const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${process.env.API_KEY}`;
    const data = {
      token,
      returnSecureToken: true
    }

    const result = await axios.post(url, data);
    return result.data.idToken;
  } catch(error) {
    return 'Error getting token';
  }
};

