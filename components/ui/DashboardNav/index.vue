<template>
  <header
    class="flex sticky top-0 w-full h-14 items-center gap-4 border-b-[1px] border-b-[#E0E2E4] bg-[#FFFFFF] lg:h-[76px]"
  >
    <Sheet>
      <SheetTrigger as-child>
        <Button variant="outline" size="icon" class="shrink-0 md:hidden">
          <Menu class="h-5 w-5" />
          <span class="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" class="flex flex-col">
        <nav class="grid gap-2 text-lg font-medium">
          <a href="#" class="flex items-center gap-2 text-lg font-semibold">
            <Package2 class="h-6 w-6" />
            <span class="sr-only">Acme Inc</span>
          </a>
          <a
            href="#"
            class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <Home class="h-5 w-5" />
            Dashboard
          </a>
          <a
            href="#"
            class="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
          >
            <ShoppingCart class="h-5 w-5" />
            Orders
            <Badge
              class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
            >
              6
            </Badge>
          </a>
          <a
            href="#"
            class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <Package class="h-5 w-5" />
            Products
          </a>
          <a
            href="#"
            class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <Users class="h-5 w-5" />
            Customers
          </a>
          <a
            href="#"
            class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <LineChart class="h-5 w-5" />
            Analytics
          </a>
        </nav>
      </SheetContent>
    </Sheet>
    <div class="container flex items-center">
      <div class="w-full flex-1">
        <form>
          <div class="relative">
            <Search
              class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
            />
            <Input
              type="search"
              placeholder="Search products..."
              class="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>
      <div class="flex items-center">
        <div>
          <Button variant="outline" size="icon" class="ml-auto h-8 w-8">
            <img
              src="/images/icons/notification.svg"
              alt="Notifications"
              class="h-[20px] w-[20px]"
            />
            <span class="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div class="grow mr-[36px] ml-3">
          <h6
            class="font-medium text-[#212B36] text-[14px] leading-[20px] text-right"
          >
            John Doe
          </h6>
          <p class="text-[#637381] text-[12px] leading-[14px] text-right">
            Admin
          </p>
        </div>
        <client-only>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <div class="flex">
                <Button variant="secondary" size="icon" class="rounded-full">
                  <Avatar>
                    <!-- <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" /> -->
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span class="sr-only">Toggle user menu</span>
                </Button>

                <!-- <img src="/images/icons/chevron-down.svg" alt="chevron" /> -->
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </client-only>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-vue-next";
</script>

<style></style>
