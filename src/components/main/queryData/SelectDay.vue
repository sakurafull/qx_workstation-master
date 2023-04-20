<template>
    <div class="block">
        <el-date-picker
                v-model="selectDay"
                type="date"
                placeholder="某一天的数据"
                :disabled-date="disabledDate"
                value-format="YYYY-MM-DD"
                @change="updateDay"
                :clearable="false"
        />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import {useStore} from "vuex";

const selectDay = ref('')//定义日期数据

//禁止选择的日期
const disabledDate = (time) => {
    const march26 = new Date("2023-03-26");//可替换成请求中获取的气象站安装日期
    return time.getTime() > Date.now() || time < march26;
};
//将天数纳入状态管理
const store = useStore()
function updateDay(selectDay){
    store.dispatch('updateDay',selectDay)
}
</script>

<style scoped>

</style>