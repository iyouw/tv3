import { defineComponent, computed, ref } from 'vue'
import { createNamespace } from '../../utils/create.js'
import TableHeader from './table-header.jsx'
import TableBody from './table-body.jsx'
import TableFooter from './table-footer.jsx'

const [ name, bem ] = createNamespace('table')

const props = {
    columns:{
        type: Array,
        required: true
    },
    data:{
        type: Array,
        required: true
    },
    loading:{
        type: Boolean,
        default: false
    },
    finished:{
        type: Boolean,
        default: false
    },
}

export default defineComponent({
    name,
    props,
    emits:['selectChange','load'],
    setup(props,{ slots, emit }){
        const body = ref()
        const onBodyScroll = e =>{
            if(props.finished || props.loading){
                return
            }
            if(body.value.scrollHeight <= (body.value.scrollTop + body.value.offsetHeight)){
                emit('load')
            }
        }
        return () =>(
            <div class={bem()}>
                <div class={bem('header')}>
                    <TableHeader columns={props.columns} />
                </div>
                <div class={bem('body')} ref={body} onScroll={onBodyScroll}>
                    <TableBody columns={props.columns} data = {props.data} />
                </div>
                <div class={bem('footer')}>
                    <TableFooter  slot={slots.footer}/>
                </div>
            </div>
        )
    }
})