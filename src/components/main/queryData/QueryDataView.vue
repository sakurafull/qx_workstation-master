<template>
    <el-row :gutter="10" style="margin-top: 30px">
        <el-col :span="6">
            <SelectStations/>
        </el-col>
        <el-col :span="12">
            <el-row :gutter="5">
                <el-col :span="5">
                    <el-select v-model="selectTime" class="m-2" placeholder="Select" @change="updateSelectTime">
                        <el-option
                                v-for="item in selectTimeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                        />
                    </el-select>
                </el-col>
                <el-col :span="10">
                    <SelectDate v-if="selectTime === 'selectDate'"/>
                    <SelectDay v-else-if="selectTime === 'selectDay'"/>
                    <SelectClock v-else-if="selectTime === 'selectClock'"/>
                </el-col>
            </el-row>
        </el-col>
        <el-col :span="3">
            <el-button type="primary" plain @click="normal = true" :disabled="disableButton">普通查询</el-button>
            <NormalQuery :normal="normal" @update:normal="normal = $event" @disable-button="disableButton = $event"/>
        </el-col>
        <el-col :span="3">
            <el-button type="primary" plain>复杂查询</el-button>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="24">
            <el-card style="margin-top: 30px" shadow="hover">
                <ResultQuery v-if="resultShow"/>
                <el-empty
                    :image="require('@/assets/undraw_data_processing_yrrv.png')"
                    :image-size="400"
                    description="暂未查询数据" v-if="emptyShow"/>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup>
import SelectStations from "@/components/main/queryData/SelectStations.vue";
import SelectDate from "@/components/main/queryData/SelectDate.vue";
import SelectDay from "@/components/main/queryData/SelectDay.vue";
import SelectClock from "@/components/main/queryData/SelectClock.vue";
import NormalQuery from "@/components/main/queryData/NormalQuery.vue";
import ResultQuery from "@/components/main/queryData/ResultQuery.vue";
import {computed, onMounted, ref, watch} from 'vue'
import {useStore} from "vuex";

//选择不同时间元素
const selectTimeOptions = [
    {
        value: 'selectDate',
        label: '时间段',
    },
    {
        value: 'selectDay',
        label: '一天',
    },
    {
        value: 'selectClock',
        label: '小时',
    },
]
const selectTime = ref(selectTimeOptions[0].value)//设置默认值

//将时间元素纳入状态管理
const store = useStore()

function updateSelectTime(newVal) {
    store.dispatch('updateSelectTime', newVal)
}

watch(selectTime, (newVal) => {
    updateSelectTime(newVal)//将选择器切换值纳入状态管理

});
onMounted(() => {
    const mSelectTime = selectTime.value
    updateSelectTime(mSelectTime)//将默认值纳入状态管理
})

const normal = ref(false)
const disableButton = ref(false)
const emptyShow = ref(true)
const resultShow = ref(false)

const checkedWhich = computed(()=>store.state.queryDataStore.checkedWhich)
watch(checkedWhich,(newVal)=>{
    if (newVal.length !== 0 ){
        resultShow.value = true
        emptyShow.value = false
    }else {
        resultShow.value = false
        emptyShow.value = true
    }
})

</script>

<style scoped>

</style>