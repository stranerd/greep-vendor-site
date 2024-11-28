<template>
  <template>
    <Teleport to="body">
      <Transition mode="out-in" appear>
        <div
          @click.self="closeModal"
          class="fixed left-0 top-0 z-[50] flex h-screen w-full flex-col items-center justify-center bg-[#00000080] bg-opacity-70 p-10"
        >
          <Transition
            name="slider"
            :duration="500"
            enter-active-class="animate__animated animate__zoomIn"
            leave-active-class="animate__animated animate__zoomOut"
          >
            <div
              v-if="showModal"
              class="hide-scrollbar relative max-h-screen w-[96vw] rounded-lg bg-white px-4 pb-4 md:justify-normal md:rounded-lg md:px-4 lg:min-w-[40%] lg:max-w-[50%]"
              :class="class"
            >
              <div
                class="sticky top-0 flex w-full items-center justify-center bg-white"
              >
                <h2
                  class="mr-auto w-fit justify-self-center text-xl font-semibold capitalize"
                  v-if="title"
                >
                  {{ title }}
                </h2>

                <XIcon
                  class="right-0 m-4 block h-4 w-4 cursor-pointer justify-self-end"
                  @click="closeModal"
                />
              </div>
              <div class="">
                <slot class="" />
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </template>
</template>

<script setup lang="ts">
import { CloseCircleIcon } from "@placetopay/iconsax-vue/outline";
import { XIcon } from "lucide-vue-next";

const emits = defineEmits(["close"]);
const props = defineProps({ class: String, title: String });

const showModal = ref(false);

const closeModal = () => {
  showModal.value = false;
  setTimeout(() => {
    emits("close");
  }, 500);
};

onMounted(() => {
  document.body.style.overflow = "hidden";
  showModal.value = true;
});

onUnmounted(() => {
  document.body.style.overflow = "visible";
});
</script>

<style scoped></style>
