<template>
    <div id="app" class="app">
        <h1>What site are you need?</h1>
        <div class="content">
            <div class="content__scroll">
                <question v-if="data" :data="data" @answer="answerHandler"></question>
                <results v-if="!data" :data="results"></results>
            </div>
        </div>
    </div>
</template>

<script>
    import question from './components/question.vue';
    import results from './components/results.vue';
    import questScript from '../questScript.json';

    export default {
        name: 'app',
        components: {question, results},
        data () {
            return {
                data: questScript.items[questScript.startQuest],
                results: []
            }
        },
        computed: {
            template(){

            }
        },
        methods: {
            answerHandler(next){
                let newItem = questScript.items[next];
                console.log(next, newItem);
                if (newItem) {
                    if (newItem.type === "result") {
                        console.log('res');
                        this.results.push(newItem);
                        newItem = questScript.items[newItem.next]
                    }
                }
                this.data = newItem;
            }
        }
    }
</script>

<style lang="scss">
    html, body {
        margin: 0;
        height: 100vh;
        font-family: 'Open Sans', sans-serif;
        overflow: hidden;
    }

    body {
        /*background-color: #00b894;*/
        background-color: #5958bb;
    }

    .app {
        position: relative;
        height: 100vh;

    }

    h1 {
        margin: 0;
        max-width: 200%;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        color: #3f3e81;
        text-align: center;
        letter-spacing: -3px;
        position: absolute;
        text-transform: uppercase;
        font-size: 27vh;
        line-height: 0.8;
        text-shadow: 1px 2px 0 #7f7fec, -1px -1px 0 #000;
        opacity: 0.5;

        @media (max-width: 800px) {
            font-size: 25vh;
        }
    }

    .content {
        position: absolute;
        width: 100%;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        max-height: 100vh;
        overflow-y: auto;
        padding: 5px;
        box-sizing: border-box;

        @media (max-width: 800px) {
            padding-right:15px;
            padding-left:15px;
        }
    }

    .content__scroll {
        margin-top: 50px;
        margin-bottom: 200px;

        @media (max-height: 800px) {
            margin-top: 30px;
            margin-bottom: 80px;
        }

        @media (max-height: 500px) {
            margin-top: 10px;
            margin-bottom: 10px;
        }
    }

</style>
