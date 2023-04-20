<template>
    <div class="register">
        <el-form :model="registerForm" :rules="registerRules" label-width="80px">
            <el-form-item label="用户名" prop="name">
                <el-input v-model="registerForm.name" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="registerForm.password" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import {reactive} from 'vue';

//表单数据对象
const registerForm = reactive({
    name: '',
    password: ''
});

//注册验证规则，失去焦点时的非空验证
//待完善
const registerRules = reactive({
    name: [{required: true, message: '请输入用户名', trigger: 'blur'}],
    password: [{required: true, message: '请输入密码', trigger: 'blur'}]
});

//定义提交表单事件
function submitForm() {
    //数据获取测试
    console.log(registerForm)
    console.log(registerForm.name)
    console.log(registerForm.password)

    //提交时判断表单是否有空字段
    //待完善

    //发起请求

}
</script>

<style scoped>
.register{
    margin-top: 50px;
}
</style>