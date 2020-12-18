<template>
    <div>
        <FilmList :list="list" :type="type" :key="'film' + list.length"></FilmList>
        <!-- <Loading></Loading> -->
    </div>
</template>

<script>
//  正在热映的请求方法
import { comingSoonUriListData } from '@/api/api.js'
import Loading from '@/components/Loading'
import FilmList from '@/components/FilmList'
export default {
    data() {
        return {
            pageNum : 1,
            list:[],
            type : 2 , // 当前传递的数据为即将上映的数据
        }
    },
    async mounted(){
        let ret = await comingSoonUriListData(this.pageNum)
        this.list = ret.data.data.films
    },
    components :{
        // Loading
        FilmList
    }
}
</script>