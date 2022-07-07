<template>
    <h-panel>
        <template #header>
            <h-from-item label="文件名称:">
                <a-input class="w-224" placeholder="请输入" v-model:value="fileName"/>
            </h-from-item>
            <h-from-item label="文件类型:">
                <a-select mode="multiple" :max-tag-count="2" class="w-224" placeholder="请选择" :options="fileTypes" v-model:value="fileType"/>
            </h-from-item>
            <h-from-item label="浏览时间:" >
                <a-range-picker class="w-260" show-time :placeholder="rangePlaceholder" v-model:value="range"/>
            </h-from-item>
            <a-button class="m-l-32" @click="resetQuery">重置</a-button>
            <a-button type="primary" class="m-l-12" @click="queryAsync">查询</a-button>
        </template>
        <div class="table">
            <div class="table-header">
                <table class="table-header-table">
                    <colgroup>
                        <col width="32" />
                        <col />
                        <col />
                        <col />
                        <col />
                        <col />
                    </colgroup>
                    <thead class="table-header-table-thead">
                        <tr>
                            <th class="selection-cell">
                                <a-checkbox />
                            </th>
                            <th>文件名</th>
                            <th>文件类型</th>
                            <th>文件位置</th>
                            <th>浏览时间</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div class="table-body">
                <table class="table-body-table">
                    <colgroup>
                        <col width="32" />
                        <col />
                        <col />
                        <col />
                        <col />
                        <col />
                    </colgroup>
                    <tbody class="table-body-table-tbody">
                        <tr  v-for="(v,i) in list" :Key="i" :class="['table-body-table-tbody-row',{selected: selected.some(x=>x.resId == v.resId)}]">
                            <td class="selection-cell">
                                <a-checkbox />
                            </td>
                            <td>{{v.name}}</td>
                            <td>{{v.type}}</td>
                            <td>{{v.path}}</td>
                            <td>{{v.addTime}}</td>
                            <td>
                                <a-button type="text" @click="">移除记录</a-button>
                                <a-dropdown>
                                    <a class="ant-dropdown-link" @click.prevent>
                                        更多
                                        <DownOutlined />
                                    </a>
                                </a-dropdown>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="table-footer">
                <a-checkbox class="m-r-8" />
                <span>
                    <span>已选择</span>
                    <span>1</span>
                    <span>项</span>
                </span>
                <a-button type="text" @click="removeRecordAsync">移除记录</a-button>
                <a-button type="text">取消选择</a-button>
            </div>
        </div>
    </h-panel>
</template>
<script setup>
import { ref } from 'vue'
import HPanel from '../components/Panel/Index.vue'
import HFromItem from '../components/FormItem/Index.vue'
import { useRecord } from '../composables/useRecord.js'
import { getRecentlyViewFileListAsync, removeRecentlyViewFileAsync } from '../apis/recentlyView.js'

const rangePlaceholder = ['开始日期','结束日期']

const { fileTypes, fileName, fileType, range, list, selected, resetQuery, queryAsync, removeRecordAsync, getNextPageAsync } = useRecord(getRecentlyViewFileListAsync, removeRecentlyViewFileAsync)

for (let i = 0; i < 100; i += 1) {
    list.value.push({
        redId: i,
        name: `新闻联播${i}.mp4`,
        type: 3,
        path: '个人资产 > 我的文件 > 文件夹1',
        addTime:'2022-06-12 10:33:15'
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

.m-r-8{
    margin-right: 8px;
}

.table{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: rgba(255,255,255,1);

    box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.1000);    
    border-radius: 8px;
    overflow: hidden;

    &-header{
        &-table{
            width: 100%;
            font-size: 14px;
            font-weight: 500;
            &-thead {
                tr{
                    height: 54px;
                    background-color: rgba(0,0,0,0.0200);

                    th{
                        text-align: left;
                        padding-left: 20px;
                        padding-right: 20px;

                        &.selection-cell{
                            padding-left: 24px;
                            padding-right: 0;
                        }
                    }
                }
            }
        }
    }

    &-body{
        flex: 1;
        overflow-y: auto;
        background-color:rgba(255,255,255, 1);

        &-table{
            width: 100%;
            font-size: 14px;
            font-weight: 400;

            &-tbody{
                tr{
                    height: 64px;
                    border-bottom: 1px solid rgba(0,0,0,0.06);

                    &:hover{
                       background-color: rgba(0,0,0,0.0200);
                    }

                    td{
                        text-align: left;
                        padding-left: 20px;
                        padding-right: 20px;

                        &.selection-cell{
                            padding-left: 24px;
                            padding-right: 0;
                        }
                    }
                }
            }
        }
    }

    &-footer{
        height: 56px;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-left: 24px;
        padding-right: 24px;

        border-top: 1px solid rgba(0,0,0,0.06);
    }
}
</style>