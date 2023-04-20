<template> 
<div class="query-data"> 
    <el-row :gutter="10" style="margin-top: 30px"> 
        <el-col :span="6"> <SelectStations /> </el-col> 
        <el-col :span="12"> 
            <el-row :gutter="5"> 
            <el-col :span="5"> 
                <el-select v-model="selectTime" class="m-2" placeholder="Select" @change="updateSelectTime"> 
                <el-option v-for="item in selectTimeOptions" :key="item.value" :label="item.label" :value="item.value" /> 
                </el-select> 
            </el-col>
            <el-col :span="10"> 
                <component :is="selectedComponent" /> 
            </el-col> 
            </el-row> 
        </el-col>
    </el-row> 
        <el-row> 
            <el-col :span="24"> 
                <el-card style="margin-top: 30px" shadow="hover"> <component :is="resultComponent" /> </el-card> 
            </el-col> 
        </el-row> 
</div> 
</template> 

<script> 
import SelectStations from "@/components/main/queryData/SelectStations.vue"; 
import SelectDate from "@/components/main/queryData/SelectDate.vue"; 
import SelectDay from "@/components/main/queryData/SelectDay.vue"; 
import SelectClock from "@/components/main/queryData/SelectClock.vue"; 
import ResultQuery from "@/components/main/queryData/ResultQuery.vue"; 
import { computed, ref } from "vue"; 
import { useStore } from "vuex"; 

export default { 
    components: { SelectStations, SelectDate, SelectDay, SelectClock, ResultQuery, }, 
    setup() { const store = useStore(); 
    const selectTimeOptions = [
        { value: "selectDate", label: "时间段", }, 
        { value: "selectDay", label: "一天", }, 
        { value: "selectClock", label: "小时", }, 
        ]; 
        const selectTime = ref(selectTimeOptions[0].value); 
        const selectedComponent = computed(() => { switch (selectTime.value) { 
            case "selectDate": return SelectDate; 
            case "selectDay": return SelectDay; 
            case "selectClock": return SelectClock; 
            default: return null; } 
            }); 
            const resultComponent = computed(() => { 
                const checkedWhich = store.state.queryDataStore.checkedWhich; 
                if (checkedWhich.length !== 0) { return ResultQuery; 
                } else { 
                    return { template: ` <el-empty :image="require('@/assets/undraw_data_processing_yrrv.png')" :image-size="400" description="暂未查询数据" /> `, }; 
                    } 
                    }); 
                    return { selectTimeOptions, selectTime, selectedComponent, resultComponent, }; 
                    }, }; 
                    </script>

                     <style scoped> 
                    </style>