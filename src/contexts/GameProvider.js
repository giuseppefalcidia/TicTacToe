import React, { useContext, useEffect, useCallback } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
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

    if(socket) {
        console.log(socket)
    }
    

    const updatePosition = useCallback(({ index, player }) => {
        console.log(index,player)
        position[index] = player
        setPosition(position)
        // setPosition(newPosition[position] = player)
    },[setPosition])

    useEffect(() => {
        if (socket == null) return

        socket.on('receive-position', updatePosition)

        return () => socket.off('receive-position')
    }, [socket, updatePosition])

    function sendPosition(index, player) {
            socket.emit('send-position', { index, player })

            updatePosition({ index, player })
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