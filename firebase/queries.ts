import { useState, useEffect } from "react";
import { getUserServices } from "./firestore";
import { User } from "firebase/auth";

type UseServicesQueryResult = {
    loading: boolean;
    services: any[];
    error: Error | null;
};

export function useServicesQuery(user: User | null): UseServicesQueryResult {
    const [loading, setLoading] = useState(true);
    const [services, setServices] = useState<any[]>([]);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!user) {
            setLoading(false);
            setServices([]);
            return;
        } else {
            setLoading(true);
        }

        const fetchServices = async () => {
            const resp = await getUserServices(user.uid);
            setServices(resp);
            setLoading(false);
        };

        try {
            fetchServices();
        } catch (e: any) {
            setError(e);
            setLoading(false);
            setServices([]);
            return;
        }
    }, [user]);

    return { loading, services, error };
}