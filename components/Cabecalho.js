import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Cabecalho({ titulo, subtitulo }) {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>TaskFlow.</Text>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.subtitulo}>{subtitulo}</Text>
    </View>
  );
}

export default Cabecalho;

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
  },
  logo: {
    color: '#8B7CFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitulo: {
    color: '#A5A5B5',
    fontSize: 14,
    marginTop: 6,
  },
});
