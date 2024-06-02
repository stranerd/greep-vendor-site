<template>
  <div class="grid gap-4 mt-4">
    <form class="space-y-8" @submit="onSubmit">
      <div class="grid gap-4">
        <div class="grid gap-2">
          <FormField v-slot="{ componentField }" name="title">
            <FormItem>
              <FormLabel
                >Item name
                <span class="text-[#FF5656]">Required</span></FormLabel
              >
              <FormControl>
                <Input type="text" placeholder="Rice" v-bind="componentField" />
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
              <FormLabel
                >Item description
                <span class="text-[#FF5656]">Required</span></FormLabel
              >
              <FormControl>
                <Textarea
                  placeholder="Type description"
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
        <div>
          <Label>Set Category </Label>
          <div class="relative mt-3 h-auto overflow-y-auto">
            <Badge
              v-for="framework in selectedValues"
              :key="framework.value"
              variant="outline"
              class="mr-2 py-2 px-3 mb-2"
            >
              {{ framework.label }}
              <X class="h-[16px] w-[16px] ml-3" />
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
                      ? "Select labels"
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
                  placeholder="Search framework..."
                  v-model="inputValue"
                />
                <CommandGroup class="max-h-[145px] overflow-auto">
                  <CommandItem
                    v-for="framework in frameworks"
                    :key="framework.value"
                    :value="framework.value"
                    @select="toggleFramework(framework)"
                  >
                    <Check
                      class="mr-2 h-4 w-4"
                      :class="{
                        'opacity-100': selectedValues.includes(framework),
                        'opacity-0': !selectedValues.includes(framework),
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
          <FormField v-slot="{ componentField }" name="price">
            <FormItem>
              <FormLabel
                >Price <span class="text-[#FF5656]">Required</span></FormLabel
              >
              <FormControl>
                <Input
                  type="number"
                  placeholder="Price"
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
          <FormField v-slot="{ componentField }" name="banner">
            <FormItem>
              <FormLabel
                >Item Image
                <span class="text-[#FF5656]">Required</span></FormLabel
              >
              <FormControl>
                <Input type="file" placeholder="File" v-bind="componentField" />
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
        <!-- <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Email</FormLabel>

            <Select v-bind="componentField">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Set Category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    v-for="(category, i) in categories"
                    :key="i"
                    :value="category.value"
                  >
                    {{ category.title }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        </FormField> -->

        <!-- <Dialog
          :open="openDialog"
          @update:open="
            (open) => {
              if (!open) openCombobox = true;
              openDialog = open;
            }
          "
        >
          <DialogContent class="max-h-[90vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>Edit Labels</DialogTitle>
              <DialogDescription>
                Change the label names or delete the labels. Create a label
                through the combobox though.
              </DialogDescription>
            </DialogHeader>
            <div class="overflow-scroll -mx-6 px-6 flex-1 py-2">
              <form action="">ajkabsuka</form>
            </div>
            <DialogFooter class="bg-opacity-40">
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog> -->

        <div class="flex items-center justify-end mt-4">
          <Button variant="ghost" class="rounded-[12px] mr-3"> Cancel </Button>

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

const marketPlaceStore = useMarketPlaceStore();
const { marketplaceLoadingStates } = storeToRefs(marketPlaceStore);

const { createProduct } = marketPlaceStore;

const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(3, {
      message: "Title cannot be less than 3 characters",
    }),
    description: z.string({
      required_error: "Description cannot be empty",
    }),
    price: z.number({
      required_error: "Price cannot be empty",
    }),
    banner: z.any({
      required_error: "Image is required",
    }),
    inStock: z.boolean(),
  })
);

const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
  initialValues: {
    inStock: true,
  },
});

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
      (l: any) => l.value !== framework.value
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
        JSON.stringify({ amount: values[item], currency: "NGN" })
      );
    } else if (item === "tagIds") {
      form.append(item, JSON.stringify([]));
    } else {
      form.append(item, values[item]);
    }
  });
  await createProduct(form);
  emits("completed");
  // loginUser(values);
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
