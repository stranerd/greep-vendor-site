<template>
  <div>
    <div class="flex items-center gap-4 h-72 py-2">
      <img
        :src="product?.banner?.link"
        alt=""
        class="block h-full w-72 object-cover rounded"
      />
      <div class="flex-1 flex flex-col gap-1 text-[#7C7C7C] text-sm">
        <h2 class="font-bold text-xl text-black">{{ product?.title }}</h2>
        <h2 class="max-w-[60%] text-xs">
          {{ product?.description }}
        </h2>

        <div class="flex flex-col gap-1">
          <h2 class="flex gap-2">
            <span class=""> Rating : </span>
            <span class="text-black gap-1 flex items-center"
              ><Star1Icon class="text-[#FDCC0D] h-4 w-4" />
              <span class="">4.5</span>
              <span class="text-gray-400"> (3,670)</span>
            </span>
          </h2>
          <h2 class="flex gap-2">
            <span class=""> Starting Price :</span>
            <span class="font-bold text-black">
              {{ product.price?.currency }}
              {{ product.price?.amount }}
            </span>
          </h2>
          <h2 class="flex gap-2">
            <span class=""> No of item sold :</span>
            <span class="font-bold text-black"> 46 </span>
          </h2>
        </div>

        <div class="flex w-full mt-4 justify-between items-center">
          <div class="text-primary flex gap-1">
            <span class="">Edit</span>
            <EditIcon class="h5 w-5 mr-4" />
          </div>
          <client-only>
            <div class="flex items-center space-x-2">
              <Label
                for="availablity"
                class="text-sm leading-[20px] font-normal"
                >Availability</Label
              >
              <Switch
                class="data-[state=checked]:bg-[#10BB76]"
                id="availablity"
                :checked="availability"
              />
            </div>
          </client-only>
        </div>
      </div>
    </div>
    <div class="">
      <h2 class="font-bold text-2xl">Reviews & Rating</h2>
      <div class="flex flex-col gap-6">
        <!-- Reviews Table -->
        <div class="flex flex-col gap-2 mt-4" v-for="review in reviews">
          <h2 class="font-bold text-lg">{{ review.name }}</h2>
          <div class="flex items-center text-sm gap-2">
            <div class="flex gap-1 max-w-24">
              <Star1Icon
                type="filled"
                class="text-[#FDCC0D] h-4 w-4"
                v-for="i in review.rating"
              />
            </div>
            <h2 class="min-w-5">{{ review.rating }}</h2>
            <h2 class="text-[#999999] gap-1 flex items-center">
              <span class="">•</span>{{ review.date }}
            </h2>
          </div>
          <h2 class="">{{ review.comment }}</h2>
          <div class="flex items-center gap-10">
            <div class="">
              <HeartIconFill
                class="h-8 w-8 text-red-500"
                v-if="review.is_liked"
                @click="review.is_liked = !review.is_liked"
              />
              <HeartIconLine
                class="h-8 w-8"
                v-else
                @click="review.is_liked = !review.is_liked"
              />
            </div>
            <div
              class="bg-[#001726] cursor-pointer w-24 p-1 justify-center rounded items-center flex"
            >
              <Send2Icon class="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  EditIcon,
  Send2Icon,
  HeartIcon as HeartIconLine,
} from "@placetopay/iconsax-vue/outline";
import {
  Star1Icon,
  HeartIcon as HeartIconFill,
} from "@placetopay/iconsax-vue/bold";
import { API_STATES } from "~/services/constants";
import { useMarketPlaceStore } from "@/store/useMarketplace";

const marketplaceStore = useMarketPlaceStore();
const { singleProduct: product, marketplaceLoadingStates } =
  storeToRefs(marketplaceStore);
const { getSingleProduct } = marketplaceStore;
const availability = ref(true);

const route = useRoute();
const reviews = ref([
  {
    name: "James Roland",
    rating: 5,
    is_liked: true,

    date: "Dec 11, 2023",
    comment:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    actions: ["Save", "Reply"],
  },
  {
    name: "Samantha Bee",
    rating: 4,
    is_liked: true,
    date: "Jan 2, 2024",
    comment:
      "Very informative post, thanks for sharing! I've used this approach in my projects as well.",
    actions: ["Save", "Reply"],
  },
  {
    name: "Marco Polo",
    rating: 3,
    is_liked: true,
    date: "Feb 15, 2024",
    comment:
      "This method is okay, but I've found a more efficient way to handle this process.",
    actions: ["Save", "Reply"],
  },
  {
    name: "Lisa Ray",
    rating: 2,
    is_liked: true,
    date: "Mar 22, 2024",
    comment:
      "I tried this, but it didn't work for me. Perhaps I'm missing something?",
    actions: ["Save", "Reply"],
  },
  {
    name: "John Doe",
    rating: 5,
    is_liked: true,
    date: "Apr 10, 2024",
    comment: "Fantastic explanation! It worked perfectly for my use case.",
    actions: ["Save", "Reply"],
  },
]);

onMounted(() => {
  if (route.params.id) getSingleProduct(route.params.id as string);
});
</script>

<style scoped></style>
