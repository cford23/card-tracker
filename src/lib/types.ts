export type Parallel = {
  id: number;
  name: string;
  numbered?: number | null;
  owned: boolean;
  purchasePrice?: number;
  purchaseDate?: Date
}

export type Card = {
  id: number;
  set: string;
  number: string;
  player: string;
  parallels: Parallel[];
};