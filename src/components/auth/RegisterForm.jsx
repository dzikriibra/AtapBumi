import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { register } from "../../features/auth/authSlice";

function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { registerStatus, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
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

    const resultAction = await dispatch(register(formData));

    if (register.fulfilled.match(resultAction)) {
      navigate("/login");
    }
  };

  const isLoading = registerStatus === "loading";

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nama</label>

        <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required disabled={isLoading} />
      </div>

      <div>
        <label htmlFor="email">Email</label>

        <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required disabled={isLoading} />
      </div>

      <div>
        <label htmlFor="password">Password</label>

        <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} minLength={6} required disabled={isLoading} />
      </div>

      {error && <p>{error}</p>}

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Mendaftarkan..." : "Daftar"}
      </button>

      <p>
        Sudah punya akun? <Link to="/login">Masuk</Link>
      </p>
    </form>
  );
}

export default RegisterForm;
