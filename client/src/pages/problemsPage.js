import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProblemsTable from "../components/problemsTable";
import ProblemsFilter from "../components/problemsFilter";
import ProblemsSearch from "../components/problemsSearch";
import { fetchProblems } from "../api";

const ProblemsPage = () => {
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [orderBy, setOrderBy] = useState("_id");
  const [order, setOrder] = useState(1);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await fetchProblems(
        search,
        tags,
        difficulty,
        orderBy,
        order,
        page,
        limit
      );
      console.log(data.data);
      setProblems(data.data);
    }
    fetchData();
  }, [orderBy, order, tags, difficulty, search]);

  return (
    <Grid container spacing={2} sx={{ py: 3 }}>
      <Grid item md={9} sm={12}>
        <ProblemsSearch search={search} setSearch={setSearch} />
        <ProblemsTable
          problems={problems}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          order={order}
          setOrder={setOrder}
        />
      </Grid>
      <Grid item md={3}>
        <ProblemsFilter
          tags={tags}
          setTags={setTags}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
        />
      </Grid>
    </Grid>
  );
};

export default ProblemsPage;
