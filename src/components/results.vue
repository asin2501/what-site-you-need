<template>
    <ul class="result-list">
        <li class="result" v-for="result in data">
            <div v-html="result.text"></div>
        </li>
    </ul>
</template>

<script>
    export default {
        name: 'results',
        props: ['data']
    }
</script>

<style lang="scss">
    .result-list{
        max-width: 100%;
        width:500px;
        margin:0 auto;
        padding-left:0;
    }
    
    .result{
        background-color: #b8e994;
        text-align: center;
        position: relative;
        display: block;
        /*background-color: #fff;*/
        padding:20px;
        border-radius: 4px;
        box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.3);
    }

    .result+.result{
        margin-top:60px;

    }

</style>
