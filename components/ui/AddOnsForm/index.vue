<template>
  <div class="">
    <h2 class="font-medium">Create add on Categories</h2>
    <transition-group tag="form" name="slide" class="flex flex-col gap-2">
      <div
        class="w-full"
        v-for="(addOn, addOnIndex) in addOnList"
        :key="addOnIndex"
      >
        <div
          class="flex flex-col justify-between gap-2 lg:flex-row lg:items-center"
        >
          <h2 class="flex min-w-[140px] flex-1 items-center gap-1">
            <span class="text-4xl"> • </span>
            <Input
              :placeholder="addOn.placeholder"
              class="h-8 flex-1 rounded border border-black focus:border-none lg:max-w-40"
              v-model="addOn.title"
            />
          </h2>

          <div class="flex gap-x-4">
            <div class="flex items-center gap-1">
              <h2 class="">Options</h2>
              <Select class="border-2 border-black" v-model="addOn.option">
                <SelectTrigger
                  class="h-8 border border-black focus:border-none"
                >
                  <SelectValue placeholder="Select a fruit" class="text-sm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="1">Required</SelectItem>
                    <SelectItem value="0">Optional</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div class="flex h-8 items-center gap-1">
              <h2 class="">Selections</h2>
              <Input
                placeholder="1"
                type="number"
                class="flex h-8 min-w-10 items-start rounded border border-black px-1 focus:border-none"
                v-model="addOn.maxSelection"
                :max="addOn.items.length"
                :min="1"
              />
            </div>
          </div>
        </div>

        <div class="ml-10 mt-2 flex flex-col gap-2">
          <transition-group name="slide">
            <div class="" v-for="(item, itemIndex) in addOn.items" :key="item">
              <div class="flex items-center justify-between gap-4">
                <h2 class="flex max-w-[70%] flex-1 items-center gap-1">
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
                    :min="1"
                    class="h-8 w-[100px] flex-1 rounded border border-black focus:border-none"
                    v-model="item.price.amount"
                  />
                </div>

                <TrashIcon
                  class="h-6 w-6 text-rose-500"
                  @click="deleteAddOnItem(addOnIndex, itemIndex)"
                />
              </div>
            </div>
          </transition-group>
          <h2
            class="my-1 flex cursor-pointer items-center justify-start gap-x-2 text-blue-700"
            @click.prevent="addAddOnItem(addOnIndex)"
          >
            <AddCircleIcon class="h-4 w-4" />
            <span class="text-sm text-[#0250C6]">Create new option</span>
          </h2>
        </div>
      </div>
    </transition-group>

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
const props = defineProps({
  initialAddOnList: {
    type: Object,
    default: () => {},
  },
});

interface AddOn {
  title: string;
  option: string;
  maxSelection: number;
  placeholder: string;
  items: {
    name: string;
    price: { amount: number; currency: string | "TRY" | "NGN" };
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
    option: "0",
    maxSelection: 1,
    placeholder: "e.g Toppings",
    items: [],
  };
  addOnList.push(addOn);
};

const addAddOnItem = (index: number) => {
  if (addOnList[index]) {
    addOnList[index].items.push({
      name: "",
      placeholder: "e.g meat",
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
        maxSelection: addOn.maxSelection,
        items: addOn.items.map(({ placeholder, ...item }) => item),
      };
    });

    const filteredAddOns = initialAddOns
      .filter((addOn) => addOn.title !== "") // Filter out addOns where the title is empty
      .map((item) => ({
        ...item,
        items: item.items.filter(
          (it) => it.name !== "" && Boolean(it.price.amount),
        ), // Filter sub-items
      }))
      .filter((item) => item.items.length > 0); // Ensure we only keep items with non-empty sub-items

    let formattedAddOnList: any = {};
    for (const data of filteredAddOns) {
      const key = data.title.toLowerCase();
      formattedAddOnList[key] = {
        minSelection: Number(data.option),
        maxSelection:
          data.maxSelection >= data.items.length
            ? data.items.length
            : data.maxSelection,
        items: {},
      };
      for (const item of data.items) {
        formattedAddOnList[key].items[item.name] = {
          price: item.price,
          inStock: true,
        };
      }
    }
    emit("create-addons", formattedAddOnList);
  },
  { deep: true },
);

onMounted(() => {
  function isObjectTruthy(obj: object) {
    // Check if the object is not null, is an object, and has properties
    return obj && typeof obj === "object" && Object.keys(obj).length > 0;
  }
  if (!isObjectTruthy(props.initialAddOnList)) {
    addAddOn();
    addAddOnItem(0);
  } else {
    const initialAddons = Object.entries(props.initialAddOnList).map(
      (addOn: any) => {
        const items = Object.entries(addOn[1].items);
        const addOnList = {
          title: addOn[0],
          option: Number(addOn[1].minSelection).toString(),
          maxSelection: addOn[1].maxSelection,
          placeholder: "e.g toppings",
          items: items.map((item: any) => ({
            name: item[0],
            placeholder: "e.g meat",
            price: {
              amount: item[1].price.amount,
              currency: item[1].price.currency,
            },
            inStock: item[1].inStock,
          })),
        };
        return addOnList;
      },
    );
    addOnList.push(...initialAddons);
  }
});
</script>

<style scoped>
.slide-move, /* apply transition to moving elements */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translate(30px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.slide-leave-active {
  position: absolute;
}
</style>
