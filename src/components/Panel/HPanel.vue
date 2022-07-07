<template>
    <div :class="bem()">
        <div :class="bem('header')">
            <slot name="header"></slot>
        </div>
        <div :class="bem('body')">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import { defineComponent } from 'vue';
import { createNamespace } from '../../utils/create.js';
const [name, bem ] = createNamespace('panel');

export default defineComponent({
    name,
    setup(){
        return {
            bem
        };
    }
});

</script>
<style lang="less">
.h{
    &-panel{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;

        &-header{
            padding-left: 30px;
            padding-right:30px;
            height: 80px;
            display: flex;
            flex-direction: row;
            align-items: center;
        }

        &-body{
            flex: 1;
            overflow-y: auto;
            padding-left: 30px;
            padding-right: 30px;
        }
    }
}
</style>