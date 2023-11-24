import { FastifyInstance } from "fastify";
import { date, z } from "zod";
import dayjs from "dayjs";
import { prisma } from "./lib/prisma";
import {
  format,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
  parse,
} from "date-fns";

export async function AppRoutes(app: FastifyInstance) {
  // rota para criar um user
  app.post("/user", async (request) => {
    const postBody = z.object({
      nome: z.string(),
      senha: z.string(),
      email: z.string(),
      telefone: z.string(),
    });
    const { nome, senha, email, telefone } = postBody.parse(request.body);
    const data_cadastro = dayjs().startOf("day").toDate(); // sem hora, minuto e segundo
    const newUser = await prisma.user.create({
      data: {
        nome,
        senha,
        email,
        telefone,
        data_cadastro,
      },
    });
    return newUser;
  });
  // Uma rota que consulta todos os usuários cadastrados no banco de dados
  app.get("/users", async () => {
    const users = await prisma.user.findMany();
    return users;
  });
  // Login do Usuario
  app.post("/user/login", async (request) => {
    const postBody = z.object({
      nome: z.string(),
      senha: z.string(),
    });
    const { nome, senha } = postBody.parse(request.body);
    const data_atual = dayjs().startOf("day").toDate(); // sem hora, minuto e segundo
    const user = await prisma.user.findFirst({
      where: {
        nome: nome,
        senha: senha,
      },
    }); //
    if (user?.senha == senha) {
      prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          ultimo_acesso: data_atual,
        },
      });
    }
    return user;
  });
  // Cadastrar Produto
  // Uma rota que cria um produto no banco de dados
  app.post("/produto", async (request) => {
    const postBody = z.object({
      nome: z.string(),
      data_validade: z.string(),
      quantidade_adicionada: z.number(),
      quantidade_minima: z.number(),
      categoria: z.string(),
      descricao: z.string(),
      userId: z.number(),
      distribuidoraId: z.number(),
    });
    const {
      nome,
      data_validade,
      quantidade_adicionada,
      quantidade_minima,
      descricao,
      categoria,
      userId,
      distribuidoraId,
    } = postBody.parse(request.body);
    const data_cadastrada = dayjs().startOf("day").toDate(); // sem hora, minuto e segundo
    // const dataFormated = dayjs().startOf("day").toDate();
    const parsedDate = parse(data_validade, "dd/MM/yyyy", new Date());

    // Set the time to 03:00:00.000

    // Format the adjusted date
    const dataFormatted = format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

    // insere o produto no banco de dados
    // recupera a data atual - de hoje
    const newProduct = await prisma.product.create({
      data: {
        nome,
        data_chegada: data_cadastrada,
        data_validade: dataFormatted,
        quantidade_atual: quantidade_adicionada,
        quantidade_adicionada,
        quantidade_minima,
        descricao,
        categoria, //categoria
        userId: userId,
        distribuidoraId: distribuidoraId,
      },
    });
    return newProduct;
  });

  app.get("/produto", async () => {
    const listaProduto = await prisma.product.findMany();
    return listaProduto;
  });

  //Nessa rota recupera todos produtos do Usuario
  app.get("/produtos/:userId", async (request, response) => {
    try {
      const userIdParams = z.object({
        userId: z.string(),
      });

      const { userId } = userIdParams.parse(request.params);

      const produtos = await prisma.product.findMany({
        where: {
          userId: Number(userId),
        },
        select: {
          id: true,
          nome: true,
          data_chegada: true,
          data_validade: true,
          quantidade_atual: true,
          categoria: true,
        },
      });

      if (produtos.length === 0) {
        return response
          .status(404)
          .send({
            error: "Nenhum produto encontrado para o ID do usuário fornecido.",
          });
      }

      return response.send(produtos);
    } catch (error) {
      console.error("Erro ao processar a requisição:", error);
      return response.status(500).send({ error: "Erro interno do servidor." });
    }
  });

  app.get("/dash/:userId", async (request, response) => {
    try {
      const userIdParams = z.object({
        userId: z.string(),
      });

      const { userId } = userIdParams.parse(request.params);

      const produtos = await prisma.product.findMany({
        where: {
          userId: Number(userId),
        },
        select: {
          id: true,
          nome: true,
          data_chegada: true,
          categoria: true,
          distribuidoraId:true,
        },
      });

      if (produtos.length === 0) {
        return response
          .status(404)
          .send({
            error: "Nenhum produto encontrado para o ID do usuário fornecido.",
          });
      }

      return response.send(produtos);
    } catch (error) {
      console.error("Erro ao processar a requisição:", error);
      return response.status(500).send({ error: "Erro interno do servidor." });
    }
  });


  //cadastrar Distribuidoras
  app.post("/distribuidora", async (request) => {
    const postBody = z.object({
      nome_distribuidora: z.string(),
      razao_social: z.string(),
      telefone: z.string(),
      userId: z.number(),
    });
    const { nome_distribuidora, razao_social, telefone, userId } = postBody.parse(
      request.body
    );
    const newDistribuidora = await prisma.distributor.create({
      data: {
        nome_distribuidora,
        razao_social,
        telefone,
        userId: userId,
      },
    });
    return newDistribuidora;
  });

  //recupera todas as distribuidoras no banco
  app.get("/distribuidora", async (request) => {
    const Listadistribuidoras = await prisma.distributor.findMany();
    return Listadistribuidoras;
  });

  // recupera todas as distribuidoras de um usuario
  app.get("/distribuidoras/:userId", async (request, response) => {
    try {
      const userIdParams = z.object({
        userId: z.string(),
      });

      const { userId } = userIdParams.parse(request.params);

      const produtos = await prisma.distributor.findMany({
        where: {
          userId: Number(userId),
        },
      });

      if (produtos.length === 0) {
        return response
          .status(404)
          .send({
            error:
              "Nenhuma Distribuidora encontrado para o ID do usuário fornecido.",
          });
      }

      return response.send(produtos);
    } catch (error) {
      console.error("Erro ao processar a requisição:", error);
      return response.status(500).send({ error: "Erro interno do servidor." });
    }
  });

  // Orçamento
  app.post("/orcamento", async (request) => {
    const postBody = z.object({
      valor: z.number(),
      descricao: z.string(),
      userId: z.number(),
      distribuidoraId: z.number(),
    });
    const { valor, userId, distribuidoraId, descricao } = postBody.parse(request.body);
    const data_cadastrada = dayjs().startOf("day").toDate();
    const newOrcamento = await prisma.orcamento.create({
      data: {
        valor,
        descricao,
        userId: userId,
        data_criacao: data_cadastrada,
        distribuidoraId: distribuidoraId,
      },
    });
    return newOrcamento;
  });

  // ver se a orçamentos
  app.get("/orcamento", async (request) => {
    const Listaorcamentos = await prisma.orcamento.findMany();
    return Listaorcamentos;
  });
  // recupera todos os orçamentos de um usuario 
  app.get("/orcamentos/:userId", async (request, response) => {
    try {
      const userIdParams = z.object({
        userId: z.string(),
      });

      const { userId } = userIdParams.parse(request.params);

      const produtos = await prisma.orcamento.findMany({
        where: {
          userId: Number(userId),
        },
      });

      if (produtos.length === 0) {
        return response
          .status(404)
          .send({
            error:
              "Nenhum orçamento encontrado para o ID do usuário fornecido.",
          });
      }

      return response.send(produtos);
    } catch (error) {
      console.error("Erro ao processar a requisição:", error);
      return response.status(500).send({ error: "Erro interno do servidor." });
    }
  });

  //funçao delete
  app.delete("/produto/:id", async (request, reply) => {
    try {
      // Pegar o ID para remoção
      const idRemocao = z.object({
        id: z.string(),
      });

      const { id } = idRemocao.parse(request.params);

      // Log para depuração: Exibir a consulta de exclusão
      const deleteQuery = prisma.product.delete({
        where: {
          id: Number(id),
        },
      });

      console.log("Consulta de Exclusão:", deleteQuery);

      // Remoção do produto
      const produtoDeletado = await deleteQuery;

      // Retornar a resposta da exclusão
      reply.send(produtoDeletado);
    } catch (error) {
      console.error(error);

      // Lidar com erros e retornar uma resposta apropriada
      reply.status(500).send({ error: "Erro durante a exclusão do produto" });
    }
  });
  //funçao atualizar
  //ver com o arthur como atualizaçao
  app.patch("/produto/atualização", async (request) => {
    const updateData = z.object({
      id: z.number(),
      ID_usario: z.number(),
      data_validade: z.date(),
      quantidade: z.number(),
      descricao: z.string(),
      valor: z.number(),
    });
  });
}
