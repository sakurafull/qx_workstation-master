<template>
    <el-dialog
            v-model="show"
            title="普通查询要素选择"
            :show-close="false"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :destroy-on-close="true"
    >
        <el-descriptions
                direction="vertical"
                :column="2"
                :size="'default'"
                border
        >
            <el-descriptions-item label="气象站编号">{{ stationCode }}</el-descriptions-item>
            <el-descriptions-item label="所选时间" v-if="selectTime">{{ chooseTime }}</el-descriptions-item>
        </el-descriptions>
        <el-card shadow="hover" style="margin-top: 30px">
            <template #header>
                <el-checkbox
                        v-model="checkAll"
                        :indeterminate="isIndeterminate"
                        @change="handleCheckAllChange"
                        border
                >全选</el-checkbox
                >
            </template>
            <el-checkbox-group
                    v-model="checkedWhich"
                    @change="handleCheckedWhichChange"
                    size="small"
            >
                <el-checkbox-button v-for="(item, index) in which" :key="index" :label="index+1">{{ item }}</el-checkbox-button>
            </el-checkbox-group>
        </el-card>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="getNormalQueryData" >
          普通查询
        </el-button>
      </span>
        </template>
    </el-dialog>
</template>

<script setup>
import {defineProps, ref, watch, defineEmits, watchEffect, computed} from 'vue'
import {useStore} from 'vuex'
import {useRoute} from "vue-router";
import {ElMessage} from "element-plus";
//显示弹窗
const props = defineProps({
    normal: {
        type: Boolean,
        default: false
    }
})
const show = ref(props.normal)
watch(() => props.normal, (newVal) => {
    show.value = newVal
})
const emits = defineEmits(['update:normal', 'disableButton'])

//关闭弹窗
function closeDialog() {
    emits('update:normal', false)
}

//展示气象站编号与日期
const store = useStore()
//气象站编号
const stationCode = computed(() => store.state.queryDataStore.stationCode)
//时间选择器
const selectTime = computed(() => store.state.queryDataStore.selectTime)
//时间段
const startTime = computed(() => store.state.queryDataStore.date[0])
const endTime = computed(() => store.state.queryDataStore.date[1])
//天数
const day = computed(() => store.state.queryDataStore.day)
//某天的某一小时
const clock = computed(() => store.state.queryDataStore.clock)

const chooseTime = ref('')

//动态判断
watchEffect(() => {
    //动态赋值
    if (selectTime.value === 'selectDate') {
        emits('disableButton', true)
        chooseTime.value = startTime.value + ' ' + "至" + ' ' + endTime.value
    } else if (selectTime.value === 'selectDay') {
        emits('disableButton', true)
        chooseTime.value = day.value
    } else if (selectTime.value === 'selectClock') {
        emits('disableButton', true)
        chooseTime.value = clock.value + ':00'
    }
    //是否提供普通查询按钮
    if (stationCode.value !== '' && (chooseTime.value !== 'undefined 至 undefined' && chooseTime.value !== '' && chooseTime.value !== ':00')) {
        emits('disableButton', false)
    } else if (stationCode.value === '' || chooseTime.value === '') {
        emits('disableButton', true)
    }
})
//时间选择器和路由改变时清空其值
watch(selectTime, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        store.dispatch('updateDate', '')
        store.dispatch('updateDay', '')
        store.dispatch('updateClock', '')
    }
})
const route = useRoute()
watch(()=>route.path,()=>{
    store.dispatch('updateDate', '')
    store.dispatch('updateDay', '')
    store.dispatch('updateClock', '')
})

//要素多选器
const checkAll = ref(false)
const isIndeterminate = ref(true)
const checkedWhich = ref([])
const which = ['温度', '湿度', '风速', '风向', '降雨量', '光照', 'PM2.5', 'PM10']

const handleCheckAllChange = (val) => {
    checkedWhich.value = val ? which.map((item, index) => index + 1) : []
    isIndeterminate.value = false
}

const handleCheckedWhichChange = (value) => {
    const checkedCount = value.length
    checkAll.value = checkedCount === which.length
    isIndeterminate.value = checkedCount > 0 && checkedCount < which.length
}

// 初始化checkedWhich的值为全部选中
checkedWhich.value = which.map((item, index) => index+1)

//普通查询事件
const getNormalQueryData = () => {
    const cTime = chooseTime.value
    if (selectTime.value === 'selectClock'){
        const datetime = cTime.split(" ");
        const date = datetime[0];
        const time = datetime[1];
        const newData = {
            station: stationCode.value,
            date: date,
            hour: time,
            which: String(checkedWhich.value)
        };
        if (checkedWhich.value.length !== 0){
            console.log(JSON.stringify(newData))//替换成发送请求
            closeDialog()
        }else {
            ElMessage.error('请至少选择一个普通查询所需的要素')
        }
    }
    if (selectTime.value === 'selectDay'){
        const newData = {
            station: stationCode.value,
            date: cTime,
            which: String(checkedWhich.value)
        };
        if (checkedWhich.value.length !== 0){
            console.log(JSON.stringify(newData))//替换成发送请求
            closeDialog()
        }else {
            ElMessage.error('请至少选择一个普通查询所需的要素')
        }
    }
    if (selectTime.value === 'selectDate'){
        const datetime = cTime.split(" 至 ");
        const start_date = datetime[0];
        const end_date = datetime[1];
        const newData = {
            station: stationCode.value,
            start_date: start_date,
            end_date:end_date,
            which: String(checkedWhich.value)
        };
        if (checkedWhich.value.length !== 0){
            console.log(JSON.stringify(newData))//替换成发送请求
            closeDialog()
        }else {
            ElMessage.error('请至少选择一个普通查询所需的要素')
        }
    }
    //将要素多选器索引纳入状态管理
    store.dispatch('updateCheckedWhich',checkedWhich.value)
}
</script>

<style scoped>

</style>