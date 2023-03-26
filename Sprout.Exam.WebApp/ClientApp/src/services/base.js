import authService from '../components/api-authorization/AuthorizeService';

const getBaseConfig = async () => {
  const token = await authService.getAccessToken();
  return {
    headers: {
      ...(token ? {'Authorization': `Bearer ${token}`} : {}),
      'Content-Type': 'application/json'
    }
  }
}

export const postRequest = async (url, payload) => {
  const baseConfig = await getBaseConfig();
  const response =  await fetch(`api/${url}`, {
    ...baseConfig,
    method: 'POST',
    body: JSON.stringify(payload)
  })
  return await parseResponse(response);
}

export const getRequest = async (url) => {
  const baseConfig = await getBaseConfig();
  const response = await fetch(`api/${url}`, {
    ...baseConfig,
    method: 'GET',
  });
  return await parseResponse(response);
}

export const putRequest = async (url, payload) => {
  const baseConfig = await getBaseConfig();
  const response =  await fetch(`api/${url}`, {
    ...baseConfig,
    method: 'PUT',
    body: JSON.stringify(payload),
  });
  return await parseResponse(response);
}

export const deleteRequest = async (url) => {
  const baseConfig = await getBaseConfig();
  const response =  await fetch(`api/${url}`, {
    ...baseConfig,
    method: 'DELETE',
  });
  return await parseResponse(response);
}

const parseResponse = async (response) => {
  let data = {};
  try {
    data = await response?.json()
  } catch (ex) {
    data = {
      isSuccess: false
    }
  }
  return data;
}