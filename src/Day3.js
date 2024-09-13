import { useState } from "react";
import Swal from "sweetalert2";

const Form = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dateOfBirth: "",
    country: "",
    gender: "",
    message: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    if (
      formData.name == ""||
      formData.email == ""||
      formData.gender == ""||
      formData.dateOfBirth == ""||
      formData.country == ""
       ) 
    {
      return Swal.fire({
        title:"Not enough info",
        text:"Please complete your info",
        icon:"warning",
        confirmButtonText:"agree",
      })
    }
    // ask customers if they need to change data
    e.preventDefault();
    const isSubmit = await Swal.fire ({
        title:"Please comfirm",
        text: "After you uploaded, you can't change the information. Are you sure?",
        icon: "warning",
        confirmButtonText: 'agree',
        concelButtonText:'cancel',
        showCloseButton:'true',
        showCancelButton: true
      });
      if (!isSubmit.isConfirmed) {
        return;
      }
    onSubmit(formData);
    setFormData ({
      name: "",
      email: "",
      dateOfBirth: "",
      country: "",
      gender: "",
      message: "",
    });
    Swal.fire({
      title:"succeeded",
      text: 'Your information is successfully uploaded',
      icon: 'success',
      confirmButtonText: 'agree'
    })
  }
  return (
    <form className="form" onSubmit={handleChange}>
      <h1>Register</h1>
      <input
        onChange={handleChange}
        value={formData.name}
        type="text"
        name="name"
        placeholder="name"
        // required
      ></input>
      <input
        onChange={handleChange}
        value={formData.email}
        type="email"
        name="email"
        placeholder="email"
        // required
      ></input>
      <input
        onChange={handleChange}
        value={formData.country}
        type="country"
        name="country"
        placeholder="country"
        // required
      ></input>
      <input
        onChange={handleChange}
        value={formData.dateOfBirth}
        type="date"
        name="dateOfBirth"
        placeholder="dateOfBirth"
        required
      ></input>
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        // required
      >
        <option value="">choose gender</option>
        <option value="men">man</option>
        <option value="women">woman</option>
        <option value="other">other</option>
      </select>

      <button type="submit" onClick={handleSubmit}>
        send
      </button>
    </form>
  );
};
const Day3 = () => {
  const [submissions, setsubmissions] = useState([]);
  const handleSubmit = (formData) => {
    setsubmissions([ ...submissions, formData ]);
  };
  return (
    <div className="container">
      <Form onSubmit={handleSubmit}></Form>
      <div className="submissions">
        <h3>recieved informations</h3>
      </div>
        {submissions.map((ss, index) => (
          <div className="submission-item">
            <p>
              <strong>name</strong>
              {ss.name}
            </p>
            <p>
              <strong>email</strong>
              {ss.gender}
            </p>
            <p>
              <strong>dateOfBirth</strong>
              {ss.dateOfBirth}
            </p>
            <p>
              <strong>gender</strong>
              {ss.gender}
            </p>
            <p>
              <strong>country</strong>
              {ss.country}
            </p>
          </div>

        ))}
      <style jsx>
        {`
          .container {
            min-height: 100vh;
            background-color: #f0f0f0;
            padding: 100px;
            magin: 0 auto;
            text-align: center;
          }
          .form {
            display: flex;
            flex-direction: column;
            width: 350px;
            padding: 20px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 0 10 px rgba(0, 0, 0.1);
            margin-bottom: 20px;
          }
            h1 {
            color: #c30f08;
          }
          .form input,
          .form textarea,
          .form select {
            margin: 10px 0;
            padding: 10px;
            border-radius: 40px;
            border: 1px solid #ddd;
            font-size: 16px;
          }
          .form textarea {
            min-height: 100px;
            resize: vertical;
            
          }
          .form button {
            margin: 10px 10px;
            padding: 10px;
            background-color: grey;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
          }
            .form button:hover {
            margin: 10px 10px;
            padding: 10px;
            background-color: #4caf50;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
          }
          .submissions {
            width: 100%;
            max-width: 500px;
            margin-top: 20px;
            text-align: left;
          }
          .submission-item {
            background-color: white;
            border-radius: 8px;
            padding: 15px;
            margin: 15px;
            box-shadow: 0 0 5px rgba(0, 0, 0.1);
          }

        `}
      </style>
    </div>
  );
};

export default Day3;
