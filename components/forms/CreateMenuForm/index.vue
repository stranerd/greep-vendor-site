<template>
  <div class="mt-4 grid max-h-[80vh] gap-4 overflow-auto pr-2">
    <form class="space-y-8" @submit="onSubmit">
      <div class="grid gap-4">
        <div class="grid gap-2">
          <FormField v-slot="{ componentField }" name="title">
            <FormItem>
              <FormLabel
                >Item name
                <span class="font-normal text-[#FF5656]"
                  >Required</span
                ></FormLabel
              >
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter name of dish..."
                  v-bind="componentField"
                />
              </FormControl>
              <!-- <FormDescription>
                  This is your public display name.
                </FormDescription> -->
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <div class="grid gap-2">
          <FormField v-slot="{ componentField }" name="no_of_items">
            <FormItem>
              <FormLabel>
                No Of Items
                <span class="font-normal text-gray-400">Optional</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter number of items available (Leave empty if there’s no limit)"
                  v-bind="componentField"
                />
              </FormControl>
              <!-- <FormDescription>
                      This is your public display name.
                    </FormDescription> -->
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <div class="grid gap-2">
          <FormField v-slot="{ componentField }" name="description">
            <FormItem>
              <FormLabel>
                Description
                <span class="font-normal text-gray-400">Optional</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter Text Here..."
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <div>
          <Label>Set Category </Label>
          <div class="relative mt-3 h-auto overflow-y-auto">
            <Badge
              v-for="framework in selectedValues"
              :key="framework.value"
              variant="outline"
              class="mb-2 mr-2 px-3 py-2"
            >
              {{ framework.label }}
              <X class="ml-3 h-[16px] w-[16px]" />
            </Badge>
          </div>
          <Popover v-model:open="openCombobox">
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                :aria-expanded="openCombobox"
                class="w-full justify-between text-foreground"
              >
                <span class="truncate text-[#64748B]">
                  {{
                    selectedValues.length === 0
                      ? "Select categories"
                      : selectedValues.length === 1
                        ? selectedValues[0].label
                        : selectedValues.length === 2
                          ? selectedValues.map(({ label }) => label).join(", ")
                          : `${selectedValues.length} labels selected`
                  }}
                </span>
                <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent class="w-[350px] p-0">
              <Command loop>
                <CommandInput
                  placeholder="Search category..."
                  v-model="inputValue"
                />
                <CommandGroup class="max-h-[145px] overflow-auto">
                  <CommandItem
                    v-for="framework in frameworks"
                    :key="framework.value"
                    :value="framework.value"
                    @select="toggleFramework(framework)"
                  >
                    <ReserveIcon
                      class="mr-2 h-4 w-4 text-black"
                      :class="{
                        'text-primary opacity-100':
                          selectedValues.includes(framework),
                        'opacity-100': !selectedValues.includes(framework),
                      }"
                    />
                    <div class="flex-1">{{ framework.label }}</div>
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator alwaysRender />
                <CommandGroup>
                  <CommandItem
                    :value="`:${inputValue}:`"
                    class="text-xs text-muted-foreground"
                    @select="openDialog = true"
                  >
                    <div class="mr-2 h-4 w-4"></div>
                    <CirclePlus class="mr-2 h-2.5 w-2.5" />
                    Create a new category
                  </CommandItem>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div class="grid gap-2">
          <FormField v-slot="{ componentField }" name="add_ons">
            <FormItem>
              <FormLabel>Add On settings</FormLabel>
              <FormDescription>
                Create side items that come with your food
                <AddOnsForm />
              </FormDescription>
            </FormItem>
          </FormField>
        </div>
        <div class="grid gap-2">
          <FormField name="banner" v-slot="{ handleChange }">
            <FormItem>
              <FormLabel
                >Cover Image
                <span class="text-[#FF5656]">Required</span></FormLabel
              >
              <FormControl>
                <Input type="file" placeholder="File" @change="handleChange" />
              </FormControl>
              <!-- <FormDescription>
                    This is your public display name.
                  </FormDescription> -->
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <div class="grid gap-2">
          <FormField v-slot="{ value, handleChange }" name="inStock">
            <FormItem>
              <FormControl>
                <div class="flex items-center gap-[8px]">
                  <Switch
                    id="inStock"
                    :checked="value"
                    class="data-[state=checked]:bg-[#10BB76]"
                    aria-readonly
                    @update:checked="handleChange"
                  />
                  <FormLabel for="inStock">Availability</FormLabel>
                </div>
              </FormControl>
            </FormItem>
          </FormField>
        </div>

        <div class="mt-4 flex items-center justify-end">
          <Button
            variant="ghost"
            class="mr-3 rounded-[12px]"
            type="button"
            @click="emits('completed')"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            class="rounded-[12px]"
            :loading="
              marketplaceLoadingStates.createProduct === API_STATES.LOADING
            "
            @click="onSubmit"
          >
            Submit Item
          </Button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import * as z from "zod";
import { Check, ChevronsUpDown, CirclePlus, X } from "lucide-vue-next";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { API_STATES } from "~/services/constants";
import { useMarketPlaceStore } from "@/store/useMarketplace";
import { ReserveIcon } from "@placetopay/iconsax-vue/outline";

const marketPlaceStore = useMarketPlaceStore();
const { marketplaceLoadingStates } = storeToRefs(marketPlaceStore);

const { createProduct } = marketPlaceStore;

const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(3, {
      message: "Title cannot be less than 3 characters",
    }),
    no_of_items: z.string().optional(),
    description: z.string().optional(),
    price: z.number({
      required_error: "Price cannot be empty",
    }),
    banner: z.any({
      required_error: "Image is required",
    }),
    inStock: z.boolean(),
  }),
);

const { handleSubmit, resetForm, setFieldValue } = useForm({
  validationSchema: formSchema,
  initialValues: {
    inStock: true,
  },
});

const file = ref(null);
const categories = ref([
  {
    title: "Stuff",
    value: "stuff",
  },
]);

type Framework = {
  value: string;
  label: string;
};

const FRAMEWORKS: Framework[] = [
  { value: "grains", label: "Grains" },
  { value: "tubers", label: "Tubers" },
];

const frameworks = ref<Framework[]>(FRAMEWORKS);
const openCombobox = ref<boolean>(false);
const openDialog = ref<boolean>(false);
const inputValue = ref<string>("");
const selectedValues = ref<Framework[]>([]);

const toggleFramework = (framework: Framework) => {
  if (!selectedValues.value.includes(framework)) {
    selectedValues.value = [...selectedValues.value, framework];
  } else {
    selectedValues.value = selectedValues.value.filter(
      (l: any) => l.value !== framework.value,
    );
  }
};

const emits = defineEmits(["completed"]);

const onSubmit = handleSubmit(async (values: any) => {
  console.log("Form submitted!", values);
  const form = new FormData();
  Object.keys({ ...values, tagIds: [""] }).forEach((item) => {
    if (item === "price") {
      form.append(
        item,
        JSON.stringify({ amount: values[item], currency: "NGN" }),
      );
    } else if (item === "tagIds") {
      form.append(item, JSON.stringify([]));
    } else {
      form.append(item, values[item]);
    }
  });
  await createProduct(form);
  emits("completed");
});

// const accountFormSchema = toTypedSchema(
//   z.object({
//     name: z
//       .string({
//         required_error: "Required.",
//       })
//       .min(2, {
//         message: "Name must be at least 2 characters.",
//       })
//       .max(30, {
//         message: "Name must not be longer than 30 characters.",
//       }),
//     dob: z
//       .string()
//       .datetime()
//       .optional()
//       .refine(
//         (date: Date) => date !== undefined,
//         "Please select a valid date."
//       ),
//     language: z.string().min(1, "Please select a language."),
//   })
// );
</script>

<style></style>
