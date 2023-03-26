import React, { Component } from 'react';
import { getEmployeeById, updateEmployee } from 'services/employee';

export class Edit extends Component {
  static displayName = Edit.name;

  constructor(props) {
    super(props);
    this.state = { id: 0,fullName: '',birthdate: '',tin: '',typeId: 1, loading: true,loadingSave:false };
  }

  componentDidMount() {
    this.getEmployee(this.props.match.params.id);
  }
  handleChange(event) {
    this.setState({ [event.target.name] : event.target.value});
  }

  handleSubmit(e){
      e.preventDefault();
      if (window.confirm("Are you sure you want to save?")) {
        this.saveEmployee();
      } 
  }

  render() {

    let contents = this.state.loading
    ? <p><em>Loading...</em></p>
    : <div>
        <form>
          <div className='form-row'>
          <div className='form-group col-md-6'>
            <label htmlFor='inputFullName4'>Full Name: *</label>
            <input type='text' className='form-control' id='inputFullName4' onChange={this.handleChange.bind(this)} name="fullName" value={this.state.fullName} placeholder='Full Name' />
          </div>
          <div className='form-group col-md-6'>
            <label htmlFor='inputBirthdate4'>Birthdate: *</label>
            <input type='date' className='form-control' id='inputBirthdate4' onChange={this.handleChange.bind(this)} name="birthdate" value={this.state.birthdate} placeholder='Birthdate' />
          </div>
          </div>
          <div className="form-row">
          <div className='form-group col-md-6'>
            <label htmlFor='inputTin4'>TIN: *</label>
            <input type='text' className='form-control' id='inputTin4' onChange={this.handleChange.bind(this)} value={this.state.tin} name="tin" placeholder='TIN' />
          </div>
          <div className='form-group col-md-6'>
            <label htmlFor='inputEmployeeType4'>Employee Type: *</label>
            <select id='inputEmployeeType4' onChange={this.handleChange.bind(this)} value={this.state.typeId}  name="typeId" className='form-control'>
              <option value='1'>Regular</option>
              <option value='2'>Contractual</option>
            </select>
          </div>
          </div>
          <button type="submit" onClick={this.handleSubmit.bind(this)} disabled={this.state.loadingSave} className="btn btn-primary mr-2">{this.state.loadingSave?"Loading...": "Save"}</button>
          <button type="button" onClick={() => this.props.history.push("/employees/index")} className="btn btn-primary">Back</button>
        </form>
      </div>;

    return (
        <div>
        <h1 id="tabelLabel" >Employee Edit</h1>
        <p>All fields are required</p>
        {contents}
      </div>
    );
  }

  async saveEmployee() {
    this.setState({ loadingSave: true });
    const { isSuccess } = await updateEmployee(this.state.id, this.state);
    if(isSuccess){
        this.setState({ loadingSave: false });
        alert("Employee successfully saved");
        this.props.history.push("/employees/index");
    }
    else{
        alert("There was an error occured.");
    }
  }

  async getEmployee(id) {
    this.setState({ loading: true,loadingSave: false });
    const { isSuccess, data } = await getEmployeeById(id);
    if(!isSuccess) return;
    this.setState({
        id: data.id,
        fullName: data.fullName,
        birthdate: new Date(data.birthdate).toISOString().split('T')[0],
        tin: data.tin,
        typeId: data.typeId,
        loading: false,
        loadingSave: false
    });
  }
}
