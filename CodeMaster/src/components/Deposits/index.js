import * as React from "react";
import { useSpring, animated } from "react-spring";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "../Title";

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  // Define a animação usando react-spring
  const { numberValue } = useSpring({
    from: { numberValue: 0 },
    to: { numberValue: 3024 },
    config: { duration: 1000 }, // Ajuste a duração da animação conforme necessário
  });

  return (
    <React.Fragment>
      <Typography variant="h6" sx={{color:"#000000"}}>
        Depositos Recentes
      </Typography>
      {/* Use o componente animado para aplicar a animação */}
      <Typography component="div" variant="h4">
        {/* Exibe o valor animado */}
        <animated.span>
          {numberValue.interpolate((val) => `$${val.toFixed(2)}`)}
        </animated.span>
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        em 15 de março de 2019
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault} sx={{color:"#000000", textDecoration: "underline" }}>
          Mostrar Mais
        </Link>
      </div>
    </React.Fragment>
  );
}
