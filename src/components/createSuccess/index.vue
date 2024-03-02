<template>
    <div class="create-success w">
        <img class="success-img" v-if="isSuccess" :src="require('../../assets/images/success.png')" />
        <p class="title" v-if="isTitle">{{ title }}</p>
        <p class="message" v-if="isMessage">{{ message }}</p>

        <div class="flex fjc" v-if="isEdit==false">
            <el-button @click="view_form">查看表单</el-button>
            <el-button type="primary" @click="create_again">再次创建</el-button>
        </div>

        <div class="flex fjc" v-else>
            <el-button type="primary" @click="confirm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: '提交成功'
        },
        message: {
            type: String,
            default: '已提交审核员审核，提交进度及详情请“审批管理-我的申请”界面查看'
        },
        isTitle: {
            type: Boolean,
            default: true
        },
        isMessage: {
            type: Boolean,
            default: true
        },
        isSuccess: {
            type: Boolean,
            default: true
        },
        isEdit: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {

        }
    },
    methods: {
        // 查看表单
        view_form() {
            this.$emit('close-dialog', false)
            this.$router.push({
                path: '/rzauditlist/list'
            })
        },
        // 再次创建
        create_again() {
            this.$emit('create-again')
        },
        /* 确认创建 */
        confirm() {
            this.$emit('confirm')
        },
        /* 取消 */
        cancel() {
            this.$emit('cancel')
        }
    }
}
</script>
<style lang="scss" scoped>
.create-success {
    height: 780px;
    background: #fff;
    box-sizing: border-box;
    display: flex; flex-direction: column; justify-content: center; align-items: center;
}

.success-img {
    width: 70px;
    height: 70px;
    display: block;
    margin-bottom: 20px;
}

.title {
    font-size: 28px;
    color: #1D2129;
    font-weight: 600;
    margin-bottom: 20px;
}

.message {
    font-size: 16px;
    color: #3B4B6C;
    margin-bottom: 20px;
}</style>