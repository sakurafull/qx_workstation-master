<template>
    <el-select v-model="stationValue.station" class="m-2" placeholder="选择气象站">
        <el-option
                v-for="item in stationOptions"
                :key="item.station"
                :value="item.station"
                :label="item.station+' : '+item.name"
        ></el-option>
    </el-select>
</template>

<script setup>
import {onMounted, reactive, ref, watch} from 'vue'
import {useStore} from "vuex";



//发送请求，获取指定气象编号
//待完善
onMounted(() => {
    updateStation(stationValue)
    //发送请求
})
const stationOptions = ref([
    {
        station: 'm2-413', name: '一号气象站'
    },
    {
        station: 'm2-414', name: '二号气象站'
    },
])
//定义选项
const stationValue = reactive({
    station: stationOptions.value[0].station,
    name: stationOptions.value[0].name,
})

//切换不同的气象站
//将气象站编号纳入状态管理
const store = useStore()
function updateStationCode(newStationCode){
    store.dispatch('updateStationCode',newStationCode)
}
function updateStation(newVal){
    const newStationCode = newVal.station
    updateStationCode(newStationCode)
}
watch(stationValue, (newVal) => {
    updateStation(newVal)
});

</script>

<style scoped>

</style>