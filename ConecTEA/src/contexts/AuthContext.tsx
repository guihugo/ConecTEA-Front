import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "@/services/user";
import { getToken } from "@/storage/storage";

import type { User } from "@/types/user";

interface AuthContextData {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({
  user: null,
  loading: true,
});


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function loadUser() {
      const token = getToken();

      if (!token) {
        setLoading(false);
        return;
      }


      try {
        const response = await getCurrentUser();
        setUser(response);

      } catch (error) {
        console.error("Erro ao carregar usuário", error);
        setUser(null);
      }
      finally {
        setLoading(false);
      }
    }


    loadUser();

  }, []);


  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  return useContext(AuthContext);
}