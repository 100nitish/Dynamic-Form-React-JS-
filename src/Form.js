import React, { useState} from "react";
import "./Form.css";
import countries from "./countries.json";
import states from "./states.json";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();

  const [formEntries, setFormEntries] = useState([
    {
      id: uuidv4(),
      name: "",
      email: "",
      phone: "",
      address: "",
      radio: "",
      country: "",
      state: "",
      city: "",
    },
  ]);

  const cities = {
    Delhi: ["", "New Delhi", "Gurgaon", "Noida"],
    Punjab: ["", "Chandigarh", "Ludhiana", "Amritsar"],
    Haryana: ["", "Gurugram", "Faridabad", "Panipat"],
    Goa: ["", "Panaji", "Margao", "Vasco da Gama"],
    California: ["", "Los Angeles", "San Francisco", "San Diego"],
    Texas: ["", "Houston", "Austin", "Dallas"],
    NewYork: ["", "New York City", "Buffalo", "Albany"],
    London: ["", "Westminster", "Chelsea", "Camden"],
    Manchester: ["", "City Centre", "Salford", "Trafford"],
    Birmingham: ["", "City Centre", "Edgbaston", "Selly Oak"],
  };

  const [formErrors, setFormErrors] = useState([]);

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const newEntries = [...formEntries];
    newEntries[index][name] = value;
    setFormEntries(newEntries);
  
  };

  const handleCountryChange = (index, e) => {
    const countryValue = e.target.value;
    const newEntries = [...formEntries];
    newEntries[index].country = countryValue;
    newEntries[index].state = "";
    newEntries[index].city = "";
    setFormEntries(newEntries);
  };

  const handleStateChange = (index, e) => {
    const stateValue = e.target.value;
    const newEntries = [...formEntries];
    newEntries[index].state = stateValue;
    newEntries[index].city = "";
    setFormEntries(newEntries);
  };

  const handleCityChange = (index, e) => {
    const cityValue = e.target.value;
    const newEntries = [...formEntries];
    newEntries[index].city = cityValue;
    setFormEntries(newEntries);
  };

  const handleAddForm = () => {
    setFormEntries([
      ...formEntries,
      {
        id: uuidv4(),
        name: "",
        email: "",
        phone: "",
        address: "",
        radio: "",
        country: "",
        state: "",
        city: "",
      },
    ]);
  };

  const handleRemoveForm = (index) => {
    const newEntries = formEntries.filter((_, i) => i !== index);
    setFormEntries(newEntries);
  };
  const [hasSubmissionError, setHasSubmissionError] = useState(false);


  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const errors = formEntries.map((entry) => {
      const error = {};
      if (!entry.name) error.name = "This Field is Required";
      else if (entry.name.length < 3) error.name = "Name must be at least 3 characters long";
      if (!entry.email) error.email = "This Field is Required";
      else if (!entry.email.match(emailRegex)) error.email = "Invalid email";
      if (!entry.phone) error.phone = "This Field is Required";
      else if (entry.phone.length < 5) error.phone = "Phone number must be at least 5 characters long";
      if (!entry.address) error.address = "This Field is Required";
      else if (entry.address.length < 10) error.address = "Address must be at least 10 characters long";
      if (!entry.country) error.country = "This Field is Required";
      if (!entry.state) error.state = "This Field is Required";
      if (!entry.radio) error.radio = "This Field is Required";
      if (!entry.city) error.city = "This Field is Required";
  
      return error;
    });

    const existingEntries = JSON.parse(localStorage.getItem('formEntries')) || [];
  const updatedEntries = [...formEntries, ...existingEntries];
  
  localStorage.setItem('formEntries', JSON.stringify(updatedEntries));


  
    const hasErrors = errors.some((error) => Object.keys(error).length > 0);
    setFormErrors(errors);
    setHasSubmissionError(hasErrors);
  
    if (hasErrors) {
      return; 
    }
  
 
    navigate("/table", { state: { formEntries } });
  
   
    setFormEntries([
      {
        id: uuidv4(),
        name: "",
        email: "",
        phone: "",
        address: "",
        radio: "",
        country: "",
        state: "",
        city: "",
      },
    ]);
  };
  
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <nav className="navbar p-5">
          <div className="form-inline">
            <button
              type="button"
              className="btn btn-info p-2 m-2"
              onClick={handleAddForm}
            >
              Add New User
            </button>
          </div>
        </nav>
        {hasSubmissionError && (
        <div style={{ color: "red", marginBottom: "20px" }}>
          Please correct the highlighted fields before submitting.
        </div>
      )}

        {formEntries.map((entry, index) => (
          <div className="formD" key={entry.id}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  onChange={(e) => handleInputChange(index, e)}
                  id="name"
                  value={entry.name}
                  name="name"
                  placeholder="Enter your name"
                />
                {formErrors[index]?.name && (
                  <span style={{ color: "red" }}>{formErrors[index].name}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  onChange={(e) => handleInputChange(index, e)}
                  id="email"
                  value={entry.email}
                  autoComplete="off"
                  name="email"
                  placeholder="Enter your email"
                />
                {formErrors[index]?.email && (
                  <span style={{ color: "red" }}>
                    {formErrors[index].email}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label>Gender:</label>
                <br />
                <div className="genderin d-flex">
                  <label htmlFor="male">Male</label>
                  <input
                    type="radio"
                    id="male"
                    name="radio"
                    value="Male"
                    onChange={(e) => handleInputChange(index, e)}
                    checked={entry.radio === "Male"}
                  />
                  <label htmlFor="female">Female</label>
                  <input
                    type="radio"
                    id="female"
                    name="radio"
                    value="Female"
                    onChange={(e) => handleInputChange(index, e)}
                    checked={entry.radio === "Female"}
                  />
                  <label htmlFor="other">Other</label>
                  <input
                    type="radio"
                    id="other"
                    name="radio"
                    value="Other"
                    onChange={(e) => handleInputChange(index, e)}
                    checked={entry.radio === "Other"}
                  />
                </div>
                {formErrors[index]?.radio && (
                  <span style={{ color: "red" }}>
                    {formErrors[index].radio}
                  </span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Mobile Number:</label>
                <input
                  type="tel"
                  id="mobile"
                  autoComplete="off"
                  name="phone"
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder="Enter your mobile number"
                  value={entry.phone}
                />
                {formErrors[index]?.phone && (
                  <span style={{ color: "red" }}>
                    {formErrors[index].phone}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="country">Country:</label>
                <select
                  onChange={(e) => handleCountryChange(index, e)}
                  value={entry.country}
                  name="country"
                >
                  <option value="">Select Country</option>
                  {countries.map((country, idx) => (
                    <option key={idx} value={country.country_code}>
                      {country.name}
                    </option>
                  ))}
                </select>

                {formErrors[index]?.country && (
                  <span style={{ color: "red" }}>
                    {formErrors[index].country}
                  </span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="state">State:</label>
                <select
                  value={entry.state}
                  onChange={(e) => handleStateChange(index, e)}
                  name="state"
                >
                  <option value="">Select State</option>
                  {states
                    .filter((state) => state.country_code === entry.country)
                    .map((state, idx) => (
                      <option key={idx} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                </select>

                {formErrors[index]?.state && (
                  <span style={{ color: "red" }}>
                    {formErrors[index].state}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="city">City:</label>

                <select
                  value={entry.city}
                  disabled={!entry.state}
                  onChange={(e) => handleCityChange(index, e)}
                  name="city"
                >
                  <option value="">Select City</option>
                  {entry.state &&
                    cities[entry.state].map((city, idx) => (
                      <option key={idx} value={city}>
                        {city}
                      </option>
                    ))}
                </select>

                {formErrors[index]?.city && (
                  <span style={{ color: "red" }}>{formErrors[index].city}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="address">Address:</label>
                <textarea
                  id="address"
                  onChange={(e) => handleInputChange(index, e)}
                  name="address"
                  value={entry.address}
                  autoComplete="off"
                  placeholder="Enter your address"
                ></textarea>
                {formErrors[index]?.address && (
                  <span style={{ color: "red" }}>
                    {formErrors[index].address}
                  </span>
                )}
              </div>
            </div>
            {index > 0 && (
              <button
                type="button"
                id="remove"
                className="btn btn-danger p-2 mb-2"
                onClick={() => handleRemoveForm(index)}
              >
                Remove User
              </button>
            )}
          </div>
        ))}

       
           <button type="submit" className="btn btn-info">
           Submit
         </button>
       
      </form>
    </>
  );
};

export default Form;
