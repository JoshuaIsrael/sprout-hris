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
  return await fetch(`api/${url}`, {
    ...baseConfig,
    method: 'POST',
    body: JSON.stringify(payload)
  })
}

export const getRequest = async (url) => {
  const baseConfig = await getBaseConfig();
  return await fetch(`api/${url}`, {
    ...baseConfig,
    method: 'GET',
  });
}

export const putRequest = async (url, payload) => {
  const baseConfig = await getBaseConfig();
  return await fetch(`api/${url}`, {
    ...baseConfig,
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export const deleteRequest = async (url) => {
  const baseConfig = await getBaseConfig();
  return await fetch(`api/${url}`, {
    ...baseConfig,
    method: 'DELETE',
  });
}