import TextMessage from "./text-message";
import ImageMessage from "./image-message";
import NotificationMessage from "./notification-message";
import { registerPluginClass } from "../../utils/plugin";
import { MessageType } from "../../utils/message";

registerPluginClass(MessageType.TEXT, TextMessage);
registerPluginClass(MessageType.IMAGE, ImageMessage);
registerPluginClass(MessageType.NOTIFICATION, NotificationMessage);
