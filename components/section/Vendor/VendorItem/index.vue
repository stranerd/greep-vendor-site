<template>
  <div class="flex mt-[25px] justify-between items-center">
    <form class="w-full max-w-[576px]">
      <div class="relative flex w-full">
        <Search
          class="absolute left-4 top-[50%] h-[24px] w-[24px] translate-y-[-50%] text-muted-foreground"
        />
        <Separator orientation="vertical" />
        <Input
          type="search"
          placeholder="Search "
          class="w-full appearance-none bg-background px-[48px] rounded-[99px] h-[48px] shadow-none lg:w-full"
        />
        <Separator orientation="vertical" />
        <img
          class="absolute right-4 top-[50%] translate-y-[-50%] h-[24px] w-[24px] text-muted-foreground"
          src="/images/icons/arrangevertical.svg"
          alt="Arrange"
        />
      </div>
    </form>
    <div class="flex">
      <p
        class="flex items-center gap-[10px] text-[14px] leading-[21px] mr-[31px]"
      >
        <span class="bg-[#000] rounded-full h-[7px] w-[7px]"> </span>
        Sort by: Latest Item
      </p>
      <client-only>
        <Dialog class="w-[600px]">
          <DialogTrigger>
            <Button variant="primary" size="lg" rounded="md"
              ><CirclePlus class="h-5 w-5 mr-[10px]" /> Create Item</Button
            >
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Item</DialogTitle>
              <DialogDescription>
                <form class="my-5">
                  <div class="mb-5">
                    <Label for="name" class="mb-2 block"
                      >Item Name <span class="text-[#FF5656]">Required</span>
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                  <div>
                    <Label for="noOfItems" class="mb-2 block"
                      >Number of Items
                      <span class="text-[#999999]">Optional</span>
                    </Label>
                    <Input id="noOfItems" type="number" required />
                  </div>
                </form>
              </DialogDescription>
            </DialogHeader>

            <DialogFooter> Save changes </DialogFooter>
          </DialogContent>
        </Dialog>
      </client-only>
    </div>
  </div>
  <div>
    <div class="p-[10px] flex items-center gap-[10px] mb-1 cursor-pointer">
      <img src="/images/icons/arrow-down.svg" alt="Arrow" />
      <p class="text-[14px] text-[#999999]">
        <strong class="mr-[10px] text-[#000]"> Grains </strong>
        4 items
      </p>
    </div>
    <div class="grid grid-cols-4 gap-4">
      <ItemCard v-for="(item, i) in grains" :key="i" :cardData="item" />
    </div>
  </div>
  <div>
    <div class="p-[10px] flex items-center gap-[10px] mb-1 cursor-pointer">
      <img src="/images/icons/arrow-down.svg" alt="Arrow" />
      <p class="text-[14px] text-[#999999]">
        <strong class="mr-[10px] text-[#000]"> Seasonings </strong>
        5 items
      </p>
    </div>
    <div class="grid grid-cols-4 gap-4">
      <ItemCard v-for="(item, i) in seasonings" :key="i" :cardData="item" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Search, CirclePlus } from "lucide-vue-next";

const grains = ref([
  {
    img: "/images/items/0.jpg",
    name: "Nigerian Rice",
    price: "₺299.00",
    size: "1kg",
  },
  {
    img: "/images/items/1.jpg",
    name: "Nigerian Rice",
    price: "₺299.00",
    size: "1kg",
  },
  {
    img: "/images/items/2.jpg",
    name: "Nigerian Rice",
    price: "₺299.00",
    size: "1kg",
  },
  {
    img: "/images/items/3.jpg",
    name: "Nigerian Rice",
    price: "₺299.00",
    size: "1kg",
  },
]);

const seasonings = ref([
  {
    img: "/images/items/0.jpg",
    name: "Nigerian Rice",
    price: "₺299.00",
    size: "1kg",
  },
  {
    img: "/images/items/1.jpg",
    name: "Nigerian Rice",
    price: "₺299.00",
    size: "1kg",
  },
  {
    img: "/images/items/2.jpg",
    name: "Nigerian Rice",
    price: "₺299.00",
    size: "1kg",
  },
  {
    img: "/images/items/3.jpg",
    name: "Nigerian Rice",
    price: "₺299.00",
    size: "1kg",
  },
  {
    img: "/images/items/4.jpg",
    name: "Nigerian Rice",
    price: "₺299.00",
    size: "1kg",
  },
]);
</script>

<style></style>
