<template>
  <Dialog :open="isOpen" class="!max-h-[78vh] overflow-y-auto">
    <DialogContent :hideClose="true">
      <DialogHeader>
        <DialogTitle>Copy Payment Link</DialogTitle>
        <CancelIcon
          class="2-4 absolute right-4 top-4 h-4 cursor-pointer rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          @click="$emit('close')"
        />
      </DialogHeader>
      <DialogDescription>
        <div class="grid gap-4">
          <h2 class="">This is your payment link for the created order</h2>
          <h2 class="flex overflow-hidden rounded-lg bg-green-200">
            <span class="block w-[90%] whitespace-nowrap p-2 pr-4">{{
              gpHelpers.sliceWords(link, 50)
            }}</span>
            <span
              class="flex w-[10%] items-center justify-center bg-primary p-2"
            >
              <CopyIcon class="h-6 w-6 text-white" @click="copyToClipBoard" />
            </span>
          </h2>
          <h2 class="font-medium text-primary">
            Kindly copy and send to your customer to make payment. <br />
            Thank you!
          </h2>
        </div>
      </DialogDescription>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { CopyIcon } from "@placetopay/iconsax-vue/outline";
import { useClipboard } from "@vueuse/core";
import { Search, CirclePlus, X as CancelIcon } from "lucide-vue-next";
import { useToast } from "~/components/library/toast";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  link: {
    type: String,
    required: true,
  },
});

const { toast } = useToast();

const emit = defineEmits(["close", "completed"]);

const { text, copy, copied, isSupported } = useClipboard({
  source: props.link,
});

const copyToClipBoard = () => {
  if (isSupported) {
    copy(props.link);
    emit("close");
    emit("completed");
    toast({
      description: "Payment link successfully copied to clipboard!",
    });
  }
};
</script>

<style></style>
