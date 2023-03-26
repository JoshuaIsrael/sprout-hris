import React from 'react';

export default function Button ({
  children, type, onClick, disabled, primary
}) {

  const onButtonClick = (event) => {
    if (type === 'submit') event.preventDefault();
    if (onClick) onClick()
  }

  return (
    <button
      className={`btn btn-${primary ? 'primary' : 'secondary'} mr-2`}
      type={type} onClick={onButtonClick} disabled={disabled}
    >
      {children}
    </button>
  )
}

Button.defaultProps = {
  type: 'button'
}