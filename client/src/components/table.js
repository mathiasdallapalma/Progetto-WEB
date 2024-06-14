import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import Cookies from 'js-cookie';
import './table.css';
import KebabMenu from "./kebabMenu";
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import OrderEditPopup from './OrderEditPopup'
import CustomerInfo from './CustomerInfo';
import AgentInfo from './AgentInfo';

const apiProxy = 'http://localhost:4000';
//const apiProxy = 'https://puppeteer-render-hb03.onrender.com';

const Table = ({ userID, role }) => {

    //const userID = window.localStorage.getItem("userID");
    //console.log('lo userID è: ', userID)

    //TODO aggiungere un IF in base al ruolo visualizzo una tabella o un'altra, facciamo copia incolla e ciaone, non è corretto ma funziona
    const columns = [
        { id: 0, label: "Number", accessor: "ORD_NUM" },
        { id: 1, label: "Amount", accessor: "ORD_AMOUNT" },
        { id: 2, label: "Date", accessor: "ORD_DATE" },
        { id: 3, label: "Customer", accessor: "CUST_CODE" },
        //{ id: 4, label: "Agent", accessor: "AGENT_CODE" },
        role == "customer" && { id: 4, label: "Agent", accessor: "AGENT_CODE"},
        { id: 5, label: "Description", accessor: "ORD_DESCRIPTION" },
    ].filter(Boolean);

    const [tableData, setTableData] = useState([]);
    const [sortField, setSortField] = useState("");
    const [orderField, setOrderField] = useState([]);
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState(null)
    const [agentInfo, setAgentInfo ] = useState(null);
    const [customerInfo, setCustomerInfo] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const resetOrderField = (except) => {
        console.log("resetOrderField")
        for (let i = 0; i < columns.length; i++) {
            if (columns[i].id != except)
                orderField[columns[i].id] = "default";
        }
    }

    const fetchTours = async () => {
        try {
            console.log('provo la api con userID: ', userID)
            //const response = (await axios.get(apiProxy + '/orders', { headers: { Authorization: Cookies.get('auth_token') } })).data;
            //const response = (await axios.get(apiProxy + '/orders/order/', {userID}, {headers: {Authorization: Cookies.get('auth_token')}})).data;
            if (role == "customer") {
                const response = (await axios.get(`${apiProxy}/orders/customers/${userID}`,{ headers: { Authorization: Cookies.get('auth_token')}})).data;
                console.log(response)
                setTableData(response)
            }
            if (role == "agent") {
                const response = (await axios.get(`${apiProxy}/orders/agents/${userID}`, { headers: { Authorization: Cookies.get('auth_token')}})).data;
                console.log(response)
                setTableData(response)
            }
            //const response = (await axios.get(`${apiProxy}/orders/agents/${userID}`,{ headers: { Authorization: Cookies.get('auth_token')}})).data;
            //console.log(response);
            //setTableData(response);

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

    }, [userID]);

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

    const agentCodeHandler = async (agentCode) => {
        console.log("agent")
        console.log(agentCode)
        try {
            const response = await(axios.get(`${apiProxy}/agents/${agentCode}`,{ headers: { Authorization: Cookies.get('auth_token')}}));
            console.log("response:", response.data)
            const data = response.data
            const cleanedData = {
                AGENT_CODE: data.AGENT_CODE.trim(),
                AGENT_NAME: data.AGENT_NAME.trim(),
                WORKING_AREA: data.WORKING_AREA.trim(),
                COMMISSION: data.COMMISSION.trim(),
                PHONE_NO: data.PHONE_NO.trim(),
            }
            setSelectedAgent(agentCode)
            setAgentInfo(cleanedData)
        } catch (error) {
            console.error("Error agent info", error)
        }
    };


    const custCodeHandler = async (custCode) => {
        console.log("customer")
        console.log(custCode)
        try {
            const response = await(axios.get(`${apiProxy}/customers/${custCode}`, { headers: { Authorization: Cookies.get('auth_token')}}))
            console.log("response:", response.data)
            const data = response.data
            const cleanedData = {
                CUST_CODE: data.CUST_CODE.trim(),
                CUST_NAME: data.CUST_NAME.trim(),
                CUST_CITY: data.CUST_CITY.trim(),
                WORKING_AREA: data.WORKING_AREA.trim(),
                CUST_COUNTRY: data.CUST_COUNTRY.trim(),
                GRADE: data.GRADE.trim(),
                OPENING_AMT: data.OPENING_AMT.trim(),
                RECEIVE_AMT: data.RECEIVE_AMT.trim(),
                PAYMENT_AMT: data.PAYMENT_AMT.trim(),
                OUTSTANDING_AMT: data.OUTSTANDING_AMT.trim(),
                PHONE_NO: data.PHONE_NO.trim(),
            }
            setSelectedCustomer(custCode)
            console.log('SelectedCustomer è: ', selectedCustomer)
            setCustomerInfo(cleanedData)
        } catch (error) {
            console.error("Error customer info", error)
        }
    };

    const handleEditClick =  (order) => {
        setSelectedOrder(order);
        console.log(order);
    }

    const handleAddClick = () => {
        console.log('add');
    }

    const handleSave = async (updatedOrder) => {
        console.log('cliccato save')
        console.log('ordine da cambiare è: ', updatedOrder)
        console.log('chiave dell ordine: ', updatedOrder.ORD_NUM)
        const ord_num = updatedOrder.ORD_NUM;
        try {
            const response = await axios.put(`${apiProxy}/orders/${ord_num}`, updatedOrder, {
                headers: { Authorization: `Bearer ${Cookies.get('auth_token')}`}
            });
            if (response.status === 200) {
                setTableData((prevData) => prevData.map((order) => (order.ORD_NUM === updatedOrder.ORD_NUM ? updatedOrder : order)));
                setSelectedOrder(null)
            }
        } catch (error) {
            console.error("Error updating order", error);
        }
    };

    const handleClose = () => {
        setSelectedOrder(null)
    };

    const closeCustomerInfo = () => {
        setSelectedCustomer(null);
        setCustomerInfo(null);
    };

    const closeAgentInfo = () => {
        setSelectedAgent(null);
        setAgentInfo(null);
    }

    return (
        <div className="tableDiv">
            <table className="table" role="table" aria-label="Tabella ordini" aria-describedby="table_descr">
                <caption id="table_descr">
                    Orders table. Click on agent to view agent info
                </caption>
                <thead role="rowgroup">
                    <tr role="row">
                        {columns.map(({ id, label, accessor }) => {

                            let cl = "asd"

                            return (
                                <th
                                    key={accessor}
                                    onClick={() => handleSorting(accessor, id)}
                                    className={cl}
                                    role="columnheader"
                                    aria-label={label}
                                >
                                    {label}{orderField[id] === "asc" ? ` \u25B4` : ""}{orderField[id] === "desc" ? " \u25BE" : ""}

                                </th>
                            );
                        })}
                        <th></th>
                    </tr>
                </thead>

                <tbody role="rowgroup">
                    {tableData.map((data) => {
                        return (
                            <tr key={data.id} role="row">
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
                                                onClick={clickHandler ? () => clickHandler(data[accessor]) : null}
                                                role="cell">
                                        {tData} 
                                        </td>;
                                })}
                                <td>
                                    {role === 'agent' && (
                                        <button onClick={() => handleEditClick(data) }>Edit</button>
                                    )}
                                    <KebabMenu data={data} handleEdit={handleEdit} handleDelete={handleDelete} />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {selectedOrder && (
                <OrderEditPopup order={selectedOrder} onSave={handleSave} onClose={handleClose} />
            )}
            {selectedAgent && agentInfo && (
               <AgentInfo agentInfo={agentInfo} onClose={closeAgentInfo} haspopup="agentinfo"/>
            )}
            {selectedCustomer && customerInfo && (
               <CustomerInfo customerInfo={customerInfo} onClose={closeCustomerInfo} haspopup="customerinfo"/>
            )}
        </div>
    );
};

export default Table;