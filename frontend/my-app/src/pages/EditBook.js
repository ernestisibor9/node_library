import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function EditBook() {
  const userObj = useSelector((store) => store.userSlice.user);
  const [book, setBook] = useState({
    title: "",
    description: "",
    image: "",
    category: "",
    author: "",
    publisher: "",
    publishedOn: "",
    rentPerDay: "",
    totalCopies: "",
    availableCopies: "",
    createdBy: "",
  });

  book.availableCopies = book.totalCopies;
  book.createdBy = userObj?._id;

  const navigate = useNavigate();

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBook({ ...book, [name]: value });
  };

  const { id } = useParams();
  // Fetch Single Record
  const getSingleBook = async () => {
    try {
      const response = await axios.get(`/api/books/get-single-book/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("library")}`,
        },
      });
      if (response.data.data) {
        setBook(response.data.data);
      } else {
        toast.error("Cannot fetched data");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getSingleBook();
  }, []);

  // When the handle submit button is clicked
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`/api/books/update-book/${id}`, book, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("library")}`,
        },
      });
      if (response.data.success) {
        toast.success(response.data.msg);
        navigate("/profile");
      } else {
        toast.error(response.data.msg);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-center">
          <div className="col-md-7">
            <div className="card shadow p-2">
              <div className="card-body">
                <h3 className="text-center font-bold">Edit Book</h3>
                <form onSubmit={handleSubmit}>
                  <div class="mb-3">
                    <span className="text-red-600 mr-1 font-semibold">*</span>
                    <label class="form-label">Title</label>
                    <input
                      type="text"
                      name="title"
                      class="form-control"
                      placeholder="title"
                      value={book.title}
                      onChange={handleInput}
                    />
                  </div>
                  <div class="mb-3">
                    <span className="text-red-600 mr-1 font-semibold">*</span>
                    <label class="form-label">Description</label>
                    <textarea
                      class="form-control"
                      name="description"
                      rows="3"
                      value={book.description}
                      onChange={handleInput}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <img src={book.image} alt="" width={80} height={80} />
                  </div>
                  <div class="mb-3">
                    <span className="text-red-600 mr-1 font-semibold">*</span>
                    <label class="form-label">Image URL</label>
                    <input
                      type="text"
                      class="form-control"
                      name="image"
                      placeholder="image url"
                      value={book.image}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="mb-3">
                    <div class="row">
                      <div className="col">
                        <span className="text-red-600 mr-1 font-semibold">
                          *
                        </span>
                        <label class="form-label">Category</label>
                        <select
                          class="form-select"
                          name="category"
                          aria-label="Default select example"
                          value={book.category}
                          onChange={handleInput}
                        >
                          <option selected>Select Category</option>
                          <option value="friction">Fiction</option>
                          <option value="non-friction">Non Fiction</option>
                          <option value="biography">Biography</option>
                          <option value="drama">Drama</option>
                          <option value="history">History</option>
                        </select>
                      </div>
                      <div class="col">
                        <span className="text-red-600 mr-1 font-semibold">
                          *
                        </span>
                        <label class="form-label">Author</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="author"
                          aria-label=""
                          name="author"
                          value={book.author}
                          onChange={handleInput}
                        />
                      </div>
                      <div class="col">
                        <span className="text-red-600 mr-1 font-semibold">
                          *
                        </span>
                        <label class="form-label">Publisher</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="publisher"
                          aria-label=""
                          name="publisher"
                          value={book.publisher}
                          onChange={handleInput}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div class="row">
                      <div class="col">
                        <span className="text-red-600 mr-1 font-semibold">
                          *
                        </span>
                        <label class="form-label">Published Date</label>
                        <input
                          type="date"
                          class="form-control"
                          placeholder="date"
                          aria-label=""
                          name="publishedOn"
                          value={book.publishedOn}
                          onChange={handleInput}
                        />
                      </div>
                      <div class="col">
                        <span className="text-red-600 mr-1 font-semibold">
                          *
                        </span>
                        <label class="form-label">Rent Per Day</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="rent per day"
                          aria-label="First name"
                          name="rentPerDay"
                          value={book.rentPerDay}
                          onChange={handleInput}
                        />
                      </div>
                      <div class="col">
                        <span className="text-red-600 mr-1 font-semibold">
                          *
                        </span>
                        <label class="form-label">Total Copies</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="total copies"
                          aria-label=""
                          name="totalCopies"
                          value={book.totalCopies}
                          onChange={handleInput}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-3 flex justify-end gap-4">
                    <button className="btn btn-primary" type="submit">
                      Update Book
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditBook;
