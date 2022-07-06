import { defineComponent } from "vue"
import { createNamespace } from "../../utils/create"

const [ name, bem ] = createNamespace('table-footer')

const props = {
    slot:{
        type: Function
    }
}

export default defineComponent({
    name,
    props,
    setup(props){
        return props.slot
    }
})