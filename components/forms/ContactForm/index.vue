<template>
  <div class="container px-[20px] md:px-[2rem] mb-[96px]">
    <div class="bg-[#000E18] p-[24px] py-[48px] md:p-[48px] rounded-[20px]">
      <div class="max-w-[1248px] mx-auto">
        <div class="flex items-center w-full justify-center">
          <CursiveTitle> Let's Talk </CursiveTitle>
        </div>
        <h4
          class="text-center text-[#fff] text-[20px] mb-[12px] md:mb-[0px] md:text-[24px] lg:text-[35px] font-semibold mt-[13px] leading-[41px]"
        >
          Get in touch with us
        </h4>
        <p
          class="text-center max-w-[717px] mx-auto text-[14px] md:text-[16px] leading-[24px] font-medium text-[#fff]"
        >
          Leverage agile frameworks to provide a robust synopsis for strategy
          foster collaborative thinking to further the overall value.
        </p>
        <form class="mt-[46px]">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-[24px] md:gap-[48px]">
            <div>
              <label
                class="text-[16px] md:text-[18px] lg:text-[20px] block text-[#fff] font-bold mb-[12px] md:mb-[19px] leading-[24px] md:leading-[30px]"
                for="name"
              >
                Full name *
              </label>
              <input
                name="name"
                placeholder="John David"
                class="bg-transparent w-full text-[#808080] text-[14px] md:text-[18px] lg:text-[20px] p-[16px] md:p-[24px] lg:p-[32px] border-[1px] border-[#DCDCDC] rounded-[12px] md:rounded-[20px]"
                type="text"
                required
              />
            </div>
            <div>
              <label
                class="text-[16px] md:text-[18px] lg:text-[20px] block text-[#fff] font-bold mb-[12px] md:mb-[19px] leading-[24px] md:leading-[30px]"
                for="email"
              >
                Your email *
              </label>
              <input
                name="email"
                type="email"
                placeholder="John David"
                class="bg-transparent w-full text-[14px] md:text-[18px] lg:text-[20px] p-[16px] md:p-[24px] lg:p-[32px] border-[1px] border-[#DCDCDC] rounded-[12px] md:rounded-[20px]"
                required
              />
            </div>
            <div>
              <label
                class="text-[16px] md:text-[18px] lg:text-[20px] block text-[#fff] font-bold mb-[12px] md:mb-[19px] leading-[24px] md:leading-[30px]"
                for="company"
              >
                Company *
              </label>
              <input
                id="company"
                name="company"
                type="text"
                placeholder="your company name here"
                class="bg-transparent w-full text-[14px] md:text-[18px] lg:text-[20px] p-[16px] md:p-[24px] lg:p-[32px] border-[1px] border-[#DCDCDC] rounded-[12px] md:rounded-[20px]"
                required
              />
            </div>

            <div>
              <label
                class="text-[16px] md:text-[18px] lg:text-[20px] block text-[#fff] font-bold mb-[12px] md:mb-[19px] leading-[24px] md:leading-[30px]"
                for="subject"
              >
                Subject *
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="How can we Help"
                class="bg-transparent w-full text-[14px] md:text-[18px] lg:text-[20px] p-[16px] md:p-[24px] lg:p-[32px] border-[1px] border-[#DCDCDC] rounded-[12px] md:rounded-[20px]"
                required
              />
            </div>
          </div>
          <div class="mt-[24px] md:mt-[48px]">
            <label
              class="text-[16px] md:text-[18px] lg:text-[20px] block text-[#fff] font-bold mb-[12px] md:mb-[19px] leading-[24px] md:leading-[30px]"
              for="message"
            >
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              type="text"
              rows="6"
              placeholder="How can we Help"
              class="bg-transparent w-full text-[14px] md:text-[18px] lg:text-[20px] p-[16px] md:p-[24px] lg:p-[32px] border-[1px] border-[#DCDCDC] rounded-[12px] md:rounded-[20px]"
              required
            />
          </div>
          <div class="flex justify-center">
            <Button
              variant="withIcon"
              size="lg"
              rounded="lg"
              class="mt-[46px] mx-auto"
              >Get Started
              <div
                class="bg-[#000E18] rounded-full p-[14px] ml-[10px] mr-[-20px]"
              >
                <img
                  src="/images/icons/mail-white.svg"
                  alt="Mail Icon"
                  class="h-[20px] w-[20px] object-contain"
                />
              </div>
            </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script></script>

<style></style>
