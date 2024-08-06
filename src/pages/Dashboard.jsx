import React from "react";
import { FaShoppingBasket } from "react-icons/fa";
import PaiChart from "../components/chart/PaiChart";
import { Dropdown, Image } from "react-bootstrap";
import BarChart from "../components/chart/BarChart";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { MdGpsFixed } from "react-icons/md";
import profile from "../assets/images/user3.avif";
import { FaStar } from "react-icons/fa";

import userImage from "../assets/images/user3.avif";
export default function Dashboard() {
  return (
    <div className="main-light-dashboard">
      <h2 className="fs-28-18 fw-bold white">Dashboard</h2>
      <div className="dash-first-pi-head haque">
        <div className="count-show-frame justify-content-between">
          {[1, 2, 3, 4].map((ele, i) => {
            return (
              <div key={i} className="count-card">
                <div className="item-image-icon">
                  <FaShoppingBasket className="icon" />
                </div>
                <p className="fs-14-12 white mb-0">Total Orders</p>
                <div className="show-count-box">
                  <h3 className="fs-34-28 fw-semibold white mb-0">70</h3>
                  <p className="fs-14-12 fw-bold mb-1">3%</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="pie-chart-frame">
          <div className="content-frame">
            <p className="fs-14-12 white mb-0">Net Profit</p>
            <h3 className="fs-34-28 fw-semibold white mb-0">$ 7678645.09</h3>
            <p className="fs-14-12 fw-bold mb-1 text-start green-active">3%</p>
          </div>
          <div className="pie-chart-box">
            <PaiChart />
          </div>
        </div>
      </div>
      <div className="dash-first-pi-head second-row-wrapper">
        <div className="count-show-frame  ">
          <div className="sub-bar-chart-header">
            <h2 className="fs-24-16 fw-bold white">Activity</h2>
            <Dropdown className="custom-dropdown">
              <Dropdown.Toggle id="dropdown-basic">Weekly</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="bar-chart-wrapper ">
            <BarChart />
          </div>
        </div>
        <div className="pie-chart-frames ">
          <ul>
            <li>
              <p className="fs-24-16 white mb-0">
                <span>
                  <MdGpsFixed />
                </span>{" "}
                Goals
              </p>{" "}
              <IoIosArrowDroprightCircle className="rignt-arrow" />
            </li>
            <li>
              <p className="fs-24-16 white mb-0">
                <span>
                  <MdGpsFixed />
                </span>{" "}
                Popular Design
              </p>{" "}
              <IoIosArrowDroprightCircle className="rignt-arrow" />
            </li>
            <li>
              <p className="fs-24-16 white mb-0">
                <span>
                  <MdGpsFixed />
                </span>{" "}
                Mens
              </p>{" "}
              <IoIosArrowDroprightCircle className="rignt-arrow" />
            </li>
            <li>
              <p className="fs-24-16 white mb-0">
                <span>
                  <MdGpsFixed />
                </span>{" "}
                Application
              </p>{" "}
              <IoIosArrowDroprightCircle className="rignt-arrow" />
            </li>
          </ul>
        </div>
      </div>
      <div className="dash-first-pi-head third-row-wrapper">
        <div className="count-show-frame  ">
          <div className="sub-bar-chart-header">
            <h2 className="fs-24-16 fw-bold white mb-0">Recent Orders</h2>
          </div>
          <div className="bar-chart-wrapper ">
            <table width={"100%"}>
              <thead>
                <tr className="table-head-row">
                  <th>Customer </th>
                  <th>Order No </th>
                  <th>Amount </th>
                  <th>Status </th>
                </tr>
              </thead>
              <tbody>
                {[1, 1, 2, 1, 1, 2, 1, 1].map((ele, i) => {
                  return (
                    <tr key={i} className="table-body-row">
                      <td>
                        <div className="customer-main-frame">
                          <span>
                            <Image src={userImage} className="" alt="alt" />{" "}
                          </span>
                          <p className="fs-18-14 white mb-0">White Happle</p>
                        </div>
                      </td>
                      <td>8967855453 </td>
                      <td>$2345 </td>
                      <td>
                        <div
                          className={`deliver-order ${
                            ele == 2 ? "cancled-btn" : ""
                          }`}
                        >
                          {ele !== 2 ? "Delivered" : "canceled"}
                        </div>{" "}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="pie-chart-frames ">
          <h2 className="fs-24-16 fw-bold white mb-0">Customer Feedback</h2>
          {[1, 2, 3, 4].map((ele, i) => {
            return (
              <div key={i} className="customer-review-box">
                <div className="review-header">
                  <span>
                    <Image src={profile} alt="profile" />
                  </span>
                  <p className="mb-0 fs-18-14 white">Muzaffar Haque</p>
                </div>
                <div className="start-icons">
                  <FaStar className="start" />
                  <FaStar className="start" />
                  <FaStar className="start" />
                  <FaStar className="start" />
                  <FaStar className="start" />
                </div>
                <p className="text-review fs-14-12 mb-1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
                  vero iste itaque impedit modi aperiam qui, pariatur quasi
                  tenetur tempora consectetur ullam quas ab natus enim
                  similique, excepturi rem nisi!
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
