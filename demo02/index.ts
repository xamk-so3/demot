import express from 'express';
import { PrismaClient } from '@prisma/client';

const app : express.Application = express();

const prisma : PrismaClient = new PrismaClient();

const portti : number = Number(process.env.PORT) || 3002;

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.post("/poista", async (req : express.Request, res : express.Response) => {

    await prisma.ostos.delete({
        where : {
            id : Number(req.body.id)
        }
    });

    res.redirect("/");

});


app.post("/", async (req : express.Request, res : express.Response) => {

    await prisma.ostos.create({
        data : {
            tuote : req.body.tuote || "Nimetön tuote",
            poimittu : false
        }
    });

    let ostokset = await prisma.ostos.findMany();

    res.render("index", { ostokset : ostokset });

});

app.get("/poimittu", async (req : express.Request, res : express.Response) => {

    await prisma.ostos.update({
        where : {
            id : Number(req.query.id)
        },
        data : {
            poimittu : (req.query.poimittu === "true" ) ? false : true
        }
    });

    res.redirect("/");

});


app.get("/", async (req : express.Request, res : express.Response) => {

    let ostokset = await prisma.ostos.findMany();

    res.render("index", { ostokset : ostokset });

});

app.listen(portti, () => {

    console.log(`Palvelin käynnistyi osoitteeseen http://localhost:${portti}`);    

});