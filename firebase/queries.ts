import { useState, useEffect } from "react";
import { getUserServices, getServiceById } from "./firestore";
import { User } from "firebase/auth";

type UseServicesQueryResult = {
    loading: boolean;
    services: any[];
    error: Error | null;
};

type UseServiceQueryResult = {
  loading: boolean;
  service: any | null;
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

export function useServiceQuery(serviceId: string | null): UseServiceQueryResult {
  const [loading, setLoading] = useState(true);
  const [service, setService] = useState<any | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!serviceId) {
      setLoading(false);
      setService(null);
      return;
    } else {
      setLoading(true);
    }

    const fetchService = async () => {
      try {
        const resp = await getServiceById(serviceId);
        setService(resp);
        setLoading(false);
      } catch (e: any) {
        setError(e);
        setLoading(false);
        setService(null);
      }
    };

    fetchService();
  }, [serviceId]);

  return { loading, service, error };
}