import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export const haeTehtavat = createAsyncThunk("tehtavalista/haeTehtavat", async () => {

    const yhteys = await fetch("http://localhost:3001/api/tehtavalista");
    return await yhteys.json();

});

export const tallennaTehtavat = createAsyncThunk("tehtavalista/tallennaTehtavat", async (payload, {getState}) => {

    console.log(getState());

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

const tehtavat : Tehtava[] = [];

export const tehtavalistaSlice = createSlice({
    name : "tehtavalista",
    initialState : { tehtavat : [...tehtavat] },
    reducers : {
        lisaaTehtava : (state, action: PayloadAction<Tehtava>) => {
            state.tehtavat = [...state.tehtavat, action.payload];
        },
        vaihdaSuoritettu : (state, action: PayloadAction<string>) => {

            let vaihdettava : Tehtava = {...state.tehtavat.find((tehtava : Tehtava) => tehtava.id === action.payload)!};

            state.tehtavat.splice(state.tehtavat.findIndex((tehtava : Tehtava) => tehtava.id === action.payload),
                                  1, 
                                  {...vaihdettava, suoritettu : !vaihdettava.suoritettu});

        },
        poistaTehtava : (state, action: PayloadAction<string>) => {

           state.tehtavat.splice(state.tehtavat.findIndex((tehtava : Tehtava) => tehtava.id === action.payload), 1);

        }
    },
    extraReducers : (builder) => {
        builder.addCase(haeTehtavat.fulfilled, (state, action) => {
            state.tehtavat = action.payload;
        }).addCase(tallennaTehtavat.fulfilled, () => {
            console.log("Tallennettu!");
        });
    }
});

export const { lisaaTehtava, vaihdaSuoritettu, poistaTehtava } = tehtavalistaSlice.actions;

export default tehtavalistaSlice.reducer;