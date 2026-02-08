import axios from "axios";
import type { Note, NoteTag, CreateNoteParams } from "@/types/note";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: NoteTag;
  sortBy?: "created" | "updated";
}

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

if (!token) {
  throw new Error("Missing NEXT_PUBLIC_NOTEHUB_TOKEN");
}

const axiosInstance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});


console.log("API URL:", axiosInstance.defaults.baseURL);


export async function getNotes({
  page,
  perPage,
  search,
  tag,
  sortBy = "created",
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const params = {
    page,
    perPage,
    ...(search && search.trim() ? { search: search.trim() } : {}),
    ...(tag ? { tag } : {}),
    ...(sortBy ? { sortBy } : {}),
  };

  const response = await axiosInstance.get<FetchNotesResponse>("/notes", {
    params,
  });

  return response.data;
}

export async function createNote(payload: CreateNoteParams): Promise<Note> {
  const response = await axiosInstance.post<Note>("/notes", payload, {
  });

  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await axiosInstance.delete<Note>(`/notes/${id}`, {
  });

  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await axiosInstance.get<Note>(`/notes/${id}`, {
  });

  return response.data;
}