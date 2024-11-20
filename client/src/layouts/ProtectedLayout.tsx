import { Skeleton } from "@/components/ui/skeleton";
import { apiClient } from "@/lib/api-client";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import toast from 'react-hot-toast';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await apiClient.get("/auth/isLoggedIn");
        setIsAuthenticated(res.status === 200);
      } catch (error) {
        toast.error("Please login to continue!")
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <div className="flex flex-col space-y-3 justify-center items-center h-screen">
    <Skeleton className="h-[125px] w-[250px] rounded-xl" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  </div>;

  return isAuthenticated ? children : <Navigate to="/auth" />;
};