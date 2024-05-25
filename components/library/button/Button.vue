<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "radix-vue";
import { type ButtonVariants, buttonVariants } from ".";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-vue-next";

interface Props extends PrimitiveProps {
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  class?: HTMLAttributes["class"];
  rounded?: ButtonVariants["rounded"];
  loading?: Boolean;
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size, rounded }), props.class)"
    :disabled="props.loading"
  >
    <LoaderCircle v-if="props.loading" class="mr-2 h-4 w-4 animate-spin" />
    <slot />
  </Primitive>
</template>
