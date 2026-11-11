
import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

import Cabecalho from '../components/Cabecalho';
import CardTarefa from '../components/CardTarefa';
import BotaoPersonalizado from '../components/BotaoPersonalizado';

export default function Inicio({ navigation, tarefas, setTarefas }) {
  const [filtro, setFiltro] = useState('Todas');

  const pendentes = tarefas.filter(t => !t.concluida).length;
  const concluidas = tarefas.filter(t => t.concluida).length;

  const tarefasFiltradas = tarefas.filter(tarefa => {
    if (filtro === 'Pendentes') return !tarefa.concluida;
    if (filtro === 'Concluídas') return tarefa.concluida;
    return true;
  });

  function concluirTarefa(id) {
    setTarefas(tarefasAtuais =>
      tarefasAtuais.map(tarefa =>
        tarefa.id === id
          ? { ...tarefa, concluida: true }
          : tarefa
      )
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.conteudo}>

        <Cabecalho
          titulo="Organize seu dia."
          subtitulo="Suas tarefas, seus objetivos."
        />

        <View style={styles.resumo}>
          <View style={styles.resumoCard}>
            <Text style={styles.numero}>{pendentes}</Text>
            <Text style={styles.resumoTexto}>Pendentes</Text>
          </View>

          <View style={styles.resumoCard}>
            <Text style={styles.numero}>{concluidas}</Text>
            <Text style={styles.resumoTexto}>Concluídas</Text>
          </View>
        </View>

        <View style={styles.tituloLista}>
          <Text style={styles.tituloSecao}>Minhas tarefas</Text>
          <Text style={styles.quantidade}>
            {tarefas.length} atividades
          </Text>
        </View>

        <View style={styles.filtros}>
          {['Todas', 'Pendentes', 'Concluídas'].map(opcao => (
            <TouchableOpacity
              key={opcao}
              style={[
                styles.filtro,
                filtro === opcao && styles.filtroAtivo,
              ]}
              onPress={() => setFiltro(opcao)}
            >
              <Text
                style={[
                  styles.filtroTexto,
                  filtro === opcao && styles.filtroTextoAtivo,
                ]}
              >
                {opcao}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {tarefasFiltradas.length > 0 ? (
          tarefasFiltradas.map(tarefa => (
            <CardTarefa
                key={tarefa.id}
                tarefa={tarefa}
                onPress={() => navigation.navigate('DetalhesTarefa', { tarefa })}
                onConcluir={() => concluirTarefa(tarefa.id)}
            />
          ))
        ) : (
          <Text style={styles.vazio}>
            Nenhuma tarefa encontrada.
          </Text>
        )}

        <View style={styles.botaoNova}>
          <BotaoPersonalizado
            titulo="+ Nova tarefa"
            onPress={() => navigation.navigate('NovaTarefa')}
          />
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121225',
  },
  conteudo: {
    padding: 22,
    paddingTop: 55,
    paddingBottom: 35,
  },
  resumo: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 30,
  },
  resumoCard: {
    flex: 1,
    backgroundColor: '#202039',
    padding: 20,
    borderRadius: 18,
  },
  numero: {
    color: '#8B7CFF',
    fontSize: 30,
    fontWeight: 'bold',
  },
  resumoTexto: {
    color: '#BDBDCE',
    marginTop: 5,
  },
  tituloLista: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  tituloSecao: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: 'bold',
  },
  quantidade: {
    color: '#A5A5B5',
    fontSize: 12,
  },
  filtros: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  filtro: {
    paddingVertical: 10,
    paddingHorizontal: 13,
    backgroundColor: '#202039',
    borderRadius: 12,
  },
  filtroAtivo: {
    backgroundColor: '#7664F8',
  },
  filtroTexto: {
    color: '#BDBDCE',
    fontSize: 12,
  },
  filtroTextoAtivo: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  vazio: {
    color: '#A5A5B5',
    textAlign: 'center',
    padding: 30,
  },
  botaoNova: {
    marginTop: 10,
  },
});
