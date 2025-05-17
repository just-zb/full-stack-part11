import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)

}

const add = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const remove = personToBeRemoved => {
    return axios.delete(`${baseUrl}/${personToBeRemoved.id}`)}

const changeNumber = (existingPerson, updatedPerson) => {
    return axios.put(`${baseUrl}/${existingPerson.id}`, updatedPerson)}


export default {
    getAll: getAll,
    add: add,
    remove: remove,
    changeNumber: changeNumber
}