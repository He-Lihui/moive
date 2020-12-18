<template>
    <div>
        <FilmListTopNav :class="fixed ? 'fixed' : ''"></FilmListTopNav>
        <router-view></router-view>
    </div>
</template>

<script>
import FilmListTopNav from '@/components/FilmListTopNav'
export default {
    components:{
        FilmListTopNav
    },
    data(){
        return {
            fixed: false
        }
    },
    mounted() {
        //  监听滚动条的位置，决定是否要吸顶
        window.addEventListener('scroll',(e) => {
            let top = document.documentElement.scrollTop
            if(top>66){
                this.fixed = true
            }else{
                this.fixed = false
            }
        },true)
    }
}
</script>
<style lang="scss" scoped>
.fixed {
    position: fixed;
    top: 0;
    background: #ffffff;
}
</style>