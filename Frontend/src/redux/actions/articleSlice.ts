import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Article, ArticleBody, ArticleResponse, ArticleState } from "../../interfaces/Article";
import type { ErrorsData } from "../../interfaces/ErrorsData";

const initialState: ArticleState = {
  data: { list: [], single: null },
  requestStatus: "pending",
  errorMessage: "",
  filters: {
    page: 0,
    size: 10,
    sortBy: "id",
    sortByDirection: "asc",
    lastPage: false,
  },
};

const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(allArticleFetch.pending, state => {
        state.requestStatus = "pending";
      })
      .addCase(allArticleFetch.fulfilled, (state, action) => {
        state.requestStatus = "succeeded";
        const { articles, lastPage } = action.payload;
        if (state.filters.page === 0) {
          state.data.list = articles;
        } else {
          state.data.list = [...state.data.list, ...articles];
        }
        state.filters.lastPage = lastPage;
      })
      .addCase(allArticleFetch.rejected, (state, action) => {
        state.requestStatus = "failed";
        state.errorMessage = action.payload as string;
      })

      .addCase(articleCRUDFetch.pending, state => {
        state.requestStatus = "pending";
      })
      .addCase(articleCRUDFetch.fulfilled, (state, action) => {
        state.requestStatus = "succeeded";
        state.data.single = action.payload;
      })
      .addCase(articleCRUDFetch.rejected, (state, action) => {
        state.requestStatus = "failed";
        state.errorMessage = action.payload as string;
      });
  },
});

export const allArticleFetch = createAsyncThunk("articles/get-all", async (_, { rejectWithValue }) => {
  try {
    const resp = await fetch("http://localhost:3001/articles", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!resp.ok) {
      const errorData: ErrorsData = await resp.json();
      return rejectWithValue(errorData);
    }

    const data: ArticleResponse = await resp.json();
    return { articles: data.content, lastPage: data.last };
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const articleCRUDFetch = createAsyncThunk(
  "articles/CRUD",
  async ({ articleId, method, articleData }: { articleId: string | undefined; method: string; articleData: ArticleBody | null }, { rejectWithValue }) => {
    try {
      const endpoint = articleId ? `http://localhost:3001/articles/${articleId}` : `http://localhost:3001/articles`;
      const resp = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: method === "POST" || method === "PUT" ? JSON.stringify(articleData) : null,
      });
      if (!resp.ok) {
        const errorData: ErrorsData = await resp.json();
        return rejectWithValue(errorData);
      }

      const data: Article = await resp.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default articleSlice.reducer;
