const Filter = (props) => {
    return (
        <form>
            <div>
                Filter shown with: <input value={props.value} onChange={props.onChange}/>
            </div>
        </form>
    )
    }

    export default Filter
