import React, { useContext, useEffect, useState } from 'react'
//import socket.io that we need to npm install it
import io from 'socket.io-client'

// create socket context
const SocketContext = React.createContext()

// create function to simplify the useContext
export function useSocket() {
  return useContext(SocketContext)
}

// The SocketProvider takes the id that we need to send to the server afterwards
export function SocketProvider({ id, children }) {
    // we create the socket
  const [socket, setSocket] = useState()

  useEffect(() => {
    const newSocket = io(
      'http://localhost:5000',
      // { query: { id } } //TODO readd it later when we work with the id
    )
    setSocket(newSocket)

    // this avoids having multiple socket connection opens whenever the useEffect runs for a second time that would duplicate the info
    return () => newSocket.close()
  }, [id])

  return (
      // we pass the socket throught the context
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}