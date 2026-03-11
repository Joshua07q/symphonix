interface SpotifyLoginProps {
  isConnected: boolean;
  hasClientId: boolean;
  onLogin: () => Promise<void>;
  onLogout: () => void;
}

export default function SpotifyLogin({
  isConnected,
  hasClientId,
  onLogin,
  onLogout,
}: SpotifyLoginProps) {
  if (isConnected) {
    return (
      <div className="spotify-status">
        <span className="spotify-connected">
          <span className="spotify-dot" />
          Spotify connected
        </span>
        <button className="spotify-disconnect" onClick={onLogout}>
          Disconnect
        </button>
      </div>
    );
  }

  if (!hasClientId) {
    return null; // No client ID in env = Spotify integration disabled
  }

  return (
    <div className="spotify-connect-row">
      <button className="btn-spotify-connect" onClick={onLogin}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm3.67 11.55a.5.5 0 01-.68.17c-1.88-1.15-4.24-1.41-7.02-.77a.5.5 0 11-.22-.97c3.04-.7 5.65-.4 7.75.89a.5.5 0 01.17.68zm.98-2.18a.62.62 0 01-.85.21c-2.15-1.32-5.43-1.7-7.97-.93a.62.62 0 01-.36-1.19c2.9-.88 6.51-.45 8.97 1.06a.62.62 0 01.21.85zm.08-2.27C10.44 5.6 6.07 5.46 3.54 6.23a.75.75 0 11-.43-1.43c2.9-.88 7.72-.71 10.76 1.1a.75.75 0 01-.14 1.2z"/>
        </svg>
        Connect Spotify
      </button>
    </div>
  );
}
