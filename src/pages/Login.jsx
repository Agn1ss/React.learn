import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/user/action";
import { selectUserData, selectUserError } from "../redux/user/selectors";
const Login = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const error = useSelector(selectUserError);
  const user = useSelector(selectUserData);
  const handleLogin = () => {
    dispatch(login({ email, password }));
  };
  if (user?.id) return navigate("/");
  return (
    <div className="flex flex-col w-2/4 mx-auto gap-3 text-2xl">
      <h1 className="text-5xl text-center">Log in</h1>
      <input
        type="text"
        placeholder="Email"
        className="border-2 border-black py-2 px-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border-2 border-black py-2 px-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error?.message && <div className="text-red-500">{error?.message}</div>}
      <div className="flex justify-between mt-5">
        <button
          className="border-2 border-black px-2 py-1 text-2xl self-center rounded text-white bg-blue-500 hover:bg-blue-700"
          onClick={handleLogin}
        >
          Log in
        </button>
        <Link to="/signup" className="self-center underline">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login
