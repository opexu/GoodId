import { createApp } from 'vue';
import { createPinia, type PiniaPluginContext } from 'pinia';
import App from '@/App.vue';

import './main.css';

const app = createApp( App );
const pinia = createPinia();

// pinia.use(( obj: PiniaPluginContext ) => {

//     obj.store.$onAction(( action ) => {
//         switch( action.name ){
//             case 'connectWallet': {
//                 connection.initConnection();
//                 break;
//             }
//             case 'disconnectWallet': {
//                 connection.disconnect();
//                 break;
//             }
//             case 'getPassword': {
//                 connection.getPassword( action.args[0] );
//                 break;
//             }
//             case 'savePassword': {
//                 connection.savePassword( action.args[0], action.args[1] );
//                 break;
//             }
//         }
//     });

//     connection.statusChanged = ( status ) => {
//         obj.store.connectionStatus = status;
//     };

//     connection.deepLinkChanged = ( deepLink ) => {
//         obj.store.deepLink = deepLink;
//     }

//     connection.receivedPasswordChanged = ( password ) => {
//         obj.store.receivedPassword = password;
//     }

//     connection.isTransactionSendChanged = ( value ) => {
//         obj.store.isTransactionSended = value;
//     }
    
//     connection.restoreConnection();
// });

app.use( pinia );

app.mount( '#app' );
