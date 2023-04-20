<template>
    <el-card class="box-card">
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            :ellipsis="false"
            @select="handleSelect"
        >
            <el-menu-item index="login">登录</el-menu-item>
            <el-menu-item index="register">注册</el-menu-item>
        </el-menu>
        <router-view :key="activeIndex"/>
    </el-card>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {useRoute,useRouter} from "vue-router";

const activeIndex = ref("login")//默认Menu为login
const userRouter = useRouter()//使用路由实例

//Menu切换事件
function handleSelect(index){
    activeIndex.value = index
    if (activeIndex.value === 'login'){
        userRouter.push('/user/login')
    }else{
        userRouter.push('/user/register')
    }
}

//组件被挂载完成时，当路由为user，自动切换至登录组件
onMounted(()=>{
    if (useRoute().path==='/user'){
        userRouter.push('/user/login')
    }
})
</script>

<style scoped>

</style>