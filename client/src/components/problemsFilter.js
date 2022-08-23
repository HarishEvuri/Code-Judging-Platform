import { FilterAlt } from "@mui/icons-material";
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import React from "react";

const names = [
  "Oliver",
  "Van",
  "April",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const ProblemsFilter = () => {
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <Paper sx={{ px: 3 }} elevation={0}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography>Filter</Typography>
        <FilterAlt />
      </Box>
      <FormControl fullWidth size="small" sx={{ mt: 3 }}>
        <InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mt: 2.5 }} size="small">
        <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Difficulty"
        >
          <MenuItem value={10}>Easy</MenuItem>
          <MenuItem value={20}>Medium</MenuItem>
          <MenuItem value={30}>Hard</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mt: 2.5 }} size="small">
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Status"
        >
          <MenuItem value={10}>Sovled</MenuItem>
          <MenuItem value={20}>Unsolved</MenuItem>
        </Select>
      </FormControl>
    </Paper>
  );
};

export default ProblemsFilter;
