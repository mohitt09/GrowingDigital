import React, { useState, useEffect, useRef } from "react";
import style from "./DashboardContact.module.css";
import Sidebar from "../../Component/DashboardSidebar/DashboardSidebar";
import DataTable from "react-data-table-component";
import { ImSearch } from "react-icons/im";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function DashboardContact() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const searchTimeoutRef = useRef(null);

  const customStyles = {
    header: {
      style: {
        backgroundColor: "#3CB371", // Medium sea green
        color: "#ffffff", // White
      },
    },
    headRow: {
      style: {
        backgroundColor: "#3CB371", // Medium sea green for header row
      },
    },
    headCells: {
      style: {
        color: "#ffffff", // White for header cell text
        fontSize: "16px", // Adjust font size if needed
        fontWeight: "bold", // Make header text bold
        paddingLeft: "16px", // Add padding to header cells
        paddingRight: "16px",
      },
    },
    rows: {
      style: {
        backgroundColor: "#ffffff", // White background for rows
        color: "#333333", // Dark gray text color
        borderBottomColor: "#3CB371", // Medium sea green bottom border
        minHeight: "100px", // Set a consistent row height
      },
      highlightOnHoverStyle: {
        backgroundColor: "#f2f2f2", // Light gray background on hover
        color: "#333333", // Dark gray text color on hover
        transitionDuration: "0.15s", // Smooth transition duration
        transitionProperty: "background-color",
        borderBottomColor: "#3CB371", // Medium sea green bottom border on hover
        outline: "none", // Remove outline on hover
      },
    },
    pagination: {
      style: {
        backgroundColor: "#3CB371", // Medium sea green for pagination bar
        color: "#ffffff", // White text color
      },
    },
    table: {
      style: {
        backgroundColor: "#ffffff", // White background for table
        borderRadius: "8px", // Add border radius for a softer look
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Add shadow for depth
        borderCollapse: "collapse", // Collapse table borders
        width: "100%", // Set table width to 100%
        marginTop: "16px", // Add top margin for spacing
      },
    },
  };

  useEffect(() => {
    const fetchContacts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/contact`);
        const data = response.data;
        setContacts(data);
        console.log(data)
        setFilteredContacts(data);
      } catch (error) {
        setError(error.message || "Failed to fetch contacts");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      if (searchText) {
        const filtered = contacts.filter((contact) => {
          const contactName = contact.name || "";
          return contactName.toLowerCase().includes(searchText.toLowerCase());
        });
        setFilteredContacts(filtered);
      } else {
        setFilteredContacts(contacts);
      }
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchText, contacts]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleDelete = async (contactId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/contact/${contactId}`
      );

      if (response.status === 204) {
        setContacts((prevContacts) =>
          prevContacts.filter((contact) => contact.contactId !== contactId)
        );
        setFilteredContacts((prevFilteredContacts) =>
          prevFilteredContacts.filter((contact) => contact.contactId !== contactId)
        );
        toast.success("Contact deleted successfully!");
      } else {
        throw new Error("Failed to delete contact");
      }
    } catch (error) {
      setError(error.message || "Failed to delete contact");
      toast.error("Failed to delete contact");
    }
  };

  const columns = [
    {
      name: "First Name",
      selector: (row) => row.firstName,
      sortable: true,
      width: "150px",
    },
    {
      name: "Last Name",
      selector: (row) => row.lastName,
      sortable: true,
      width: "150px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      width: "250px",
    },
    {
      name: "Subject",
      selector: (row) => row.subject,
      sortable: true,
      width: "200px",
    },
    {
      name: "Message",
      selector: (row) => row.message,
      sortable: true,
      width: "400px",
      style: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: "400px",
      },
    },
    {
      name: "phone",
      selector: (row) => row.phone,
      sortable: true,
      width: "200px",
      style: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: "200px",
      },
    },
    {
      name: "Created Date",
      selector: (row) => {
        if (!row.createdAt) return "N/A";
        const createdAtParts = row.createdAt.split("T");
        return createdAtParts[0];
      },
      sortable: true,
      width: "150px",
    },
    {
      name: "Created Time",
      selector: (row) => {
        if (!row.createdAt) return "N/A";
        const createdAtParts = row.createdAt.split("T");
        return createdAtParts[1].split(".")[0];
      },
      sortable: true,
      width: "150px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <button
          onClick={() => handleDelete(row.contactId)}
          style={{
            backgroundColor: "red",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "5px 10px",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      ),
      width: "150px",
    },
  ];

  return (
    <div>
      <div className={style.div}>
        <Sidebar />
      </div>

      <div className={style.Blog}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <div className={style.Searching}>
            <ImSearch className={style.search} />
            <input
              type="text"
              className={style.searchInput}
              placeholder="Search contacts..."
              value={searchText}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className={style.chart}>
            <DataTable
              columns={columns}
              data={filteredContacts}
              progressPending={isLoading}
              highlightOnHover
              striped
              customStyles={customStyles}
              pagination
            />
          </div>
        </div>

        {error && (
          <div style={{ color: "red", textAlign: "center", marginTop: "20px" }}>
            {error}
          </div>
        )}

        <ToastContainer />
      </div>
    </div>
  );
}

export default DashboardContact;
