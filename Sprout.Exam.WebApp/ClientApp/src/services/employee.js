import { postRequest, getRequest, putRequest, deleteRequest } from "./base"

export const addEmployee = async (payload) => {
  return postRequest('employees', payload)
}

export const calculateEmployeeSalary = async (payload) => {
  return postRequest('employees/calculate', payload)
}

export const getEmployees = async () => {
  return getRequest('employees')
}

export const getEmployeeById = async (id) => {
  return getRequest('employees/' + id)
}

export const updateEmployee = async (id, payload) => {
  return putRequest('employees/' + id, payload)
}

export const deleteEmployee = async (id) => {
  return deleteRequest('employees/' + id)
}