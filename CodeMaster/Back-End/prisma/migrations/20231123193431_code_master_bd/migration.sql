-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "data_cadastro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ultimo_acesso" DATETIME,
    "telefone" TEXT
);

-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "data_chegada" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_validade" DATETIME NOT NULL,
    "quantidade_atual" INTEGER NOT NULL,
    "quantidade_minima" INTEGER NOT NULL,
    "quantidade_adicionada" INTEGER NOT NULL,
    "descricao" TEXT,
    "distribuidoraId" INTEGER NOT NULL,
    "categoria" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Product_distribuidoraId_fkey" FOREIGN KEY ("distribuidoraId") REFERENCES "Distributor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Distributor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome_distribuidora" TEXT NOT NULL,
    "razao_social" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Distributor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Orcamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT,
    "valor" REAL NOT NULL,
    "data_criacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "distribuidoraId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Orcamento_distribuidoraId_fkey" FOREIGN KEY ("distribuidoraId") REFERENCES "Distributor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Orcamento_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_OrcamentoToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_OrcamentoToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Orcamento" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_OrcamentoToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_OrcamentoToProduct_AB_unique" ON "_OrcamentoToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_OrcamentoToProduct_B_index" ON "_OrcamentoToProduct"("B");
