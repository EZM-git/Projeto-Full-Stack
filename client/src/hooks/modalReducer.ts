export type ModalType = "newSell" | "endSell" | "applyDiscount" | "seeHistory" | null;

export type ModalState = {
    isOpen: boolean;
    type: ModalType;
};

export type ModalAction =
    | { type: "openModal"; payload: ModalType }
    | { type: "closeModal" };

export function modalReducer(state: ModalState, action: ModalAction): ModalState {
    switch (action.type) {
        case "openModal":
            return { isOpen: true, type: action.payload };
        case "closeModal":
            return { isOpen: false, type: null };
        default:
            return state;
    }
}