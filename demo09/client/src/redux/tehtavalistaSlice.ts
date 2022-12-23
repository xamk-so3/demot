import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const haeTehtavat = createAsyncThunk("tehtavalista/haeTehtavat", async () => {

    const yhteys = await fetch("http://localhost:3001/api/tehtavalista");
    return await yhteys.json();  

});

export const tallennaTehtavat = createAsyncThunk("tehtavalista/tallennaTehtavat", async (payload, {getState}) => {

    const yhteys = await fetch("http://localhost:3001/api/tehtavalista", {
        method : "POST",
        headers  : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(getState())
    });
    return await yhteys.json();

});

export interface Tehtava {
    id : string,
    nimi : string,
    suoritettu : boolean
  }

interface State {
    tehtavat : Tehtava[];
    lisaysDialogi : boolean;
    poistoDialogi : {
        auki : boolean;
        tehtava : Tehtava;
    }
}

const tehtavat : Tehtava[] = [];

export const tehtavalistaSlice = createSlice({
    name : "tehtavalista",
    initialState : { 
        tehtavat : [...tehtavat],
        lisaysDialogi : false,
        poistoDialogi : {
            auki : false,
            tehtava : {}
        }
    } as State,
    reducers : {
        lisaaTehtava : (state : State, action : PayloadAction<Tehtava>) => {
            state.tehtavat = [...state.tehtavat, action.payload]
        },
        poistaTehtava : (state : State, action : PayloadAction<string>) => {
            state.tehtavat = [...state.tehtavat.filter((tehtava : Tehtava) => tehtava.id !== action.payload)]
        },
        vaihdaSuoritus : (state : State, action : PayloadAction<string>) => {

            let idx : number = state.tehtavat.findIndex((tehtava : Tehtava) => tehtava.id === action.payload);

            state.tehtavat[idx].suoritettu = !state.tehtavat[idx].suoritettu;

        },
        avaaLisaysDialogi : (state : State, action : PayloadAction<boolean>) => {
            state.lisaysDialogi = action.payload;
        },
        avaaPoistoDialogi : (state : State, action : PayloadAction<any>) => {
            state.poistoDialogi = action.payload;
        }
    },
    extraReducers : (builder : any) => {
        builder.addCase(haeTehtavat.fulfilled, (state : State, action : PayloadAction<Tehtava[]>) => {
            state.tehtavat = action.payload;
        }).addCase(tallennaTehtavat.fulfilled, (state : State, action : PayloadAction<any>) => {
            console.log("Tallennettu!")
        })
    }
});

export const { lisaaTehtava, poistaTehtava, vaihdaSuoritus, avaaLisaysDialogi, avaaPoistoDialogi } = tehtavalistaSlice.actions;

export default tehtavalistaSlice.reducer;