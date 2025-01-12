import React, { useState } from "react";
import PaiChart from "../components/chart/PaiChart";
import {Dropdown, Image} from "react-bootstrap";
import BarChart from "../components/chart/BarChart";
import {IoIosArrowDroprightCircle} from "react-icons/io";
import {MdElectricMeter} from "react-icons/md";
import {TbScooterElectric} from "react-icons/tb";
import {MdElectricCar} from "react-icons/md";
import {MdGpsFixed} from "react-icons/md";
import profile from "../assets/images/user3.avif";
import {FaStar} from "react-icons/fa";
import evdata from "../EvJsonData.json";

export default function Dashboard() {
    const [selectedRange,setSelectedRange] = useState("Monthly");
    const [chartInfo,setChartInfo] = useState({labels: [], dataBar: []});

    const avgRange = Math.round(evdata.reduce((sum, ev) => sum + ev["Electric Range"], 0) / evdata.length);
    // Label: Total Vehicle Models or Unique Manufacturers
    const uniqueModels = new Set(evdata.map((ev) => ev.Model)).size; //Calculation for Models

    const uniqueManufacturers = new Set(evdata.map((ev) => ev.Make)).size; // calculation of unique manufacturers

    // Top Electric Vehicle Types Value: The most common electric vehicle type (e.g.,
    // Battery Electric Vehicle (BEV), Plug-in Hybrid Electric Vehicle (PHEV)). If
    // 60% of vehicles are Battery Electric Vehicle (BEV),
    const typeCount = evdata.reduce((acc, ev) => {
        acc[ev["Electric Vehicle Type"]] = (acc[ev["Electric Vehicle Type"]] || 0) + 1;
        return acc;
    }, {});
    const popularType = Object
        .entries(typeCount)
        .sort((a, b) => b[1] - a[1])[0][0];

    const mainCard = [
        {
            title: "Total Electric Vehicles",
            value: evdata
                ?.length,
            percentage: 3,
            icon: <MdElectricCar className="icon"/>
        }, {
            title: "Average Electric Range",
            value: avgRange,
            percentage: 3,
            icon: <MdElectricMeter className="icon"/>
        }, {
            title: "Unique Models",
            value: uniqueModels,
            percentage: 3,
            icon: <MdElectricMeter className="icon"/>
        }, {
            title: "Popular EV Type",
            value: popularType,
            percentage: 3,
            icon: <TbScooterElectric className="icon"/>
        }
    ]

    const calculateChartData = (range) => {
        let labels = [];
        let dataBar = [];

        if (range === "Monthly") {
            // Monthly data calculation
            const monthlyCounts = {
                Jan: 0,
                Feb: 0,
                Mar: 0,
                Apr: 0,
                May: 0,
                Jun: 0,
                Jul: 0,
                Aug: 0,
                Sep: 0,
                Oct: 0,
                Nov: 0,
                Dec: 0
            };

            evdata.forEach((entry) => {
                const randomMonthIndex = Math.floor(Math.random() * 12); // Random month index
                const monthNames = [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec"
                ];
                const month = monthNames[randomMonthIndex];
                monthlyCounts[month]++;
            });

            labels = Object.keys(monthlyCounts);
            dataBar = Object.values(monthlyCounts);
        } else if (range === "Yearly") {
            // Yearly data calculation
            const yearlyCounts = {};
            evdata.forEach((entry) => {
                const year = entry["Model Year"];
                yearlyCounts[year] = (yearlyCounts[year] || 0) + 1;
            });

            labels = Object
                .keys(yearlyCounts)
                .sort(); // Sort years
            dataBar = labels.map((year) => yearlyCounts[year]);
        } else if (range === "Weekly") {
            // Weekly data calculation
            const weeklyCounts = {
                Week1: 0,
                Week2: 0,
                Week3: 0,
                Week4: 0
            };
            evdata.forEach(() => {
                const randomWeek = `Week${Math.floor(Math.random() * 4) + 1}`;
                weeklyCounts[randomWeek]++;
            });

            labels = Object.keys(weeklyCounts);
            dataBar = Object.values(weeklyCounts);
        }

        return {labels, dataBar};
    };

    const handleRangeChange = (range) => {
        setSelectedRange(range);
        const updatedChartInfo = calculateChartData(range);
        setChartInfo(updatedChartInfo);
    };

    // Initial chart data for default "Monthly"
    React.useEffect(() => {
        setChartInfo(calculateChartData("Monthly"));
    }, [evdata]);

    return (
        <div className="main-light-dashboard">
            <h2 className="fs-28-18 fw-bold white">Dashboard</h2>
            <div className="dash-first-pi-head haque">
                <div className="count-show-frame justify-content-between">
                    {mainCard.map((ele, i) => {
                        return (
                            <div key={i} className="count-card">
                                <div className="item-image-icon">
                                    {ele.icon || <TbScooterElectric className="icon"/>}
                                </div>
                                <p className="fs-14-12 white mb-0">{ele
                                        ?.title || ''}</p>
                                <div className="show-count-box">
                                    <h3
                                        className="fs-34-28 fw-semibold white mb-0 text-truncate pe-1"
                                        title={ele
                                        ?.value}>{ele.value}</h3>
                                    <p className="fs-14-12 fw-bold mb-1 ">{ele.percentage}%</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="pie-chart-frame">
                    <div className="content-frame">
                        <p className="fs-14-12 white mb-0">Average Electric Range</p>
                        <h3 className="fs-34-28 fw-semibold white mb-0">{avgRange}</h3>
                        <p className="fs-14-12 fw-bold mb-1 text-start green-active">3%</p>
                    </div>
                    <div className="pie-chart-box">
                        <PaiChart value={avgRange}/>
                    </div>
                </div>
            </div>
            <div className="dash-first-pi-head second-row-wrapper">
                <div className="count-show-frame  ">
                    <div className="sub-bar-chart-header">
                        <h2 className="fs-24-16 fw-bold white">Vehicle Registration Trends</h2>
                        <Dropdown className="custom-dropdown">
                            <Dropdown.Toggle id="dropdown-basic">Weekly</Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleRangeChange("Monthly")}>Monthly</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleRangeChange("Weekly")}>Weekly</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleRangeChange("Yearly")}>Yearly</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="bar-chart-wrapper ">
                        <BarChart info={chartInfo}/>
                    </div>
                </div>
                <div className="pie-chart-frames ">
                    <ul>
                        <li>
                            <p className="fs-24-16 white mb-0">
                                <span>
                                    <MdGpsFixed/>
                                </span>{" "}
                                Top Electric Vehicle Goals
                            </p>{" "}
                            <IoIosArrowDroprightCircle className="rignt-arrow"/>
                        </li>
                        <li>
                            <p className="fs-24-16 white mb-0">
                                <span>
                                    <MdGpsFixed/>
                                </span>{" "}
                                Popular Vehicle Models
                            </p>{" "}
                            <IoIosArrowDroprightCircle className="rignt-arrow"/>
                        </li>
                        <li>
                            <p className="fs-24-16 white mb-0">
                                <span>
                                    <MdGpsFixed/>
                                </span>{" "}
                                Counties by EV Count
                            </p>{" "}
                            <IoIosArrowDroprightCircle className="rignt-arrow"/>
                        </li>
                        <li>
                            <p className="fs-24-16 white mb-0">
                                <span>
                                    <MdGpsFixed/>
                                </span>{" "}
                                EV Utility Insights
                            </p>{" "}
                            <IoIosArrowDroprightCircle className="rignt-arrow"/>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="dash-first-pi-head third-row-wrapper">
                <div className="count-show-frame  ">
                    <div className="sub-bar-chart-header">
                        <h2 className="fs-24-16 fw-bold white mb-0"> Electric Vehicle  </h2>
                    </div>
                    <div className="bar-chart-wrapper ">
                        <table width={"100%"}>
                            <thead>
                                <tr className="table-head-row">
                                    <th>Vehicle Make & Model
                                    </th>
                                    <th>Electric Range
                                    </th>
                                    <th>Year of Manufacture
                                    </th>
                                    <th>County
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {evdata.slice(0, 10)?.map((ele, i) => {
                                    return (
                                        <tr key={i} className="table-body-row">
                                            <td>
                                                <div className="customer-main-frame">
                                                    {/* <span>
                                                        <Image src={userImage} className="" alt="alt"/>{" "}
                                                    </span> */}
                                                    <p className="fs-18-14 white mb-0">{ele?.Make} - {ele?.Model}</p>
                                                </div>
                                            </td>
                                            <td>{ele?.['Electric Range']}</td>
                                            <td>{ele?.['Model Year']}</td>
                                            <td>{ele?.['County']}</td>
                                            {/* <td>
                                                <div
                                                    className={`deliver-order ${ele == 2
                                                    ? "cancled-btn"
                                                    : ""}`}>
                                                    {ele !== 2
                                                        ? "Delivered"
                                                        : "canceled"}
                                                </div>{" "}
                                            </td> */}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="pie-chart-frames ">
                    <h2 className="fs-24-16 fw-bold white mb-0">Customer Feedback</h2>
                    {['TESLA - MODEL Y', 'FORD - FUSION', 'KIA - OPTIMA', 'BMW - X5'].map((ele, i) => {
                        return (
                            <div key={i} className="customer-review-box">
                                <div className="review-header">
                                    <span>
                                        <Image src={profile} alt="profile"/>
                                    </span>
                                    <p className="mb-0 fs-18-14 white">Muzaffar Haque</p>
                                </div>
                              
                                <div className="start-icons">
                                    <FaStar className="start"/>
                                    <FaStar className="start"/>
                                    <FaStar className="start"/>
                                    <FaStar className="start"/>
                                    <FaStar className="start"/>
                                </div>
                                <p className="text-review fs-14-12 my-1 fw-medium">{ele}</p>
                                <p className="text-review fs-14-12 mb-1">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque vero iste itaque
                                    ab natus enim similique, excepturi rem nisi!
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
