<template>
  <nav class="container sticky top-0 z-[40] pt-10">
    <div
      class="flex items-center justify-between p-6 bg-[#FCFCFD bg-[#fff] border-[#F1F1F3] border-[1px] rounded-[100px]"
    >
      <div class="flex items-center">
        <nuxt-link to="/" class="mr-0 md:mr-[50px] flex items-center">
          <Avatar size="base" class="h-[44px] w-[44px]">
            <AvatarImage src="/images/logos/greep.svg" alt="Greep" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </nuxt-link>

        <div class="hidden lg:block">
          <nuxt-link
            v-for="(link, i) in navLinks"
            :key="i"
            :to="link.to"
            class="px-6 py-[14px] rounded-[100px]"
            active-class="bg-[#F7F7F8] border-[1px] border-[#F1F1F3]"
            >{{ link.name }}</nuxt-link
          >
        </div>
      </div>
      <Sheet>
        <SheetTrigger as-child>
          <Button
            variant="primary"
            size="icon"
            class="shrink-0 h-[44px] w-[44px] lg:hidden"
          >
            <img
              src="/images/icons/menu-icon.svg"
              u
              class="h-5 w-5"
              alt="Menu"
            />

            <span class="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          class="flex flex-col rounded-tr-[24px] rounded-br-[24px]"
        >
          <nav
            class="h-full flex py-[30px] items-center justify-between flex-col w-full"
          >
            <div class="w-full">
              <nuxt-link
                v-for="(link, i) in navLinks"
                :key="i"
                :to="link.to"
                class="px-6 block py-[14px] w-full rounded-[100px]"
                active-class="bg-[#F7F7F8] border-[1px] border-[#F1F1F3]"
                >{{ link.name }}</nuxt-link
              >
            </div>
            <Button
              variant="withIcon"
              size="lg"
              rounded="lg"
              class="w-full"
              @click="router.push('/login')"
              >Get Started
              <div
                class="bg-[#000E18] rounded-full p-[14px] ml-auto mr-[-20px]"
              >
                <img
                  src="/images/icons/mail-white.svg"
                  alt="Mail Icon"
                  class="h-[20px] w-[20px] object-contain"
                />
              </div>
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
      <Button
        class="hidden lg:flex"
        variant="withIcon"
        size="lg"
        rounded="lg"
        @click="router.push('/login')"
        >Get Started
        <div class="bg-[#000E18] rounded-full p-[14px] ml-[10px] mr-[-20px]">
          <img
            src="/images/icons/mail-white.svg"
            alt="Mail Icon"
            class="h-[20px] w-[20px] object-contain"
          />
        </div>
      </Button>
    </div>
  </nav>
</template>

<script setup lang="ts">
const router = useRouter();
const navLinks = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "About",
    to: "/about",
  },
  {
    name: "Product",
    to: "/product",
  },
  {
    name: "News",
    to: "/news",
  },
];
</script>

<style></style>
