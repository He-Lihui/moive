<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
import "swiper/swiper-bundle.min.css";
export default {
  mounted() {
    // 异步渲染
    this.$nextTick(() => {
      new Swiper(".swiper-container", {
            pagination: ".swiper-pagination",
            effect: "coverflow",
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: "auto",
            coverflow: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
      });
    });
  },
};
</script>
