import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert, Button, Image } from 'react-native';

const GameBoard = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameOver, setGameOver] = useState(false);
  const [scores, setScores] = useState({ X: 0, O: 0, Ties: 0 });

  const handlePress = (index) => {
    if (board[index] || gameOver) {
      Alert.alert('Invalid move!', 'This spot is already taken or the game is over.');
      return;
    }
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const checkForWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setGameOver(false);
  };

  const resetScore = () => {
    setScores({
      X: 0,
      Y: 0,
      Ties: 0,
    })
  }

  useEffect(() => {
    const winner = checkForWinner(board);
    if (winner) {
      Alert.alert(`Player ${winner} has won!`);
      setScores((prevScores) => ({ ...prevScores, [winner]: prevScores[winner] + 1 }));
      setGameOver(true);
    } else if (!board.includes(null)) {
      Alert.alert("It's a tie!");
      setScores((prevScores) => ({ ...prevScores, Ties: prevScores.Ties + 1 }));
      setGameOver(true);
    }
  }, [board]);

  return (
    <View style={styles.container}>
      <Image source={require('./assets/wsu.png')} style={styles.logo} />
      <View style={styles.scoreboard}>
        <Text style={styles.scoreText}>X Wins: {scores.X}</Text>
        <Text style={styles.scoreText}>O Wins: {scores.O}</Text>
        <Text style={styles.scoreText}>Ties: {scores.Ties}</Text>
      </View>
      <View style={styles.board}>
        {board.map((cell, index) => (
          <TouchableOpacity key={index} style={styles.cell} onPress={() => handlePress(index)}>
            <Text style={styles.cellText}>{cell}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.buttonView}>
        <View style={{ marginRight: 10 }}><Button title="Restart Game" onPress={restartGame} color="#981E32" /></View>
        <Button title="Reset Score" onPress={resetScore} color="#981E32" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    marginTop: 10,
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  scoreboard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  board: {
    width: 300,
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: '33.333%',
    height: '33.333%',
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
  cellText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
});

export default GameBoard;
