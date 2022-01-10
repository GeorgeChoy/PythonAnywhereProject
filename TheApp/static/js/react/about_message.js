'use strict';

const e = React.createElement;
class AboutMessage extends React.Component {
  render() {
      return 'Thanks for your support.';
  }
}
const domContainer = document.querySelector('#about_container');
ReactDOM.render(e(AboutMessage), domContainer);