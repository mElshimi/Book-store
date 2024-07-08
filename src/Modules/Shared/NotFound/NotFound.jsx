import { Button } from "flowbite-react";
import { IoArrowUndoSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <>
      <main className="min-h-screen bg-gray-900 w-full flex justify-center items-center flex-col gap-y-3  text-white">
        <h3 color="error">404 Page not found</h3>
        <Button as={Link} to={"/"}>
          <IoArrowUndoSharp className="mr-2 h-5 w-5" />
          Back to Home
        </Button>
      </main>
    </>
  );
}
