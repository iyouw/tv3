import { defineComponent } from "vue"
import { createNamespace } from "../../utils/create"

const [ name, bem ] = createNamespace('table-header')

const props = {
    columns:{
        type: Array,
        required: true
    }
}

export default defineComponent({
    name,
    props,
    setup(props){
        const getColWidth = column=>{
            let width = ''
            if(column.width){
                width = column.width
            }
            return width
        }
        const renderColGroup = () => (
            <colgroup>
                {props.columns.map(x=><col width={getColWidth(x)}></col>)}
            </colgroup>
        )
        
        const renderHeader = () => (
            <thead>
                <tr>
                    {renderTh()}
                </tr>
            </thead>
        )

        const renderTh = ()=>{
            return props.columns.map(x=> 
                <th class={bem('table-th')}>
                    <div class={bem('table-th-cell')}>
                        {renderThCell(x)}
                    </div>
                </th>
            )
        }

        const renderThCell = column => {
            if(column.type == 'selection'){
                return <a-checkbox />
            } else {
                return <span>{column.title}</span>
            }
        }

        return () => (
            <table class={bem('table')} cellspacing="0" cellpadding="0" border="0">
                {renderColGroup()}
                {renderHeader()}
            </table>
        )
    }
})