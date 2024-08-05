export enum ObjectWithIdProperties {
  ID = 'id',
}

export type ObjectWithId<Tid = string> = {
  [ObjectWithIdProperties.ID]: Tid;
};
