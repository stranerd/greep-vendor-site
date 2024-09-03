import { defineStore } from "pinia";

interface State {
  showModal: boolean;
  files: File[];
  uploading: boolean;
  upload_progress: number;
  resolve: any;
  reject: any;
  dataTypes: string | string[];
  acceptedTypes: any | string | string[];
}

export const useUploadStore = defineStore("upload", {
  state: (): State => ({
    showModal: false,
    uploading: false,
    upload_progress: 1,
    files: [],
    resolve: null,
    reject: null,
    dataTypes: ["image/jpeg", "image/jpg", "image/png"],
    acceptedTypes: "image/jpeg,image/jpg,image/png,application/pdf",
  }),

  getters: {},

  actions: {
    async openModal() {
      this.showModal = true;
      return new Promise<File[]>((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },

    upload() {
      this.uploading = true;
      if (this.resolve) {
        this.resolve(this.files);
      }
    },

    closeModal() {
      this.showModal = false;
      this.$reset();
    },

    cancel() {
      if (this.reject) {
        this.reject(false);
      }
      this.$reset();
      this.closeModal();
    },

    uploadComplete() {
      this.uploading = false;
      this.closeModal();
    },

    uploadFailed() {
      this.uploading = false;
      this.resolve = null;
      this.reject = null;
    },
  },

  persist: false,
});
