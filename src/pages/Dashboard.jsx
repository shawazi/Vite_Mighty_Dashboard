import React from "react";

import { Link } from "react-router-dom";

import Chart from "react-apexcharts";

import { useSelector } from "react-redux";

import StatusCard from "../components/status-card/StatusCard";

import Table from "../components/table/Table";

import Badge from "../components/badge/Badge";

import statusCards from "../assets/JsonData/status-card-data.json";
import { Box, Center } from "@chakra-ui/react";

const chartOptions = {
  series: [
    {
      name: "Online Customers",
      data: [40, 70, 20, 90, 36, 80, 30, 91, 60],
    },
    {
      name: "Total Customers",
      data: [40, 30, 70, 80, 40, 16, 40, 45, 51, 60],
    },
  ],
  options: {
    color: ["#6ab04c", "#2980b9"],
    chart: {
      background: "transparent",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: [
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
        "Dec",
      ],
    },
    legend: {
      position: "top",
    },
    grid: {
      show: false,
    },
  },
};

const topCustomers = {
  head: ["User", "Total Orders", "Total Expenses"],
  body: [
    {
      username: "john doe",
      order: "490",
      price: "$15,870.00",
    },
    {
      username: "frank iva",
      order: "250",
      price: "$12,251.00",
    },
    {
      username: "anthony baker",
      order: "120",
      price: "$10,840.00",
    },
    {
      username: "frank iva",
      order: "110",
      price: "$9,251.00",
    },
    {
      username: "anthony baker",
      order: "80",
      price: "$8.840,00",
    },
  ],
};

const renderCusomerHead = (item, index) => <th key={index}>{item}</th>;

const renderCusomerBody = (item, index) => (
  <tr key={index}>
    <td>{item.username}</td>
    <td>{item.order}</td>
    <td>{item.price}</td>
  </tr>
);

const latestOrders = {
  header: ["Order ID", "User", "Total Price", "Data", "Status"],
  body: [
    {
      id: "#OD1711",
      user: "john doe",
      date: "17 Jun 2021",
      price: "$900",
      status: "Sent",
    },
    {
      id: "#OD1712",
      user: "frank iva",
      date: "1 Jun 2021",
      price: "$400",
      status: "Paid",
    },
    {
      id: "#OD1713",
      user: "anthony baker",
      date: "27 Jun 2021",
      price: "$200",
      status: "Pending",
    },
    {
      id: "#OD1712",
      user: "frank iva",
      date: "1 Jun 2021",
      price: "$400",
      status: "Paid",
    },
    {
      id: "#OD1713",
      user: "anthony baker",
      date: "27 Jun 2021",
      price: "$200",
      status: "Reimbursed",
    },
  ],
};

const orderStatus = {
  Enviado: "primary",
  Pendente: "warning",
  Pagado: "success",
  Reembolso: "danger",
};

const renderOrderHead = (item, index) => <th key={index}>{item}</th>;

const renderOrderBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.user}</td>
    <td>{item.price}</td>
    <td>{item.date}</td>
    <td>
      <Badge type={orderStatus[item.status]} content={item.status} />
    </td>
  </tr>
);

const Dashboard = () => {
  const themeReducer = useSelector((state) => state.ThemeReducer.mode);

  return (
    <>
       <Box w="100%" px=".5em">
        <div px="1em">
          <Center>
            <h2 className="page-header">Statistics</h2>
          </Center>

          <div className="row">
            <div className="col-6">
              <div className="row">
                {statusCards.map((item, index) => (
                  <div className="col-6" key={index}>
                    <StatusCard
                      icon={item.icon}
                      count={item.count}
                      title={item.title}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-6">
              <div className="card full-height">
                {}
                <Chart
                  options={
                    themeReducer === "theme-mode-dark"
                      ? {
                          ...chartOptions.options,
                          theme: {
                            mode: "dark",
                          },
                        }
                      : {
                          ...chartOptions.options,
                          theme: {
                            mode: "light",
                          },
                        }
                  }
                  series={chartOptions.series}
                  type="line"
                  height="100%"
                />
              </div>
            </div>
            <div className="col-4">
              <div className="card">
                <div className="card__header">
                  <h3>Primary Customers</h3>
                </div>
                <div className="card__body">
                  <Table
                    headData={topCustomers.head}
                    renderHead={(item, index) => renderCusomerHead(item, index)}
                    bodyData={topCustomers.body}
                    renderBody={(item, index) => renderCusomerBody(item, index)}
                  />
                </div>
                <div className="card__footer">
                  <Link to="/">See all</Link>
                </div>
              </div>
            </div>
            <div className="col-8">
              <div className="card">
                <div className="card__header">
                  <h3>Latest orders</h3>
                </div>
                <div className="card__body">
                  <Table
                    headData={latestOrders.header}
                    renderHead={(item, index) => renderOrderHead(item, index)}
                    bodyData={latestOrders.body}
                    renderBody={(item, index) => renderOrderBody(item, index)}
                  />
                </div>
                <div className="card__footer">
                  <Link to="/">See all</Link>
                </div>
              </div>
            </div>
          </div>
          <Box w="100%" />
        </div>
      </Box>
    </>
  );
};

export default Dashboard;
