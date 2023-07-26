import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Notiflix from "notiflix";
import { Modal } from "antd";
import moment from "moment";
import { useSelector } from "react-redux";

function BookTable() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const user = useSelector((store) => store.userSlice.user);

  // newBook
  const [patronId, setPatronId] = useState("");
  const [patronData, setPatronData] = useState(null);
  const [returnDate, setReturnDate] = useState("");
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [issues, setIssues] = useState([]);

  const validate = async () => {
    try {
      const response = await axios.get(
        `/api/users/get-user-by-id/${patronId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("library")}`,
          },
        }
      );
      if (response.data.success) {
        console.log(response.data);
        if (response.data.data.role !== "patron") {
          setValidated(false);
          setErrorMessage("This user is not a patron");
          return;
        } else {
          setValidated(true);
          setErrorMessage("");
          setPatronData(response.data.data);
          setReturnDate(response.data.data);
        }
      } else {
        setValidated(false);
        setErrorMessage(response.data.msg);
      }
    } catch (err) {
      setValidated(false);
      setErrorMessage(err.msg);
    }
  };

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = async () => {
    setIsModalOpen(true);

    const response = await axios.post(
      `/api/issues/get-issues/`,
      {
        book: books._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("library")}`,
        },
      }
    );
    if (response.data.success) {
      setIssues(response.data.data);
    } else {
      toast.error(response.data.msg);
    }
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const showModal2 = () => {
    setIsModalOpen2(true);
  };
  const handleOk2 = () => {
    setIsModalOpen2(false);
  };
  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };

  const getAllBooks = async () => {
    try {
      const response = await axios.get("/api/books/get-all-books", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("library")}`,
        },
      });
      if (response.data.success) {
        setBooks(response.data.data);
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getAllBooks();
  }, [books]);

  console.log(books);

  return (
    <div>
      <div className="card shadow mt-3">
        <div className="card-body">
          <table class="table table-responsive ">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Book Photo</th>
                <th scope="col">Title</th>
                <th scope="col">Category</th>
                <th scope="col">Author</th>
                <th scope="col">Publisher</th>
                <th scope="col">Total Copies</th>
                <th scope="col">available Copies</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => {
                // onIssue
                const onIssue = async () => {
                  try {
                    const response = await axios.post(
                      `/api/issues/issue-new-book`,
                      {
                        book: book._id,
                        user: patronId,
                        issueDate: new Date(),
                        returnDate: returnDate,
                        rent: moment(returnDate).diff(moment(), "days") + 1,
                        issuedBy: user._id,
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem(
                            "library"
                          )}`,
                        },
                      }
                    );

                    if (response.data.success) {
                      setPatronId("");
                      setReturnDate("");
                      setErrorMessage("");
                      setValidated(false);
                      setIsModalOpen(false);
                      toast.success(response.data.msg);
                    } else {
                      toast.error(response.data.msg);
                    }
                  } catch (err) {
                    setErrorMessage(err.message);
                  }
                };

                // Create a function to delete book

                // Notiflix
                const deleteBook = (id) => {
                  Notiflix.Confirm.show(
                    "Delete Book?",
                    "Are you sure you want to delete?",
                    "Yes",
                    "No",
                    function okCb() {
                      axios
                        .delete(`/api/books/delete-book/${book._id}`, {
                          headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                              "library"
                            )}`,
                          },
                        })
                        .then((response) => {
                          if (response.data.success) {
                            toast.success(response.data.msg);
                          }
                        })
                        .catch((error) => {
                          toast.error(error.message);
                        });
                    },
                    function cancelCb() {},
                    {
                      width: "320px",
                      borderRadius: "8px",
                      // etc...
                      okButtonBackground: "#2563EB",
                      cancelButtonBackground: "#B31312",
                      titleColor: "#000",
                    }
                  );
                };

                // const deleteBook = async (id) => {
                //   try {
                //     const response = await axios.delete(
                //       `/api/books/delete-book/${book._id}`,
                //       {
                //         headers: {
                //           Authorization: `Bearer ${localStorage.getItem(
                //             "library"
                //           )}`,
                //         },
                //       }
                //     );
                //     if (response.data.success) {
                //       toast.success(response.data.msg);
                //     } else {
                //       toast.error("Could not delete book");
                //     }
                //   } catch (err) {
                //     toast.error(err.msg);
                //   }
                // };

                return (
                  <tr key={book._id}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <img src={book.image} width={70} height={70} alt="" />
                    </td>
                    <td>{book.title}</td>
                    <td>{book.category}</td>
                    <td>{book.author}</td>
                    <td>{book.publisher}</td>
                    <td>{book.totalCopies}</td>
                    <td>{book.availableCopies}</td>
                    <td className="">
                      <FaEdit
                        size={24}
                        className="cursor-pointer text-blue-600"
                        onClick={() => navigate(`/edit-book/${book._id}`)}
                      />
                    </td>
                    <td>
                      <FaTrashAlt
                        size={24}
                        className="cursor-pointer text-red-600"
                        onClick={() => deleteBook(book._id)}
                      />
                    </td>
                    <td>
                      <button className="btn" type="submit" onClick={showModal}>
                        Issues
                      </button>
                      <Modal
                        title="Basic Modal"
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                      >
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                      </Modal>
                    </td>
                    <td>
                      <button
                        className="btn"
                        type="submit"
                        onClick={showModal2}
                      >
                        Issue Book
                      </button>
                      <Modal
                        title="Issue New Book"
                        open={isModalOpen2}
                        onOk={handleOk2}
                        onCancel={handleCancel2}
                        footer={null}
                      >
                        <form>
                          <div class="mb-3 p-2">
                            <label class="form-label">Patron ID</label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Patron ID"
                              value={patronId}
                              onChange={(e) => setPatronId(e.target.value)}
                            />
                          </div>
                          <div class="mb-3">
                            <label class="form-label">Return Date</label>
                            <input
                              type="date"
                              class="form-control"
                              placeholder="Return Date"
                              value={returnDate}
                              onChange={(e) => setReturnDate(e.target.value)}
                              min={moment().format("YYYY-MM-DD")}
                            />
                          </div>
                          {errorMessage && (
                            <span className="text-red-600 font-bold">
                              {errorMessage}
                            </span>
                          )}

                          <div class="d-grid gap-2">
                            <button
                              class="btn btn-primary"
                              type="button"
                              disabled={patronId === "" || returnDate === ""}
                              onClick={validate}
                            >
                              Validate
                            </button>
                            {validated && (
                              <button
                                class="btn btn-info"
                                type="button"
                                disabled={patronId === "" || returnDate === ""}
                                onClick={onIssue}
                              >
                                Issue
                              </button>
                            )}

                            {validated && (
                              <div>
                                <h6>Patron Name: {patronData.name}</h6>
                                <h6>Rent Per Day: {book.rentPerDay}</h6>
                                <h6>
                                  Number of Days :
                                  {moment(returnDate).diff(moment(), "days")}
                                </h6>
                              </div>
                            )}
                          </div>
                        </form>
                      </Modal>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BookTable;
