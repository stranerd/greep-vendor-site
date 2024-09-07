<template>
  <Dialog :open="showModal" @close="emits('cancelled', 'close')">
    <DialogContent :hideClose="true">
      <DialogHeader class="">
        <DialogTitle>
          <img src="/images/logos/greep.svg" alt="" class="h-12 w-12" />
        </DialogTitle>
        <CloseCircleIcon
          class="2-4 absolute right-4 top-8 h-6 cursor-pointer rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          @click="$emit('close')"
        />
      </DialogHeader>

      <div
        ref="dropZone"
        @click.self.stop.prevent="open()"
        :class="{ 'bg-green-200 bg-opacity-50': isOverDropZone }"
        class="border-brand relative mt-0 min-h-40 flex-col rounded-lg border-2 border-dotted p-6"
      >
        <CloudAddIcon class="mx-auto h-20 w-60 text-primary" />
        <div class="qh-flex-center z-10 flex-col gap-5 text-center">
          <div
            class="qh-text-3 font-lora my-5 justify-self-end font-medium text-primary"
          >
            <h1 v-if="isOverDropZone" class="">Drag File Here</h1>

            <h2 v-else class="">Drag 'n' drop some files here</h2>
          </div>
          <div class="qh-text-4 font-bold text-primary">
            <div class="flex flex-wrap gap-2">
              <h2 class="relative mx-auto my-1" v-for="(file, index) in files">
                <img
                  v-if="file.type.startsWith('image')"
                  :src="getImageURL(file)"
                  alt=""
                  class="bg-brand-100 mx-auto block max-h-40 w-40 rounded-lg object-cover"
                />
                <div
                  class="relative my-2 mt-5 flex w-fit gap-x-2 rounded-full border border-primary bg-gray-100 p-1 px-4"
                >
                  <h2 class="text-sm font-medium text-black">
                    {{ file.name }}
                  </h2>
                  <closeIcon
                    class="absolute -right-2 -top-2 h-5 w-5 text-destructive"
                    @click="files.splice(index, 1)"
                  />
                </div>
              </h2>
            </div>
          </div>

          <h2 class="text-sm text-destructive" v-if="maxFileExceeded">
            You can only upload a maximum of 2MB file
          </h2>
          <div class="flex justify-center gap-6">
            <Button
              @click="open"
              class="my-4 h-10 w-36 rounded-full border-2 !py-3 font-semibold hover:border-primary hover:bg-white hover:text-black lg:w-48"
              >Choose Files
            </Button>
            <Button
              :loading="uploading"
              :disabled="files.length < 1 || maxFileExceeded"
              class="my-4 h-10 w-36 rounded-full bg-primary !py-3 font-semibold md:my-4 lg:w-48"
              @click="emits('upload')"
              >Upload
            </Button>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { CloudAddIcon } from "@placetopay/iconsax-vue/bold";
import { useDropZone, useFileDialog } from "@vueuse/core";
import { useUploadStore } from "~/store/useUploadStore";
import { CloseCircleIcon } from "@placetopay/iconsax-vue/outline";
import { CloseCircleIcon as closeIcon } from "@placetopay/iconsax-vue/bold";

import { useToast } from "@/components/library/toast/use-toast";

// const uploadStore = useUploadStore();
const emits = defineEmits(["upload", "close", "cancelled"]);

const { files, uploading, showModal, dataTypes, acceptedTypes } =
  storeToRefs(useUploadStore());

const dropZone = ref<HTMLElement>();
const maxFileExceeded = ref(false);

const { open, reset, onChange } = useFileDialog({
  accept: acceptedTypes.value,
  multiple: false,
});

const maxFileSize = 1024 * 1024 * 2;

const getImageURL = (image: File) => URL.createObjectURL(image);

function onDrop(filesData: File[] | null) {
  maxFileExceeded.value = false;
  files.value = [];
  if (filesData) {
    const validFiles = filesData.every((file) => file.size <= maxFileSize);
    if (validFiles) {
      files.value = filesData.map((file) => file);
    } else maxFileExceeded.value = true;
  }
}

onChange((filesData) => {
  maxFileExceeded.value = false;
  if (filesData) {
    const validFiles = [...filesData].every((file) => file.size <= maxFileSize);
    if (validFiles) {
      files.value = [...filesData].map((file) => file);
    } else maxFileExceeded.value = true;
  }
});

const { isOverDropZone } = useDropZone(dropZone, {
  onDrop,
  dataTypes: dataTypes.value as any,
});
</script>
