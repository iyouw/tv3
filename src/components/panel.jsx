import { defineComponent } from 'vue'
import { createNamespace } from '../utils/create.js'

const bem = createNamespace('panel')

export default defineComponent({
    setup(props, { slots }){
        return ()=>(
            <div class={bem()}>
                <div class={bem('header')}>
                    {slots.header?.()}
                </div>
                <div class={bem('body')}>
                    {slots.default?.()}
                </div>
            </div>
        )
    }
})
