
import React, { useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Inicio from './screens/Inicio';
import NovaTarefa from './screens/NovaTarefa';
import DetalhesTarefa from './screens/DetalhesTarefa';

const Stack = createNativeStackNavigator();

export default function App() {
  const [tarefas, setTarefas] = useState([
    {
      id: '1',
      titulo: 'Estudar programação',
      descricao: 'Revisar React Native e JavaScript',
      prioridade: 'Alta',
      concluida: false,
    },
    {
      id: '2',
      titulo: 'Organizar trabalhos',
      descricao: 'Finalizar atividades da faculdade',
      prioridade: 'Média',
      concluida: false,
    },
    {
      id: '3',
      titulo: 'Ler documentação',
      descricao: 'Estudar os componentes do Expo',
      prioridade: 'Baixa',
      concluida: true,
    },
  ]);

  function adicionarTarefa(novaTarefa) {
    setTarefas(tarefasAtuais => [
      ...tarefasAtuais,
      {
        ...novaTarefa,
        id: Date.now().toString(),
      },
    ]);
  }
 
function editarTarefa(id, tarefaAtualizada) {
  console.log('--- TESTE DE EDIÇÃO ---');
  console.log('ID recebido:', id);
  console.log('Dados recebidos:', tarefaAtualizada);

  setTarefas(tarefasAtuais => {
    const existe = tarefasAtuais.some(
      tarefa => String(tarefa.id) === String(id)
    );

    console.log('Tarefa encontrada:', existe);

    const listaAtualizada = tarefasAtuais.map(tarefa =>
      String(tarefa.id) === String(id)
        ? { ...tarefa, ...tarefaAtualizada }
        : tarefa
    );

    console.log('Lista atualizada:', listaAtualizada);

    return listaAtualizada;
  });
}

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#202039',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          contentStyle: {
            backgroundColor: '#121225',
          },
        }}
      >
        <Stack.Screen name="Inicio" options={{ title: 'TaskFlow' }}>
          {props => (
            <Inicio
              {...props}
              tarefas={tarefas}
              setTarefas={setTarefas}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="NovaTarefa" options={{ title: 'Nova tarefa' }}>
          {props => (
          <NovaTarefa
          {...props}
          onAdicionarTarefa={adicionarTarefa}
          onEditarTarefa={editarTarefa}
          />
          )}
        </Stack.Screen>

        <Stack.Screen
  name="DetalhesTarefa"
  options={{ title: 'Detalhes da tarefa' }}
>
  {props => (
    <DetalhesTarefa
      {...props}
      tarefas={tarefas}
    />
  )}
</Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
