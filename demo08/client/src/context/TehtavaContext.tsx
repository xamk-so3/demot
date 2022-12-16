import React, { createContext, useEffect, useRef, useState } from 'react';

export const TehtavaContext : React.Context<any> = createContext(undefined);

export interface Tehtava {
    id : string,
    nimi : string,
    suoritettu : boolean
  }
  

interface Props {
    children : React.ReactNode;
}

export const TehtavaProvider : React.FC<Props> = (props : Props) : React.ReactElement => {

    const haettu : React.MutableRefObject<boolean> = useRef(false);
    
    const [lisaysDialogi, setLisaysDialogi] = useState<boolean>(false);
    const [poistoDialogi, setPoistoDialogi] = useState<any>({
        tehtava : {},
        auki : false
      });

      
    const [tehtavat, setTehtavat] = useState<Tehtava[]>([]);

    const lisaaTehtava = (uusiTehtava: Tehtava) : void => {

        tallennaTehtavat([...tehtavat, uusiTehtava]); 

    }

    const vaihdaSuoritus = (id : string) : void => {

        let vaihdettava : Tehtava = {...tehtavat.find((tehtava : Tehtava) => tehtava.id === id)!} 

        let vaihdettavaIdx : number = tehtavat.findIndex((tehtava : Tehtava) => tehtava.id === id);

        let apuTehtavat : Tehtava[] = [...tehtavat];

        apuTehtavat[vaihdettavaIdx].suoritettu = !vaihdettava.suoritettu;

        tallennaTehtavat([...apuTehtavat]);

    }
    
    const poistaTehtava = (id: string) : void => {

        tallennaTehtavat([...tehtavat.filter((tehtava : Tehtava) => { return tehtava.id !== id })]); 

    }

    const tallennaTehtavat = async (tehtavat : Tehtava[]) => {

        const yhteys = await fetch("http://localhost:3001/api/tehtavalista", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({tehtavat})   
        });

        setTehtavat([...tehtavat]);

    }

    const haeTehtavat = async () => {

        const yhteys = await fetch("http://localhost:3001/api/tehtavalista");
        const data = await yhteys.json();  
        setTehtavat(data);
    
      };
    
      useEffect(() => {
    
        if (!haettu.current) {
          haeTehtavat();
        }
            
        return () => { haettu.current = true }
      }, []);
    
    return (
        <TehtavaContext.Provider value={{   tehtavat, 
                                            setTehtavat, 
                                            lisaysDialogi, 
                                            setLisaysDialogi,
                                            poistoDialogi, 
                                            setPoistoDialogi,
                                            lisaaTehtava,
                                            poistaTehtava,
                                            vaihdaSuoritus
                                        }}>
            {props.children}
        </TehtavaContext.Provider>
    );
}