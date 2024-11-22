<template>
  <div
    class="align-center flex w-full cursor-pointer rounded-[4px] px-[10px] py-3"
    :class="selected ? 'bg-[#001726] text-[white]' : ''"
  >
    <Avatar class="mr-3">
      <AvatarImage :src="chatData?.banner?.link || ''" alt="Product" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <div class="flex grow justify-between">
      <div>
        <h5 class="text-[14px] font-semibold leading-[21px]">Alex</h5>
        <p
          class="text-[12px] leading-[18px]"
          :class="selected ? 'text-[#f2f2f2]' : 'text-[#999999]'"
        >
          Thank you for using
          <span class="notranslate" translate="no">Greep</span>
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
