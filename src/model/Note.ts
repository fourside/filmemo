import { format } from "date-fns";

export type Note = {
  id?: string;
  rating: number;
  where: string;
  when: string;
  text?: string;
  bookmarkId: string;
  owner?: string;
};

const FORMAT_DATE = "yyyy/MM/dd";

export const formatDate = (date?: Date) => {
  const d = date ?? new Date();
  return format(d, FORMAT_DATE);
};

export const validate = (note: Note) => {
  const valid = note.rating > 0
    && !!note.when
    && !!note.where;
  return valid;
};
