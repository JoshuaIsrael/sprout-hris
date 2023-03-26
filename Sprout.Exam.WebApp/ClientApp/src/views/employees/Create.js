import React, { useState } from 'react';
import { addEmployee } from 'services/employee';
import { Button, Input, Modal, Row, Select } from 'components';
import { validateForm } from 'utils/helpers';

const options = [
  { value: 0, label: 'Regular'},
  { value: 1, label: 'Contractual'},
]

const defaultValues = {
  user: { fullName: '', birthdate: '', tin: '', typeId: 0 },
  isLoading: { form: false, loadingSave: false },
}

export function Create({ history }) {
  const [shouldAdd, setShouldAdd] = useState(false);
  const [user, setUser] = useState(defaultValues.user)
  const [isLoading, setIsLoading] = useState(defaultValues.isLoading)
  const [errors, setErrors] = useState({})

  const onToggle = () => setShouldAdd(prev => !prev);

  const onBack = () => history.push("/employees/index");

  const onChange = (event) => {
    event.persist();
    setUser(prev => {
      prev[event.target.name] = event?.target?.value
      return {...prev}
    })
  }

  const onSubmit = () => {
    const success = validateForm(user);
    setErrors(success);
    if (success !== true) return;
    setShouldAdd(true)
  }

  const onConfirmAdd = async () => {
    setIsLoading(prev => ({...prev, loadingSave: true }));
    const { isSuccess } = await addEmployee(user)
    if(isSuccess){
      setIsLoading(prev => ({...prev, loadingSave: false }));
      alert("Employee successfully saved");
      history.push("/employees/index");
    }
    else{
        alert("There was an error occured.");
    }
  }

  return isLoading.form ? <p><em>Loading...</em></p> : (
    <>
      <div>
        <h1 id="tabelLabel" >Employee Create</h1>
        <p>All fields are required</p>
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
              options={options} required
            />
          </Row>
          <Button onClick={onSubmit} disabled={isLoading.loadingSave} primary>
            {isLoading.loadingSave ? "Loading..." : "Save"}
          </Button>
          <Button onClick={onBack}>Back</Button>
        </form>
      </div>
      <Modal
        title={'Confirm Add'}
        isOpen={shouldAdd} toggle={onToggle}
        primary={'Confirm'} secondary={'Cancel'}
        onPrimary={onConfirmAdd} onSecondary={onToggle}
      >
        Are you sure you want to add?
      </Modal>
    </>
  )
}