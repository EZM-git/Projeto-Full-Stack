export type HistoryAction =
    | { type: "openHistory" }
    | { type: "closeHistory" };

export function historyReducer(state: boolean, action: HistoryAction): boolean {
    switch (action.type) {
        case "openHistory":
            return true;
        case "closeHistory":
            return false;
        default:
            return state;
    }
}