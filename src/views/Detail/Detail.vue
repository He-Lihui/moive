<template>
    <div class="detail">
        <div class="img">
            <img v-lazy="film.poster" />
        </div>
        <div class="detail-wrapper">
            <div class="name-list"> <span class="file-name">{{film.name}}</span>
                 <span class="type">{{film.filmType.name}}</span>
                 <span class="grade"> {{film.grade}}</span>
            </div>
            <div class="text">{{film.category}}</div>
            <div class="text">{{film.premiereAt | parsePremiereAt}}上映</div>
            <div class="text">{{film.nation}} | {{film.runtime}}分钟</div>
            <div class="text">
                {{film.synopsis}}
            </div>
        </div>
        <div>
            <Swiper :key="'actors_' + film.actors.length">
                <div  v-for="(item,index) in film.actors" :key="index">
                    <img :src="item.avatarAddress" alt="">
                </div>
            </Swiper>
        </div>
    </div>
</template>

<script>
import {movieDetailData} from "@/api/api"
import moment from 'moment'
import Swiper from '@/components/Swiper'
export default {
    data(){
        return {
            film:{}
        }
    },
    async mounted(){
        let ret = await movieDetailData(this.$route.params.filmId)
        this.film = ret.data.data.film
    },
    filters :{
        parsePremiereAt:function(value){
            return moment(value*1000).format('YYYY-MM-DD')
        }
    },
    components :{
        Swiper
    }
}
</script>

<style lang="scss" scoped>
.detail {
    .img {
        width: 100%;
        height: 260px;

        img {
            width: 100%;
            height: 100%;
        }
    }
    .detail-wrapper{
        padding: 16px 20px;

        .name-list{
            .file-name{
                 color: #191a1b;
                 font-size: 18px;
                 height: 24px;
                 line-height: 24px;
                 margin-right: 7px;
            }
            .type{
                 font-size: 9px;
                 color: #fff;
                 background-color: #d2d6dc;
                 height: 14px;
                 line-height: 14px;
                 padding: 0 2px;
                 border-radius: 2px;
                 display: inline-block;
            }
            .grade{
                  text-align: right;
                 color: #ffb232;
            }
        }
        .text{
             font-size: 13px;
             color: #797d82;
             margin-top: 4px;
        }
    }
}
</style>
