import express from 'express';
import { PrismaClient } from '@prisma/client';

const app : express.Application = express();

const prisma : PrismaClient = new PrismaClient();

const portti : number = Number(process.env.PORT) || 3001;

app.set("view engine", "ejs");

app.get("/", async (req : express.Request, res : express.Response) => {

    let ostokset = await prisma.ostos.findMany();

    res.render("index", { ostokset : ostokset });

});

app.listen(portti, () => {

    console.log(`Palvelin käynnistyi osoitteeseen http://localhost:${portti}`);    

});