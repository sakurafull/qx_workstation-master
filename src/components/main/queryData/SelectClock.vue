<template>
    <div class="block">
        <el-date-picker
                v-model="selectClock"
                type="datetime"
                placeholder="某日某一小时内的数据"
                format="YYYY-MM-DD HH:mm"
                :disabled-date="disabledDate"
                value-format="YYYY-MM-DD H"
                @change="updateClock"
                :clearable="false"
        />
    </div>
</template>

<script setup>

import {ref} from "vue";
import {useStore} from "vuex";

const selectClock = ref('')

//禁止选择的日期
const disabledDate = (time) => {
    const march26 = new Date("2023-03-26");//可替换成请求中获取的气象站安装日期
    return time.getTime() > Date.now() || time < march26;
};

//将小时纳入状态管理
const store = useStore()
function updateClock(selectClock){
    store.dispatch('updateClock',selectClock)
}
</script>

<style scoped>

</style>