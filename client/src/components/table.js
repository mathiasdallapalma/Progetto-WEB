import React, { useEffect, useState, useRef } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import Cookies from 'js-cookie';
import './table.css';
import KebabMenu from "./kebabMenu";
import OrderEditPopup from "./OrderEditPopup";
import DeletePopup from "./deletePopup";
import AgentInfo from "./AgentInfo";
import CustomerInfo from "./CustomerInfo"

const apiProxy = 'http://localhost:4000';
//const apiProxy = 'https://puppeteer-render-hb03.onrender.com';

var last_event = {
    sortField: "None",
    id: ""
};

var selectedOrder;
var selectedAgent;
var selectedCustomer;

var toDelete;


var role=localStorage.getItem("role");


var columns = [
    { id: 0, label: "Number",       accessor: "ORD_NUM" },
    { id: 1, label: "Amount",       accessor: "ORD_AMOUNT" },
    { id: 2, label: "Adv. Amount",  accessor:"ADVANCE_AMOUNT"},
    { id: 3, label: "Date",         accessor: "ORD_DATE" },
    { id: 4, label: "Customer",     accessor: "CUST_CODE" },
    { id: 5, label: "Agent",        accessor: "AGENT_CODE" },
    { id: 6, label: "Description",  accessor: "ORD_DESCRIPTION" },
];


const Table = ({userID, role} ) => {

    console.log(role)
    const tableRef = useRef(null);
    const cellRefs = useRef([]);


    if (role == "agent") {
        columns = columns.filter((column) => column.accessor !== "AGENT_CODE");
    }
    if (role == "customer") {
        columns = columns.filter((column) => column.accessor !== "CUST_CODE");
    }

    const [tableData, setTableData] = useState([]);
    const [sortField, setSortField] = useState("");
    const [orderField, setOrderField] = useState([]);
    //const [selectedAgent, setSelectedAgent] = useState(null);
    //const [selectedCustomer, setSelectedCustomer] = useState(null)
    const [agentInfo, setAgentInfo ] = useState(null);


    const [selectedOrder, setSelectedOrder] = useState({});

    //stuff for  popup
    const [editTriggered, setEditTriggered] = useState(false);
    const [showCostumer, setShowCostumer] = useState(false);
    const [showAgent, setShowAgent] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    const captionText = `There are currently ${tableData.length} orders in the table. Column headers are sortable.`;


    const handleSave = async (updatedOrder) => {
        console.log('cliccato save');
        console.log('ordine da cambiare è: ', updatedOrder)
        console.log('chiave dell ordine: ', updatedOrder.ORD_NUM)
        const ord_num = updatedOrder.ORD_NUM
        try {
            const response = await axios.put(`${apiProxy}/orders/${ord_num}`, updatedOrder, {
                headers: { Authorization: Cookies.get('auth_token')}
            });
            if (response.status === 200) {
                setTableData((prevData) => prevData.map((order) => (order.ORD_NUM === updatedOrder.ORD_NUM ? updatedOrder : order)));
                setSelectedOrder(null)
            }
        } catch (error) {
            console.error('Error updating order', error)
        }
        //TODO aggiungere/copiare dal main logica
        setEditTriggered(false);
    }

    const handleClose = () => {
        console.log("closing");
        //TODO aggiungere/copiare dal main logica
        setEditTriggered(false);
        setShowAgent(false);
        setShowCostumer(false);
        setShowDeletePopup(false);

    }

    const resetOrderField = (except) => {
        for (let i = 0; i < columns.length; i++) {
            if (columns[i].id != except)
                orderField[columns[i].id] = "default";
        }
    }

    const fetchOrders = async () => {
        try {
            console.log('provo la api con userID: ', userID)
            console.log(role)
            //const response = (await axios.get(apiProxy + '/orders', { headers: { Authorization: Cookies.get('auth_token') } })).data;
            //console.log(response)
            //const response = (await axios.get(apiProxy + '/orders/order/', {userID}, {headers: {Authorization: Cookies.get('auth_token')}})).data;
            if (role == "customer") {
                const response = (await axios.get(`${apiProxy}/orders?customer=${userID}`,{ headers: { Authorization: Cookies.get('auth_token')}})).data;
                console.log(response)
                setTableData(response)
            }
            if (role == "agent") {
                const response = (await axios.get(`${apiProxy}/orders?agent=${userID}`, { headers: { Authorization: Cookies.get('auth_token')}})).data;
                console.log(response)
                setTableData(response)
            }
            if (role == "dirigent") {
                const response = (await axios.get(`${apiProxy}/orders`, { headers: { Authorization: Cookies.get('auth_token')}})).data;
                console.log(response)
                setTableData(response)
            }
            //const response = (await axios.get(`${apiProxy}/orders/agents/${userID}`,{ headers: { Authorization: Cookies.get('auth_token')}})).data;
            //console.log(response);
            //setTableData(response);

        } catch (err) {
            console.log(err)
            if (err.response.status == 401) {
                console.log('not logged in');
                window.location.href = '/login';
            }
            console.log(err);
        }
    };

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);



        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
          const { key, target } = event;
          const currentIndex = cellRefs.current.indexOf(target);

          if (currentIndex === -1) return;

          switch (key) {
            case 'ArrowRight':
              if (currentIndex < cellRefs.current.length - 1) {
                cellRefs.current[currentIndex + 1].focus();
              }
              break;
            case 'ArrowLeft':
              if (currentIndex > 0) {
                cellRefs.current[currentIndex - 1].focus();
              }
              break;
            case 'ArrowDown':
              if (currentIndex + columns.length < cellRefs.current.length) {
                cellRefs.current[currentIndex + columns.length].focus();
              }
              break;
            case 'ArrowUp':
              if (currentIndex - columns.length >= 0) {
                cellRefs.current[currentIndex - columns.length].focus();
              }
              break;
            default:
              break;
          }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }, [columns.length]);


    useEffect(() => {
        fetchOrders();
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
            sortTableData(sortField, id);
        }
        resetOrderField(id);
    };

    const sortTableData = (sortField, id) => {

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

    const handleSorting2 = (event) => {

        const sortField = event.target.value;
        const id = event.target.options[event.target.options.selectedIndex].id;

        if (sortField != "None") {
            sortTableData(sortField, id);
        }
        last_event.sortField = sortField;
        last_event.id = id;

    }

    const handleEdit = (data) => {
        console.log("to edit = ", data)
        setEditTriggered(true);
        setSelectedOrder(data);
        // Implement your edit logic here
    };

    const handleDelete = (data) => {
        console.log("to delete = ", data)
        setShowDeletePopup(true);
        toDelete=data.ORD_NUM;

    };


    const deleteOrder = async () => {
        setShowDeletePopup(false);
        console.log("DELETE confermato: ordine = ", toDelete);

        try {
            const response = await axios.delete(apiProxy + "/orders/" + toDelete, { headers: { Authorization: Cookies.get('auth_token')}});
            if (response.status === 200) {
                fetchOrders();
                //setTableData((prevData) => prevData.map((order) => (order.ORD_NUM === toDelete ? null : order)));
                setSelectedOrder(null)
            }
        } catch (error) {
            console.error('Error updating order', error)
        }

    }

    const agentCodeHandler = (code) => {
        console.log('cliccato agent', code)
        selectedAgent=code;
        setShowAgent(true);
    };


    const custCodeHandler = (code) => {
        console.log("cust code "+ code)

        selectedCustomer=code;
        setShowCostumer(true)


        console.log(selectedCustomer)

    };

    const handleSwitch = (event) => {
        console.log('switch')
        const isChecked = event.target.checked;

        for (let i = 0; i < columns.length; i++) {
            if (isChecked)
                orderField[columns[i].id] = "asc";
            else
                orderField[columns[i].id] = "desc";
        }

        if (last_event.sortField != "None")
            sortTableData(last_event.sortField, last_event.id);

    }

    if (width > 900) {
        return (
            <div className="tableDiv">
                <table className="table" role="table" aria-describedby="table_descr">
                    <caption id="table_descr" className="table-caption">
                        {captionText}
                    </caption>


                    <thead>
                        <tr role="row">
                            {columns.map(({ id, label, accessor }) => {

                                let cl = "tr"

                                return (
                                    <th
                                        key={accessor}
                                        onClick={() => handleSorting(accessor, id)}
                                        className={cl}
                                        role="columnheader"
                                        tabindex="0"
                                        id={`header-${accessor}`}
                                    >
                                        {label}{orderField[id] === "asc" ? ` \u25B4` : ""}{orderField[id] === "desc" ? " \u25BE" : ""}

                                    </th>
                                );
                            })}
                            {role !== "customer" && (
                            <th className="lastCol" tabindex="0">Options</th>)}
                        </tr>
                    </thead>

                    <tbody role="rowgroup">
                        {tableData.map((data, rowIndex) => {
                            return (
                                <tr key={data.id} role="row">
                                    {columns.map(({ accessor }, colIndex) => {
                                        const tData = data[accessor] ? data[accessor] : "——";
                                        const cellIndex = rowIndex * columns.length + colIndex;
                                        let clickHandler = null
                                        if (accessor === "CUST_CODE") {
                                            clickHandler = custCodeHandler
                                        } else if (accessor === "AGENT_CODE") {
                                            clickHandler = agentCodeHandler
                                        }

                                        let tmp = clickHandler ? <button class="hidden-button" tabindex="0" role="button"> {tData} </button> : tData;
                                        const cellAriaLabel = colIndex === 0 ? `Row ${rowIndex + 1}; ${accessor}: ${tData}` : `${accessor}: ${tData}`;
                                        return <td className={clickHandler ? 'cliccableTD' : 'defaultTD'}
                                            key={accessor + data.id}
                                            onClick={clickHandler ? () => clickHandler(data[accessor]) : null}
                                            role="cell"  aria-label={cellAriaLabel} tabindex="0"
                                            ref={el => cellRefs.current[cellIndex] = el}>
                                            {tmp}
                                        </td>;
                                    })}
                                    {role !== "customer" && (
                                        < td style={{ width: '115 px' }}>
                                            <KebabMenu data={data} handleEdit={handleEdit} handleDelete={handleDelete}
                                            role ="cell" tabindex="0"/>
                                        </td>
                                    )
                                    }
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {
                    editTriggered && (
                        <div>
                            <OrderEditPopup order={selectedOrder} onSave={handleSave} onClose={handleClose} />
                        </div>
                    )
                }
                {
                    showCostumer && (
                        <div>
                            <CustomerInfo code={selectedCustomer} onClose={handleClose} />
                        </div>
                    )
                }
                {
                    showAgent && (

                        <div>
                            <AgentInfo code={selectedAgent} onClose={handleClose} />
                        </div>
                    )
                }
                {
                    showDeletePopup && (
                        <div>
                            <DeletePopup code={toDelete} onSave={deleteOrder} onClose={handleClose} />
                        </div>
                    )
                }



            </div >

        );
    }
    else {
        return (
            <div>
                <div className="sortcontainer">

                    <label for="order-field">Sort by:</label>
                    <select id="order-field" name="order-field" onChange={handleSorting2} role="menu" tabindex="0">
                        <option id="-1" value="None">---</option>
                        {columns.map(({ id, label, accessor }) => {
                            return (
                                <option id={id} value={accessor}>{label}</option>
                            );
                        })}
                    </select>

                    <div class="sort-options" aria-label="Acendant or Descendant based on order number">  Asc - Desc
                        <label class="switch" role="switch" aria-checked="false">
                            <input type="checkbox" role="switch" aria-label="Switch ordering" aria-checked="false" tabindex="0" onChange={handleSwitch}></input>
                            <span class="slider round"  tabindex="0"></span>
                        </label>
                    </div>

                </div>

                <div className="tableDiv" role="group" aria-label="Group of cards containing order informations">


                    {tableData.map((data) => {

                        return (
                            <div key={data.id} className="orderCard" aria-label="card of order" role="row">
                                <div className="cardHeader">
                                    <p><b>N°: </b>{data["ORD_NUM"]}</p>
                                    {role !== "customer" && (
                                        <KebabMenu data={data} handleEdit={handleEdit} handleDelete={handleDelete} />
                                    )}
                                </div>

                                {columns.map(({ accessor, label }, index) => { // Destructure accessor and label

                                    if (index != 0) {
                                        const tData = data[accessor] ? data[accessor] : "——";

                                        let clickHandler = null
                                        if (accessor === "CUST_CODE") {
                                            clickHandler = custCodeHandler
                                        } else if (accessor === "AGENT_CODE") {
                                            clickHandler = agentCodeHandler
                                        }

                                        let tmp = clickHandler ? <button class="hidden-button" tabindex="0" role="button"> {tData} </button> : tData;
                                        return <p style={{ cursor: clickHandler ? 'pointer' : 'default' }}
                                            key={accessor + data.id}
                                            onClick={clickHandler ? () => clickHandler(data[accessor]) : null}
                                            className="cardItem"
                                            role="cell" tabindex="0">
                                            <b>{label} : </b> {tmp}
                                        </p>;
                                    }

                                })}




                            </div>
                        );
                    })}

                </div>
                {
                    editTriggered && (
                        <div>
                            <OrderEditPopup order={selectedOrder} onSave={handleSave} onClose={handleClose} />
                        </div>
                    )
                }
                {
                    showCostumer && (
                        <div>
                            <CustomerInfo code={selectedCustomer} onClose={handleClose} />
                        </div>
                    )
                }
                {
                    showAgent && (
                        <div>
                            <AgentInfo code={selectedAgent} onClose={handleClose} />
                        </div>
                    )
                }
                {
                    showDeletePopup && (
                        <div>
                            <DeletePopup code={toDelete} onSave={deleteOrder} onClose={handleClose} />
                        </div>
                    )
                }
            </div>

        )

    }
};

export default Table;