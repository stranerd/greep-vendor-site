<template>
  <section>
    <div class="container px-[20px] md:px-[2rem]">
      <CursiveTitle> Vendor </CursiveTitle>
      <h2
        class="mb-[50px] mt-4 text-[24px] font-bold md:text-[32px] lg:text-[48px]"
      >
         <span class="notranslate" translate="no">Greep</span> Vendors
      </h2>
      <div>
        <client-only>
          <swiper
            class="vendor-slider"
            :navigation="true"
            :modules="modules"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
          >
            <swiper-slide v-for="(product, i) in productFeatures" :key="i">
              <div
                class="flex w-full flex-col items-center justify-between gap-[24px] md:gap-[40px] lg:flex-row lg:gap-[69px]"
              >
                <div class="w-full max-w-[1006px] grow lg:min-w-[500px]">
                  <img
                    :src="product.image"
                    alt="Vendor admin"
                    class="h-auto w-full object-cover"
                  />
                </div>

                <div class="max-w-[584px] grow">
                  <p
                    class="mb-6 text-[14px] leading-[26px] text-[#000E18] md:text-[16px] md:leading-[30px] lg:text-[20px]"
                  >
                  <p class="font-medium">{{ product.title }}</p>
                    {{ product.description }}
                  </p>
                  <button
                    class="flex items-center rounded-[100px] border-[1px] bg-[#FFFFFF] px-[24px] py-[18px]"
                    @click="router.push('/news/curating-a-workspace')"
                  >
                    Get Started
                    <img
                      src="/images/icons/arrow-up-right.svg"
                      alt=""
                      class="ml-[10px] h-[20px] w-[20px]"
                    />
                  </button>
                </div>
              </div>
            </swiper-slide>
          </swiper>

          <div class="mb-[80px] flex items-center justify-between">
            <div class="flex items-center gap-[8px]">
              <div
                v-for="(_, i) in 5"
                :key="i"
                class="h-[8px] w-[8px] cursor-pointer rounded-full"
                :class="
                  swiperInstance?.activeIndex === i
                    ? 'bg-[#000000]'
                    : 'bg-[#8D8D8D]'
                "
                @click="swiperInstance?.slideTo(i)"
              ></div>
            </div>
            <div class="flex items-center gap-2">
              <img
                src="/images/icons/arrow-left-sm.svg"
                alt="Left"
                class="h-[48px] w-[48px] cursor-pointer rounded-full object-contain"
                @click="swiperInstance?.slidePrev()"
              />
              <img
                src="/images/icons/arrow-right-sm.svg"
                alt="Right"
                class="h-[48px] w-[48px] cursor-pointer rounded-full object-contain"
                @click="swiperInstance?.slideNext()"
              />
            </div>
          </div>
        </client-only>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const router = useRouter();
    const swiperInstance = ref<any>(null);
    const onSwiper = (swiper: any) => {
      swiperInstance.value = swiper;
    };
    const onSlideChange = (swiper: any) => {
      swiperInstance.value = swiper;
    };

    const productFeatures = ref([
      {
        title: "Feature 1: Online Store Creation",
        image: "/images/vendors/store.png",
        description:
          "Online Store CreationCreating an online store has never been easier. With GreepVendor, entrepreneurs canquickly set up a professional online presence, complete withcustomizable templates, easy product uploads, and a securepayment gateway. Our intuitive store builder guides youthrough the process, so you can focus on selling rather thancoding. Whether you're just starting out or expanding yourexisting business, our online store creation feature has gotyou covered.",
      },
      {
        title: "Feature 2: Product Management",
         image: "/images/vendors/menu.png",
        description:
          "Managing your products has never been more efficient. GreepVendor's product management feature allows you to easily add, edit, and remove products from your store, complete with detailed descriptions, high-quality images, and customizable pricing options. You can also track your inventory levels in real-time, set low stock alerts, and receive notifications when it's time to restock. With our product management feature, you'll be able to keep your store up-to-date and running smoothly.",
      },
      {
        title: "Feature 3: Order and Delivery Management",
         image: "/images/vendors/orders.png",
        description:
          "Streamline your order and delivery process with GreepVendor's intuitive management feature. Receive and manage orders from multiple channels, track delivery status in real-time, and receive notifications when orders are fulfilled. Our platform also connects you with a network of trusted delivery partners, ensuring that your products reach your customers quickly and efficiently. With our order and delivery management feature, you'll be able to focus on growing your business rather than worrying about logistics.",
      },
      {
        title: "Feature 4: Performance Analytics",
        image: "/images/vendors/analytics.png",
        description:
          "Make data-driven decisions with GreepVendor's performance analytics feature. Our platform provides you with real-time insights into your sales, customer behavior, and product performance, allowing you to identify trends, optimize your store, and increase revenue. With our analytics feature, you'll be able to track your progress, identify areas for improvement, and make informed decisions to drive your business forward.",
      },
      {
        title: "Feature 5: Integration with Delivery Partners",
         image: "/images/vendors/delivery.png",
        description:
          "GreepVendor's integration with delivery partners takes the hassle out of order fulfillment. Our platform connects you with a network of trusted delivery partners, allowing you to print shipping labels, track orders, and receive real-time updates on delivery status. With our integration feature, you'll be able to focus on growing your business while we handle the logistics. Whether you're shipping locally or internationally, our integration with delivery partners has got you covered.",
      },
    ]);

    return {
      onSwiper,
      onSlideChange,
      modules: [Navigation, Pagination],
      swiperInstance,
      productFeatures,
      router,
    };
  },
};
</script>

<style>
.vendor-slider {
  padding-bottom: 30px;
}
.vendor-slider .swiper-button-next {
  display: none;
}
.vendor-slider .swiper-button-next::after,
.vendor-slider .swiper-button-prev::after {
  display: none;
}
.vendor-slider .swiper-button-prev {
  display: none;
}
</style>
