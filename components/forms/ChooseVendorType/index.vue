<template>
  <form>
    <div class="mx-auto grid w-[402px] gap-4">
      <img
        src="/images/logos/greep.svg"
        alt="Greep"
        class="mx-auto mb-2 h-[45.45px] w-[45.45px] object-contain"
      />
      <div class="grid gap-2 text-center">
        <h1 class="text-[22px] font-semibold">Choose Vendor Type</h1>
        <p class="text-balance text-muted-foreground">Who are you?</p>
      </div>

      <Card
        v-for="vendor in vendorTypes"
        @click="vendorType = vendor"
        :class="{ 'border-green-500': vendorType === vendor }"
        class="cursor-pointer border-2 p-4"
      >
        <component :is="vendor.icon" class="h-6 w-6" />
        <CardTitle class="!my-2 text-xl">{{ vendor.type }}</CardTitle>
        <CardDescription> {{ vendor.hint }}</CardDescription>
      </Card>

      <Button
        type="submit"
        class="mt-4 w-full rounded-[12px] py-6"
        size="lg"
        @click.prevent="setVendorType"
        :disabled="vendorType === null"
        :loading="apiLoadingStates.login === API_STATES.LOADING"
      >
        Get Started
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { Eye, EyeOff } from "lucide-vue-next";
import { ShopIcon, WindIcon } from "@placetopay/iconsax-vue/outline";
import { API_STATES } from "~/services/constants";
import { useAuthStore } from "@/store/useAuthStore";

const authStore = useAuthStore();
const { apiLoadingStates } = storeToRefs(authStore);

const router = useRouter();

interface Vendor {
  type: string;
  icon: Component;
  hint: string;
  value: "items" | "foods";
}
const vendorTypes = ref<Vendor[]>([
  {
    type: "Food Vendor",
    icon: WindIcon,
    hint: "Restaurant, chef, bakery, etc; selling food.",
    value: "foods",
  },
  {
    type: "Market Vendor",
    icon: ShopIcon,
    hint: "Supermarket, store, shop, etc; selling goods.",
    value: "items",
  },
]);

const vendorType = ref<Vendor | null>(null);

const setVendorType = async () => {
  if (vendorType.value !== null) {
    await authStore.updateVendorRoles(vendorType.value.value);
  }
};
</script>

<style></style>
