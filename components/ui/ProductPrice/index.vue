<template>
  <div class="grid grid-cols-3 gap-2">
    <FormField name="currency" class="col-span-1">
      <FormItem class="col-span-1 flex flex-col">
        <FormLabel class="mb-[6px] block"
          >Currency <span class="text-[#FF5656]">*</span></FormLabel
        >
        <Popover>
          <PopoverTrigger as-child>
            <FormControl>
              <Button
                variant="outline"
                role="combobox"
                :class="
                  cn(
                    'w-full justify-between',
                    !values.currency && 'text-muted-foreground',
                  )
                "
              >
                {{
                  values.currency
                    ? currencies.find(
                        (currency) => currency.value === values.currency,
                      )?.label
                    : "Select currency..."
                }}
                <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent class="w-full p-0">
            <Command>
              <CommandInput placeholder="Search language..." />
              <CommandEmpty>Nothing found.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  <CommandItem
                    v-for="currency in currencies"
                    :key="currency.value"
                    :value="currency.label"
                    @select="
                      () => {
                        setFieldValue('currency', currency.value);
                      }
                    "
                  >
                    <Check
                      :class="
                        cn(
                          'mr-2 h-4 w-4',
                          currency.value === values.currency
                            ? 'opacity-100'
                            : 'opacity-0',
                        )
                      "
                    />
                    {{ currency.label }}
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="price" class="col-span-2">
      <FormItem class="col-span-2">
        <FormLabel
          >Price <span class="text-[#FF5656]">Required</span></FormLabel
        >
        <FormControl>
          <Input type="number" placeholder="Price" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
