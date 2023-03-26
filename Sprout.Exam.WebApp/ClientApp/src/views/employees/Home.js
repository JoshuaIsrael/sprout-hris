import React, { useEffect, useState, useMemo } from 'react';
import { deleteEmployee, getEmployees } from 'services/employee';
import { Modal, Table } from 'components';

const columns = [
  {
    title: 'Full Name',
    data: 'fullName'
  },
  {
    title: 'Birthdate',
    data: 'birthdate'
  },
  {
    title: 'TIN',
    data: 'tin'
  },
  {
    title: 'Type',
    render: (record) => record.typeId === 0 ? "Regular" : "Contractual"
  },
]

export function Home({ history }) {
  const [currentEmployee, setCurrentEmployee] = useState(null)
  const [shouldDelete, setShouldDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [employees, setEmployees] = useState([]);

  const onToggle = () => setShouldDelete(prev => !prev);

  const onAdd = () => history.push("/employees/create");

  const onEdit = (employee) => history.push("/employees/" + employee.id + "/edit");

  const onCalculate = (employee) => history.push("/employees/" + employee.id + "/calculate");

  const onDelete = (employee) => {
    setCurrentEmployee(employee)
    setShouldDelete(true)
  }

  const populateEmployeeData = async () => {
    const { isSuccess, data } = await getEmployees();
    if(!isSuccess) return;
    setEmployees(data);
    setIsLoading(false);
  }

  const onConfirmDelete = async () => {
    const { id } = currentEmployee;
    const { isSuccess } = await deleteEmployee(id)
    if(isSuccess){
      setEmployees(prev => prev.filter(employee => employee.id !== id))
    }
    else{
      alert("There was an error occured.");
    }
    setShouldDelete(false);
  }

  const actions = useMemo(() => [
    {
      label: 'Edit',
      type: 'info',
      onClick: onEdit
    },
    {
      label: 'Calculate',
      type: 'primary',
      onClick: onCalculate
    },
    {
      label: 'Delete',
      type: 'danger',
      onClick: onDelete
    },
  ], [])

  useEffect(() => {
    populateEmployeeData();
  }, [])

  return (
    <>
      <div>
        <h1 id="tabelLabel" >Employees</h1>
        <p>This page should fetch data from the server.</p>
        <p><button type='button' className='btn btn-success mr-2' onClick={onAdd} >Create</button></p>
        {
          isLoading ? <p><em>Loading...</em></p> : (
            <Table data={employees} columns={columns} actions={actions} />
          )
        }
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
