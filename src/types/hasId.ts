export enum HasIdProperties {
  ID = 'id',
}

export type HasId<Tid = string> = {
  [HasIdProperties.ID]: Tid;
};
