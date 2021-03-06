import { ref, onMounted, computed, watchEffect } from 'vue'
import { FileType } from '../enums/fileType'
const timeFormat = 'yyyy-MM-dd HH:mm:ss'

/**
 * list composable
 * @param { Function } listApi   get records by filters 
 * @param { Function } removeApi  remove selected records 
 * @returns { Object }
 */
export function useRecord(listApi,removeApi){
    const fileTypes = FileType.ToOptions()

    const fileName = ref()
    const fileType = ref([])
    const range = ref()

    const list = ref([])
    const selected = ref([])
    const selectedAllFlag = ref(false)

    const pageIndex = ref(1)
    const pageSize = ref(20)

    const loading = ref(false)

    const indeterminate = computed(()=>selected.value.length && selected.value.length < list.value.length)

    const getListAsync = async ()=>{
        if(!listApi){
            return
        }
        const page = pageIndex.value
        const size = pageSize.value
        const name = fileName.value
        const type = fileType.value
        const updateStartTime = range.value?.[0].format(timeFormat)
        const updateEndTime = range.value?.[1].format(timeFormat)
        const data = await listApi(page,size,name,type,updateStartTime,updateEndTime)
        list.value = data
    }
    
    const getNextPageAsync = async ()=>{
        if(!listApi){
            return
        }
        if(loading.value){
            return
        }
        try {
            loading.value = true

            const page = ++pageIndex.value
            const size = pageSize.value
            const type = fileType.value
            const updateStartTime = range.value?.[0].format(timeFormat)
            const updateEndTime = range.value?.[1].format(timeFormat)
            const data = await listApi(page,size,name,type,updateStartTime,updateEndTime)
            list.value = list.value?.concat(data)
        } finally {
            loading.value = false
        }
    }

    const removeRecordAsync = async ()=>{
        if(!removeApi){
            return
        }
        if(!selected.value.length){
            return
        }
        await removeApi(selected.value.map(x=>x.resId))
        list.value = list.value.filter(x=>!selected.value.some(o=>o.resId === x.resId))
        selected.value = []
    }

    const removeSpecRecordAsync = async record => {
        const index = list.value.findIndex(x=>x.resId === record.resId)
        await removeApi([record.resId])
        if(index !== -1){
            list.value.splice(index, 1)
        }
    }

    const queryAsync = async () => {
        if(!fileName.value && !fileType.value.length && !range.value){
            return;
        }
        pageIndex.value = 1
        await getListAsync()
    }

    const resetQuery = ()=>{
        fileName.value = null
        fileType.value = []
        range.value = null
    }

    const selectAll = () => {
        const unSelected = list.value.filter(item=>!selected.value.some(x=>x.resId===item.resId))
        selected.value = selected.value.concat(unSelected)
    }

    const toggleSelectAll = ()=>{
        if(selectedAllFlag.value){
            selectAll()
        } else {
            selected.value = []
        }
    }

    const toggleSpec = v =>{
        const index = selected.value.findIndex(x=>x.resId === v.resId)
        if(index === -1){
            selected.value.push(v)
        } else {
            selected.value.splice(index,1)
        }   
    }

    const isSelected = record =>selected.value.some(x=>x.resId === record.resId)

    const cancelSelected = () => {
        selected.value = []
        selectedAllFlag.value = false
    }

    onMounted(async ()=>{
        await getListAsync()
    })

    watchEffect(()=>{
        if(indeterminate.value){
            selectedAllFlag.value = false
        }
    })

    return { 
        fileTypes, 
        fileName, 
        fileType, 
        range, 
        list, 
        selected, 
        pageIndex, 
        pageSize,
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
    }
}