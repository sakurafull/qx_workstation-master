<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>信创技术下气象数据采集分析系统</span>
                <el-button class="button" text>退出登录</el-button>
            </div>
        </template>
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
        >
            <el-menu-item index="query">数据查询</el-menu-item>
            <el-menu-item index="prepro">数据预处理</el-menu-item>
            <el-menu-item index="statistics">数据统计</el-menu-item>
            <el-menu-item index="prediction">数据预测</el-menu-item>
        </el-menu>
        <router-view/>
    </el-card>

</template>

<script setup>
import {onMounted, ref} from 'vue';
import {useRoute,useRouter} from "vue-router";

const activeIndex = ref("query")//默认Menu为query
const userRouter = useRouter()//使用路由实例

//Menu切换事件
function handleSelect(index){
    activeIndex.value = index;
    switch (index) {
        case 'query':
            userRouter.push('querydata');
            break;
        case 'prepro':
            userRouter.push('preprodata');
            break;
        case 'statistics':
            userRouter.push('statisticsdata');
            break;
        case 'prediction':
            userRouter.push('predictiondata');
            break;
        default:
            break;
    }
}

//组件被挂载完成时，当路由为/，自动切换至数据查询组件
onMounted(()=>{
    if (useRoute().path==='/'){
        userRouter.push('querydata')
    }
})
</script>

<style scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>