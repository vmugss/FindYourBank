import React, { useMemo, useState } from 'react';
import { useTable, useSortBy, usePagination, useFilters, useAsyncDebounce } from 'react-table';
import { COLUMNS } from './columns';
import { Table } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import './BankTable.css';

export const BankTable = ({ data, setSelectedRow }) => {
    const [category, setCategory] = useState("");
    const [inputValue, setInputValue] = useState("");
    const columns = useMemo(() => COLUMNS, []);

    const inputOnChange = useAsyncDebounce((category,value) => {
        setFilter(`${category}`, value || undefined)
    },1000);

    const history = useHistory();
    const handleRowClick = (row) => {
        history.push(`/bank_details/${row.values.ifsc}`);
      } 

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state,
        gotoPage,
        pageCount,
        setPageSize,
        setFilter,
        prepareRow
      } = useTable({
        columns,
        data
    }, 
    useFilters,
    useSortBy,
    usePagination)

    const { pageIndex, pageSize } = state;
    return(
        <>
        <select value={category} class="inputElement" onChange={e=>{
            setCategory(e.target.value);
            setInputValue("");
            }}>
                <option value="" disabled selected>Select field</option>
                {columns.map(column => (
                    <option key={column.accessor} value={column.accessor}>
                        {column.Header}
                    </option>
            ))}
        </select>
        <input
            id="searchQuery"
            class="inputElement"
            value={inputValue || ''}
            type="search"
            placeholder="Search query"
            disabled={category===""? true: false}
            onChange={(e) => {
                setInputValue(e.target.value);
                inputOnChange(category, e.target.value);
                //setFilter(`${category}`, e.target.value);
            }}
        />
        <div class="fixTableHead">
        <Table bordered hover responsive dark style={{width:'600px'},{tableLayout: 'fixed'}} {...getTableProps()}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                        {column.render('Header')}
                        <span>
                            {column.isSorted? (column.isSortedDesc? '↓' : '↑') : ''}
                        </span>
                    </th>
                ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()} onClick={()=> {
                            handleRowClick(row);
                            setSelectedRow(row.values)}}>
                            {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        </div>
            <div class="paginationDiv">
                <span class="paginationItems">
                    Page {' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong> {' '}
                </span>
                <span class="paginationItems">
                    | Go to page: {' '}
                    <input type='number' defaultValue={pageIndex + 1}
                    onChange = { e => {
                        const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                        gotoPage(pageNumber)
                    }} 
                    style ={{width: '50px'}}/>
                </span>
                
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    Previous
                </button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    Next
                </button>
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>
                <select class="paginationItems" value={pageSize} onChange={e=>{
                    setPageSize(Number(e.target.value))
                }}>
                    {[10, 20, 30].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize} rows
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
};