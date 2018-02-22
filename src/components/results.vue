<template>
    <div>
        <ul class="result-list">
            <li class="result" v-for="result in data">
                <div v-html="result.text"></div>
            </li>
        </ul>
        <div class="btn-row">
            <button class="back-btn back-btn--arrow-right" @click="additionals=!additionals">Показать варианты дополнительных услуг
                <img class="back-btn__arrow back-btn__arrow--down" :class="additionals?'back-btn__arrow--revert':''" src="../assets/arrow-point-to-right.svg">
            </button>
        </div>
        <transition name="slide-down">
            <div class="additionals question" v-show="additionals">
                <div class="question__text">
                    <h4>Дополнительные услуги:</h4>
                    <ul>
                        <li>1. Раскрутка в социальных сетях</li>
                        <li>2. Email маркетинг (Mailchimp, Klavio)</li>
                        <li>3. SEO</li>
                    </ul>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'results',
        props: ['data'],
        data(){
            return {additionals: false}
        }
    }
</script>

<style lang="scss">
    .result-list {
        max-width: 100%;
        width: 500px;
        margin: 0 auto;
        padding-left: 0;
    }

    .result {
        background-color: #b8e994;
        text-align: center;
        position: relative;
        display: block;
        padding: 20px;
        border-radius: 4px;
        box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.3);
    }

    .result + .result {
        margin-top: 60px;

    }

    .btn-row {
        padding-top: 20px;
        text-align: center;
        margin-bottom:-10px;
    }

    .additionals {
        font-size: 18px;
        transition: max-height 700ms;
        max-height: 300px;
        max-width: 425px;
        overflow: hidden;
        h4 {
            margin-top: 0;
            margin-bottom: 0;
        }
        ul {
            margin-bottom: 0;
        }
    }

    .slide-down-enter, .slide-down-leave-to {
        max-height: 0;
        transition: max-height 400ms;
    }

</style>
