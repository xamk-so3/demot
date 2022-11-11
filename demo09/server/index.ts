import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs/promises';

const app : express.Application = express();

const portti : number = Number(process.env.PORT) || 3001;

app.use(cors({
    "origin" : "http://localhost:3000",
    "optionsSuccessStatus" : 200 
}));

app.use(express.json());

app.post("/api/tehtavalista", async (req : express.Request, res : express.Response) : Promise<void>=> {

    console.log("POST", req.body.tehtavalista.tehtavat);

    await fs.writeFile(path.resolve(__dirname, "data", "tehtavalista.json"), JSON.stringify(req.body.tehtavalista.tehtavat, null, 2), {encoding : "utf-8"});

    res.json({});

});

app.get("/api/tehtavalista", async (req : express.Request, res : express.Response) : Promise<void>=> {

    let data : any[] = [];

    try {

        let jsonStr = await fs.readFile(path.resolve(__dirname, "data", "tehtavalista.json"), {encoding : "utf-8"});

        data = JSON.parse(jsonStr);

    } catch (e: any) {

        res.json({virhe : "Tiedoston sisältämä data on korruptoitunut. Tietojen lukeminen ei onnistu."});

    }

    res.json(data);

});

app.listen(portti, () => {

    console.log(`Palvelin käynnistyi osoitteeseen: http://localhost:${portti}/api/tehtavalista`);

});

