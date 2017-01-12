import Map from "can/map/";
import 'can/map/define/';
import 'can/route/pushstate/';

const AppViewModel = Map.extend({
  define: {
    message: {
      value: 'Hello World!',
      serialize: false
    },
    title: {
      value: 'tabletop',
      serialize: false
    }
  }
});

export default AppViewModel;
