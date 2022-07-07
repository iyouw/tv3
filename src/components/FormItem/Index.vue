<template>
    <div :class="bem()">
        <label :class="bem('label')">{{ label }}</label>
        <slot></slot>
    </div>
</template>
<script>
import { defineComponent, toRefs } from 'vue';
import { createNamespace } from '../../utils/create.js';
const [name, bem ] = createNamespace('form-item');

export default defineComponent({
    name,
    props:{
        label:{
            type: String,
            required: true
        }
    },
    setup(props){
        return {
            bem,
            ...toRefs(props)
        };
    }
});

</script>
<style lang="less">
.h{
    &-form-item{
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-right: 48px;

        &:last-child{
            margin-right: 0;
        }

        &-label{
            margin-right: 10px;
            font-size: 14px;
        }
    }
}
</style>