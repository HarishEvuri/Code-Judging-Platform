import {
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import React, { useState } from "react";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const headCells = [
  {
    id: "status",
    label: "Status",
    width: "10%",
  },
  {
    id: "title",
    label: "Title",
    width: "60%",
  },
  {
    id: "acceptance",
    label: "Acceptance",
    width: "15%",
  },
  {
    id: "difficulty",
    label: "Difficulty",
    width: "15%",
  },
];

const rows = [
  {
    title: "1338. Reduce Array size to the half",
    acceptance: "70.0%",
    difficulty: "Medium",
  },
  {
    title: "2356. Number of unique subjects",
    acceptance: "95.0%",
    difficulty: "Easy",
  },
  {
    title: "1265. Print the immutable Linked list",
    acceptance: "94.3%",
    difficulty: "Medium",
  },
  {
    title: "1757. Recyclable and low fat products",
    acceptance: "94.0%",
    difficulty: "Easy",
  },
  {
    title: "1338. Reduce Array size to the half",
    acceptance: "70.0%",
    difficulty: "Medium",
  },
  {
    title: "2356. Number of unique subjects",
    acceptance: "95.0%",
    difficulty: "Easy",
  },
  {
    title: "1265. Print the immutable Linked list",
    acceptance: "94.3%",
    difficulty: "Medium",
  },
  {
    title: "1757. Recyclable and low fat products",
    acceptance: "94.0%",
    difficulty: "Easy",
  },
];

const EnhancedTable = () => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(null);

  const sortHandler = (id) => {
    const isAsc = orderBy === id && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(id);
  };

  return (
    <TableContainer>
      <Table size="medium">
        <TableHead>
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                sx={{ width: headCell.width, fontWeight: 400 }}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={() => sortHandler(headCell.id)}
                  sx={{
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  {headCell.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.title}>
              <TableCell sx={{ py: 1.5 }}></TableCell>
              <TableCell sx={{ py: 1.5 }}>{row.title}</TableCell>
              <TableCell sx={{ py: 1.5 }}>{row.acceptance}</TableCell>
              <TableCell sx={{ py: 1.5 }}>{row.difficulty}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EnhancedTable;
