"use client"

import { createContext, useContext, useState, useReducer,ReactNode } from 'react';
import { config, passport } from '@imtbl/sdk';

const passportConfig = {
  baseConfig: new config.ImmutableConfiguration({
    environment: config.Environment.SANDBOX
  }),
  clientId: 'nIgVy0kk541tI5t2ce0PwwS00EITVpwR',
  redirectUri: 'http://localhost:3000/passport/redirect',
  logoutRedirectUri: 'http://localhost:3000/passport',
  audience: 'platform_api',
  scope: 'openid offline_access email transact'
};



const passportInstance = typeof window !== 'undefined' ? new passport.Passport(passportConfig) : undefined

export const MyContext = createContext(null);

export function MyProvider({ children }:{children:ReactNode}) {
  const [passportState] = useState(passportInstance ?? "");
  const [userInfo, dispatch] = useReducer(reducer, { address: null, email: null, nickname: null, idToken: null, accessToken: null })
  const [showConfetti, setShowConfetti] = useState(false)

  function reducer(state:any, action:any) {
    const key = action.key
    const value = action.value
    switch (action.type) {
      case `add_user_info`: {
        return {
          ...state,
          [key]: value
        }
      }
      default: return state
    }
  }

  return (
    <MyContext.Provider value={{ passportState, userInfo, dispatch, showConfetti, setShowConfetti }}>
      {children}
    </MyContext.Provider>
  );
}

export function useMyContext() {
  return useContext(MyContext);
}
