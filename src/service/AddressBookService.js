import axios from 'axios';

class AddressBookService {
  baseUrl = "http://localhost:8090/AddressBook";

  addPerson(data) {
    return axios.post(`${this.baseUrl}/add`, data);
  }

  getAllContacts() {
    return axios.get(`${this.baseUrl}/getAll`);
  }

  getPersonById(personId) {
    return axios.get(`${this.baseUrl}/getById/${personId}`);
  }

  updatePerson(personId, data) {
    return axios.put(`${this.baseUrl}/update/${personId}`, data);
  }

  deletePerson(personId) {
    return axios.delete(`${this.baseUrl}/delete/${personId}`);
  }
}

export default new AddressBookService();