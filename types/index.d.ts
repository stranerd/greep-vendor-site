declare module "lucide-vue-next";
declare module "zod";
declare module "vee-validate";
declare module "@vee-validate/zod";
declare module "@placetopay/iconsax-vue/outline";

type QueryCondition =
  | "eq"
  | "exists"
  | "gt"
  | "gte"
  | "in"
  | "lt"
  | "lte"
  | "ne"
  | "nin";

export interface IApiQuery {
  where: {
    field: string | string[];
    condition: QueryCondition;
  };
  value: any;
  whereType?: "and" | "or";
  limit?: number;
  all?: boolean;
  page?: number;
}
