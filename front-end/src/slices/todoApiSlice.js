import { apiSlice } from "./apiSlice";

const todoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => ({
        url: "/api/todo",
      }),
    }),
    createTodo: builder.mutation({
      query: (data) => ({
        url: "/api/todo/create",
        method: "POST",
        body: data,
      }),
    }),
    updateTodo: builder.mutation({
      query: (data) => ({
        url: "/api/todo/update",
        method: "PATCH",
        body: data,
      }),
    }),
    deleteTodo: builder.mutation({
      query: (params) => ({
        url: "/api/todo/delete",
        method: "DELETE",
        params,
      }),
    }),
    getTodoById: builder.query({
      query: (id) => ({
        url: `/api/todo/${id}`,
      }),
    }),
  }),
});

export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useGetTodoByIdQuery,
} = todoApiSlice;
