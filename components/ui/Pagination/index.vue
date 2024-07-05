<template>
  <div class="flex items-center justify-between mt-[61px] w-full">
    <p class="text-[#6B7280] text-[12px] leading-[20px]">
      {{ paginationString }}
    </p>
    <div class="flex items-center">
      <p class="text-[#6B7280] text-[12px] leading-[20px] mr-[24px]">
        {{ meta.current || 1 }} of {{ meta.last || 1 }} pages
      </p>
      <div class="flex">
        <!-- <button
          class="py-[6px] px-[12px] border-[0px] bg-transparent text-[13px] leading-[20px] text-[#6B7280]"
          :disabled="meta.current === 1"
          @click="$emit('paginate', { page: meta.current - 1 })"
        >
          Prev
        </button>
        <button
          class="py-[6px] px-[12px] border-[0px] bg-transparent text-[13px] leading-[20px] text-[#6B7280]"
        >
          Next
        </button> -->
        <Button
          variant="ghost"
          size="sm"
          :disabled="meta.current === 1"
          :loading="loading && currentClick === 'prev'"
          @click="
            currentClick = 'prev';
            emits('paginate', { page: meta.current - 1 });
          "
        >
          Prev
        </Button>
        <Button
          variant="ghost"
          size="sm"
          :disabled="!meta.next"
          :loading="loading && currentClick === 'next'"
          @click="
            currentClick = 'next';
            emits('paginate', { page: meta.next });
          "
        >
          Next
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  meta: {
    type: Object,
    default: () => {},
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const currentClick = ref<"next" | "prev">("next");

const paginationString = computed(() => {
  const start = (props.meta.current - 1) * props.meta.limit + 1;
  const last = Math.min(
    props.meta.current * props.meta.limit,
    props.meta.total,
  );
  return `${start} - ${last} of ${props.meta.total} results`;
});

const emits = defineEmits(["paginate"]);
</script>

<style></style>
