"use client"
import store from '@/redux/store'
import React from 'react'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify';

const AuthWrapper = ({children}: {children: React.ReactNode}) => {
  return (
    <Provider store={store}>
      {children}
      <ToastContainer></ToastContainer>
    </Provider>
  )
}

export default AuthWrapper
