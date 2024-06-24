<template>
  <div
    class="flex align-center w-full py-3 px-[10px] rounded-[4px] cursor-pointer"
    :class="selected ? 'bg-[#001726] text-[white]' : ''"
  >
    <Avatar class="mr-3">
      <AvatarImage :src="chatData?.banner?.link || ''" alt="Product" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <div class="flex justify-between grow">
      <div>
        <h5 class="text-[14px] leading-[21px] font-semibold">Alex</h5>
        <p
          class="text-[12px] leading-[18px]"
          :class="selected ? 'text-[#f2f2f2]' : 'text-[#999999]'"
        >
          Thank you for using Greep
        </p>
      </div>
      <div>
        <p
          class="text-[12px] leading-[18px]"
          :class="selected ? 'text-[#f2f2f2]' : 'text-[#999999]'"
        >
          Yesterday
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  chatData: {
    type: Object,
    default: () => {},
  },
  selected: {
    type: Boolean,
    default: false,
  },
});

onMounted(() => {
  console.log(props.chatData);
});
</script>

<style></style>
