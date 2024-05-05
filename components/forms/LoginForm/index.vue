<template>
  <form>
    <div class="mx-auto grid w-[402px] gap-4">
      <img
        src="/images/logos/greep.svg"
        alt="Greep"
        class="mx-auto w-[45.45px] h-[45.45px] object-contain mb-2"
      />
      <div class="grid gap-2 text-center">
        <h1 class="text-[22px] font-semibold">Welcome!</h1>
        <p class="text-balance text-muted-foreground">Login to continue</p>
      </div>
      <Button variant="outline" class="w-full py-6 rounded-[12px] mt-4">
        Continue with Google
      </Button>
      <div class="relative mt-2">
        <div class="absolute inset-0 flex items-center">
          <span class="w-full border-t" />
        </div>
        <div class="relative flex justify-center text-xs uppercase">
          <span class="bg-background px-2 text-muted-foreground"> Or </span>
        </div>
      </div>
      <div class="grid gap-4">
        <div class="grid gap-2">
          <Label for="email" class="text-[16px] font-light">Email</Label>
          <Input
            id="email"
            type="email"
            class="py-[24px] rounded-[12px]"
            placeholder="m@example.com"
            required
          />
        </div>
        <div class="grid gap-2">
          <div class="flex items-center">
            <Label for="password" class="text-[16px] font-light"
              >Password</Label
            >
          </div>
          <Input
            id="password"
            type="password"
            class="py-[24px] rounded-[12px]"
            required
          />
        </div>
        <Button type="submit" class="w-full py-6 rounded-[12px] mt-4" size="lg">
          Login
        </Button>
      </div>
      <nuxt-link
        to="forgot-password"
        class="text-[#0250C6] text-center text-[16px] leading-[24px]"
      >
        Forgot password?
      </nuxt-link>
      <div class="text-center text-[16px]">
        Don’t have an account?
        <nuxt-link to="/" class="text-[#0250C6]"> Create account </nuxt-link>
      </div>
    </div>
  </form>
</template>

<script></script>

<style></style>
