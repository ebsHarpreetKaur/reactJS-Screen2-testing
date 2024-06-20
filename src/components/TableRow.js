import React from "react";
import { SortableHandle } from "react-sortable-hoc";
import styled from "styled-components";
import { MdDragIndicator } from "react-icons/md";
import Button from '@mui/material/Button';
import { FaPlus } from "react-icons/fa";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const TrWrapper = styled.tr`
  background: white;
  cursor: default;
  
  .firstElement {
    display: flex;
    flex-direction: row;
  }

  &.helperContainerClass {
    width: auto;
    border: 1px solid #efefef;
    box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.2);
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 3px;

    &:active {
      cursor: grabbing;
    }

    & > td {
      padding: 5px;
      text-align: left;
      width: 200px;
    }
  }
`;

const Handle = styled.div`
  margin-right: 10px;
  padding: 0 5px;
  cursor: grab;
`;


const options = [
  'one', 'two', 'three'
];
const defaultOption = options[0];

const RowHandler = SortableHandle(() => <Handle className="handle"><MdDragIndicator size={20} /></Handle>);

const TableRow = ({ first, second, third, fourth, className }) => {
  return (
    <TrWrapper className={className}>
      <td>
        <div className="firstElement">
          <RowHandler />
          {first}
        </div>
      </td>

      <td className="dpd">
        <div style={{display:"flex", flexDirection:"row"}}>
          <Dropdown
            options={options}
            value={defaultOption}
            placeholder="Select an option"
            className="custom-dropdown"
          />
          <Dropdown
            options={options}
            value={defaultOption}
            placeholder="Select an option"
            className="custom-dropdown"
          />
          <Dropdown
            options={options}
            value={defaultOption}
            placeholder="Select an option"
            className="custom-dropdown"
          />
        </div>

        <Button variant="outlined" style={{ fontSize: 10 }}><FaPlus /> Add Role</Button>

        {/* {second} */}
      </td>
      <td>{third}</td>
      <td>{fourth}</td>
    </TrWrapper>
  );
};

export default TableRow;












