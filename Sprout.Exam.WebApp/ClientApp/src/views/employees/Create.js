import React, { useState } from 'react';
import { addEmployee } from 'services/employee';
import { Button, Input, Modal, Row, Select } from 'components';

const options = [
  { value: 0, label: 'Regular'},
  { value: 1, label: 'Contractual'},
]

export function Create({ history }) {
  const [shouldAdd, setShouldAdd] = useState(false);
  const [user, setUser] = useState({
    fullName: '',
    birthdate: '',
    tin: '',
    typeId: 0
  })
  const [isLoading, setIsLoading] = useState({
    form: false,
    loadingSave: false
  })

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
    setShouldAdd(true);
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
              onChange={onChange} value={user.fullName} required
            />
            <Input
              type={'date'} name={'birthdate'}
              label={'Birthdate'} placeholder={'Birthdate'}
              onChange={onChange} value={user.birthdate} required
            />
          </Row>
          <Row>
            <Input
              name={'tin'} label={'TIN'} placeholder={'TIN'}
              onChange={onChange} value={user.tin} required
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