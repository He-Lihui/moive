<template>
    <div class="list scroll" :style="{height:height + 'px'}">
        <Loading v-if="loading"></Loading>
        <!-- 展示数据 -->
        <div>
               <div class="item" v-for="(item,index) in data" :key="index" @click="goDetail(item.filmId)">
                <div class="left">
                    <img v-lazy="item.poster"/>
                </div>
                <div class="middle">
                    <div>{{item.name}}
                        <span class="flim-item">{{item.item.name}}</span>
                    </div>
                    <div>
                        <span v-if="type ===1">观众评分 </span>
                        <span class="grade">{{item.grade}}</span>
                    </div>
                    <div>主演：{{item.actors | parseActors}}</div>
                    <div>{{item.nation}}| {{item.runtime}}分钟</div>
                </div>
                <div class="right">
                    <span v-if="type == 1">购票</span>
                    <span v-else>预购</span>
                </div>
            </div>
        </div>
     
    </div>
</template>

<script>
import Loading from '@/components/Loading'
import BScroll from 'better-scroll'
//  导入请求的方法
import {nowPlayingListData , comingSoonUriListData} from "@/api/api";
export default {
    data(){
        return {
            loading :true,
            height:0,
            bs: null,  // 用于保存实例结果
            pageNum:1,
            flag : true,
            data:[]  // 用于数据拼接

        }
    },
     props :['list',
             'type',
        ],
     components :{
         Loading
     },
    //  判断数据是否获取到 ，获取到之后就去除loading组件
     created(){
        //  进入界面后需要将父传子的数据list转交给data
        this.data = this.list
         if( this.data.length > 0 ){
             this.loading = false
         }else{
             this.loading = true
         }
     },
     mounted(){
         this.height = document.documentElement.clientHeight - 140
     },
     updated(){
          this.bs = new BScroll('.scroll',{
                // 激活上滑动的事件监听
                pullUpLoad: true,
                // 激活下滑的事件监听
                pullDownRefresh: true,
                // 默认情况下使用bs后，它会禁止浏览器的点击事件
                click: true
         });
        // 上拉刷新
        this.bs.on('pullingUp', () => {
            console.log('上拉刷新')
            this.getData()
            // 获取数据
            //本次pullup动作已经完成，继续准备下一次pullup
            this.bs.finishPullUp()
        })
        this.bs.on('pullingDown', () => {
            console.log('下拉刷新')
            this.getData()
            // 获取数据
            //本次pulldown动作已经完成，继续准备下一次pulldown
            this.bs.finishPullDown()
        })
     },
     filters :{
         parseActors :function(value){
             let actors = ""
             value.forEach(element => {
                 actors +=element.name + ' '
             })
             return actors
         }
     },
     methods :{
         goDetail : function(filmId){
            //  编程式导航
            this.$router.push({
                name: 'detail' ,params :{filmId}
            })
         },
         getData: async function(){
            if(this.flag){
                    this.pageNum ++
                if(this.type == 1){
                    // 即将上映
                    var ret = await nowPlayingListData(this.pageNum)
                }else{
                    var ret = await comingSoonUriListData(this.pageNum)

                }
                if(ret.data.data.films.length < 20){
                    this.flag = false
                }
                //  将数据新增到列表中去
                this.data = this.data.concat(ret.data.data.films)
            }
         }
     }

}
</script>

<style lang="scss" scoped>
.list{
    padding-bottom: 50px;
    // overflow: auto;
    // margin-top: 70px;
    .item {
        margin-top: 15px;
        padding-bottom: 15px;
        display: flex;
        color: #797d82;
        font-size: 13px;
        border-bottom: 1px solid #ededed;
        cursor: pointer;
        .left {
            width: 77px;
            height: 100px;
            margin-left: 20px;
            img {
                width: 66px;
                height: 100%;
            }
        }

        .middle {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 55%;

            div:nth-of-type(1) {
                color: #191a1b;
                font-size: 16px;
            }

            div:nth-of-type(3) {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .grade {
                color: #ffb232;
                font-size: 14px;
            }
            
            .flim-item {
                font-size: 9px;
                color: #fff;
                background-color: #d2d6dc;
                height: 14px;
                line-height: 14px;
                padding: 0 2px;
                border-radius: 2px;
                // display: block;
            }
        }

        .right {
            width: 15%;
            display: flex;
            align-items: center;
            margin-right: 20px;

            span {
                border: 1px solid #ff5f16;
                background: white;
                color: #ff5f16;
                border-radius: 2px;
                height: 25px;
                line-height: 25px;
                font-size: 13px;
                width: 50px;
                text-align: center;
            }
        }
    }
}
.scroll{
    overflow: hidden;
}
</style>