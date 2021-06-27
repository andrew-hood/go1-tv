import axios from "axios";

export async function getAccount(token?: string) {
  const jwt = token || localStorage.getItem('token') || '';
  const headers = { Authorization: `Bearer ${jwt}` };
  
  try {
    const { data: user } = await axios.get(`${process.env.REACT_APP_API_URL}/me`, { headers });
    const { data: portal } = await axios.get(`${process.env.REACT_APP_API_URL}/account`, { headers });
    return { user, portal };
  } catch (err) {
    return null;
  }
}

export async function getLoginLink(redirect: string, token?: string) {
  const jwt = token || localStorage.getItem('token') || '';
  const headers = { Authorization: `Bearer ${jwt}` };
  
  try {
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/me/login?redirect_url=${redirect}`, {}, { headers });
    return data.url;
  } catch (err) {
    return null;
  }
}