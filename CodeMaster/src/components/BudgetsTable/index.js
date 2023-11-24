import * as React from "react";
import { mainListItems } from "../ListItems";
import CustomDrawer from "../Drawer";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
//icons
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { visuallyHidden } from "@mui/utils";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { Menu, MenuItem, Divider } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";

//table
function createData(id, desc, forn, dateS) {
  return {
    id,
    desc,
    forn,
    dateS,
  };
}
const rows = [
  createData(1, "Compras de cenoura", "EmpresaFic", new Date(2023, 0, 11)),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "descricao",
    numeric: false,
    disablePadding: true,
    label: "Descrição",
  },
  {
    id: "valor",
    numeric: true,
    disablePadding: false,
    label: "Valor",
  },
  {
    id: "data_criacao",
    numeric: true,
    disablePadding: false,
    label: "Data de Criação",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={
              headCell.id === "forn"
                ? "center"
                : headCell.numeric
                ? "right"
                : "left"
            }
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              fontWeight: "bold", // Adiciona o estilo de negrito à label
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
      backgroundColor: "#E6E6E6",
    },
  },
};

const theme = createTheme({
  palette: {
    principal: "#02ABC2",
    harmonia: "#E6E6E6",
  },
  components: {
    MuiSelect: {
      styleOverrides: {
        iconOutlined: {
          color: "#E6E6E6", // Substitua pela cor desejada
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "820px",
          "& label": {
            color: "#E6E6E6",
          },
          "& label.Mui-focused": {
            color: "#E6E6E6",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "#E6E6E6",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#000000",
            },
            "&:hover fieldset": {
              borderColor: "#000000",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#E6E6E6",
            },
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          margin: 5,
          width: 300,
          "& label": {
            color: "#E6E6E6",
          },
          "& label.Mui-focused": {
            color: "#E6E6E6",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "#E6E6E6",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#000000",
            },
            "&:hover fieldset": {
              borderColor: "#000000",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#E6E6E6",
            },
          },
        },
      },
    },
  },
});

function EnhancedTableToolbar() {
  const [searchText, setSearchText] = React.useState("");

  const iconStyle = {
    color: "#FFFFFF",
  };
  const placeholder = {
    color: "#FFFFFF",
  };
  return (
    <ThemeProvider theme={theme}>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          backgroundColor: "#016875",
          borderRadius: "3px 3px 0 0",
        }}
      >
        <Tooltip title="Buscar">
          <TextField
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Buscar..."
            variant="outlined"
            size="small"
            sx={{ width: "100%" }}
            InputProps={{
              style: placeholder,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={iconStyle} />
                </InputAdornment>
              ),
            }}
          />
        </Tooltip>
      </Toolbar>
    </ThemeProvider>
  );
}

//padrao
const defaultThemes = createTheme({
  palette: {
    principal: "#02ABC2",
    harmonia: "#E6E6E6",
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          marginBottom: 2,
          backgroundColor: "#E6E6E6",
          boxShadow: "0px 0px 4px rgba(0,0,0,0.4)",
        },
      },
    },
  },
});

function RowMenuWrapper() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    // Lógica para manipular o clique em "Atualizar"
    console.log("Edit clicked");
    handleCloseMenu(); // Fechar o menu após a ação
  };

  const handleRenameClick = () => {
    // Lógica para manipular o clique em "Renomear"
    console.log("Rename clicked");
    handleCloseMenu(); // Fechar o menu após a ação
  };

  const handleDeleteClick = () => {
    // Lógica para manipular o clique em "Deletar"
    console.log("Delete clicked");
    handleCloseMenu(); // Fechar o menu após a ação
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleOpenMenu}>
        <MoreHorizOutlinedIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        sx={{
          "& .MuiList-root": {
            backgroundColor: "#E6E6E6",
          },
        }}
      >
        <MenuItem onClick={handleEditClick}>Atualizar</MenuItem>
        <MenuItem onClick={handleRenameClick}>Renomear</MenuItem>
        <Divider />
        <MenuItem onClick={handleDeleteClick} sx={{ color: "error.main" }}>
          Deletar
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default function BudgetsTable() {
  const [open, setOpen] = React.useState(true);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [cookie, setCookie] = useCookies(["id"]);
  const userId = cookie.id;
  const location = useLocation();

  const username = location.state?.nome || "";
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  );

  React.useEffect(() => {
    addProducts();
  }, [userId]);
  const addProducts = async () => {
    try {
      const response = await fetch(
        `http://localhost:3333/orcamentos/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Erro ao obter dados");
      }
      const data = await response.json();
      setRows(data);
    } catch (error) {
      console.error("Erro ao comunicar com o servidor:", error);
    }
  };

  return (
    <ThemeProvider theme={defaultThemes}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <CustomDrawer
          open={open}
          toggleDrawer={toggleDrawer}
          mainListItems={mainListItems}
        />
        <Box
          component="main"
          sx={{
            backgroundColor: "principal",
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              fontSize={"35px"}
              sx={{ mb: 3 }}
            >
              Orçamentos Cadastrados
            </Typography>
            <Box sx={{ width: "100%" }}>
              <Paper>
                <EnhancedTableToolbar />
                <TableContainer>
                  <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size={dense ? "small" : "medium"}
                  >
                    <EnhancedTableHead
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onSelectAllClick={handleSelectAllClick}
                      onRequestSort={handleRequestSort}
                      rowCount={rows.length}
                    />
                    <TableBody>
                      {visibleRows.map((row, index) => {
                        const isItemSelected = isSelected(row.id);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.id}
                            selected={isItemSelected}
                            sx={{ cursor: "pointer" }}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                inputProps={{
                                  "aria-labelledby": labelId,
                                }}
                                onClick={(event) => handleClick(event, row.id)}
                              />
                            </TableCell>
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                            >
                              {row.descricao}
                            </TableCell>
                            <TableCell align="center">{row.valor}</TableCell>
                            <TableCell align="right">
                              {row.data_criacao
                                ? new Date(row.data_criacao).toLocaleDateString()
                                : ""}
                            </TableCell>
                            <TableCell align="right">
                              <RowMenuWrapper />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      {emptyRows > 0 && (
                        <TableRow
                          style={{
                            height: (dense ? 33 : 53) * emptyRows,
                          }}
                        >
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  labelRowsPerPage="Itens por página:"
                />
              </Paper>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
