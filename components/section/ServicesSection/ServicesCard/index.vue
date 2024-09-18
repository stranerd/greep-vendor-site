<template>
  <Card
    :class="item.class"
    class="max-h-[280px] w-full overflow-hidden border-none border-transparent bg-transparent outline-none ring-0 lg:!max-h-[428px]"
    :style="item.style"
  >
    <img
      :src="item.source"
      v-if="item.type === 'IMAGE'"
      alt=""
      class="h-full w-full border-none object-cover"
    />

    <div
      v-if="item.type === 'CARD'"
      class="flex h-full w-full flex-col justify-between border-none p-4 lg:p-[36px]"
    >
      <h2 class="text-2xl font-medium lg:text-[40px]">
        {{ item.content?.title }}
      </h2>
      <div class="grid gap-4 lg:gap-8">
        <p class="text-xs font-normal lg:text-lg">{{ item.content?.body }}</p>
        <p class="text-xs underline lg:text-lg">
          {{ item.content?.actionText }}
        </p>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
interface Item {
  type: "IMAGE" | "CARD" | string;
  source?: string;
  class?: string;
  style: object;
  content?: {
    title: string;
    body: string;
    actionText: string;
    action?: Function;
  };
}

defineProps({
  item: { type: Object as PropType<Item>, required: true },
});
</script>

<style scoped></style>
