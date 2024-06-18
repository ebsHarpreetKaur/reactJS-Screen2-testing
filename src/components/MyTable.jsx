import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  sortableContainer,
  sortableElement,
  sortableHandle
} from "react-sortable-hoc";
import styled from "styled-components";

// Placeholder for callOrReturn function
const callOrReturn = (fn, ...args) =>
  typeof fn === "function" ? fn(...args) : fn;

// Placeholder for Table component
const Table = React.forwardRef(({ data, columns, rowProps, fixed }, ref) => (
  <div ref={ref}>
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => {
          const props = rowProps({ rowIndex });
          return (
            <tr key={row.id} {...props}>
              {columns.map((col) => (
                <td key={col.key}>{row[col.key]}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
));

// Placeholder for generateColumns function
const generateColumns = (count) =>
  Array.from({ length: count }, (_, i) => ({
    key: `col${i + 1}`,
    title: `Column ${i + 1}`
  }));

// Placeholder for generateData function
const generateData = (columns, count) =>
  Array.from({ length: count }, (_, i) => {
    const row = { id: `${i + 1}` };
    columns.forEach((col) => {
      row[col.key] = `${col.title} Row ${i + 1}`;
    });
    return row;
  });

const DraggableContainer = sortableContainer(({ children }) => children);
const DraggableElement = sortableElement(({ children }) => children);
const DraggableHandle = sortableHandle(({ children }) => children);

const Handle = styled.div`
  flex: none;
  width: 7.5px;
  height: 100%;

  &::before {
    content: "";
    border-left: 4px dotted #ccc;
    display: block;
    height: 20px;
    margin: 15px 3px;
  }

  &:hover::before {
    border-color: #888;
  }
`;

const Row = ({ key, index, children, ...rest }) => (
  <DraggableElement key={key} index={index}>
    <div {...rest}>
      <DraggableHandle>
        <Handle />
      </DraggableHandle>
      {children}
    </div>
  </DraggableElement>
);

const DraggableTable = ({ data: initialData, ...props }) => {
  const [data, setData] = useState(initialData);
  const tableRef = useRef(null);
  const containerRef = useRef(null);
  const helperContainerRef = useRef(null);

  useEffect(() => {
    if (tableRef.current) {
      containerRef.current = tableRef.current.querySelector(".BaseTable__body");
      helperContainerRef.current =
        tableRef.current.querySelector(".BaseTable__table");
    }
  }, [tableRef]);

  const getContainer = useCallback(() => {
    return containerRef.current;
  }, []);

  const getHelperContainer = useCallback(() => {
    return helperContainerRef.current;
  }, []);

  const rowPropsCallback = useCallback(
    (args) => {
      const extraProps = callOrReturn(props.rowProps);
      return {
        ...extraProps,
        tagName: Row,
        index: args.rowIndex
      };
    },
    [props.rowProps]
  );

  const handleSortEnd = ({ oldIndex, newIndex }) => {
    const newData = [...data];
    const [removed] = newData.splice(oldIndex, 1);
    newData.splice(newIndex, 0, removed);
    setData(newData);
  };

  return (
    <DraggableContainer
      useDragHandle
      getContainer={getContainer}
      helperContainer={getHelperContainer}
      onSortEnd={handleSortEnd}
    >
      <Table
        {...props}
        ref={tableRef}
        data={data}
        fixed={false}
        rowProps={rowPropsCallback}
      />
    </DraggableContainer>
  );
};

const Hint = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #336699;
  margin-bottom: 10px;
`;

const columns = generateColumns(10);
const data = generateData(columns, 200);
columns[0].minWidth = 150;

const MyTable = () => (
  <>
    <Hint>Drag the dots, only works in flex mode(fixed=false)</Hint>
    <DraggableTable columns={columns} data={data} />
  </>
);

export default MyTable;
