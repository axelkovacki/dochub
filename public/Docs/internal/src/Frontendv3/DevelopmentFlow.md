# Fluxo de desenvolvimento frontendv3

As tecnologias que compoem o frontendv3 são resumidas ao vuejs, vuex e sass. O **vuex** define um **padrão de gerenciamento de estados**, baseado na arquitetura flux, segundo a própria documentação(https://vuex.vuejs.org/ptbr/guide/) da biblioteca, ele serve como um store centralizado para todos os componentes em uma aplicação, com regras garantindo que o estado só possa ser mutado de forma previsível.

## Como funciona a criação de um novo módulo?

A criação de um novo módulo é seguida por um padrão, onde todo módulo deve possuir a sua própria **store** e essa store é chamada na **store** raiz. Abaixo segue um exemplo de como funciona na prática essa criação:

- `src/modules/User/modules/user/store/index.js` é onde fica a chamada da composição da store, é este arquivo que você deve importar na store do modulo pai

        import state from './state';
        import mutations from './mutations';
        import * as actions from './actions';

        export default {
            state,
            mutations,
            actions,
            namespaced: true,
        `};

  importando no arquivo `src/modules/User/index.js` desta forma:

        import { store as user } from '../modules/User/modules/user';

        export default {
            user,
        };

  e importando desta forma no arquivo `src/store/modules.js`:

        import { store as user } from '../modules/User';

        export default {
            user,
        };

  esse arquivo é chamado no arquivo `src/store/index.js`, onde monta a store da aplicação.

- `src/modules/User/modules/user/store/actions.js` é aqui que você deve consultar uma API, fazer chamadas assincronas, chamar uma biblioteca de terceiro etc. A action é o local que vai fazer o commit de uma alteração no estado.

      import Vue from 'vue';
      import * as types from './mutation-types';

      export const setUser = async (context) => {
        const { data } = await Vue.axios('application.get-profile');
        context.commit(types.SET_USER, data);
      };

- `src/modules/User/modules/user/store/mutations.js`a mutation **deve ser composta por funções puras**, é ela que irá fazer alterações/manipulações diretamente no estado.

      import * as types from './mutation-types';

      export default {
        [types.SET_USER](state, payload) {
      	state.user = payload;
        },
      };

- `src/modules/User/modules/user/store/mutations-types.js` é onde fica constantes responsáveis por compartilhar o tipo de uma mutation.

      export const SET_USER = 'USER/SET_USER';

- `src/modules/User/modules/user/store/states.js` é a origem de todos os estados do módulo.

        export default {
            user: {},
        };

### Criação de componentes

Componentes que vão ser usados em várias partes da aplicação devem ser criados de forma global, somente crie um componente especifico, se ele possui necessidades especificas do módulo, consequentemente este módulo deve herdar componentes globais. - src
-- components -> Aqui é onde fica os componentes globais
--- modules / "NomeDoModulo" / "SubModulo" / Componentes -> Aqui fica os componentes especificos

#### Cuidados e atenções ao desenvolver no frontv3

- Evitar repetição de código.
- Não cometer prop drilling.
- Manter o principio de responsabilidade única.

### Extensões auxiliares

- Instalar a extensão prettierc para identação e padronização do estilo de código
