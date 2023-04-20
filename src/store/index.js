import { createStore }from 'vuex';
import queryDataStore from "@/store/modules/queryDataStore";

const store = createStore({
    modules:{
        queryDataStore
    }
})

export default store