import { defineComponent } from "vue"
import { createNamespace } from "../../utils/create"

const [ name, bem ] = createNamespace('table-cell')

export default defineComponent({
    name,
    setup(){
        return ()=>(
            <div class={bem()}></div>
        )
    }
})