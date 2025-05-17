const PersonForm = (props) =>{
    return (
    <form onSubmit={props.addName}>
        <div>
            Name: <input value={props.newName} onChange={props.handleNameChange}/>       
        </div>
        <div>
            Number: <input value={props.newNumber} onChange={props.handleNumberChange}/>
        </div>
        <div>
            <i>Number must be in the format 09-12345... or 040-1234...</i>
        </div>
        <div>
            <button type="submit">Add</button> 
        </div>
        
      </form>
    )
}

export default PersonForm