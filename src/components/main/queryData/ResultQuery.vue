<template>
    <el-table :data="tableData" height="350" style="width: 100%" stripe border>
        <el-table-column min-width="100"
                         v-for="(item, index) in dataColumns"
                         :key="index"
                         :prop="item.prop"
                         :label="item.label"/>
    </el-table>
</template>

<script setup>

import {computed, reactive, watch} from "vue";
import {useStore} from "vuex";

//响应式表头
const which = ['温度', '湿度', '风速', '风向', '降雨量', '光照', 'PM2.5', 'PM10']
const datawhich = ['temperature', 'humidity', 'speed', 'direction', 'rain', 'sunlight', 'pm25', 'pm10']
console.log(which)
const store = useStore()
const checkedWhich = computed(() => store.state.queryDataStore.checkedWhich)
console.log(checkedWhich.value)
const dataColumns = computed(() => {
    const columns = []
    for (let i = 0; i < datawhich.length; i++) {
        if (checkedWhich.value.includes(i + 1)) {
            columns.push({
                prop: datawhich[i],
                label: which[i]
            })
        }
    }
    if (checkedWhich.value.length !== 0) {
        columns.push({prop: 'time', label: '采集时间'})
    }
    return columns
})
//切换时间选择器时清空数据
const selectTime = computed(()=>store.state.queryDataStore.selectTime)
watch(selectTime,(newVal,oldVal)=>{
    if ( newVal !== oldVal){
        store.dispatch('updateCheckedWhich', [])
    }
})

const tableData = reactive([
    {
        temperature: 20,
        humidity: 70,
        speed: 10,
        direction: '东风',
        rain: 0,
        sunlight: 1000,
        pm25: 50,
        pm10: 100,
        time: '2022-04-01'
    },
    {
        temperature: 22,
        humidity: 65,
        speed: 15,
        direction: '南风',
        rain: 5,
        sunlight: 800,
        pm25: 60,
        pm10: 120,
        time: '2022-04-01'
    },
    {
        temperature: 25,
        humidity: 60,
        speed: 20,
        direction: '西风',
        rain: 10,
        sunlight: 500,
        pm25: 70,
        pm10: 140,
        time: '2022-04-01'
    },
])
</script>

<style scoped>

</style>