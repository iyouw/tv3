import { defineComponent } from 'vue'
import { createNamespace } from '../utils/create.js'

const [ name, bem ] = createNamespace('form-item')

const props = {
    label:{
        type: String,
        required: true
    }
}

export default defineComponent({
    name,
    props,
    setup(props, { slots }){
        return ()=>(
            <div class={bem()}>
                <label class={bem('label')}>{ props.label }</label>
                {slots.default?.()}
            </div>
        )
    }
})