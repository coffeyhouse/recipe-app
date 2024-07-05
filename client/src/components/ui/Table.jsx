// src/components/ui/Table.jsx
import React, { useState } from 'react';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const Table = ({ headers, data }) => {
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });

  const sortedData = React.useMemo(() => {
    let sortableData = [...data];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        const aKey = a.cells[headers.indexOf(sortConfig.key)];
        const bKey = b.cells[headers.indexOf(sortConfig.key)];

        if (aKey < bKey) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aKey > bKey) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig, headers]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (header) => {
    if (sortConfig.key === header) {
      return sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} onClick={() => requestSort(header)} className="cursor-pointer">
                <div className="flex items-center">
                  {header}
                  <span className="ml-2">{getSortIcon(header)}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, rowIndex) => (
            <tr key={row.id || rowIndex}>
              {row.cells.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
