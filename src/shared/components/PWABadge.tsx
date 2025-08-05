import { usePWA } from '../hooks/usePWA'

export function PWABadge() {
  const { offlineReady, needRefresh, updateServiceWorker, close } = usePWA()

  if (offlineReady) {
    return (
      <div 
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: '#4CAF50',
          color: 'white',
          padding: '16px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          zIndex: 1000,
          maxWidth: '300px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}
      >
        <div style={{ fontSize: '14px', fontWeight: '500' }}>
          ✅ App ready to work offline
        </div>
        <button 
          onClick={() => close()}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          Close
        </button>
      </div>
    )
  }

  if (needRefresh) {
    return (
      <div 
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: '#2196F3',
          color: 'white',
          padding: '16px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          zIndex: 1000,
          maxWidth: '300px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}
      >
        <div style={{ fontSize: '14px', fontWeight: '500' }}>
          🔄 New content available, click on reload button to update.
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => updateServiceWorker(true)}
            style={{
              background: 'rgba(255,255,255,0.9)',
              border: 'none',
              color: '#2196F3',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '500'
            }}
          >
            Reload
          </button>
          <button 
            onClick={() => close()}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            Close
          </button>
        </div>
      </div>
    )
  }

  return null
}