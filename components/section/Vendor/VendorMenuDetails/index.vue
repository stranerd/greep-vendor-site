<template>
  <div>
    <div
      class="flex h-72 items-center gap-4 py-2"
      v-if="marketplaceLoadingStates.getSingleProduct === API_STATES.LOADING"
    >
      <Skeleton class="block h-full w-72 rounded object-cover" />
      <div class="flex flex-1 flex-col gap-1 text-sm text-[#7C7C7C]">
        <Skeleton class="block h-10 w-4/12 rounded object-cover" />
        <Skeleton class="block h-16 w-10/12 rounded object-cover" />
        <Skeleton
          class="block h-5 w-3/12 rounded object-cover"
          v-for="i in 3"
        />
      </div>
    </div>
    <div
      v-else-if="
        marketplaceLoadingStates.getSingleProduct === API_STATES.SUCCESS
      "
    >
      <div
        class="mb-4 flex flex-col gap-4 py-2 lg:mb-0 lg:h-72 lg:flex-row lg:items-center"
      >
        <img
          :src="product?.banner?.link"
          alt=""
          class="block h-full w-72 rounded object-cover"
        />
        <div class="flex flex-1 flex-col gap-1 text-sm text-[#7C7C7C]">
          <h2 class="text-xl font-bold text-black">{{ product?.title }}</h2>
          <h2 class="max-w-[60%] text-sm">
            {{ product?.description }}
          </h2>

          <div class="flex flex-col gap-1">
            <h2 class="flex gap-2">
              <span class=""> Rating : </span>
              <span class="flex items-center gap-1 text-black"
                ><Star1Icon class="h-4 w-4 text-[#FDCC0D]" />
                <span class="">4.5</span>
                <span class="text-gray-400"> (3,670)</span>
              </span>
            </h2>
            <h2 class="flex gap-2">
              <span class=""> Starting Price :</span>
              <span class="font-bold text-black">
                {{
                  gpNumbers.formatCurrency(
                    product.price?.amount,
                    product.price?.currency,
                  )
                }}
              </span>
            </h2>
            <h2 class="flex gap-2">
              <span class=""> No of item sold :</span>
              <span class="font-bold text-black"> 46 </span>
            </h2>
          </div>

          <div class="mt-4 flex w-full items-center justify-between">
            <Button
              variant="ghost"
              class="flex gap-2 text-base text-primary"
              @click="isDialogOpen = true"
            >
              <span class="">Edit</span>
              <EditIcon class="mr-4 h-5 w-5" />
            </Button>

            <client-only>
              <CreateMenuModal
                :isOpen="isDialogOpen"
                mode="edit"
                :selectedProduct="product"
                @close="closeModal"
                @completedCreation="completeProductCreation"
              />
            </client-only>
            <client-only>
              <div class="flex items-center space-x-2">
                <Label
                  for="availablity"
                  class="text-sm font-normal leading-[20px]"
                  >Availability</Label
                >
                <Switch
                  class="data-[state=checked]:bg-[#10BB76]"
                  id="availablity"
                  :checked="product?.inStock"
                  :disabled="
                    marketplaceLoadingStates.updateProduct ===
                    API_STATES.LOADING
                  "
                  @update:checked="handleChange"
                />
              </div>
            </client-only>
          </div>
        </div>
      </div>
    </div>
    <div class="">
      <div
        class=""
        v-if="marketplaceLoadingStates.getSingleProduct === API_STATES.LOADING"
      >
        <h2 class="text-2xl font-bold">Reviews & Rating</h2>
        <div class="flex flex-col gap-6">
          <div class="mt-4 flex flex-col gap-2" v-for="i in 6">
            <Skeleton class="h-6 w-2/12" />
            <Skeleton class="h-6 w-4/12" />
            <Skeleton class="h-12 w-11/12" />
            <div class="flex items-center gap-10">
              <Skeleton class="h-10 w-40 rounded-lg" v-for="i in 2" />
            </div>
          </div>
        </div>
      </div>
      <div
        class=""
        v-else-if="
          marketplaceLoadingStates.getSingleProduct === API_STATES.SUCCESS
        "
      >
        <h2 class="text-2xl font-bold">Reviews & Rating</h2>
        <div class="flex flex-col gap-6">
          <!-- Reviews Table -->
          <div class="mt-4 flex flex-col gap-2" v-for="review in reviews">
            <h2 class="text-lg font-bold">{{ review.name }}</h2>
            <div class="flex items-center gap-2 text-sm">
              <div class="flex max-w-24 gap-1">
                <Star1Icon
                  type="filled"
                  class="h-4 w-4 text-[#FDCC0D]"
                  v-for="i in review.rating"
                />
              </div>
              <h2 class="min-w-5">{{ review.rating }}</h2>
              <h2 class="flex items-center gap-1 text-[#999999]">
                <span class="">•</span>{{ review.date }}
              </h2>
            </div>
            <h2 class="">{{ review.comment }}</h2>
            <div class="flex items-center gap-10">
              <div class="">
                <HeartIconFill
                  class="h-6 w-6 text-red-500"
                  v-if="review.is_liked"
                  @click="review.is_liked = !review.is_liked"
                />
                <HeartIconLine
                  class="h-6 w-6"
                  v-else
                  @click="review.is_liked = !review.is_liked"
                />
              </div>
              <div
                class="flex w-20 cursor-pointer items-center justify-center rounded bg-[#001726] p-1"
              >
                <Send2Icon class="h-6 w-6 text-white" />
              </div>
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
const { getSingleProduct, updateProduct, getAllProducts } = marketplaceStore;
const availability = ref(true);
const isDialogOpen = ref(false);
const handleChange = async (e: any) => {
  product.value.inStock = e;
  const { banner, ...payload } = product.value;
  console.log(e);
  const data = { ...payload, inStock: e };
  const form = new FormData();

  Object.keys(data).forEach((item, key) => {
    form.append(item, JSON.stringify(data[item]));
  });

  await updateProduct(product.value.id, form);
};

const route = useRoute();

const closeModal = () => {
  isDialogOpen.value = false;
};

const completeProductCreation = () => {
  closeModal();
  getAllProducts({});
};

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
