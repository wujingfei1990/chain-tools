"use client"

import { useEffect } from 'react';
import { useMyContext } from "@/context/passport";

export default function Page() {
  const { passportState: passportInstance,  } = useMyContext();
  useEffect(() => {
    async function handleLoginCallback() {
      if (!passportInstance) {
        return
      }
    try {
        console.log("login callback");
        await passportInstance.loginCallback();
    }
    catch (err) {
        console.error("login callback error", err);
    }
    }
    handleLoginCallback()
  }, []);

  return
}
