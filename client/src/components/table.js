import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import Cookies from 'js-cookie';
import './table.css';
import KebabMenu from "./kebabMenu";


import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const apiProxy = 'http://localhost:4000';
//const apiProxy = 'https://puppeteer-render-hb03.onrender.com';

const Table = () => {

    const columns = [
        { id: 0, label: "Number", accessor: "ORD_NUM" },
        { id: 1, label: "Amount", accessor: "ORD_AMOUNT" },
        { id: 2, label: "Date", accessor: "ORD_DATE" },
        { id: 3, label: "Customer", accessor: "CUST_CODE" },
        { id: 4, label: "Agent", accessor: "AGENT_CODE" },
        { id: 5, label: "Description", accessor: "ORD_DESCRIPTION" },
    ];

    const [tableData, setTableData] = useState([]);
    const [sortField, setSortField] = useState("");

    const [orderField, setOrderField] = useState([]);

    const resetOrderField = (except) => {
        console.log("resetOrderField")
        for (let i = 0; i < columns.length; i++) {
            if (columns[i].id != except)
                orderField[columns[i].id] = "default";
        }
    }

    const fetchTours = async () => {
        try {
            const response = (await axios.get(apiProxy + '/orders', { headers: { Authorization: Cookies.get('auth_token') } })).data;
            console.log(response);

            setTableData(response)


        } catch (err) {
            if (err.response.status == 401) {
                console.log('not logged in');
                window.location.href = '/login';
            }
            console.log(err);
        }
    };


    useEffect(() => {

        fetchTours();
        resetOrderField(-1);

    }, []);

    const handleSorting = (sortField, id) => {

        if (orderField[id] == "default") {
            orderField[id] = "asc";
        }
        else if (orderField[id] == "asc") {
            orderField[id] = "desc";
        }
        else {
            orderField[id] = "asc";
        }

        if (sortField) {
            const sorted = [...tableData].sort((a, b) => {
                if (a[sortField] === null) return 1;
                if (b[sortField] === null) return -1;
                if (a[sortField] === null && b[sortField] === null) return 0;
                return (
                    a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
                        numeric: true,
                    }) * (orderField[id] === "asc" ? 1 : -1)
                );
            });
            setTableData(sorted);
        }
        resetOrderField(id);
    };

    const handleEdit = (data) => {
        console.log("edit")
        console.log(data)
        // Implement your edit logic here
    };

    const handleDelete = (data) => {
        console.log("delete")
        console.log(data)
        // Implement your delete logic here
    };

    const agentCodeHandler = (code) => {
        console.log("agent")
        console.log(code)
        
    };


    const custCodeHandler = (code) => {
        console.log("agent")
        console.log(code)
        
    };



    return (
        <div className="tableDiv">
            <table className="table">
                <caption>
                    Developers currently enrolled in this course, column headers are sortable.
                </caption>


                <thead>
                    <tr>
                        {columns.map(({ id, label, accessor }) => {

                            let cl = "asd"

                            return (
                                <th
                                    key={accessor}
                                    onClick={() => handleSorting(accessor, id)}
                                    className={cl}
                                >
                                    {label}{orderField[id] === "asc" ? ` \u25B4` : ""}{orderField[id] === "desc" ? " \u25BE" : ""}

                                </th>
                            );
                        })}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {tableData.map((data) => {
                        return (
                            <tr key={data.id}>
                                {columns.map(({ accessor }) => {
                                    const tData = data[accessor] ? data[accessor] : "——";
                                    let clickHandler=null
                                    if(accessor==="CUST_CODE"){
                                        clickHandler=custCodeHandler
                                    }else if(accessor==="AGENT_CODE"){
                                        clickHandler=agentCodeHandler
                                    }

                                    return <td style={{ cursor: clickHandler ? 'pointer' : 'default' }}
                                                key={accessor + data.id} 
                                                onClick={clickHandler ? () => clickHandler(data[accessor]) : null}>
                                        {tData} 
                                        </td>;
                                })}
                                <td>
                                    <KebabMenu data={data} handleEdit={handleEdit} handleDelete={handleDelete} />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>

            </table>
        </div>

    );
};

export default Table;