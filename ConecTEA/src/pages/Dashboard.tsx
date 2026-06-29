import { useEffect } from "react";
import api from "@/services/api";

export default function Dashboard() {

  useEffect(() => {
    async function testAuth() {
      try {
        const response = await api.get("/auth");

        console.log(response.data);

      } catch (error) {
        console.error(error);
      }
    }

    testAuth();
  }, []);


  return (
    <div>
      <h1>
        Dashboard
      </h1>
    </div>
  );
}