import {
  Avatar,
  Button,
  DarkThemeToggle,
  Dropdown,
  Flowbite,
  Navbar,
  NavbarToggle,
} from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logIn, logOut } from "../../../store/auth";

export default function NavBar() {
  const { isLoggedIn, name } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <>
      <Navbar fluid rounded className=" shadow-lg">
        <Navbar.Brand as={Link} to={"/"}>
          <img
            src="https://flowbite-react.com/favicon.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite React Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Book Store
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2 ">
          {!isLoggedIn && (
            <Button
              onClick={() => dispatch(logIn())}
              aria-label="submit"
              type="submit"
            >
              login
            </Button>
          )}

          {isLoggedIn && (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  img="https://flowbite-react.com/images/people/profile-picture-5.jpg"
                  rounded
                >
                  <div className="space-y-1 font-medium dark:text-white">
                    <div>{name}</div>
                  </div>
                </Avatar>
              }
            >
              <Dropdown.Item onClick={() => dispatch(logOut())}>
                Sign out
              </Dropdown.Item>
            </Dropdown>
          )}

          <Flowbite>
            <DarkThemeToggle />
          </Flowbite>
          <NavbarToggle />
        </div>
        <Navbar.Collapse className="ms-auto pe-5">
          <Navbar.Link as={Link} to={"/"}>
            Home
          </Navbar.Link>
          {isLoggedIn && (
            <Navbar.Link as={Link} to={"/books-data"}>
              Add Book
            </Navbar.Link>
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
