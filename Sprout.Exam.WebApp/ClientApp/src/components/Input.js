import React from 'react'

export default function Input ({
  type, name, label, placeholder, onChange, value, required
}) {
  return (
    <div className='form-group col-md-6'>
      <label htmlFor={name}>
        {label}:
        {required ? <span className='text-danger'> *</span> : null}
      </label>
      <input
        type={type} className='form-control' id={name}
        onChange={onChange} name={name} value={value}
        placeholder={placeholder}
      />
    </div>
  )
}

Input.defaultProps = {
  type: 'text',
  required: false,
}