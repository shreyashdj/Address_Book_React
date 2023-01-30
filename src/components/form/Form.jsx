import React, { useState, useEffect } from 'react'
import './Form.css'
import { Link, useParams } from 'react-router-dom';
import AddressBookService from '../../service/AddressBookService'
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const Form = (props) => {

    let startValue = {
        "firstName": "",
        "lastName": "",
        "address": "",
        "city": "",
        "state": "",
        "zipCode": "",
        "phoneNumber": "",
        "email": "",
        isUpdate: false,
    }
    const [formValue, setForm] = useState(startValue)

    const onReset = () => {
        setForm({
            ...startValue, id: formValue.id, isUpdate: formValue.isUpdate
        });
    };

    const onNameChange = (event) => {
        setForm({ ...formValue, [event.target.name]: event.target.value });
    }

    const params = useParams();

    useEffect(() => {
        console.log(params.id)
        if (params.id) {
            getPersonId(params.id)
            console.log(params.id)
        }
    }, [params.id]);

    const getPersonId = (personId) => {
        console.log("Data Found")
        AddressBookService.getPersonById(personId).then((data) => {
            let obj = data.data.data;
            console.log(obj);
            setData(obj);
        });
    };

    const setData = (obj) => {
        console.log()
        setForm({
            ...formValue,
            ...obj,
            id: obj.cotactId,
            firstName: obj.firstName,
            lastName: obj.lastName,
            phoneNumber: obj.phoneNumber,
            email: obj.email,
            address: obj.address,
            city: obj.city,
            state: obj.state,
            zipCode: obj.zipCode,
            isUpdate: true
        });
    };

    const navigate = useNavigate();
    const save = async (event) => {
        event.preventDefault();

        let object = {
            contactId: formValue.id,
            firstName: formValue.firstName,
            lastName: formValue.lastName,
            phoneNumber: formValue.phoneNumber,
            email: formValue.email,
            address: formValue.address,
            city: formValue.city,
            state: formValue.state,
            zipCode: formValue.zipCode
        };

        if (formValue.isUpdate) {
            AddressBookService.updatePerson(params.id, object)
                .then((data) => {
                    var value = window.confirm(data);
                    if (value === true) {
                        alert("update successfull!");
                        navigate('/home');
                    } else {
                        window.location.reload();
                    }
                });
        } else {
            AddressBookService.addPerson(object).then((response) => {
                console.log(response);
                alert("Data Added!!");
                navigate('/home');
            })
        }
    }

    return (
        <div>

            <div className="home-button">
                <Link to="/home">
                    <Button variant="contained" size="large">
                        Home
                    </Button>
                </Link>
            </div>
            <div className="form-content">

                <div className="form-head">
                    <span>
                        PERSON ADDRESS FORM
                    </span>
                </div>

                <form className="form" onSubmit={save}>
                    <label className="label text" htmlFor="firstName">First Name</label>
                    <div className="row-content">
                        <input className="input" type="text" id="firstName" name="firstName" placeholder="Enter First Name"
                            onChange={onNameChange} value={formValue.firstName} required />
                        <error-output className="firstName-error" htmlFor="firstName"></error-output>
                    </div>

                    <label className="label text" htmlFor="lastName">Last Name</label>
                    <div className="row-content">
                        <input className="input" type="text" id="lastName" name="lastName" placeholder="Enter Last Name"
                            onChange={onNameChange} value={formValue.lastName} required />
                        <error-output className="lastName-error" htmlFor="lastName"></error-output>
                    </div>

                    <label className="label text" htmlFor="phone">Phone Number</label>
                    <div className="row-content">
                        <input className="input" type="number" id="phoneNumber" name="phoneNumber" placeholder="Enter Phone Number"
                            onChange={onNameChange} value={formValue.phoneNumber} required />
                        <error-output className="phone-error" htmlFor="number"></error-output>
                    </div>

                    <label className="label text" htmlFor="email">Email Id</label>
                    <div className="row-content">
                        <input className="input" type="text" id="email" name="email" placeholder="Enter Email Id"
                            onChange={onNameChange} value={formValue.email} required />
                        <error-output className="email-error" htmlFor="email"></error-output>
                    </div>

                    <label className="label text" htmlFor="address">Address</label>
                    <div className="row-content">
                        <textarea className="input" name="address" id="address" rows="4" placeholder="Enter Address"
                            onChange={onNameChange} value={formValue.address} ></textarea>
                    </div>


                    <label className="label text" htmlFor="city">City</label>
                    <div className="row-content">
                        <input className="input" type="text" id="city" name="city" placeholder="Enter City Name"
                            onChange={onNameChange} value={formValue.city} required />
                    </div>

                    <div className="row">
                        <div className="input-content">
                            <label className="label text" htmlFor="state">State</label>
                            <div className="row-content">
                                <select className="input" name="state" id="state" onChange={onNameChange} value={formValue.state}>
                                    <option>State</option>
                                    <option value="Goa">Goa</option>
                                    <option value="Maharashtra">Maharashtra</option>
                                    <option value="Gujarat">Gujarat</option>
                                    <option value="Bihar">Bihar</option>
                                    <option value="Asam">Asam</option>
                                </select>
                            </div>
                        </div>

                        <div className="input-content">
                            <label className="label text" htmlFor="zip">Zip Code</label>
                            <div className="row-content">
                                <input className="input" type="number" id="zip" name="zipCode" placeholder="Enter Zip Code"
                                    onChange={onNameChange} value={formValue.zipCode} required />
                                <error-output className="zip-error" name="zipError" value={formValue.zipError} htmlFor="number"></error-output>
                            </div>
                        </div>

                    </div>

                    <div className="buttonParent">
                        <div className="add-reset">
                            <button type="submit" className="button addButton" id="addButton">{formValue.isUpdate ? 'Update' : 'Submit'}</button>
                            <button type="reset" className="resetButton button" id="resetButton" onClick={onReset}>Reset</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Form;