import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../redux/user/selectors";
import { SET_USER_DATA } from "../redux/user/const";

export const Header = () => {
  const user = useSelector(selectUserData);
  const dispatch = useDispatch();

  return (
    <header className="w-full flex border-b-2 border-black py-2 justify-between text-2xl">
      <Link to="/" className="mx-3 font-bold text-blue-500">
        {user?.email && `Hello, ${user.email}`}
      </Link>
      <nav>
        <ul className="flex gap-5">
          <li>
            {user?.id && (
              <NavLink
                to="/"
                className={({ isActive }) => {
                  return isActive ? "text-red-500" : "";
                }}
                activeClassName="text-red-500"
              >
                About
              </NavLink>
            )}
          </li>
          <li>
            <NavLink
              to="/notes"
              className={({ isActive }) => {
                return isActive ? "text-red-500" : "";
              }}
              activeClassName="text-red-500"
            >
              Notes
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => dispatch({ type: SET_USER_DATA, payload: null })}
              to="/signup"
              activeClassName="text-red-500"
            >
              Log out
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;