import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "./Dashboard.css";
import Current from "./Current";
import axios from "axios";
import { Link } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3000/adminOrder");
      setOrders(response.data);
  
    } catch (error) {
      console.log("Error loading Orders", error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:3000/adminOrder/${orderId}`);

      setOrders((prevOrder) =>
        prevOrder.filter((order) => order._id !== orderId)
      );
    } catch (error) {
      console.log("Error deleting user");
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2 col-md-3 col-sm-4 side_back">
            <Sidebar />
          </div>
          <div className="col-lg-10 col-md-9 col-sm-8 line_bar">
            <div className="welcome_admin">
              <h3 className="p-3">Hello, Admin!</h3>
              <div className="admin_icon">
                <img src="/Hongo.png" alt="" />
              </div>
            </div>
            <div className="current_box">
              <Current />
            </div>
            <div className="container recent_order">
              <table className="table_order table table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">User</th>
                    <th scope="col">Games</th>
                    <th scope="col">Status</th>
                    <th scope="col">Subtotal</th>
                    <th className="text-center" scope="col">
                      Created At
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order.user}</td>
                      <td>
                        {order.games.map((game) => (
                          <div key={game._id}>{game.name}</div>
                        ))}
                      </td>
                      <td>{order.status}</td>
                      <td>${order.subtotal.toFixed(2)}</td>
                      <td className="text-center">{order.createdAt}</td>
                      <td>
                        <Link
                          to={{
                            pathname: `/edit-order/${order._id}`, 
                            state: {
                              order,
                            },
                          }}
                          className="edit-link me-1"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20"
                            width="30"
                            fill="currentColor"
                            className="bi bi-pencil"
                            viewBox="0 0 16 16"
                          >
                            <path d="M10.293 1.293a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.267-1.267l1-3a1 1 0 0 1 .242-.39l9-9zM11 0a1 1 0 0 1 .293.293l3 3a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.267-1.267l1-3a1 1 0 0 1 .242-.39l9-9A1 1 0 0 1 11 0z" />
                            <path
                              fillRule="evenodd"
                              d="M11.293 2.293a1 1 0 0 1 1.414 0l1 1a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.267-1.267l1-3a1 1 0 0 1 .242-.39l9-9a1 1 0 0 1 1.414 0z"
                            />
                            <path
                              fillRule="evenodd"
                              d="M14 2a1 1 0 0 1-1 1h-2a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1z"
                            />
                          </svg>{" "}
                          Edit
                        </Link>
                      </td>
                      <td>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="20"
                          width="30"
                          fill="brown"
                          className="bi bi-trash3-fill p-0"
                          viewBox="0 0 16 16"
                          onClick={() => handleDeleteOrder(order._id)} 
                        >
                          <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                        </svg>{" "}
                        Delete
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Orders;
