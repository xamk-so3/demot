import express from 'express';
import cors from 'cors';
import axios from 'axios';
import Parser from 'rss-parser';
import {format, parseISO} from 'date-fns';

const app : express.Application = express();

const portti : number = Number(process.env.PORT) || 3001;

const parser : Parser = new Parser();

export interface Uutinen {
    otsikko : string,
    sisalto : string,
    julkaistu : Date,
    kuva : string,
    linkki : string
}

app.use(cors({
    "origin" : "http://localhost:3000",
    "optionsSuccessStatus" : 200 
}));

app.get("/api/uutiset", async (req : express.Request, res : express.Response) : Promise<void>=> {

    try  {

        let uutiset : Uutinen[] = await haeUutiset("https://feeds.yle.fi/uutiset/v1/recent.rss?publisherIds=YLE_UUTISET");

        res.json(uutiset);

    } catch (e : any) {

        res.status(500).json({ virhe : e })

    }

});

app.listen(portti, () => {

    console.log(`Palvelin käynnistyi porttiin: ${portti}`);

});

const haeUutiset = (url : string) => {

    return new Promise(async (resolve : (uutiset: Uutinen[]) => void, reject : (virhe : string) => void) => {

        try {

            let yhteys = await axios.get(url);            

            let rssFeed : any = await parser.parseString(yhteys.data);

            let uutiset : Uutinen[] = rssFeed.items.map((item : any) => {
                return {
                        id : format(parseISO(item.isoDate), "T"),
                        otsikko : item.title,
                        sisalto : item.contentSnippet,
                        julkaistu : parseISO(item.isoDate),
                        kuva : (item.enclosure) ? item.enclosure.url : "http://localhost:3009/eikuvaa.png",
                        linkki : item.link
                       }
            });

            resolve(uutiset);

        } catch (e : any) {

            reject(`RSS-feediin ${url} ei saada yhteyttä`);

        }

    });

} 
