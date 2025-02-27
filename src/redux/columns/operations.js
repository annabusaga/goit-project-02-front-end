import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

axios.defaults.baseURL =
  "https://goit-project-02-back-end.onrender.com/api-docs/";

export const onAddColumn = createAsyncThunk(
  "columns/addColumn",
  async ({ boardId, newColumn }, thunkAPI) => {
    console.log("Attempting to add column:", { boardId, newColumn }); // Логируем входные параметры
    try {
      const response = await axios.post(
        // "/boards/${boardId}/columns",
        `columns`,
        newColumn
      );
      toast.success("Column created successfully!", {
        duration: 4000,
        position: "top-center",
        icon: "✔️",
      });
      return { boardId, column: response.data };
    } catch (error) {
      toast.error("Failed to create column: " + error.message, {
        duration: 5000,
        position: "top-center",
        icon: "❌",
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const onDeleteColumn = createAsyncThunk(
  "columns/deleteColumn",
  async ({ boardId, columnId }, thunkAPI) => {
    try {
      await axios.delete(
        // `/boards/${boardId}/columns/${columnId}`
        ` columns/${columnId}`
      );
      toast.success("Column deleted!", {
        duration: 4000,
        position: "top-center",
        icon: "✔️",
      });
      return { boardId, columnId };
    } catch (error) {
      toast.error("Failed to delete column: " + error.message, {
        duration: 5000,
        position: "top-center",
        icon: "❌",
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const onEditColumn = createAsyncThunk(
  "column/editColumn",
  async ({ boardId, columnId, updateColumn }, thunkAPI) => {
    try {
      const response = await axios.patch(
        // `/boards/${boardId}/columns/${columnId}`,
        ` columns/${columnId}`,
        updateColumn
      );
      toast.success("Column updated successfully!", {
        duration: 4000,
        position: "top-center",
        icon: "✔️",
      });
      return { boardId, updatedColumn: response.data };
    } catch (error) {
      toast.error("Failed to update column: " + error.message, {
        duration: 5000,
        position: "top-center",
        icon: "❌",
      });
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
