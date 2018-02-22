<template>
    <div class="question">
        <div class="question__inner">
            <div class="question__text" v-html="data.text"></div>
            <div class="question__buttons">
                <button class="answ-btn" v-for="answer in data.answers" @click="answerHandler(answer.next)">
                    {{ answer.text }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'question',
        props: ['data'],
        methods: {
            answerHandler(next){
                this.$emit('answer', next)
            }
        }
    }
</script>

<style lang="scss">
    .question {
        max-width: 100%;
        width: 700px;
        box-sizing: border-box;
        font-size: 22px;
        margin: 0 auto;
    }

    .question__text {
        text-align: center;
        margin-bottom: 15px;
        padding: 30px;
        box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.3);
        border-radius: 4px;
        background-color: #f7f1e3;
        li{
            display: block;
        }
        ul{
            padding-left:0;
        }
    }

    .question__buttons {
        display: flex;

    }

    .answ-btn {
        outline: none;
        cursor: pointer;
        flex-basis: 0;
        flex-grow: 1;
        flex-shrink: 1;
        -webkit-appearance: none;
        -moz-appearance: none;
        border: none;
        padding: 15px 20px;
        box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.3);
        /*background-color: #2c3e50;*/
        /*background-color: #3498db;*/
        /*background-color: #33d9b2;*/
        background-color: #A3CB38;

        /*color: #fff;*/
        font-size: 18px;

        transition: background-color 300ms, transform 300ms;
        border-radius:4px;

        & + .answ-btn {
            margin-left: 15px;
        }


        &:hover{
            transform: rotateZ(-2deg)
        ;
            background-color: darken(#A3CB38, 5%);
        }
    }
</style>
