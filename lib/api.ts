import axios from 'axios';
import type { Note, CreateNote } from '@/types/note';

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export const fetchNotes = async (
  page: number = 1,
  search: string = ''
): Promise<NotesResponse> => {
  const response = await axios.get<NotesResponse>('/notes', {
    params: {
      page,
      search,
      perPage: 12,
    },
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await axios.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (note: CreateNote): Promise<Note> => {
  const response = await axios.post<Note>('/notes', note);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await axios.delete<Note>(`/notes/${id}`);
  return response.data;
};