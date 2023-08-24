import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
function PaymentModal({
  paymentModalShown,
  setPaymentModalShown,

  dispatch,
  products,
  basket,
}) {
  const total = basket.reduce((acc, item) => {
    let product = products.find((a) => a.id === item.id);
    return acc + product?.newprice * item?.count;
  }, 0);
  console.log(total);

  const removeProduct = (id) => {
    dispatch({
      type: "SET_BASKET",
      payload: [...basket.filter((a) => a.id !== id)],
    });
  };

  const [formData, setFormData] = useState({
    card_number: "",
    exp_date: "",

    security_code: "",
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
  });
  const openModal = (title, message) => {
    setModalContent({ title, message });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalContent({
      title: "",
      message: "",
    });
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/create-card/",
        {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        openModal("Success", "Thank you! Your contact information has been saved.");
      } else {
        openModal("Error", "Formu göndermek mümkün olmadı: " + data.error);
      }
    } catch (error) {
      openModal("Error", "Formu göndermek mümkün olmadı: " + error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div id="myPayModal" className="pay_modal">
      <div className="pay_modal_inner">
        <div className="pay_modal_header">
          <h4>Payment Process</h4>
          <span
            onClick={() => setPaymentModalShown(!paymentModalShown)}
            className="close"
          >
            &times;
          </span>
        </div>
        <hr />
        <div className="pay_modal_card_products">
          <div className="pay_modal_card_information">
            <form method="post" onSubmit={handleSubmit}>
              <div data-aos="fade-up" className="form_row">
                <div className="form_form">
                  <label for="card_number" className="form_label">
                    Card Number*
                  </label>
                  <input
                    type="number"
                    className="form_input"
                    maxLength="10"
                    placeholder=" Enter Card Number"
                    id="card_number"
                    value={formData.card_number}
                    onChange={handleInputChange}
                    name="card_number"
                  />
                </div>
              </div>
              <div data-aos="fade-up" className="form_row">
                <div className="form_form">
                  <label for="card_date" className="form_label">
                    Expiration Date*
                  </label>
                  <input
                    type="text"
                    className="form_input"
                    maxLength="5"
                    placeholder="MM / YY"
                    id="card_date"
                    value={formData.exp_date}
                    onChange={handleInputChange}
                    name="exp_date"
                  />
                </div>
              </div>
              <div data-aos="fade-up" className="form_row">
                <div className="form_form">
                  <label for="card_scode" className="form_label">
                    Security Code*
                  </label>
                  <input
                    type="number"
                    className="form_input"
                    maxLength="3"
                    placeholder="CVC"
                    id="card_scode"
                    value={formData.security_code}
                    onChange={handleInputChange}
                    name="security_code"
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="pay_modal_products">
            {basket.length ? (
              basket.map((a) => {
                let p = products.find((t) => t.id === a.id);
                return (
                  <>
                    <div className="pay_modal_product">
                      <div className="pay_modal_product_content">
                        <div className="pay_modal_image_about">
                          <div className="pay_modal_product_image">
                            <img src={p?.image} alt="" />
                          </div>
                          <div className="pay_modal_product_about">
                            <h6 className="pay_modal_product_name">
                              {p?.name}
                            </h6>
                            <h5 className="pay_modal_product_price">
                              ${p?.newprice.toFixed(2)}
                            </h5>
                          </div>
                        </div>

                        <div className="pay_modal_product_count">
                          x {a.count}
                        </div>
                      </div>

                      <div
                        onClick={() => removeProduct(p.id)}
                        className="pay_modal_product_remove"
                      >
                        Remove
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <Link to="/shop">
                <button
                  onClick={() => setPaymentModalShown(!paymentModalShown)}
                  className="pay_modal_blue_btn"
                >
                  <p>GO TO SHOPPING</p>
                  <i className="fa-solid fa-circle-arrow-right"></i>
                </button>
              </Link>
            )}
          </div>
        </div>

        <hr />
        <div className="modal_total_payment">
          <div className="modal_total">
            <div className="modal_total_text">Total</div>
            <div className="modal_total_price">${total.toFixed(2)} </div>
          </div>
          <Link to="/delivery">
            <div
              onClick={() => setPaymentModalShown(!paymentModalShown)}
              className="modal_payment"
            >
              <div className=" blue_btn">
                <p>Complete</p>
                <i className="fa-solid fa-circle-arrow-right"></i>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Message Modal"
        className="modal"
      >
        <h2>{modalContent.title}</h2>
        <p>{modalContent.message}</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}
const t = (a) => a;
export default connect(t)(PaymentModal);
