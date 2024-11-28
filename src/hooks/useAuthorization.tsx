import { useEffect, useState } from "react";
import User from "@/domains/user/user";

const useAuthorization = (): User | null => {
  const [loginData, setLoginData] = useState<User | null>(null);

  useEffect(() => {
    const fetchLoginData = async () => {
      try {
        const response = await fetch("/Me");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setLoginData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchLoginData().then((r) => {});
  }, []);

  return loginData;
};

export default useAuthorization;
