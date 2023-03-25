import authService from '../components/api-authorization/AuthorizeService';

const getBaseConfig = async () => {
  const token = await authService.getAccessToken();
  return {
    ...(token ? {'Authorization': `Bearer ${token}`} : {}),
    'Content-Type': 'application/json'
  }
}

export const postRequest = async (url, payload) => {
  return await fetch(`api/${url}`, {
    ...getBaseConfig(),
    method: 'POST',
    body: JSON.stringify(payload)
  })
}

export const getRequest = async (url) => {
  return await fetch(`api/${url}`, {
    ...getBaseConfig(),
    method: 'GET',
  });
}

export const putRequest = async (url, payload) => {
  return await fetch(`api/${url}`, {
    ...getBaseConfig(),
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export const deleteRequest = async (url) => {
  return await fetch(`api/${url}`, {
    ...getBaseConfig(),
    method: 'DELETE',
  });
}