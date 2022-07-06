import { ref, onMounted } from 'vue'
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
    const fileType = ref()
    const range = ref()

    const list = ref([])
    const selected = ref([])

    const pageIndex = ref(1)
    const pageSize = ref(20)

    const resetQuery = ()=>{
        fileName.value = null
        fileType.value = null
        range.value = null
    }

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
        list.value = await listApi(page,size,name,type,updateStartTime,updateEndTime)
    }
    
    const getNextPageAsync = async ()=>{
        if(!listApi){
            return
        }
        const page = ++pageIndex.value
        const size = pageSize.value
        const type = fileType.value
        const updateStartTime = range?.value[0]?.format(timeFormat)
        const updateEndTime = range?.value[1]?.format(timeFormat)
        const data = await listApi(page,size,name,type,updateStartTime,updateEndTime)
        list.value = list.value.concat(data) 
    }

    const removeRecordAsync = async ()=>{
        if(!removeApi){
            return
        }
        if(!selected.value.length){
            return
        }
        await removeApi(selected.value.map(x=>x.resId))
        await getListAsync()
    }

    const queryAsync = async () => {
        pageIndex.value = 1
        await getListAsync()
    }

    onMounted(async ()=>{
        await getListAsync()
    })

    return { fileTypes, fileName, fileType, range, list, selected, pageIndex, pageSize, resetQuery, queryAsync, removeRecordAsync, getNextPageAsync }
}