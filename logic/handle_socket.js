module.exports = {
  handle_connect: function(socket) {
    socket.emit("news", { hello: "world" });
    socket.on("my other event", function(data) {
      console.log(data);
    });
  }
};
