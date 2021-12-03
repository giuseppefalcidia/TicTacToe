import React, { useContext, useEffect, useCallback } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
// import { useContacts } from './ContactsProvider'; //? For having friends to play with?
import { useSocket } from './SocketProvider';


const GameContext = React.createContext()

export function useGame() {
    return useContext(GameContext)
  }

// ? is id needed?
export function GameProvider({ id, children }) {
    const [position, setPosition] = useLocalStorage('position', ["","","","","","","","",""])

    const socket = useSocket()

    const updatePosition = useCallback(({ position, player }) => {
        console.log(position,player)
        setPosition(position)
        // setPosition(newPosition[position] = player)
    },[setPosition])

    useEffect(() => {
        if (socket == null) return

        socket.on('receive-position', updatePosition)

        return () => socket.off('receive-position')
    }, [socket, updatePosition])

    function sendPosition(position, player) {
            socket.emit('send-position', { position, player })

            updatePosition({ position, player })
    }
    const value = {
        position,
        sendPosition,
      }

    return (
        <GameContext.Provider value={value}>
          {children}
        </GameContext.Provider>
      )
}