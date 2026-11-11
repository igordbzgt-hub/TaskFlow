
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

function BotaoPersonalizado({ titulo, onPress, ativo = true }) {
  return (
    <TouchableOpacity
      style={[styles.botao, !ativo && styles.inativo]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.texto}>{titulo}</Text>
    </TouchableOpacity>
  );
}

export default BotaoPersonalizado;

const styles = StyleSheet.create({
  botao: {
    backgroundColor: '#7664F8',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  inativo: {
    opacity: 0.5,
  },
  texto: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
