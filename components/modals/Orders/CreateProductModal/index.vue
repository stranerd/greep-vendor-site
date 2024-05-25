<template>
  <Dialog>
    <DialogTrigger>
      <Button variant="primary" size="lg" rounded="md"
        ><CirclePlus class="h-5 w-5 mr-[10px]" /> Create Item</Button
      >
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>New Item</DialogTitle>
      </DialogHeader>
      <DialogDescription>
        <CreateProductForm />
      </DialogDescription>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { Search, CirclePlus } from "lucide-vue-next";
</script>

<style></style>
