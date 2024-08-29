<template>
  <nav class="container sticky top-0 z-[40] px-[20px] pt-10 md:px-[2rem]">
    <div
      class="bg-[#FCFCFD flex items-center justify-between rounded-[100px] border-[1px] border-[#F1F1F3] bg-[#fff] px-6 py-2"
    >
      <div class="flex items-center">
        <nuxt-link to="/" class="mr-0 flex items-center md:mr-[50px]">
          <!-- <Avatar size="base"> -->
          <img src="/images/logos/greep.svg" alt="Greep" class="object-cover" />
          <!-- <AvatarFallback>CN</AvatarFallback> -->
          <!-- </Avatar> -->
        </nuxt-link>

        <div class="hidden lg:block">
          <nuxt-link
            v-for="(link, i) in navLinks"
            :key="i"
            :to="link.to"
            class="rounded-[100px] px-6 py-[14px]"
            active-class="bg-[#F7F7F8]  font-medium border-[1px] border-[#F1F1F3]"
            >{{ link.name }}</nuxt-link
          >
        </div>
      </div>
      <Sheet>
        <SheetTrigger as-child>
          <Button
            variant="primary"
            size="icon"
            class="h-[44px] w-[44px] shrink-0 lg:hidden"
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
          class="flex flex-col rounded-br-[24px] rounded-tr-[24px]"
        >
          <nav
            class="flex h-full w-full flex-col items-center justify-between py-[30px]"
          >
            <div class="w-full">
              <SheetClose asChild v-for="(link, i) in navLinks" :key="i">
                <nuxt-link
                  :to="link.to"
                  class="block w-full rounded-[100px] px-6 py-[14px]"
                  active-class="bg-[#F7F7F8] border-[1px] border-[#F1F1F3]"
                  >{{ link.name }}</nuxt-link
                >
              </SheetClose>
            </div>
            <Button
              variant="withIcon"
              size="lg"
              rounded="lg"
              class="w-full"
              @click="router.push('/login')"
              >Get Started
              <div
                class="ml-auto mr-[-20px] rounded-full bg-[#000E18] p-[14px]"
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
        <div class="ml-[10px] mr-[-20px] rounded-full bg-[#000E18] p-[14px]">
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
  {
    name: "Contact",
    to: "/contact",
  },
];
</script>

<style></style>
