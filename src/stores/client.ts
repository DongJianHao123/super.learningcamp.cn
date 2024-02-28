import { IClient } from "core/types/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface LoginState {
    client: IClient | null;
    setClient: (info: IClient) => void;
}

const useLoginStore = create<LoginState>()(
    persist(
        (set) => ({
            client: null,
            setClient: (client) => set(() => ({ client: client })),
        }),
        {
            name: "client",
        }
    )
);

export default useLoginStore;
