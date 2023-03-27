import React, { useState, useEffect } from 'react';
import { getEmployeeById, updateEmployee } from 'services/employee';

export function Edit ({
  history, match
}) {
  const [user, setUser] = useState({
    id: 0, fullName: '', birthdate: '', tin: '', typeId: 1,
  })
  const [loading, setLoading] = useState({
    form: true, loadingSave:false
  })

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

  const onSubmit = (event) => {
    event.preventDefault();
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
          <div className='form-row'>
          <div className='form-group col-md-6'>
            <label htmlFor='inputFullName4'>Full Name: *</label>
            <input type='text' className='form-control' id='inputFullName4' onChange={onChange} name="fullName" value={user.fullName} placeholder='Full Name' />
          </div>
          <div className='form-group col-md-6'>
            <label htmlFor='inputBirthdate4'>Birthdate: *</label>
            <input type='date' className='form-control' id='inputBirthdate4' onChange={onChange} name="birthdate" value={user.birthdate} placeholder='Birthdate' />
          </div>
          </div>
          <div className="form-row">
          <div className='form-group col-md-6'>
            <label htmlFor='inputTin4'>TIN: *</label>
            <input type='text' className='form-control' id='inputTin4' onChange={onChange} value={user.tin} name="tin" placeholder='TIN' />
          </div>
          <div className='form-group col-md-6'>
            <label htmlFor='inputEmployeeType4'>Employee Type: *</label>
            <select id='inputEmployeeType4' onChange={onChange} value={user.typeId}  name="typeId" className='form-control'>
              <option value={0}>Regular</option>
              <option value={1}>Contractual</option>
            </select>
          </div>
          </div>
          <button type="submit" onClick={onSubmit} disabled={loading.formSave} className="btn btn-primary mr-2">{loading.formSave?"Loading...": "Save"}</button>
          <button type="button" onClick={onBack} className="btn btn-primary">Back</button>
        </form>
      </div>
    </div>
  );
}
