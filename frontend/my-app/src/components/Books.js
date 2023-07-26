import React, { useState } from "react";
import { Button, Modal } from "antd";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

function Books() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
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

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(book.title);

    if (
      book.title === "" ||
      book.description === "" ||
      book.image === "" ||
      book.category === "" ||
      book.author === ""
    ) {
      toast.error("Fields cannot be empty");
    } else {
      try {
        const response = await axios.post("/api/books/add-book", book, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("library")}`,
          },
        });
        if (response.data.success) {
          toast.success(response.data.msg);
          setBook({
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
          setIsModalOpen(false);
        } else {
          toast.error(response.data.msg);
        }
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  return (
    <div className="flex justify-end">
      <Button type="primary" onClick={showModal}>
        Add Book
      </Button>
      <Modal
        title="Add Book"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        footer={null}
      >
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
                <span className="text-red-600 mr-1 font-semibold">*</span>
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
                <span className="text-red-600 mr-1 font-semibold">*</span>
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
                <span className="text-red-600 mr-1 font-semibold">*</span>
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
                <span className="text-red-600 mr-1 font-semibold">*</span>
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
                <span className="text-red-600 mr-1 font-semibold">*</span>
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
                <span className="text-red-600 mr-1 font-semibold">*</span>
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
            <button className="btn btn-danger" onClick={handleCancel}>
              Cancel
            </button>
            <button className="btn btn-primary">Save</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Books;
