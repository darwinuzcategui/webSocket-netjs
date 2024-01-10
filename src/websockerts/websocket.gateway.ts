/* eslint-disable prettier/prettier */
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class websocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Cliente Conectado: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Cliente Desconectado: ${client.id}`);
  }
  @SubscribeMessage('mensaje')
  //1 handleMessage(@MessageBody() data:any){
  handleMessage(@ConnectedSocket() client:Socket, @MessageBody() data:any){
    console.log(data);
    // 1  this.server.emit('mensajeserver',`Texto Recibido desde el Servidor: ${data}`);
    client.broadcast.emit('mensajeserver',`mensaje: ${data} enviado por: ${client.id}`);


  }

  @SubscribeMessage('UnNuevoUsuario')
    handleUnNuevoUsuario(@ConnectedSocket() client:Socket, @MessageBody() data:any){
    console.log(data);

    
    //la logica de database
    // algun user
    // leer los usuarios
    //

    client.broadcast.emit('UnNuevoUsuario',data);


  }
}
