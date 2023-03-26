import React from 'react';

export default function Table ({
  data, columns, actions
}) {
  return (
    <table className='table table-striped' aria-labelledby="tabelLabel">
      <thead>
        <tr>{ columns.map(column => <th key={column.title}>{column.title}</th>) }</tr>
      </thead>
      <tbody>
        {data.map((item, index) =>
          <tr key={index}>
            { 
              columns.map(column => column.render ?
                <td key={index}>{column.render(item)}</td> :
                <td key={index}>{item[column.data]}</td>
              ) 
            }
            {
              actions?.length > 0 ? (
                <td>
                  {
                    actions.map(action =>
                      <button
                        type='button' className={`btn btn-${action.type} mr-2`}
                        onClick={() => action.onClick(item)}
                      >
                        {action.label}
                      </button>
                    )
                  }
                </td>
              ) : null
            }
          </tr>
        )}
      </tbody>
    </table>
  )
}