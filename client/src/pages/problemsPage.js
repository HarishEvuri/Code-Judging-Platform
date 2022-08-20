import { Grid } from "@mui/material";
import React from "react";
import EnhancedTable from "../components/problemsTable";
import ProblemsFilter from "../components/problemsFilter";
import ProblemsSearch from "../components/problemsSearch";

const ProblemsPage = () => {
  return (
    <Grid container spacing={2} sx={{ py: 3 }}>
      <Grid item md={9} sm={12}>
        <ProblemsSearch />
        <EnhancedTable />
      </Grid>
      <Grid item md={3}>
        <ProblemsFilter />
      </Grid>
    </Grid>
  );
};

export default ProblemsPage;
