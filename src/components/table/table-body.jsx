import { defineComponent } from "vue"
import { createNamespace } from "../../utils/create"

const [ name, bem ] = createNamespace('table-body')

const props = {
    data:{
        type: Array,
        required: true
    },
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
        
        const renderBody = () => (
            <tbody>
                {renderTr()}
            </tbody>
        )

        const renderTr = () => {
            return props.data.map(row=>(
                <tr class={bem('table-tr')}>
                    {renderTd(row)}
                </tr>
            ))
        }

        const renderTd = row =>{
            return props.columns.map(col =>(
                <td class={bem('table-tr-td')}>
                    <div class={bem('table-tr-td-cell')}>
                        {renderTdCell(row,col)}
                    </div>
                </td>
            ))
        }

        const renderTdCell = (row, col) => {
            if(col.type == 'selection') {
                return <a-checkbox />
            }
            return <span>{row[col.key]}</span>
        }

        return ()=>(
            <table class={bem('table')}>
                {renderColGroup()}
                {renderBody()}
            </table>
        )
    }
})