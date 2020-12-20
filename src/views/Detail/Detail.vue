<template>
    <div class="detail">
        <div class="img">
            <img v-lazy="film.poster"/>
        </div>
        <div class="detail-wrapper">
            <div class="name-list"> <span class="film-name">{{film.name}}</span>
                 <!-- <span class="type">{{film.item.name}}</span> -->
                 <span class="grade"> {{film.grade}} 分</span>
            </div>
            <div class="text">{{film.category}}</div>
            <div class="text">{{film.premiereAt | parsePremiereAt}}上映</div>
            <div class="text">{{film.nation}} | {{film.runtime}}分钟</div>
            <div class="text">
                {{film.synopsis}}
            </div>
        </div>
        <div class="pic-area">
            <div class="title-bar"><span>演职人员</span></div>
            <Swiper :key="'actors_' + film.actors.length" class="pic-list">
                <div class="swiper-slide"  v-for="(item,index) in film.actors" :key="index">
                    <img v-lazy="item.avatarAddress" alt="">
                    <div class="avatar-info">
                     <p>{{item.name}}</p>   
                     <p>{{item.role}}</p>
                    </div>
                </div>
            </Swiper>
        </div>
         <div class="pic-area">
            <div class="title-bar"><span>剧照</span></div>
            <Swiper :key="'actors_' + film.actors.length" class="pic-list">
                <div class="swiper-slide"  v-for="(item,index) in film.actors" :key="index">
                    <img v-lazy="item.photos" alt="">
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
            film:{
                actors:[]
            }
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
    },
    created(){
        //  通知app.vue移除底部菜单
        this.eventBus.$emit('footernav',false)
    },
    beforeDestroy(){
        // 通知 app 回复底部菜单
        this.eventBus.$emit('footernav',true)
    }

}
</script>

<style lang="scss" scoped>
.detail {
    .img {
        width: 100%;
        height: 220px;

        img {
            width: 100%;
            height: 100%;
        }
    }
    .pic-area{
        .pic-list{
            padding-left: 15px;

            .swiper-slide{
                width: 80px;
                img{
                    width: 80px;
                    height: 113px;
                }
                .avatar-info{
                    text-align: center;
                    font-size: 13px;
                    color: #797d82;
                    margin-top: 4px;
                }
            }
        }
        .title-bar{
            width: 100%;
            padding: 15px;
        }
    }
    
    .detail-wrapper{
        padding: 16px 20px;

        .name-list{
            .film-name{
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
