import React, { useEffect, useState } from 'react';
import { deleteEmployee, getEmployees } from 'services/employee';
import Modal from 'components/Modal';

const headers = ['Full Name', 'Birthdate', 'TIN', 'Type', 'Actions']

export function Home({ history }) {
  const [currentEmployee, setCurrentEmployee] = useState(null)
  const [shouldDelete, setShouldDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [employees, setEmployees] = useState([]);

  const onToggle = () => setShouldDelete(prev => !prev);

  const onAdd = () => history.push("/employees/create");

  const onEdit = (id) => history.push("/employees/" + id + "/edit");

  const onCalculate = (id) => history.push("/employees/" + id + "/calculate");

  const onDelete = (employee) => {
    setCurrentEmployee(employee)
    setShouldDelete(true)
  }

  const populateEmployeeData = async () => {
    const response = await getEmployees();
    if(response.status !== 200) return;
    const data = (await response.json()).data;
    setEmployees(data);
    setIsLoading(false);
  }

  const onConfirmDelete = async () => {
    const { id } = currentEmployee;
    const response = await deleteEmployee(id)
    if(response.status === 200){
      setEmployees(prev => prev.filter(employee => employee.id !== id))
    }
    else{
      alert("There was an error occured.");
    }
    setShouldDelete(false);
  }

  const Employees = () => {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>{ headers.map(header => <th key={header}>{header}</th>) }</tr>
        </thead>
        <tbody>
          {employees.map(employee =>
            <tr key={employee.id}>
              <td>{employee.fullName}</td>
              <td>{employee.birthdate}</td>
              <td>{employee.tin}</td>
              <td>{employee.typeId === 1 ? "Regular" : "Contractual"}</td>
              <td>
                <button type='button' className='btn btn-info mr-2' onClick={() => onEdit(employee.id)} >Edit</button>
                <button type='button' className='btn btn-primary mr-2' onClick={() => onCalculate(employee.id)}>Calculate</button>
                <button type='button' className='btn btn-danger mr-2' onClick={() => onDelete(employee)}>Delete</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  useEffect(() => {
    populateEmployeeData();
  }, [])

  return (
    <>
      <div>
        <h1 id="tabelLabel" >Employees</h1>
        <p>This page should fetch data from the server.</p>
        <p><button type='button' className='btn btn-success mr-2' onClick={onAdd} >Create</button></p>
        {isLoading ? <p><em>Loading...</em></p> : <Employees/>}
      </div>
      <Modal
        title={'Confirm Delete'}
        isOpen={shouldDelete} toggle={onToggle}
        primary={'Confirm'} secondary={'Cancel'}
        onPrimary={onConfirmDelete} onSecondary={onToggle}
      >
        Are you sure you want to delete
      </Modal>
    </>
  );
}
