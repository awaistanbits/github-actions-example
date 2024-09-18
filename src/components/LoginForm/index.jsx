import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading,setLoading] = useState(false);

  const doSubmitButtonDisabled = !email || !password;
  const submitButtonDisplayText = !loading ? "Login" : "Loading...";

  // Handlers
  const handleInputFieldsOnChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleFormOnSubmit = (e)=>{
    e.preventDefault();

    setLoading(true);
    setTimeout(()=>{
        alert("User Login Successfully");
        setEmail("");
        setPassword("");
        setLoading(false);
    },2000);

  };

  return (
    <form onSubmit={handleFormOnSubmit}>
      <h1>Login</h1>
      <div>
        {" "}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="enter email..."
          value={email}
          onChange={handleInputFieldsOnChange}
          data-testid="email-field"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="enter password..."
          value={password}
          onChange={handleInputFieldsOnChange}
          data-testid="password-field"
        />
      </div>
      <input type="submit" disabled={doSubmitButtonDisabled} value={submitButtonDisplayText}/>
    </form>
  );
};

export default LoginForm;
