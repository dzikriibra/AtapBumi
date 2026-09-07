import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../../features/auth/authSlice";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loginStatus, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const resultAction = await dispatch(login(formData));

    if (login.fulfilled.match(resultAction)) {
      navigate("/");
    }
  };

  const isLoading = loginStatus === "loading";

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>

        <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required disabled={isLoading} />
      </div>

      <div>
        <label htmlFor="password">Password</label>

        <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required disabled={isLoading} />
      </div>

      {error && <p>{error}</p>}

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Memasuki AtapBumi..." : "Masuk"}
      </button>

      <p>
        Belum punya akun? <Link to="/register">Daftar</Link>
      </p>
    </form>
  );
}

export default LoginForm;
