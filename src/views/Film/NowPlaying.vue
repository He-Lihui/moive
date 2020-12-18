<template>
    <div>
        <FilmList :list="list" :type="type" :key="'film' + list.length"></FilmList>
        <!-- <Loading></Loading> -->
    </div>
</template>

<script>
//  正在热映的请求方法
import { nowPlayingListData } from '@/api/api.js'
import Loading from '@/components/Loading'
import FilmList from '@/components/FilmList'
export default {
    data() {
        return {
            pageNum : 1,
            list:[],
            type : 1 ,// 当前传递的数据为正在热映的数据
        }
    },
    async mounted(){
        let ret = await nowPlayingListData(this.pageNum)
        this.list = ret.data.data.films
    },
    components :{
        // Loading
        FilmList
    }
}
</script>