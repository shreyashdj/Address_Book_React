import React, { Component } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import Add from "../../assets/icons/add.svg";
import Delete from "../../assets/icons/delete.svg";
import Edit from "../../assets/icons/edit.svg";
import logo from "../../assets/logo/logo2.png"
import AddressBookService from "../../service/AddressBookService.js";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addressbook: [],
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        AddressBookService.getAllContacts().then((response) => {
            this.setState({ addressbook: response.data.data });
        });
    }

    delete = (personId) => {
        let id = parseInt(personId);
        AddressBookService.deletePerson(id);
        window.location.reload();
    };

    update = (id) => {
        this.props.history.push(`AddressBookForm/${id}`);
        console.log(id);
    };

    render() {
        return (
            <div>
                <div className="main-content">
                    <div className="form-header">
                        <div className="header-tag">
                            <img src={logo} alt="Logo" />
                            <div className="person-detail-text">
                                Person Details
                            </div>
                        </div>
                        <div>
                            <Link to="/form" className="add-button">
                                <img src={Add} alt="Add User Logo" />
                                Add User
                            </Link>
                        </div>
                    </div>

                    <table id="table-display" className="table">
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Contact</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Zip Code</th>
                            <th>Email Id</th>
                            <th>Created On</th>
                            <th>Modified On</th>
                            <th>Action</th>
                        </tr>
                        <tbody>
                            {this.state.addressbook.map((book, index) => (
                                <tr key={`${index}`}>
                                    <td>{book.contactId}</td>
                                    <td>{book.firstName} {book.lastName}</td>
                                    <td>{book.phoneNumber}</td>
                                    <td>{book.address}</td>
                                    <td>{book.city}</td>
                                    <td>{book.state}</td>
                                    <td>{book.zipCode}</td>
                                    <td>{book.email}</td>
                                    <td>{book.createdOn}</td>
                                    <td>{book.modifiedOn}</td>
                                    <td className="action-buttons">
                                        <img
                                            src={Delete}
                                            alt="delete"
                                            onClick={() => this.delete(book.contactId)}
                                        />
                                        <Link to={`/AddressBookForm/${book.contactId}`}>
                                            <img
                                                src={Edit}
                                                alt="edit"
                                                onClick={() => this.update(book.contactId)}
                                            />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
export default Home;