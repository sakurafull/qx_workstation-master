<template>
    <div class="demo-date-picker">
        <div class="block">
            <el-date-picker
                    v-model="date"
                    type="daterange"
                    range-separator="To"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :disabled-date="disabledDate"
                    value-format="YYYY-MM-DD"
                    @change="updateDate"
                    :clearable="false"
            />
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import {useStore} from "vuex";

const date = ref('')//定义日期获取值

//禁止选择的日期
const disabledDate = (time) => {
    const march26 = new Date("2023-03-26");//可替换成请求中获取的气象站安装日期
    return time.getTime() > Date.now() || time < march26;
};
//将时间段纳入状态管理
const store = useStore()
function updateDate(date){
    store.dispatch('updateDate',date)
}

</script>

<style scoped>

</style>