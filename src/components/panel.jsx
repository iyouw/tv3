import { defineComponent } from 'vue'
import { createNamespace } from '../utils/create.js'

const [ name, bem ] = createNamespace('panel')

export default defineComponent({
    name,
    setup(_, { slots }){
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
