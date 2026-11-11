
import React from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import BotaoPersonalizado from '../components/BotaoPersonalizado';

export default function DetalhesTarefa({
  route,
  navigation,
  tarefas = [],
}) {
  const tarefaOriginal = route.params?.tarefa;

  const tarefa = tarefas.find(
    item => item.id === tarefaOriginal?.id
  ) || tarefaOriginal;

  if (!tarefa) {
    return (
      <View style={styles.container}>
        <Text style={styles.valor}>
          Tarefa não encontrada.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Detalhes da tarefa</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Título</Text>
        <Text style={styles.valor}>{tarefa.titulo}</Text>

        <Text style={styles.label}>Descrição</Text>
        <Text style={styles.valor}>{tarefa.descricao}</Text>

        <Text style={styles.label}>Prioridade</Text>
        <Text style={styles.prioridade}>
          {tarefa.prioridade}
        </Text>

        <Text style={styles.label}>Status</Text>
        <Text style={styles.status}>
          {tarefa.concluida ? 'Concluída' : 'Pendente'}
        </Text>
      </View>

      <View style={styles.botaoEditar}>
        <BotaoPersonalizado
          titulo="Editar tarefa"
          onPress={() =>
            navigation.push('NovaTarefa', { tarefa })
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121225',
    padding: 22,
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  card: {
    backgroundColor: '#202039',
    padding: 22,
    borderRadius: 18,
  },
  label: {
    color: '#8B7CFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 18,
  },
  valor: {
    color: '#FFFFFF',
    fontSize: 17,
    marginTop: 7,
  },
  prioridade: {
    color: '#FF647C',
    fontSize: 17,
    marginTop: 7,
  },
  status: {
    color: '#FFFFFF',
    fontSize: 17,
    marginTop: 7,
  },
  botaoEditar: {
    marginTop: 25,
  },
});
