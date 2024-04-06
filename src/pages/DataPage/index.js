import React, { useState, memo } from "react";
import Pagination from "react-js-pagination";
import { RiArrowUpFill, RiArrowDownFill } from "react-icons/ri";
import numeral from "numeral";
import moment from "moment";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import { formaster } from "../../utils/formater";
import "./style.scss";

const DataPage = () => {
  const [searchData, setSearchData] = useState("");
  const [sort, setSort] = useState({ column: null, direction: "desc" });
  const [activePage, setActivePage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const itemsCountPerPage = 10;
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [data, setData] = useState([
    {
      id: 1,
      name: "SpA",
      ngayNhap: "01/01/2024",
      ngayXuat: "05/01/2024",
      soLuong: 100,
      VAT: "0.5",
      soTien: 500000,
    },
    {
      id: 2,
      name: "SpB",
      ngayNhap: "03/01/2024",
      ngayXuat: "06/01/2024",
      soLuong: 150,
      VAT: 0,
      soTien: 75000,
    },
    {
      id: 3,
      name: "SpC",
      ngayNhap: "05/29/2023",
      ngayXuat: "01/19/2024",
      soLuong: 1000,
      VAT: 2,
      soTien: 750000,
    },
    {
      id: 4,
      name: "SpD",
      ngayNhap: "09/15/2023",
      ngayXuat: "11/20/2023",
      soLuong: 550,
      VAT: "1.5",
      soTien: 250000,
    },
  ]);
  const handleSearch = (event) => {
    const searchValue = event.target.value;
    const filteredData = data.filter((item) =>
      Object.values(item).some((val) => {
        if (typeof val === "number") {
          return val.toString().includes(searchValue);
        }
        if (typeof val === "string") {
          return val.toLowerCase().includes(searchValue.toLowerCase());
        }
        return false;
      })
    );
    setFilteredData(filteredData);
    setSearchData(searchValue);
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handleDownloadPDF = () => {
    // Generate PDF content
    const pdfContent = (
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên sản phẩm</th>
            <th>Ngày Nhập</th>
            <th>Ngày Xuất</th>
            <th>Số Lượng</th>
            <th>VAT</th>
            <th>Số Tiền</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                {moment(item.ngayNhap, "DD/MM/YYYY").format("DD-MM-YYYY")}
              </td>
              <td>
                {moment(item.ngayXuat, "DD/MM/YYYY").format("DD-MM-YYYY")}
              </td>
              <td>{item.soLuong}</td>
              <td>{numeral(item.VAT).format("0,0.0")}</td>
              <td>{numeral(item.soTien).format("0,0.00")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );

    // Generate PDF Blob
    const pdfBlob = new Blob([pdfContent], { type: "application/pdf" });

    // Download PDF
    saveAs(pdfBlob, "data.pdf");
  };

  const downloadCSV = () => {
    const csvData = data.map((item) => ({
      ID: item.id,
      "Tên sản phẩm": item.name,
      "Ngày Nhập": moment(item.ngayNhap).format("DD-MM-YYYY"),
      "Ngày Xuất": moment(item.ngayXuat).format("DD-MM-YYYY"),
      "Số Lượng": item.soLuong,
      VAT: numeral(item.VAT).format("0,0.0"),
      "Số Tiền": formaster(item.soTien),
    }));

    // Trigger CSV download
    <CSVLink data={csvData} filename={"data.csv"}>
      Download CSV
    </CSVLink>;
  };

  const downloadExcel = () => {
    const excelData = data.map((item) => ({
      ID: item.id,
      "Tên sản phẩm": item.name,
      "Ngày Nhập": moment(item.ngayNhap).format("DD-MM-YYYY"),
      "Ngày Xuất": moment(item.ngayXuat).format("DD-MM-YYYY"),
      "Số Lượng": item.soLuong,
      VAT: numeral(item.VAT).format("0,0.0"),
      "Số Tiền": formaster(item.soTien),
    }));

    // Convert data to Excel format
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    // Save Excel file
    XLSX.writeFile(workbook, "data.xlsx");
  };

  return (
    <>
      <div className="title-data">
        <h3>General Data</h3>
        <a href="#">Home</a>
      </div>
      <div className="container-data">
        <h3>Wendy Information</h3>
        <div className="button-download">
          <button onClick={handleDownloadPDF} className="button-left">
            PDF
          </button>
          <button onClick={downloadCSV}>CSV</button>
          <button onClick={downloadExcel} className="button-right">
            XLSX
          </button>
        </div>
        <div className="inputSearch">
          Search:
          <input
            type="text"
            placeholder="Search..."
            value={searchData}
            onChange={handleSearch}
          />
        </div>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên sản phẩm</th>
                <th>Ngày Nhập</th>
                <th>Ngày Xuất</th>
                <th>Số Lượng</th>
                <th>VAT</th>
                <th>Số Tiền</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{moment(item.ngayNhap).format("DD-MM-YYYY")}</td>
                  <td>{moment(item.ngayXuat).format("DD-MM-YYYY")}</td>
                  <td>{item.soLuong}</td>
                  <td>{numeral(item.VAT).format("0,0.0")}</td>
                  <td>{formaster(item.soTien)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <Pagination
            activePage={activePage}
            itemsCountPerPage={itemsCountPerPage}
            totalItemsCount={totalItemsCount}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default memo(DataPage);
