import axios from "axios";

export async function getAccount(token?: string) {
  const jwt = token || localStorage.getItem('token') || '';
  const headers = { Authorization: `Bearer ${jwt}` };
  
  try {
    const { data: user } = await axios.get('https://api.go1.com/v2/me', { headers });
    const { data: portal } = await axios.get('https://api.go1.com/v2/account', { headers });
    return { user, portal };
  } catch (err) {
    return null;
  }
}

export async function getLoginLink(redirect: string, token?: string) {
  const jwt = token || localStorage.getItem('token') || '';
  const headers = { Authorization: `Bearer ${jwt}` };
  
  try {
    const { data } = await axios.post(`https://api.go1.com/v2/me/login?redirect_url=${redirect}`, {}, { headers });
    return data.url;
  } catch (err) {
    return null;
  }
}