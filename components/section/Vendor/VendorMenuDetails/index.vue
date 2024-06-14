<template>
  <div>
    <div class="flex items-center gap-4 h-72 py-2">
      <img
        src="/images/items/5.jpg"
        alt=""
        class="block h-full w-72 object-cover rounded" />
      <div class="flex-1">
        <h2 class="font-bold text-2xl">Jollof Rice</h2>
        <h2 class="max-w-[70%]">
          Savor the authentic taste of African Jollof rice, cooked using
          traditional methods for a truly delightful experience
        </h2>
        <h2 class="">Rating: ⭐ 4.5 (3,670)</h2>
        <h2 class="">Starting Price: ₺299.00</h2>
        <h2 class="">No of item sold: 46</h2>
        <div class="flex w-full justify-between items-center">
          <Edit2Icon class="h5 w-5 text-red-500" />
          <Edit2Icon class="h5 w-5 text-red-500 mr-4" />
        </div>
      </div>
    </div>
    <div class="">
      <h2 class="font-bold text-2xl">Reviews & Rating</h2>
      <div class="">
        <!-- Reviews Table -->
        <div class="" v-for="review in reviews">
          <h2 class="font-bold text-lg">{{ review.name }}</h2>
          <div class="flex items-center gap-1">
            <div class="flex gap-1 w-24">
              <StarIcon
                type="filled"
                class="text-yellow-600 h-4 w-4"
                v-for="i in review.rating" />
            </div>
            <h2 class="">{{ review.rating }}</h2>
            <h2 class="">{{ review.date }}</h2>
          </div>
          <h2 class="">{{ review.comment }}</h2>
          <div class="flex items-center gap-10">
            <div class="">Hello</div>
            <div class="">Hello</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { StarIcon } from 'lucide-vue-next';
import { Edit2Icon } from 'lucide-vue-next';

const reviews = ref([
  {
    name: 'James Roland',
    rating: 5,
    date: 'Dec 11, 2023',
    comment:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    actions: ['Save', 'Reply'],
  },
  {
    name: 'Samantha Bee',
    rating: 4,
    date: 'Jan 2, 2024',
    comment:
      "Very informative post, thanks for sharing! I've used this approach in my projects as well.",
    actions: ['Save', 'Reply'],
  },
  {
    name: 'Marco Polo',
    rating: 3,
    date: 'Feb 15, 2024',
    comment:
      "This method is okay, but I've found a more efficient way to handle this process.",
    actions: ['Save', 'Reply'],
  },
  {
    name: 'Lisa Ray',
    rating: 2,
    date: 'Mar 22, 2024',
    comment:
      "I tried this, but it didn't work for me. Perhaps I'm missing something?",
    actions: ['Save', 'Reply'],
  },
  {
    name: 'John Doe',
    rating: 5,
    date: 'Apr 10, 2024',
    comment: 'Fantastic explanation! It worked perfectly for my use case.',
    actions: ['Save', 'Reply'],
  },
]);
</script>

<style scoped></style>
