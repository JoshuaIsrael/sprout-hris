import React from 'react'

export default function Select ({
  name, label, onChange, value, options, required
}) {
  return (
    <div className='form-group col-md-6'>
      <label htmlFor={name}>
        {label}:
        {required ? <span className='text-danger'> *</span> : null}
      </label>
      <select
        id={name} className='form-control' name={name}
        onChange={onChange} value={value}
      >
        { options.map(({value, label}) => <option key={value} value={value}>{label}</option>) }
      </select>
    </div>
  )
}

Select.defaultProps = {
  required: false,
}