
export enum ReasonType {
  Angry = 1,
  Happy,
}

export interface Reason {
  text: string;
  _id: string;
  type: ReasonType;
}

export interface Angry {
  _id: string;
  createAt: number;
  reasons: Reason[];
  character: string;
  rate: number;
  type: ReasonType;
  comment?: string;
}
