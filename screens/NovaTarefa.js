
import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import BotaoPersonalizado from '../components/BotaoPersonalizado';

export default function NovaTarefa({
  navigation,
  route,
  onAdicionarTarefa,
  onEditarTarefa,
}) {
  const tarefaExistente = route.params?.tarefa;

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [prioridade, setPrioridade] = useState('Média');
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (tarefaExistente) {
      setTitulo(tarefaExistente.titulo);
      setDescricao(tarefaExistente.descricao);
      setPrioridade(tarefaExistente.prioridade);
    } else {
      setTitulo('');
      setDescricao('');
      setPrioridade('Média');
    }
  }, [tarefaExistente?.id]);

  useEffect(() => {
    setErro('');
  }, [titulo, descricao, prioridade]);

  function salvarTarefa() {
    if (!titulo.trim()) {
      setErro('Digite um título para sua tarefa.');
      return;
    }

    const dadosTarefa = {
      titulo: titulo.trim(),
      descricao: descricao.trim() || 'Sem descrição',
      prioridade,
    };

    if (tarefaExistente) {
      if (typeof onEditarTarefa !== 'function') {
        Alert.alert('Erro', 'Função de edição não encontrada.');
        return;
      }

        console.log('Chamando função de edição...');
        console.log('ID da tarefa:', tarefaExistente.id);

        onEditarTarefa(tarefaExistente.id, dadosTarefa);

      Alert.alert(
        'Sucesso!',
        'Sua tarefa foi atualizada.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } else {
      onAdicionarTarefa({
        ...dadosTarefa,
        concluida: false,
      });

      navigation.goBack();
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.conteudo}>
        <Text style={styles.titulo}>
          {tarefaExistente ? 'Editar tarefa' : 'Nova tarefa'}
        </Text>

        <Text style={styles.subtitulo}>
          {tarefaExistente
            ? 'Atualize as informações da sua atividade.'
            : 'Adicione uma nova atividade à sua rotina.'}
        </Text>

        <Text style={styles.label}>Título da tarefa</Text>

        <TextInput
          style={styles.input}
          placeholder="Ex: Estudar programação"
          placeholderTextColor="#77778B"
          value={titulo}
          onChangeText={setTitulo}
        />

        <Text style={styles.label}>Descrição</Text>

        <TextInput
          style={[styles.input, styles.inputDescricao]}
          placeholder="Descreva sua atividade..."
          placeholderTextColor="#77778B"
          value={descricao}
          onChangeText={setDescricao}
          multiline
        />

        <Text style={styles.label}>Prioridade</Text>

        <View style={styles.prioridades}>
          {['Baixa', 'Média', 'Alta'].map(opcao => (
            <TouchableOpacity
              key={opcao}
              style={[
                styles.opcao,
                prioridade === opcao && styles.opcaoAtiva,
              ]}
              onPress={() => setPrioridade(opcao)}
            >
              <Text style={styles.textoOpcao}>{opcao}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {erro !== '' && (
          <Text style={styles.erro}>{erro}</Text>
        )}

        <BotaoPersonalizado
          titulo={
            tarefaExistente ? 'Salvar alterações' : 'Salvar tarefa'
          }
          onPress={salvarTarefa}
        />
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
    paddingTop: 30,
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
  },
  subtitulo: {
    color: '#A5A5B5',
    marginTop: 8,
    marginBottom: 30,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 18,
  },
  input: {
    backgroundColor: '#202039',
    color: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    fontSize: 15,
  },
  inputDescricao: {
    height: 110,
    textAlignVertical: 'top',
  },
  prioridades: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 25,
  },
  opcao: {
    flex: 1,
    padding: 13,
    borderRadius: 12,
    backgroundColor: '#202039',
    alignItems: 'center',
  },
  opcaoAtiva: {
    backgroundColor: '#7664F8',
  },
  textoOpcao: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  erro: {
    color: '#FF647C',
    marginBottom: 15,
  },
});
