import { Button, Label, Textarea, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addBook, getBooks, updateBook } from "../../store/bookSlice";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function BooksData() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const book = location.state;
  const { isLoggedIn } = useSelector((state) => state.auth);
  // const [clicked, setClicked] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = (data) => {
    const upValue = {
      id: book?.id,
      book: {
        title: data.title,
        price: data.price,
        description: data.description,
        creationDate: book?.creationDate,
      },
    };
    // setClicked(true);
    dispatch(book ? updateBook(upValue) : addBook(data));
    navigate("/");
    // setInterval(() => {
    //   setClicked(false);
    // }, 5000);
  };

  useEffect(() => {
    !isLoggedIn && navigate("/");
  }, [isLoggedIn, navigate]);

  return (
    <>
      <section className="dark:text-white mt-24">
        <form
          onSubmit={handleSubmit(submit)}
          className=" w-11/12 mx-auto shadow-lg"
        >
          {/* title input */}
          <div className="w-full">
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="title"
                  color={errors.title && "failure"}
                  value="Title"
                />
              </div>
              <TextInput
                {...register("title", {
                  required: "Title is requierd",
                })}
                defaultValue={book ? book.title : ""}
                id="title"
                color={errors.title && "failure"}
                placeholder="Book Title"
                helperText={
                  errors.title && (
                    <>
                      <span className="font-medium">
                        {errors.title.message}
                      </span>
                    </>
                  )
                }
              />
            </div>
          </div>

          {/* pricee input */}
          <div className="w-full my-5">
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="title"
                  color={errors.price && "failure"}
                  value="Price"
                />
              </div>
              <TextInput
                {...register("price", {
                  required: "Price is requierd",
                  pattern: {
                    value: /^[\d]{1,9}$/gm,
                    message: "Price only numbers",
                  },
                })}
                defaultValue={book ? book.price : ""}
                id="price"
                placeholder="Book Price"
                color={errors.price && "failure"}
                helperText={
                  errors.price && (
                    <>
                      <span className="font-medium">
                        {errors.price.message}
                      </span>
                    </>
                  )
                }
              />
            </div>
          </div>

          {/* des input */}
          <div className="w-full ">
            <div className="mb-2 block ">
              <Label
                htmlFor="description"
                color={errors.description && "failure"}
                value="Description"
              />
            </div>
            <Textarea
              {...register("description", {
                required: "Description is requierd",
              })}
              defaultValue={book ? book.description : ""}
              id="description"
              placeholder="Leave a description..."
              color={errors.description && "failure"}
              helperText={
                errors.description && (
                  <>
                    <span className="font-medium">
                      {errors.description.message}
                    </span>
                  </>
                )
              }
              rows={4}
            />
          </div>

          <Button className="mt-5" aria-label="submit" type="submit">
            Save
          </Button>
        </form>
      </section>
    </>
  );
}
