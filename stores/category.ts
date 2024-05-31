import { defineStore } from "pinia";

interface ICategory {
  id: number;
  name: string;
}

export const useCategoryStore = defineStore("categories", () => {
  const categories = ref<ICategory[] | null>([]);

  const getCategories = async () => {
    const { baseUrl, apiKey, secretKey } = useAppConfig();

    const { data, error } = await useFetch<ICategory[]>("rest/v1/category", {
      baseURL: baseUrl,
      method: "GET",
      headers: {
        apiKey: apiKey,
        Authorization: `Bearer ${secretKey}`,
      },
    });

    if (categories) {
      categories.value = data.value;
    }

    console.log("VALUE", data.value);
    console.log("ERROR", error.value);
  };

  const addCategory = async (category: string) => {
    const { baseUrl, apiKey, secretKey } = useAppConfig();

    const { data, error } = await useFetch<ICategory[]>("rest/v1/category", {
      baseURL: baseUrl,
      method: "POST",
      headers: {
        apiKey: apiKey,
        Authorization: `Bearer ${secretKey}`,
      },
      body: {
        name: category,
      },
    });

    if (error.value) {
      console.log(error.value);
      return;
    }
    categories.value = data.value;
  };

  return {
    categories,
    getCategories,
    addCategory,
  };
});
