import Gui from "./Gui";
import Logic from "./Logic";

const gui = new Gui();
gui.init();
const logic = new Logic(gui);
logic.init();
