export interface Owner {
  name: string;
  gender: "Male" | "Female";
  age: number;
  pets?: Pet[];
}

interface Pet {
  name: string;
  type: "Cat" | "Dog" | "Fish";
}

export type PetWithOwner = Pet & { owner: Owner; id: string };

export enum GenderEnum {
  male = "Male",
  female = "Female",
}

export interface PetsState {
  data: PetWithOwner[] | [];
  status: "init" | "loading" | "loaded" | "error";
  error: string | null;
}

export type Action =
  | { type: "get_owners" }
  | { type: "get_owners_success"; payload: PetWithOwner[] }
  | { type: "get_owners_fail"; error: string };
