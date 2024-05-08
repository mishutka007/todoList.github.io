export type Tasks = {
    id: string;
    title: string;
    completed: boolean;
};
export enum filterTask {
    All = 'all',
    DONE = 'completed',
    NOTDONE = 'notcompleted',
}
