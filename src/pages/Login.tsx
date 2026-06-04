import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({setLoggedIn}) => {
  // 1. Create state hooks to capture credentials
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // To redirect user on success

  // 2. Login Submit Handler
  const handleLogin = async (e) => {
    e.preventDefault(); // Stop page reload
    setError(""); // Clear previous errors

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      // 3. Fetch accounts data to verify credentials
      // Note: If using json-server, you can filter directly in the URL query!
      const response = await fetch(
        `http://localhost:3000/accounts?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
      );

      if (!response.ok) {
        throw new Error("Server error");
      }

      const users = await response.json();

      // If the array contains a matching user, authentication is successful
      if (users.length > 0) {
        const loggedInUser = users[0];
        
        // Optional: Save user data or token to localStorage for persistent sessions
        localStorage.setItem("currentUser", JSON.stringify(loggedInUser));

        // 4. Navigate to /home
        setLoggedIn(true)
        navigate("/home");
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      setError("Failed to connect to the login server.");
      console.error("Login Error:", err);
    }
  };

  return (
    <div className="w-full px-4 flex mt-12 items-center flex-col">
      <img src="./logoacc.svg" alt="" />

      {/* Attach handleLogin to form submission */}
      <form 
        onSubmit={handleLogin} 
        className="flex flex-col items-center rounded-[10px] w-full bg-[#161D2F] p-6 mt-14.5"
      >
        <h1 className="text-3xl text-start self-start font-normal">
          Login
        </h1>

        {/* Display validation errors */}
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

        <input
          className="w-72 h-12 bg-red-500 rounded-md cursor-pointer hover:bg-red-600 transition-colors"
          type="submit"
          value="Login to your account"
        />

        <p className="mt-5">
          Don’t have an account?{" "}
          <Link to={"/register"}>
            <span className="text-red-500">Sign Up</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;