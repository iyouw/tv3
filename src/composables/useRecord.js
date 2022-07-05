import { ref } from 'vue'
const timeFormat = 'yyyy-MM-dd HH:mm:ss'

export function useRecord(listApi,removeApi){
    const fileName = ref('')
    const fileType = ref()
    const range = ref()

    const list = ref([])
    const selected = ref([])

    const pageIndex = ref(1)
    const pageSize = ref(20)

    const getListAsync = async ()=>{
        if(!listApi){
            return
        }
        const page = pageIndex.value
        const size = pageSize.value
        const name = fileName.value
        const type = fileType.value
        const updateStartTime = range.value[0]?.format(timeFormat)
        const updateEndTime = range.value[1]?.format(timeFormat)
        list.value = await listApi(page,size,name,type,updateStartTime,updateEndTime)
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

    return { fileName, fileType, range, list, selected, pageIndex, pageSize, getListAsync, removeRecordAsync }
}