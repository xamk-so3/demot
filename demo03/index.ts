import express from "express";
import { PrismaClient } from "@prisma/client";
import path from "path";
import multer from "multer";
import fs from "fs/promises";

const app : express.Application = express();
const prisma : PrismaClient = new PrismaClient();

const uploadKasittelija : express.RequestHandler = multer({ 
    dest : path.resolve(__dirname, "tmp"),
    limits : {
        fileSize : (1024 * 500)
    },
    fileFilter : (req, file, callback) => {

        if (["jpg", "jpeg"].includes(file.mimetype.split("/")[1])) {

            callback(null, true);

        } else {

            callback(new Error());

        }

        

    }
}).single("tiedosto");

const portti : number = Number(process.env.PORT) || 3003;

app.set("view engine", "ejs");

app.use(express.static(path.resolve(__dirname, "public")));

app.post("/lisaa", async (req : express.Request, res : express.Response ) => {

    uploadKasittelija(req, res, async (err : any) => {

        if (err instanceof multer.MulterError) {
            res.render("lisaa", { "virhe" : "Tiedosto on tiedostokooltaan liian suuri (> 500kt).", "teksti" : req.body.teksti });
        } else if (err) {
            res.render("lisaa", { "virhe" : "Väärä tiedostomuoto. Käytä ainoastaan jpg-kuvia.", "teksti" : req.body.teksti });        
        } else {

            if (req.file) {

                let tiedostonimi : string = `${req.file.filename}.jpg`; 
        
                await fs.copyFile(path.resolve(__dirname, "tmp", String(req.file.filename)), path.resolve(__dirname, "public", "img", tiedostonimi))
        
                await prisma.kuva.create({
                    data : {
                        teksti : req.body.teksti || "Nimetön kuva",
                        tiedosto : tiedostonimi
                    }
                });
        
            }
        
            res.redirect("/");

        }

    });



});

app.get("/lisaa", async (req : express.Request, res : express.Response ) => {

    res.render("lisaa", {virhe : "", teksti : ""});

});

app.get("/", async (req : express.Request, res : express.Response ) => {

    res.render("index", {kuvat : await prisma.kuva.findMany()});

});

app.listen(portti, () => {

    console.log(`Palvelin käynnistyi osoitteeseen : http://localhost:${portti}`);

});