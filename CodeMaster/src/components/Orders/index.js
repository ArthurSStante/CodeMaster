import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
import Title from "../Title";
// import { useCookies } from "react-cookie";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, "Diretora", "16/05/2023", "Sabonete", "Prefeitura", "Limpeza"),
  createData(
    1,
    "Diretora",
    "16/05/2023",
    "Detergente",
    "Prefeitura",
    "Limpeza"
  ),
  createData(
    2,
    "Diretora",
    "16/05/2023",
    "Amacieante",
    "Prefeitura",
    "Limpeza"
  ),
  createData(3, "Diretora", "16/05/2023", "Arroz", "Prefeitura", "Limpeza"),
  createData(4, "Diretora", "16/05/2023", "Leite", "ONG", "Limpeza"),
];

//nome do usuario logado
//data de cadastro
//nome do produto
//id do fornecedor
//categoria
function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  // const [rows, setRows] = React.useState([]);
  // const [cookie, setCookie] = useCookies(["id"]);
  // const userId = cookie.id;
  // React.useEffect(() => {
  //   addProducts();
  // }, [userId]);
  // const addProducts = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:3333/produtos/${userId}`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     if (!response.ok) {
  //       throw new Error("Erro ao obter dados");
  //     }
  //     const data = await response.json();
  //     setRows(data);
  //   } catch (error) {
  //     console.error("Erro ao comunicar com o servidor:", error);
  //   }
  // };
  return (
    <React.Fragment>
      <Typography variant="h6" sx={{ color: "#000000" }}>
        Ultimas Atualizações
      </Typography>
      {/* Utilize a animação de fade do Material-UI */}
      <Fade in={true} timeout={500}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Nome</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Data Cadastrada</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Nome do Produto</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Fornecedor</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Categoria
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.shipTo}</TableCell>
                <TableCell>{row.paymentMethod}</TableCell>
                <TableCell align="right">${row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Fade>
      <Link
        color="primary"
        href="#"
        onClick={preventDefault}
        sx={{ mt: 3, color: "#000000", textDecoration: "underline" }}
      >
        Mostrar Mais
      </Link>
    </React.Fragment>
  );
}
