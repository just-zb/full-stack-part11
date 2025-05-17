const PersonsList = (props) => {
  
  const handleDeleteClick = (person) => {
    const isConfirmed = window.confirm (`Delete ${person.name} ?`)
    if (isConfirmed === true) {
      props.removePerson(person)
    }
  }  
  
  return (
    <table>
      <tr>
        <th style={{ textAlign: 'left' }}>Name</th>
        <th style={{ textAlign: 'left' }}>Phone number</th>
        <th style={{ textAlign: 'left' }}></th>
      </tr>

      {props.personsToShow.map(person => {
        return (
      <tr key={person.name}>
        <td>
          {person.name}
        </td>
        <td>
          {person.number}
        </td>
        <td>
          <button onClick={() => handleDeleteClick(person) }>Delete</button>
        </td>
      </tr>)
      })}
      </table>
      
      )
}

export default PersonsList