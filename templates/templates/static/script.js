const socket = io();

// Initialize the chessboard
const board = Chessboard('chessboard', {
    position: 'start',
    draggable: true,
    onDrop: handleMove
});

// Handle moves
function handleMove(source, target) {
    const move = source + target;
    socket.emit('move', { move: move });
}

// Update the board when receiving FEN from the server
socket.on('update_board', (data) => {
    board.position(data.fen);
});

// Handle illegal moves
socket.on('illegal_move', (data) => {
    alert(data.message);
});
