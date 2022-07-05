<template>
    <h-panel>
        <template #header>
            <h-from-item label="文件名称:">
                <a-input class="w-224" placeholder="请输入" />
            </h-from-item>
            <h-from-item label="文件类型:">
                <a-select class="w-224" placeholder="请选择" />
            </h-from-item>
            <h-from-item label="浏览时间:" >
                <a-range-picker class="w-260" show-time :placeholder="rangePlaceholder" />
            </h-from-item>
            <a-button class="m-l-32" @click="">重置</a-button>
            <a-button type="primary" class="m-l-12" @click="">查询</a-button>
        </template>
        <span>hello from  recently view</span>
    </h-panel>
</template>
<script setup>
import HPanel from '../components/panel.jsx'
import HFromItem from '../components/form-item.jsx'
const rangePlaceholder = ['开始日期','结束日期']
</script>
<style lang="less">
.w-224{
    width: 224px;
}
.w-260{
    width: 260px;
}
.m-l-32{
    margin-left: 32px;
}
.m-l-12{
    margin-left: 12px;
}
</style>