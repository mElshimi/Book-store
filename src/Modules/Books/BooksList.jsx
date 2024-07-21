import {
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { useEffect, useState } from "react";
import {
  MdDeleteForever,
  MdEditSquare,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, deleteBook } from "../../store/bookSlice";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export default function BooksList() {
  const dispatch = useDispatch();
  const naviagte = useNavigate();
  const { isLoading, books, error } = useSelector((state) => state.books);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [openModal, setOpenModal] = useState(false);
  const [book, setBook] = useState(null);

  const handleShow = (item) => {
    setOpenModal(true);
    setBook(item);
    console.log(item);
  };

  const booksList = books.map((item) => (
    <TableRow
      key={item.id}
      className="bg-white dark:border-gray-700 dark:bg-gray-800"
    >
      <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {item.title}
      </TableCell>

      <TableCell>
        <button
          onClick={() => handleShow(item)}
          type="button"
          aria-label="show book"
          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
        >
          <MdOutlineRemoveRedEye className=" text-lg" />
        </button>
      </TableCell>
      {isLoggedIn && (
        <>
          <TableCell>
            <button
              onClick={() => {
                naviagte(`/books-data`, { state: item });
              }}
              type="button"
              aria-label="edit book"
              className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
            >
              <MdEditSquare className=" text-lg" />
            </button>
          </TableCell>
          <TableCell>
            <button
              onClick={() => {
                dispatch(deleteBook(item.id));
                dispatch(getBooks());
              }}
              type="button"
              aria-label="delete book"
              className="font-medium text-red-600 hover:underline dark:text-red-500"
            >
              <MdDeleteForever className=" text-lg" />
            </button>
          </TableCell>
        </>
      )}
    </TableRow>
  ));

  const ShowBook = ({ item }) => {
    return (
      <Modal show={openModal} size={"md"} onClose={() => setOpenModal(false)}>
        <Modal.Header>{item?.title} Info</Modal.Header>
        <Modal.Body>
          <div className="space-y-6 p-6">
            <p className="text-l font-bold leading-relaxed text-sky-500 dark:text-sky-400">
              ID :{" "}
              <span className="text-md font-medium text-gray-500 dark:text-gray-400">
                {item?.id}
              </span>
            </p>
            <p className="text-l font-bold leading-relaxed text-sky-500 dark:text-sky-400">
              Name :{" "}
              <span className="text-md font-medium text-gray-500 dark:text-gray-400">
                {item?.title}
              </span>
            </p>
            <p className="text-l font-bold leading-relaxed text-sky-500 dark:text-sky-400">
              Price :{" "}
              <span className="text-md font-medium text-gray-500 dark:text-gray-400">
                {item?.price} EGP
              </span>
            </p>
            <p className="text-l font-bold leading-relaxed text-sky-500 dark:text-sky-400">
              Description :{" "}
              <span className="text-md font-medium text-gray-500 dark:text-gray-400">
                {item?.description}
              </span>
            </p>
            <p className="text-l font-bold leading-relaxed text-sky-500 dark:text-sky-400">
              Author :{" "}
              <span className="text-md font-medium text-gray-500 dark:text-gray-400">
                {item?.auth}
              </span>
            </p>
            <p className="text-l font-bold leading-relaxed text-sky-500 dark:text-sky-400">
              Added in :{" "}
              <span className="text-md font-medium text-gray-500 dark:text-gray-400">
                {book && moment(item.creationDate).format("llll")}
              </span>
            </p>
            <p className="text-l font-bold leading-relaxed text-sky-500 dark:text-sky-400">
              Last update :{" "}
              <span className="text-md font-medium text-gray-500 dark:text-gray-400">
                {book && moment(item.modificationDate).fromNow()}
              </span>
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>OK</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  return (
    <>
      <h1>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores, voluptatem unde minus quo in fugiat!</h1>
      <section className="dark:text-white text-center mt-24 pb-14">
        {isLoading ? (
          "loading"
        ) : books.length > 0 ? (
          <div className="overflow-x-auto w-11/12 mx-auto shadow-lg">
            <Table>
              <TableHead>
                <TableHeadCell>book name</TableHeadCell>
                <TableHeadCell>
                  <span className="sr-only">Info</span>
                </TableHeadCell>
                {isLoggedIn && (
                  <>
                    <TableHeadCell>
                      <span className="sr-only">Edit</span>
                    </TableHeadCell>
                    <TableHeadCell>
                      <span className="sr-only">Delete</span>
                    </TableHeadCell>
                  </>
                )}
              </TableHead>
              <TableBody className="divide-y">{booksList}</TableBody>
            </Table>
          </div>
        ) : (
          <div className="overflow-x-auto w-11/12 mx-auto shadow-lg">
            <Table>
              <TableHead>
                <TableHeadCell className="text-center">
                  books list
                </TableHeadCell>
              </TableHead>
              <TableBody className="divide-y">
                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell className="whitespace-nowrap text-center font-medium text-gray-900 dark:text-white">
                    {error ? error : "No Data"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        )}
        <ShowBook item={book} />
      </section>
    </>
  );
}
