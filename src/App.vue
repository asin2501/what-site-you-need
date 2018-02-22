<template>
    <div id="app" class="app">
        <h1>What site do you need?</h1>
        <div class="content">
            <div class="content__scroll">
                <question v-if="data" :data="data" @answer="answerHandler" ></question>
                <results v-if="!data" :data="results"></results>
            </div>
        </div>
        <div class="footer" v-if="!!history.length">
            <button class="back-btn" @click="back"><img class="back-btn__arrow" src="./assets/arrow-point-to-right.svg"> Ask me again (back to previous question)</button>
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
                results: [],
                history: []
            }
        },
        computed: {
            template(){

            }
        },
        methods: {
            back(){
                let lastID = this.history.pop();
                this.data = questScript.items[lastID];

                 this.removeExternalResults();
            },
            removeExternalResults(){
                let removedResultsIDs = [];
                this.data.answers.forEach((item)=>{
                    if(questScript.items[item.next] && questScript.items[item.next].type === "result"){
                        removedResultsIDs.push(questScript.items[item.next].id);
                    }
                });

                this.results = this.results.filter((item)=>{
                    return !removedResultsIDs.includes(item.id);
                })
            },
            answerHandler(next){
                let newItem = questScript.items[next];
                if (newItem) {
                    if (newItem.type === "result") {
                        this.results.push(newItem);
                        newItem = questScript.items[newItem.next]
                    }
                }
                this.history.push(this.data.id);

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
            padding-right: 15px;
            padding-left: 15px;
        }
    }

    .content__scroll {
        margin-top: 50px;
        margin-bottom: 200px;
        padding-bottom:10px;

        @media (max-height: 800px) {
            margin-top: 30px;
            margin-bottom: 80px;
        }

        @media (max-height: 500px) {
            margin-top: 10px;
            margin-bottom: 10px;
        }
    }

    .footer{
        position: fixed;
        left:15px;
        right:15px;
        bottom:20px;
        z-index:1;
    }

    .back-btn {
        position: relative;
        padding: 15px 20px;
        padding-left:40px;
        box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.3);
        background-color: #ffce38;
        outline: none;

        &:hover{
            background-color: darken(#ffce38, 15%);
        }

        font-size: 18px;
        transition: background-color 300ms, transform 300ms;
        border-radius: 4px;
        border: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        cursor: pointer;
    }

    .back-btn--arrow-right{
        padding-right:50px;
        padding-left:20px;

        .back-btn__arrow{
            left:auto;
            right:20px;
        }
    }

    .back-btn__arrow{
        position: absolute;
        left:10px;
        top: 50%;
        margin-top:-8px;
        transform: rotateZ(-180deg);
        max-width: 16px;
        transition: transform 400ms;
    }

    .back-btn__arrow--down{
        transform: rotateZ(90deg);
    }

    .back-btn__arrow--revert{
        transform: rotateZ(270deg);
    }

    /*.show-btn{*/
        /*padding: 15px 20px;*/
        /*box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.3);*/
        /*background-color: #ffce38;*/

        /*&:hover{*/
            /*background-color: darken(#ffce38, 15%);*/
        /*}*/

        /*font-size: 18px;*/
        /*transition: background-color 300ms, transform 300ms;*/
        /*border-radius: 4px;*/
        /*border: none;*/
        /*-webkit-appearance: none;*/
        /*-moz-appearance: none;*/
        /*cursor: pointer;*/
    /*}*/

</style>
