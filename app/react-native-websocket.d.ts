declare module 'react-native-websocket' {
    export class WebSocket {
      constructor(url: string);
      onopen: () => void;
      onmessage: (event: { data: string }) => void;
      onerror: (error: any) => void;
      onclose: () => void;
      send: (data: string) => void;
      close: () => void;
    }
  }