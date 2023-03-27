import React, { useState, useEffect } from 'react';
import { calculateEmployeeSalary, getEmployeeById } from 'services/employee';
import { Button, Input, Label, Row } from 'components';

export function Calculate ({ history, match }) {
  const [user, setUser] = useState({
    id: 0,
    fullName: '',
    birthdate: '',
    tin: '',
    typeId: 1,
  })
  const [request, setRequest] = useState({
    absentDays: 0,
    workedDays: 0,
  })
  const [netIncome, setNetIncome] = useState(0)
  const [isLoading, setIsLoading] = useState({
    form: false,
    calculate: false
  })

  const onBack = () => history.push("/employees/index");

  const onChange = (event) => {
    event.persist();
    setRequest(prev => {
      prev[event.target.name] = event?.target?.value
      return {...prev}
    })
  }

  const onSubmit = () => {
    calculateSalary();
  }

  const calculateSalary = async () => {
    const { absentDays, workedDays } = request;
    setIsLoading(prev => ({ ...prev, calculate: true }))
    const response = await calculateEmployeeSalary({
      id: user.id,
      absentDays: Number(absentDays),
      workedDays: Number(workedDays),
    });
    const data = await response.data;
    setIsLoading(prev => ({ ...prev, calculate: false }))
    setNetIncome(data)
  }

  const getEmployee = async (id) => {
    setIsLoading({ form: true, calculate: false });
    const { isSuccess, data } = await getEmployeeById(id)
    if(isSuccess){
      setUser({
        id: data.id,
        fullName: data.fullName,
        birthdate: data.birthdate,
        tin: data.tin,
        typeId: data.typeId
      })
      setIsLoading({ form: false, calculate: false });
    }
    else{
      setIsLoading({ form: false, calculate: false });
    }
  }

  useEffect(() => {
    getEmployee(match.params.id);
  }, [])

  return isLoading.calculate ? <p><em>Loading...</em></p> : (
    <div>
      <h1 id="tabelLabel" >Employee Calculate Salary</h1>
      <br/>
      <form>
        <Row>
          <Label text="Full Name" value={user.fullName}/>
        </Row>
        <Row>
          <Label text="Birthdate" value={user.birthdate}/>
        </Row>
        <Row>
          <Label text="TIN" value={user.tin}/>
        </Row>
        <Row>
          <Label text="Employee Type" value={user.typeId === 0 ? "Regular" : "Contractual"}/>
        </Row>
        <Row>
          {
            user.typeId === 0 ? (
              <>
                <Label text="Salary" value={"20,000"}/>
                <Label text="Tax" value={"12%"}/>
              </>
            ) : <Label text="Rate Per Day" value={"500"}/>
          }
        </Row>
        <Row>
          {
            user.typeId === 0 ? (
              <Input
                name={'absentDays'} label={'Absent Days'} placeholder={'Absent Days'}
                onChange={onChange} value={request.absentDays}
              />
            ) : (
              <Input
                name={'workedDays'} label={'Worked Days'} placeholder={'Worked Days'}
                onChange={onChange} value={request.workedDays}
              />
            )
          }
        </Row>
        <Row>
          <Label text="Net Income" value={netIncome}/>
        </Row>
        <Button onClick={onSubmit} disabled={isLoading.calculate} primary>
          { isLoading.calculate ? "Loading..." : "Calculate" }
        </Button>
        <Button onClick={onBack} primary>
          Back
        </Button>
      </form>
    </div>
  );
}
