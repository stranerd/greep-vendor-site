<template>
  <Card
    class="h-[428px] w-full overflow-hidden border-none"
    :style="item.style"
  >
    <img
      :src="item.source"
      v-if="item.type === 'IMAGE'"
      alt=""
      class="h-full w-full object-cover"
    />

    <div
      v-if="item.type === 'CARD'"
      class="flex h-full w-full flex-col justify-between border-none p-[36px]"
    >
      <h2 class="text-[40px] font-medium">{{ item.content?.title }}</h2>
      <div class="grid gap-8">
        <p class="text-sm font-normal">{{ item.content?.body }}</p>
        <p class="underline">{{ item.content?.actionText }}</p>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
interface Item {
  type: "IMAGE" | "CARD" | string;
  source?: string;
  style: object;
  content?: {
    title: string;
    body: string;
    actionText: string;
    action: Function;
  };
}
defineProps({
  item: Object as PropType<Item>,
  required: true,
});
</script>

<style scoped></style>
