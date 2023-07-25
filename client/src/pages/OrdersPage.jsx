import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersOrdersAction } from "../actions/orderActions";
import Modal from "react-bootstrap/Modal";

function OrdersPage() {
  //modal fonksiyonlarına ait alan

  const [show, setShow] = useState(false);
  const [urun, setUrun] = useState({});

  const handleClose = () => setShow(false);
  // const handleShow = (id) => {
  //   setUrun(orders.find((urun) => urun._id == id));
  //   console.log("ID Numarası", id);
  //   console.log("Ürünümüz:", urun);
  //   setShow(true);
  // };

  const dispatch = useDispatch();

  const orderState = useSelector((state) => state.getUsersOrdersReducer);

  const { success, loading, orders } = orderState;

  console.log(orders);
  useEffect(() => {
    dispatch(getUsersOrdersAction());
  }, []);

  return (
    <div className="container">
      <h2 className="display-2 text-warning">Siparişlerim</h2>
      <hr className="border border-warning" />
      {orders &&
        orders.map((order) => (
          <div className="row border border-3 border-warning shadow-lg p-3 mb-5 bg-body-tertiary rounded bg-light text-warning">
            <div className="col-md-4">
              {order.orderItems &&
                order.orderItems.map((item) => (
                  <div className="border border-1 border-warning my-2">
                    <p
                      className="text-black"
                      // onClick={() => handleShow(item._id)}
                      style={{ cursor: "pointer" }}
                    >
                      {item.ad} [{item.ozellik}] * {item.miktar} ={" "}
                      {item.fiyatlar} ₺{" "}
                    </p>

                    {/* <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>{item.ad}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <img
                      src={item.img}
                      className="img-fluid"
                      style={{ height: "300px" }}
                      alt=""
                    />
                    <h1>Kategori: {item.kategori}</h1>
                    <p>{item.desc}</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <button className="btn btn-warning" onClick={handleClose}>
                      Kapat
                    </button>
                  </Modal.Footer>
                </Modal> */}
                  </div>
                ))}
            </div>
            <div className="col-md-4 my-auto ps-5 text-black text-start">
              <h4 className="text-black">Adres Bilgileri</h4>
              <p>Sokak: {order.shippingAddress.street} </p>
              <p>Şehir: {order.shippingAddress.city} </p>
              <p>Ülke: {order.shippingAddress.country} </p>
              <p>Posta Kodu: {order.shippingAddress.zipCode} </p>
            </div>
            <div className="col-md-4 my-auto text-black ">
              <h4 className="text-black text-start">Sipariş Bilgileri</h4>
              <div className="text-start">
                <p>Sipariş Tutarı: {order.orderAmount} ₺ </p>
                <p>Tarih: {order.createdAt.substring(0, 10)} </p>
                <p>İşlem No: {order.transactionId} </p>
                <p>Sipariş No: {order._id} </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default OrdersPage;
