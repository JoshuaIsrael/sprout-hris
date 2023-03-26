import React from 'react';

export default function Label ({
  text, value
}) {
  return (
    <div className='form-group col-md-12'>
      <label>{text}: <b>{value}</b></label>
    </div>
  )
}