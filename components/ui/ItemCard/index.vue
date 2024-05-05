<template>
  <div class="rounded-[8px] overflow-hidden border-[#EBEBEB] border-[1.5px]">
    <img
      :src="cardData.img"
      :alt="cardData.name"
      class="h-[146px] w-full object-cover mb-[10px]"
    />
    <div class="p-[10px] flex flex-col gap-2">
      <h4 class="text-[14px] leading-[21px] font-semibold">
        {{ cardData.name }}
      </h4>
      <Separator />

      <p class="text-[12px] flex leading-[18px]">
        Starting Price:
        <span class="font-semibold ml-1"> {{ cardData.price }}</span>
      </p>

      <p class="text-[12px] flex leading-[18px]">
        Kg: <span class="font-semibold ml-1"> {{ cardData.size }}</span>
      </p>

      <div class="flex items-center justify-between">
        <Button variant="ghost" size="dense">
          Edit <img src="/images/icons/edit.svg" alt="Edit" class="ml-2" />
        </Button>

        <div class="flex items-center space-x-2">
          <Label
            for="availablity"
            class="text-[12px] leading-[20px] font-normal"
            >Availability</Label
          >
          <Switch
            class="data-[state=checked]:bg-[#10BB76]"
            id="availablity"
            :checked="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  cardData: { type: Object as () => {}, required: true },
});

const selected = ref(true);
</script>

<style></style>
