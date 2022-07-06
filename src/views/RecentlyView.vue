<template>
    <h-panel>
        <template #header>
            <h-from-item label="文件名称:">
                <a-input class="w-224" placeholder="请输入" v-model:value="fileName"/>
            </h-from-item>
            <h-from-item label="文件类型:">
                <a-select class="w-224" placeholder="请选择" :options="fileTypes" v-model:value="fileType"/>
            </h-from-item>
            <h-from-item label="浏览时间:" >
                <a-range-picker class="w-260" show-time :placeholder="rangePlaceholder" v-model:value="range"/>
            </h-from-item>
            <a-button class="m-l-32" @click="resetQuery">重置</a-button>
            <a-button type="primary" class="m-l-12" @click="">查询</a-button>
        </template>
        <h-table :columns="fixedColumns" :data="fixedData" @load="onLoad">
            <template #footer>
                <a-checkbox></a-checkbox>
                <span>
                    <span>已选择</span>
                    <span>1</span>
                    <span>项</span>
                </span>
                <button class="btn">移除记录</button>
                <button class="btn">取消选择</button>
            </template>
        </h-table>
    </h-panel>
</template>
<script setup>
import { ref } from 'vue'
import HPanel from '../components/panel.jsx'
import HFromItem from '../components/form-item.jsx'
import HTable from '../components/table/table.jsx'
import { useRecord } from '../composables/useRecord.js'
import { getRecentlyViewFileListAsync, removeRecentlyViewFileAsync } from '../apis/recentlyView.js'

const rangePlaceholder = ['开始日期','结束日期']

const { fileTypes, fileName, fileType, range, list, selected, resetQuery, removeRecordAsync, getNextPageAsync } = useRecord(getRecentlyViewFileListAsync, removeRecentlyViewFileAsync)

const fixedColumns = ref([{
    title: 'Name',
    key: 'name',
    width: 100,
}, {
    title: 'Description',
    key: 'description',
}]);
const fixedData = ref([]);

for (let i = 0; i < 20; i += 1) {
    fixedData.value.push({
        key: i,
        name: ['Light', 'Bamboo', 'Little'][i % 3],
        description: 'Everything that has a beginning, has an end.',
    });
}

const onLoad = ()=>{
    console.log('loading more')
}
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