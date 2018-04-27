/**
 * @file HTTP Handler - Trigger Actions in Other Services
 */

module.exports = {
  hello_world: function({ req, res }) {
    res.send('Hello World!');
  },
  open_socket_req: function() {}
};
