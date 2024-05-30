import { defineStore } from "pinia";

interface ITodo {
  id: number;
  title: string;
  isDone: boolean;
}
export const useTodoStore = defineStore("todos", () => {
  const todos = ref<ITodo[] | null>([]);

  const getTodo = async () => {
    const { baseUrl, apiKey, secretKey } = useAppConfig();

    const { data, error } = await useFetch<ITodo[]>("rest/v1/todos", {
      baseURL: baseUrl,
      method: "GET",
      headers: {
        apiKey: apiKey,
        Authorization: `Bearer ${secretKey}`,
      },
    });

    if (todos) {
      todos.value = data.value;
    }

    console.log("VALUE", data.value);
    console.log("ERROR", error.value);
  };

  const addTodo = async (todo: string) => {
    const { baseUrl, apiKey, secretKey } = useAppConfig();

    const { data, error } = await useFetch<ITodo[]>("rest/v1/todos", {
      baseURL: baseUrl,
      method: "POST",
      headers: {
        apiKey: apiKey,
        Authorization: `Bearer ${secretKey}`,
      },
      body: {
        title: todo,
        isDone: false,
      },
    });

    if (error.value) {
      console.log(error.value);
      return;
    }
    todos.value = data.value;
  };

  const updateTodo = async (id: number, isDone: boolean) => {
    const { baseUrl, apiKey, secretKey } = useAppConfig();

    const { data, error } = await useFetch<ITodo[]>(
      `rest/v1/todos?id=eq.${id}`,
      {
        baseURL: baseUrl,
        method: "patch",
        headers: {
          apiKey: apiKey,
          Authorization: `Bearer ${secretKey}`,
        },
        body: {
          isDone: isDone,
        },
      }
    );

    if (error.value) {
      console.log(error.value);
      return;
    }
    todos.value = data.value;
  };

  const deleteTodo = async (id: number) => {
    const { baseUrl, apiKey, secretKey } = useAppConfig();

    const { data, error } = await useFetch<ITodo[]>(
      `rest/v1/todos?id=eq.${id}`,
      {
        baseURL: baseUrl,
        method: "delete",
        headers: {
          apiKey: apiKey,
          Authorization: `Bearer ${secretKey}`,
        },
      }
    );
    if (error.value) {
      console.log(error.value);
      return;
    }
    todos.value = data.value;
  };

  return {
    todos,
    getTodo,
    addTodo,
    updateTodo,
    deleteTodo,
  };
});
