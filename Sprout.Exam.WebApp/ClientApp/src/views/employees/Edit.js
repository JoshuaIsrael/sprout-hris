import React, { useState, useEffect } from 'react';
import { getEmployeeById, updateEmployee } from 'services/employee';
import { Button, Input, Row, Select } from 'components';
import { employmentTypes } from 'constants/enums'
import { validateForm } from 'utils/helpers';

export function Edit ({
  history, match
}) {
  const [user, setUser] = useState({
    id: 0, fullName: '', birthdate: '', tin: '', typeId: 1,
  })
  const [loading, setLoading] = useState({
    form: true, loadingSave: false
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    getEmployee(match.params.id);
  }, [])

  const onChange = (event) => {
    event.persist();
    setUser((prev) => {
      prev[event.target.name] = event.target.value;
      return {...prev};
    });
  };

  const onBack = () => history.push("/employees/index");

  const onSubmit = () => {
    const success = validateForm(user);
    setErrors(success);
    if (success !== true) return;
    if (window.confirm("Are you sure you want to save?")) {
      saveEmployee();
    }
  };

  const saveEmployee = async () => {
    setLoading(prev => ({ ...prev, loadingSave: true }));
    const { isSuccess } = await updateEmployee(user.id, user);
    if(isSuccess){
      setLoading(prev => ({ ...prev, loadingSave: false }));
      alert("Employee successfully saved");
      history.push("/employees/index");
    }
    else{
      alert("There was an error occured.");
    }
  }

  const getEmployee = async (id) => {
    setLoading({ form: true, loadingSave: false });
    const { isSuccess, data } = await getEmployeeById(id);
    if(!isSuccess) return;
    setUser({
        id: data.id,
        fullName: data.fullName,
        birthdate: new Date(data.birthdate).toISOString().split('T')[0],
        tin: data.tin,
        typeId: data.typeId,
    });
    setLoading({ form: false, loadingSave: false });
  }

  return loading.form ? <p><em>Loading...</em></p> : (
    <div>
      <h1 id="tabelLabel" >Employee Edit</h1>
      <p>All fields are required</p>
      <div>
        <form>
          <Row>
            <Input
              name={'fullName'} label={'Full Name'} placeholder={'Full Name'}
              onChange={onChange} value={user.fullName} error={errors['fullName']}
              required
            />
            <Input
              type={'date'} name={'birthdate'}
              label={'Birthdate'} placeholder={'Birthdate'}
              onChange={onChange} value={user.birthdate} error={errors['birthdate']}
              required
            />
          </Row>
          <Row>
            <Input
              name={'tin'} label={'TIN'} placeholder={'TIN'}
              onChange={onChange} value={user.tin} error={errors['tin']}
              required
            />
            <Select
              name={'typeId'} label={'Employee Type'}
              onChange={onChange} value={user.typeId}
              options={employmentTypes} required
            />
          </Row>
          <Button onClick={onSubmit} disabled={loading.loadingSave} primary>
            {loading.loadingSave ? "Loading..." : "Save"}
          </Button>
          <Button onClick={onBack}>Back</Button>
        </form>
      </div>
    </div>
  );
}
