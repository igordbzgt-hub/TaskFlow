
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

function CardTarefa({ tarefa, onPress, onConcluir }) {
  return (
    <View style={styles.card}>
      <Text style={styles.titulo}>{tarefa.titulo}</Text>

      <Text style={styles.descricao}>
        {tarefa.descricao}
      </Text>

      <Text style={styles.prioridade}>
        Prioridade: {tarefa.prioridade}
      </Text>

      <Text style={styles.status}>
        {tarefa.concluida ? '✓ Concluída' : '○ Pendente'}
      </Text>

      <View style={styles.acoes}>
        <TouchableOpacity
          style={styles.botao}
          onPress={onPress}
        >
          <Text style={styles.textoBotao}>Detalhes</Text>
        </TouchableOpacity>

        {!tarefa.concluida && (
          <TouchableOpacity
            style={styles.botao}
            onPress={onConcluir}
          >
            <Text style={styles.textoBotao}>Concluir</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default CardTarefa;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#202039',
    padding: 20,
    borderRadius: 18,
    marginTop: 20,
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  descricao: {
    color: '#A5A5B5',
    marginTop: 10,
  },
  prioridade: {
    color: '#FF647C',
    marginTop: 10,
  },
  status: {
    color: '#BDBDCE',
    marginTop: 10,
  },
  acoes: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },
  botao: {
    flex: 1,
    backgroundColor: '#7664F8',
    padding: 13,
    borderRadius: 12,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
