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

const ProblemsTable = (props) => {
  const { problems, order, setOrder, orderBy, setOrderBy } = props;

  const sortHandler = (id) => {
    const isAsc = orderBy === id && order === 1;
    setOrder(isAsc ? -1 : 1);
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
                  direction={
                    orderBy === headCell.id
                      ? order == -1
                        ? "desc"
                        : "asc"
                      : "asc"
                  }
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
          {problems.map((problem) => (
            <StyledTableRow key={problem._id}>
              <TableCell sx={{ py: 1.5 }}></TableCell>
              <TableCell sx={{ py: 1.5 }}>{problem.title}</TableCell>
              <TableCell sx={{ py: 1.5 }}>{problem.acceptance}</TableCell>
              <TableCell sx={{ py: 1.5 }}>{problem.difficulty}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProblemsTable;
