<template>
  <div class="">
    <h2 class="font-medium">Create add on Categories</h2>
    <div class="flex flex-col gap-2">
      <div
        class="w-full"
        v-for="(addOn, addOnIndex) in addOnList"
        :key="addOnIndex"
      >
        <div class="flex items-center justify-between gap-4">
          <h2 class="flex max-w-[40%] flex-1 items-center gap-1">
            <span class="text-4xl"> • </span>

            <Input
              :placeholder="addOn.placeholder"
              class="h-8 flex-1 rounded border border-black focus:border-none"
              v-model="addOn.title"
            />
          </h2>

          <div class="flex items-center gap-4">
            <h2 class="">Options</h2>
            <Select class="border-2 border-black">
              <SelectTrigger
                class="h-8 w-[100px] border border-black focus:border-none"
              >
                <SelectValue placeholder="Select a fruit" class="text-sm" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Required</SelectLabel>
                  <SelectItem value="true"> True</SelectItem>
                  <SelectItem value="false"> False </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div class="flex h-8 items-center gap-4">
            <h2 class="">Selections</h2>
            <h2
              class="flex h-8 min-w-8 flex-1 items-center justify-center rounded border border-black p-2"
            >
              {{ addOn.items.length }}
            </h2>
          </div>
        </div>

        <div class="ml-10 mt-2 flex flex-col gap-2">
          <div class="" v-for="(item, itemIndex) in addOn.items">
            <div class="flex items-center justify-between gap-4">
              <h2 class="flex max-w-[60%] flex-1 items-center gap-1">
                <span class="text-3xl"> • </span>
                <Input
                  :placeholder="item.placeholder"
                  class="h-8 flex-1 rounded border border-black focus:border-none"
                  v-model="item.name"
                />
              </h2>

              <div class="flex items-center gap-4">
                <h2 class="">Price</h2>
                <Input
                  type="number"
                  class="h-8 flex-1 rounded border border-black focus:border-none"
                  v-model="item.price.amount"
                />
              </div>

              <TrashIcon
                class="h-6 w-6 text-rose-500"
                @click="deleteAddOnItem(addOnIndex, itemIndex)"
              />
            </div>
          </div>
          <h2
            class="my-1 flex cursor-pointer items-center justify-start gap-x-2 text-blue-700"
            @click.prevent="addAddOnItem(addOnIndex)"
          >
            <AddCircleIcon class="h-4 w-4" />
            <span class="text-sm text-[#0250C6]">Create new option</span>
          </h2>
        </div>
      </div>
    </div>

    <h2
      class="my-2 flex cursor-pointer items-center justify-start gap-x-2 text-blue-700"
      @click="addAddOn"
    >
      <AddCircleIcon class="h-4 w-4" />
      <span class="text-sm text-[#002A69]">Create new add on category</span>
    </h2>
  </div>
</template>

<script setup lang="ts">
import { AddCircleIcon, TrashIcon } from "@placetopay/iconsax-vue/outline";
import { currencyConverter } from "@/lib/utils";

const emit = defineEmits(["create-addons"]);

interface AddOn {
  title: string;
  option: { required: boolean };
  selection: number;
  placeholder: string;
  items: {
    name: string;
    price: { amount: number; currency: "TRY" | "NGN" };
    placeholder: string;
  }[];
}

function getRandomStringFromArray(strings: string[]) {
  return strings[Math.floor(Math.random() * strings.length)];
}

// Example usage:
const items = ["Meat", "Salad", "Plantain", "Cocacola", "Berry"];
const categories = ["Drinks", "Toppings", "Accessories", "Others", "Fish"];

const addOnList = reactive<AddOn[]>([]);

const addAddOn = () => {
  const addOn = {
    title: "",
    option: { required: true },
    selection: 1,
    placeholder: getRandomStringFromArray(categories),
    items: [],
  };
  addOnList.push(addOn);
};

const addAddOnItem = (index: number) => {
  if (addOnList[index]) {
    addOnList[index].items.push({
      name: "",
      placeholder: getRandomStringFromArray(items),
      price: { amount: 0, currency: "TRY" },
    });
  }
};

const deleteAddOnItem = (addOnIndex: number, itemIndex: number) => {
  if (addOnList[addOnIndex]) {
    const addon = addOnList[addOnIndex].items.splice(itemIndex, 1);
  }
};

watch(
  addOnList,
  (newAddOn) => {
    const initialAddOns = newAddOn.map((addOn) => {
      return {
        title: addOn.title,
        option: addOn.option,
        items: addOn.items.map(({ placeholder, ...item }) => item),
      };
    });

    const filteredAddOns = initialAddOns
      .filter((addOn) => addOn.title !== "") // Filter out addOns where the title is empty
      .map((item) => ({
        ...item,
        items: item.items.filter(
          (it) => it.name !== "" && (it.price.amount !== 0 || ""),
        ), // Filter sub-items
      }))
      .filter((item) => item.items.length > 0); // Ensure we only keep items with non-empty sub-items

    emit("create-addons", filteredAddOns);
  },
  { deep: true },
);
onMounted(() => {
  addAddOn();
  addAddOnItem(0);
});
</script>

<style scoped></style>
