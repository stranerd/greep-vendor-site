<template>
  <div class="mt-4 max-h-[80vh] w-full overflow-auto">
    <form class="space-y-8 p-2" @submit="createNewFoodProduct">
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
        <div class="grids hidden gap-2">
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
              v-for="(framework, index) in selectedValues"
              :key="framework.value"
              variant="outline"
              class="mb-2 mr-2 px-3 py-2 capitalize"
            >
              {{ framework.title }}
              <X
                class="ml-3 h-[16px] w-[16px]"
                @click="selectedValues.splice(index, 1)"
              />
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
                <span class="truncate capitalize text-[#64748B]">
                  {{
                    selectedValues.length === 0
                      ? "Select categories"
                      : selectedValues.length === 1
                        ? selectedValues[0].title
                        : selectedValues.length === 2
                          ? selectedValues.map(({ title }) => title).join(", ")
                          : `${selectedValues.length} tags selected`
                  }}
                </span>
                <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent class="w-[350px] p-0">
              <Command loop>
                <CommandInput
                  placeholder="Search category..."
                  v-if="
                    marketplaceLoadingStates.getRecommendedFoodsTags !==
                    API_STATES.LOADING
                  "
                />
                <template
                  v-if="
                    marketplaceLoadingStates.getRecommendedFoodsTags ===
                    API_STATES.LOADING
                  "
                >
                  <div class="grid gap-1 p-4">
                    <Skeleton
                      class="h-[20px] w-full bg-gray-200"
                      v-for="i in 5"
                    />
                  </div>
                </template>

                <CommandList v-else>
                  <CommandGroup class="max-h-[145px] overflow-auto">
                    <CommandItem
                      v-for="tag in productFoodTagItems"
                      :key="tag.id"
                      :value="tag.id"
                      @select="toggleCategory(tag)"
                    >
                      <ReserveIcon
                        class="mr-2 h-4 w-4 text-black"
                        :class="{
                          'stroke-primary stroke-1 text-primary opacity-100':
                            selectedValues.some((i) => i.id === tag.id),
                          'opacity-100': !selectedValues.some(
                            (i) => i.id === tag.id,
                          ),
                        }"
                      />
                      <div
                        class="flex-1 capitalize"
                        :class="{
                          'font-semibold text-primary opacity-100':
                            selectedValues.some((i) => i.id === tag.id),
                        }"
                      >
                        {{ tag.title }}
                      </div>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
                <CommandEmpty
                  v-if="
                    marketplaceLoadingStates.getRecommendedFoodsTags !==
                    API_STATES.LOADING
                  "
                >
                  <div class="">
                    <h2 class="my-2">No category found.</h2>
                    <button
                      variant="outline"
                      class="mx-auto flex w-[98%] justify-center rounded-sm bg-[#F1F5F9] p-2 text-center text-xs text-muted-foreground"
                      @click="openCreateCategoryModal = true"
                    >
                      <div class="mr-2 h-4 w-4"></div>
                      <CirclePlus class="mr-2 h-4 w-4" />
                      Create a new category
                    </button>
                  </div>
                </CommandEmpty>
                <CommandSeparator alwaysRender />
                <CommandGroup>
                  <CommandItem
                    value="createCategory"
                    class="text-xs text-muted-foreground"
                    @select="openCreateCategoryModal = true"
                  >
                    <div class="mr-2 h-4 w-4"></div>
                    <CirclePlus class="mr-2 h-4 w-4" />
                    Create a new category
                  </CommandItem>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div class="grids gap-2">
          <FormField v-slot="{ componentField }" name="add_ons">
            <FormItem>
              <FormLabel>Add On settings</FormLabel>
              <FormDescription>
                Create side items that come with your food
                <AddOnsForm
                  @create-addons="(val) => (addOns = val)"
                  :initialAddOnList="selectedProduct.addOns"
                />
              </FormDescription>
            </FormItem>
          </FormField>
        </div>
        <div class="grid gap-2" v-if="mode === 'create'">
          <FormField name="banner" v-slot="{ handleChange }">
            <FormItem>
              <FormLabel
                >Cover Image
                <span class="text-[#FF5656]">Required</span></FormLabel
              >
              <FormControl>
                <Input
                  type="file"
                  placeholder="File"
                  @change="handleChange"
                  v-model="file"
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
          <h2 class="font-medium">
            Preparation Time (in Minutes)
            <span class="text-[#FF5656]">Required</span>
          </h2>
          <div class="grid grid-cols-2 gap-x-10">
            <FormField v-slot="{ componentField }" name="from_time">
              <FormItem>
                <FormControl>
                  <FormLabel class="text-xs"
                    >Minimum Time
                    <span class="text-[#FF5656]">*</span></FormLabel
                  >
                  <Input
                    type="number"
                    placeholder="10"
                    v-bind="componentField"
                  />
                </FormControl>
                <!-- <FormDescription>
                    This is your public display name.
                  </FormDescription> -->
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="to_time">
              <FormItem>
                <FormControl>
                  <FormLabel class="text-xs"
                    >Maximum Time
                    <span class="text-[#FF5656]">*</span></FormLabel
                  >
                  <Input
                    type="number"
                    :placeholder="30"
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
              marketplaceLoadingStates.createProduct === API_STATES.LOADING ||
              marketplaceLoadingStates.updateProduct === API_STATES.LOADING
            "
            @click="openConfirmDialog = true"
            :disabled="
              Object.keys(errors).length > 0 ||
              (mode === 'create' && file === null) ||
              marketplaceLoadingStates.createProduct === API_STATES.LOADING ||
              marketplaceLoadingStates.updateProduct === API_STATES.LOADING
            "
          >
            {{ mode === "create" ? "Submit" : "Update" }} Item
          </Button>
        </div>
      </div>
    </form>

    <Dialog class="max-h-[78vh] !max-w-[200px]" :open="openCreateCategoryModal">
      <DialogContent :hideClose="true">
        <DialogHeader>
          <DialogTitle>Create New Category </DialogTitle>
          <X
            @click="openCreateCategoryModal = false"
            class="2-4 absolute right-4 top-4 h-4 cursor-pointer rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          />
        </DialogHeader>
        <DialogDescription class="z-10">
          <div class="grid gap-2">
            <FormField v-slot="{ componentField }" name="description">
              <FormItem>
                <FormLabel>
                  Title
                  <span class="font-normal text-red-400">required</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Text Here..."
                    v-bind="componentField"
                    v-model="newCategoryTitle"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
        </DialogDescription>
        <div class="mt-4 flex items-center justify-end">
          <Button
            type="submit"
            class="rounded-[12px]"
            :disabled="!newCategoryTitle"
            @click="openConfirmCreateCategoryModal"
          >
            Create Category
          </Button>
        </div>
      </DialogContent>
    </Dialog>

    <AlertDialog v-model:open="confirmCreateCategoryTag">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create New Item</AlertDialogTitle>
          <AlertDialogDescription>
            You want to create a new item
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction @click="createFoodCategoryTag"
            ><Button
              :loading="
                marketplaceLoadingStates.createProductCategory ===
                API_STATES.LOADING
              "
              >Continue</Button
            ></AlertDialogAction
          >
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
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
import { useToast } from "@/components/library/toast/use-toast";

const props = defineProps({
  mode: {
    type: String as PropType<"create" | "edit">,
    default: "create",
  },
  selectedProduct: {
    type: Object,
    default: () => {},
  },
});

// const { $api,  } = useNuxtApp();

const { toast } = useToast();
const marketPlaceStore = useMarketPlaceStore();
const { marketplaceLoadingStates, productFoodsTags, productFoodTagItems } =
  storeToRefs(useMarketPlaceStore());
const {
  createProduct,
  updateProduct,
  getProductFoodsTags,
  getAllProducts,
  createProductCategoryTag,
} = marketPlaceStore;
const file = ref<File | null>(null);
const initialAddOnList = ref<any>({});

const emits = defineEmits(["completed"]);
const openCombobox = ref<boolean>(false);
const openCreateCategoryModal = ref<boolean>(false);
const confirmCreateCategoryTag = ref<boolean>(false);
const newCategoryTitle = ref<string>("");
const selectedValues = ref<any[]>([]);
const openConfirmDialog = ref(false);
const addOns = ref<any[]>([]);

const toggleCategory = (tag: any) => {
  if (!selectedValues.value.some((i) => i.id === tag.id)) {
    selectedValues.value = [...selectedValues.value, tag];
  } else {
    selectedValues.value = selectedValues.value.filter(
      (item: any) => item.id !== tag.id,
    );
  }
};

const openConfirmCreateCategoryModal = () => {
  if (newCategoryTitle.value) {
    openCreateCategoryModal.value = false;
    confirmCreateCategoryTag.value = true;
  }
};

const schemaShape = ref({
  title: z.string().min(3, {
    message: "Title cannot be less than 3 characters",
  }),
  no_of_items: z.number().optional(),
  description: z.string().optional(),
  price: z.number({
    required_error: "Price cannot be empty",
  }),
  from_time: z.number({
    required_error: "Minimum time cannot be  empty",
  }),
  to_time: z.number({
    required_error: "Maximum time cannot be empty",
  }),
  inStock: z.boolean(),
});

const toTimeRefinement = (data: any, ctx: any) => {
  if (data.to_time < data.from_time + 15) {
    ctx.addIssue({
      path: ["to_time"],
      message:
        "Maximum time must be at least 15 minutes higher than the minimum time",
    });
  }
};

let formSchema =
  props.mode === "edit"
    ? toTypedSchema(
        z.object({ ...schemaShape.value }).superRefine(toTimeRefinement),
      )
    : toTypedSchema(
        z
          .object({
            ...schemaShape.value,
            banner: z.any({
              required_error: "Image is required",
            }),
          })
          .superRefine(toTimeRefinement),
      );

const { handleSubmit, resetForm, setFieldValue, errors } = useForm({
  validationSchema: formSchema,
  initialValues: {
    inStock: true,
  },
});

const openCreateProductModal = () => {
  openConfirmDialog.value = true;
};

const createNewFoodProduct = handleSubmit(async (values: any) => {
  const form = new FormData();
  const prepTimeInMins = {
    from: 0,
    to: 0,
  };
  const tagIds = selectedValues.value.map((tag) => tag.id);
  Object.keys({ ...values, tagIds }).forEach((item) => {
    if (item === "price") {
      form.append(
        item,
        JSON.stringify({ amount: values[item], currency: "TRY" }),
      );
    } else if (item === "tagIds") {
      form.append(item, JSON.stringify(tagIds));
    } else if (item === "from_time") {
      prepTimeInMins.from = values.from_time;
    } else if (item === "to_time") {
      prepTimeInMins.to = values.to_time;
    } else {
      form.append(item, values[item]);
    }
  });

  form.append("data", JSON.stringify({ type: "foods", prepTimeInMins }));
  form.append("addOns", JSON.stringify(addOns.value));
  console.log({ banner: values.banner });

  if (props.mode === "edit") {
    await updateProduct(props.selectedProduct.id, form);
    toast({
      description: "Product updated successfully!",
    });
  } else {
    await createProduct(form);
    toast({
      description: "Product added successfully!",
    });
  }
  await getAllProducts();
  emits("completed");
});

const categorySchema = toTypedSchema(
  z.object({
    title: z.string({ message: "Title is required" }).min(3, {
      message: "Title cannot be less than 3 characters",
    }),
  }),
);

// const { handleSubmit: handleCreateCategory, resetForm: resetCreateCategory } =
//   useForm({
//     validationSchema: categorySchema,
//   });

// const createCategory = handleCreateCategory(async (values) => {});

const createFoodCategoryTag = async () => {
  await createProductCategoryTag({
    title: newCategoryTitle.value,
    type: "productsFoods",
    photo: null,
  });

  newCategoryTitle.value = "";
  await getProductFoodsTags();
};

onMounted(async () => {
  await getProductFoodsTags();
});

onMounted(async () => {
  if (props.mode === "edit" && props.selectedProduct) {
    const { inStock, title, description, price, banner, data, tagIds, addOns } =
      props.selectedProduct;
    selectedValues.value = productFoodTagItems.value.filter((tag) =>
      tagIds.includes(tag.id),
    );

    initialAddOnList.value = addOns;

    resetForm({
      values: {
        inStock,
        title,
        description,
        from_time: data?.prepTimeInMins?.from,
        to_time: data?.prepTimeInMins?.to,
        price: price.amount,
      },
    });

    // .map((tag) => tag.id);
    console.log({ selectedProduct: props.selectedProduct });
  }
});

onUpdated(async () => {
  await getProductFoodsTags();
});
</script>

<style></style>
