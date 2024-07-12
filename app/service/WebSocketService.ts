class WebSocketService {
  private ws: WebSocket;
  private onMessageCallback: (message: any) => void = () => {};

  constructor(url: string) {
    this.ws = new WebSocket(url);
    this.ws.onopen = this.onOpen;
    this.ws.onmessage = this.onMessage;
    this.ws.onerror = this.onError;
    this.ws.onclose = this.onClose;
  }

  private onOpen = () => {
    console.log('WebSocket connection opened');
  };

  private onMessage = (event: MessageEvent) => {
    try {
      const message = JSON.parse(event.data);
      if (this.onMessageCallback) {
        this.onMessageCallback(message);
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  };

  private onError = (error: Event) => {
    console.error('WebSocket error:', error);
  };

  private onClose = (event: CloseEvent) => {
    console.log('WebSocket connection closed:', event);
  };

  public sendMessage = (message: any) => {
    this.ws.send(JSON.stringify(message));
  };

  public setOnMessageCallback = (callback: (message: any) => void) => {
    this.onMessageCallback = callback;
  };

  public close = () => {
    this.ws.close();
  };
}

export default WebSocketService;