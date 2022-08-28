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
import React, { useState } from "react";
import { tagsList } from "../constants/tagsList";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 400,
      width: 250,
    },
  },
};

const ProblemsFilter = (props) => {
  const { tags, setTags, difficulty, setDifficulty } = props;

  const handleChangeTags = (event) => {
    const {
      target: { value },
    } = event;
    setTags(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeDifficulty = (event) => {
    setDifficulty(event.target.value);
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
          value={tags}
          onChange={handleChangeTags}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {tagsList.map((tag) => (
            <MenuItem key={tag} value={tag}>
              {tag}
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
          value={difficulty}
          onChange={handleChangeDifficulty}
        >
          <MenuItem value={""}>Select</MenuItem>
          <MenuItem value={1}>Easy</MenuItem>
          <MenuItem value={2}>Medium</MenuItem>
          <MenuItem value={3}>Hard</MenuItem>
        </Select>
      </FormControl>
    </Paper>
  );
};

export default ProblemsFilter;
