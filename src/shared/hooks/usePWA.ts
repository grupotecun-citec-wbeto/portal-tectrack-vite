import { useRegisterSW } from 'virtual:pwa-register/react'

export function usePWA() {
  const {
    offlineReady,
    needRefresh,
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered: ', r)
    },
    onRegisterError(error) {
      console.log('SW registration error', error)
    },
  })

  const close = () => {
    // La función close se maneja internamente por el hook useRegisterSW
    window.location.reload()
  }

  return {
    offlineReady,
    needRefresh,
    updateServiceWorker,
    close
  }
}