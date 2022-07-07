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
            <div class="table-spinner" v-show="loading">
                <a-spin size="large" />
            </div>
            <div class="table-header">
                <div class="selection">
                    <a-checkbox v-model:checked="selectedAllFlag" @change="toggleSelectAll" :indeterminate="indeterminate"></a-checkbox>
                </div>
                <div class="table-header-cell f-1">文件名</div>
                <div class="table-header-cell f-1">文件类型</div>
                <div class="table-header-cell f-1">文件位置</div>
                <div class="table-header-cell f-1">收藏时间</div>
                <div class="table-header-cell f-1">操作</div>
                <div :style="style"></div>
            </div>
            <div class="table-body" ref="tableBody"  v-infinite-scroll="getNextPageAsync" :infinite-scroll-disabled="loading" infinite-scroll-distance="20">
                <div class="table-body-row" :class="{'table-body-row--selected':isSelected(v)}" v-for="(v,i) in list" :key="i">
                    <div class="selection">
                        <a-checkbox :checked="isSelected(v)" @click="()=>toggleSpec(v)"></a-checkbox>
                    </div>
                    <div class="table-body-row-cell f-1 field">{{v.name}}</div>
                    <div class="table-body-row-cell f-1">{{FileType.GetName(v.type)}}</div>
                    <div class="table-body-row-cell f-1">{{v.path}}</div>
                    <div class="table-body-row-cell f-1">{{v.addTime}}</div>
                    <div class="table-body-row-cell f-1">
                        <span class="action m-r-16" @click="()=>removeSpecRecordAsync(v)">取消收藏</span>
                        <a-dropdown>
                            <a class="ant-dropdown-link" @click.prevent>
                                更多
                                <DownOutlined />
                            </a>
                        </a-dropdown>
                    </div>
                </div>
            </div>
            <div class="table-footer">
                <a-checkbox v-model:checked="selectedAllFlag" @change="toggleSelectAll" :indeterminate="indeterminate" class="m-r-8" />
                <span class="board-group">
                    <span>已选择</span>
                    <span class="m-l-5 m-r-5">{{selected.length}}</span>
                    <span>项</span>
                </span>
                <span class="action m-l-16" @click="removeRecordAsync">取消收藏</span>
                <span class="action m-l-16" @click="cancelSelected">取消选择</span>
            </div>
        </div>
    </h-panel>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { DownOutlined } from '@ant-design/icons-vue'
import HPanel from '../components/Panel/Index.vue'
import HFromItem from '../components/FormItem/Index.vue'
import { FileType } from '../enums/fileType'
import { useRecord } from '../composables/useRecord.js'
import { getMyFavoriteFileListAsync, removeMyFavoriteFileAsync } from '../apis/myFavorites.js'

const rangePlaceholder = ['开始日期','结束日期']

const style = ref({})
const tableBody = ref()

const { 
    fileTypes, 
    fileName, 
    fileType, 
    range, 
    list, 
    selected,
    indeterminate, 
    loading, 
    resetQuery, 
    queryAsync, 
    removeRecordAsync,
    removeSpecRecordAsync, 
    getNextPageAsync,
    selectedAllFlag, 
    toggleSelectAll, 
    toggleSpec,
    isSelected,
    cancelSelected 
} = useRecord(getMyFavoriteFileListAsync, removeMyFavoriteFileAsync)

for (let i = 0; i < 20; i += 1) {
    list.value.push({
        resId: i,
        name: `会议室设计图${i}.jpg`,
        type: 2,
        path: '个人资产 > 我的文件 > 文件夹1',
        addTime:'2022-06-12 10:33:15'
    });
}

onMounted(()=>{
    const width = tableBody.value.offsetWidth - tableBody.value.clientWidth
    style.value.width = `${width}px`
})

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

.m-l-16{
    margin-left: 16px;
}

.m-l-12{
    margin-left: 12px;
}
.m-l-5{
    margin-left: 5px;
}

.m-r-5{
    margin-right: 5px;
}

.m-r-8{
    margin-right: 8px;
}

.m-r-16{
    margin-right: 16px;
}

.f-1{
    flex:1
}

.field{
    cursor: pointer;
    user-select: none;

    &:hover{
        color: @primary-color;
    }
}

.board-group{
    width: 100px;
    border-right: 1px solid rgba(0,0,0,0.06);
}

.action{
    cursor: pointer;
    user-select: none;

    &--warning{
        color: #E4244E;
    }
}

.table{
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    background-color: rgba(255,255,255,1);

    box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.1000);    
    border-radius: 8px;
    overflow: hidden;

    .selection{
        padding-left: 24px;
        padding-right: 16px;
    }

    &-spinner{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: rgba(255,255,255,0.5);
    }

    &-header{
        width: 100%;
        height: 54px;
        background-color: rgba(0,0,0,0.0200);
        font-size: 14px;

        display: flex;
        flex-direction: row;
        align-items: center;

        &-cell{
            font-weight: bolder;
            padding-left: 16px;
            padding-right: 16px;
        }
    }

    &-body{
        flex: 1;
        overflow-y: auto;
        background-color:rgba(255,255,255, 1);

        &-row{
            width: 100%;
            height:64px;
            display: flex;
            flex-direction: row;
            align-items: center;
            border-bottom: 1px solid rgba(0,0,0,0.06);

            font-size: 14px;

            &:last-child{
                border-bottom: none;
            }

            &--selected,
            &:hover{
                background-color: rgba(0,0,0,0.0200);
            }

            &-cell{
                padding-left: 16px;
                padding-right: 16px;
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