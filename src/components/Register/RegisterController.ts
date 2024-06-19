import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from '../../axiosInstance';
import bcrypt from 'bcryptjs';
import IUserData from '../../interfaces/IUserData'; // Import your interface

const RegisterController = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const saltRounds = 10;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate inputs
    if (!firstName || !lastName || !email || !password) {
      console.error('All fields are required');
      return;
    }

    // Hash the password before sending it to the server
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const userData: IUserData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      permission_level: 1
    };

    try {
      const res = await axios.post("/register", userData);
      console.log(res.data);
      navigate("/login");
    } catch (err: any) {
      if (err.response) {
        console.error(err.response.data);
      } else {
        console.error("Error occurred:", err.message);
      }
    }
  };

  return {
    handleSubmit,
    lastName,
    setFirstName,
    firstName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
  };
};

export default RegisterController;
