import React, { createContext, useEffect, useRef, useState } from "react";

export const UutinenContext : React.Context<any> = createContext(undefined);

interface Props {
    children : React.ReactNode
}

export interface Uutinen {
    id : number,
    otsikko : string,
    sisalto? : string,
    julkaistu? : Date,
    kuva? : string,
    linkki? : string
}

export const UutinenProvider : React.FC<Props> = (props: Props) : React.ReactElement => {

    const apiKutsuTehty : React.MutableRefObject<boolean> = useRef(false);

    const [apiData, setApidata] = useState<any>({
                                                    uutiset : [],
                                                    dataHaettu : false,
                                                    virhe : "",
                                                    paivitetty : new Date()
                                                });

    const [luetut, setLuetut] = useState<Set<string>>(new Set());

    const apiKutsu = async () : Promise<void> => {

        const yhteys = await fetch("http://localhost:3001/api/uutiset");

        try {

            const vastaanotettuData = await yhteys.json()
          
            setApidata({
                ...apiData,
                uutiset : vastaanotettuData,
                dataHaettu : true,
                paivitetty : new Date()
            });

        } catch (e) {


        }

    }

    useEffect(() => {

        if (!apiKutsuTehty.current) {
            apiKutsu();
        }
        

        return () => {
            apiKutsuTehty.current = true;
        }

    }, []);
    

    return (
        <UutinenContext.Provider value={{ apiData, apiKutsu, luetut, setLuetut }}>
            {props.children}
        </UutinenContext.Provider>
    )

}