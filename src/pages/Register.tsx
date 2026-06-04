import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  // 1. Create state hooks to capture form data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // To redirect user after registration

  // 2. Submit Event Handler
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop standard form reload
    setError(""); // Clear old errors

    // Simple validation checks
    if (!email || !password || !repeatPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== repeatPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      // 3. Construct the network POST request
      const response = await fetch("http://localhost:3000/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(), // Generate a unique account ID
          email: email,
          password: password, // Note: Production apps should hash passwords on the backend!
          bookmarks: [] // Initialize empty bookmarks list for the new user profile
        }),
      });

      if (response.ok) {
        alert("Account created successfully!");
        navigate("/"); // Send them to the login screen
      } else {
        setError("Something went wrong on the server.");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
      console.error("Register Error:", err);
    }
  };

  return (
    <div className="w-full px-4 flex mt-12 items-center flex-col">
      <img src="./logoacc.svg" alt="" />

      {/* Attach handleSubmit to the form submission */}
      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col items-center rounded-[10px] w-full bg-[#161D2F] p-6 mt-14.5"
      >
        <h1 className="text-3xl text-start self-start font-normal">
          Sign Up
        </h1>

        {/* Display descriptive errors if they happen */}
        {error && <p className="text-red-500 text-sm self-start mt-4">{error}</p>}

        <label
          className="mt-10 mb-7 pb-4.25 px-4 w-full border-b border-b-slate-500"
          htmlFor="email"
        >
          <input
            className="outline-0 w-full bg-transparent"
            placeholder="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label
          className="mb-10 pb-4.25 px-4 w-full border-b border-b-slate-500"
          htmlFor="password"
        >
          <input
            className="outline-0 w-full bg-transparent"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <label
          className="mb-10 pb-4.25 px-4 w-full border-b border-b-slate-500"
          htmlFor="Rpassword"
        >
          <input
            className="outline-0 w-full bg-transparent"
            placeholder="Repeat Password"
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </label>

        <input
          className="w-72 h-12 bg-red-500 rounded-md cursor-pointer hover:bg-red-600 transition-colors"
          type="submit"
          value="Create an account" 
        />
        <p className="mt-5">
          Already have an account?{" "}
          <Link to={"/"}>
            <span className="text-red-500">Log In</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;