import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from '../../axiosInstance';

const LoginController = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showErrorAlert, setErrorAlert] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userData = {
        email: email,
        password: password
      };

      const res = await axios.post("/login", userData);
      console.log(res.data);

      // Redirect based on permission_level
      if (res.data.permission_level === 0) {
        navigate("/Dashboard"); // Redirect to admin page
      } else {
        navigate("/Home"); // Redirect to user page
      }

    } catch (err: any) {
      setErrorAlert(true);
      console.error(err.response ? err.response.data : "Error occurred:", err.message);
    }
  };

  return {
    handleSubmit,
    email,
    setEmail,
    password,
    setPassword,
    showErrorAlert,
    setErrorAlert
  };
};

export default LoginController;
